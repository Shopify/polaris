#!/usr/bin/env node
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {XMLParser} from 'fast-xml-parser';
import fs from 'node:fs/promises';
import {promisify} from 'node:util';
import fetch from 'node-fetch';
import ora from 'ora';
import tmp from 'tmp';
import {metaThemeDefault, toPx} from '@shopify/polaris-tokens';

import {prettyExeca, genAssets, startLocalServer} from './util.mjs';

const PROD_DOMAIN = 'https://polaris.shopify.com';
const STAGE_DOMAIN = 'https://polaris-staging.shopifycloud.com';
const LOCAL_DOMAIN = 'http://localhost:3000';
const SCREEN_RATIO = 16 / 9;

// Get all breakpoints massaged into a more useful set of data
const breakpointsObj = Object.entries(metaThemeDefault.breakpoints).map(
  ([key, breakpoint]) => [
    // We just want the actual size, no prefix
    key.replace('breakpoints-', ''),
    // convert rems to px to int
    parseInt(toPx(breakpoint.value).replace('px', '')),
  ],
);

// The smallest breakpoint is 0 by default, so we need to bump that up to just
// under the next breakpoint's size
breakpointsObj[0][1] = breakpointsObj[1][1] - 1;

const BACKSTOP_DEFAULT_CONFIG = {
  id: 'backstop_default',
  viewports: breakpointsObj.map(([label, width]) => ({
    label,
    width,
    height: width * SCREEN_RATIO,
  })),
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report',
  },
  report: ['browser'],
  engine: 'playwright',
  engineOptions: {
    browser: 'chromium',
    gotoParameters: {waitUntil: 'load'},
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};

tmp.setGracefulCleanup();

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <backstopjs command> [options]')
  .command('reference', 'Generate reference screenshots from prod.', {
    f: {
      alias: 'from',
      describe:
        'What source of truth do you want to generate the reference screenshots from?',
      choices: ['prod', 'stage', 'local'],
      default: 'prod',
      type: 'choice',
    },
    b: {
      alias: 'with-build',
      describe:
        'Create a local docs site build (yarn build) before running. Must be run at least once when --from=local.',
      default: true,
      type: 'boolean',
    },
  })
  .command('test', 'Generate screenshots and compare against reference set', {
    b: {
      alias: 'with-build',
      describe:
        'Create a local docs site build (yarn build) before running. Must be run at least once.',
      default: true,
      type: 'boolean',
    },
  })
  .demandCommand(1, 'Must provide a command')
  .example(
    '$0 reference --from=prod',
    'Generate an initial set of reference screenshots from prod.',
  )
  .example(
    '$0 test',
    'Screenshot and compare localhost with reference screenshots.',
  )
  .strictCommands()
  .help().argv;

// Step 1: Build the local server if necessary
if (
  (argv._[0] === 'reference' && argv.from === 'local' && argv['with-build']) ||
  (argv._[0] === 'test' && argv['with-build'])
) {
  try {
    await genAssets();
  } catch (error) {
    process.exit(-1);
  }
}

const spinner = ora();

// Step 2: Run the local server
let serverProcess;
if (
  (argv._[0] === 'reference' && argv.from === 'local') ||
  argv._[0] === 'test'
) {
  spinner.start(`Starting local server`);
  serverProcess = startLocalServer();
  serverProcess.catch((err) => {
    console.error(err.stderr);
    process.exit(-1);
  });
  spinner.succeed(`Started local server`);
}

const domain =
  argv._[0] === 'test'
    ? PROD_DOMAIN
    : {local: LOCAL_DOMAIN, prod: PROD_DOMAIN, stage: STAGE_DOMAIN}[argv.from];

// Step 3: Scrape the sitemap for all urls
spinner.start(`Fetching sitemap from ${domain}`);
let sitemap;
try {
  sitemap = await getSitemapFromUrl(domain);
  spinner.succeed(`Fetched sitemap from ${domain}`);
} catch (error) {
  spinner.fail(`Couldn't fetch sitemap from ${domain}`);
  throw error;
}

if (!sitemap?.urlset?.url?.length) {
  spinner.fail(
    'Unable to determine URLs to screenshot; sitemap appears to be empty',
  );
  process.exit(-1);
}

// Step 4: Convert sitemap into backstop test scenarios and write config to disk
spinner.start(`Preparing to capture screenshots`);
const scenarios = sitemapToScenarios(sitemap, domain);
const backstopConfig = {
  ...BACKSTOP_DEFAULT_CONFIG,
  scenarios,
};
let configFilePath;
try {
  configFilePath = await promisify(tmp.file)({
    prefix: 'backstop-',
    postfix: '.json',
    discardDescriptor: true,
  });
  await fs.writeFile(configFilePath, JSON.stringify(backstopConfig));
  spinner.succeed('Preparations complete');
} catch (error) {
  spinner.start(`Failed to prepare BackstopJS`);
  process.exit(-1);
}

// Step 5: Run the visual regression test
let exitCode = 0;
try {
  await prettyExeca(
    'yarn',
    ['backstop', argv._[0], '--config', configFilePath],
    {
      stdout: 'inherit',
      stderr: 'inherit',
      pretty: {
        text: `Processing ${scenarios.length} urls (this may take a while)`,
        successText:
          argv._[0] === 'reference'
            ? `Captured ${scenarios.length} reference screenshots\n\nNow re-run with the 'test' command to generate visual diffs between reference screenshots and localhost.\n`
            : `Captured ${scenarios.length} screenshots to diff with reference.`,
        failText: `Failed to process ${scenarios.length} urls`,
      },
    },
  );
} catch (error) {
  exitCode = -1;
} finally {
  // Gracefully exit the process with whatever exit code backstop gave us
  process.exit(exitCode);
}

// ----

async function getSitemapFromUrl(url) {
  const response = await fetch(`${url}/sitemap.xml`);
  const sitemapXml = await response.text();
  return new XMLParser().parse(sitemapXml);
}

function sitemapToScenarios(sitemap, domain) {
  return sitemap.urlset.url.map(({loc}) => {
    // NOTE: sitemap URLs are always prod, even when generated locally.
    const pathName = loc.replace(PROD_DOMAIN, '');
    const url = `${domain}${pathName}`;
    return {
      // When running in `reference` mode, will use the `referenceUrl` key.
      // When running in `test` mode, will use the `url` key.
      referenceUrl: url,
      url,
      // Just use the url as the label
      label: pathName,
      // Hide the moving parts on motion pages
      ...(pathName === '/tokens/motion' && {
        removeSelectors: ['[data-preview]'],
      }),
    };
  });
}
