#!/usr/bin/env node
import {execa} from 'execa';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import terminate from 'terminate/promise.js';
import fs from 'fs';
import {XMLParser} from 'fast-xml-parser';
import backstop from 'backstopjs';
import fetch from 'node-fetch';

const PROD_DOMAIN = 'https://polaris.shopify.com';
const STAGE_DOMAIN = 'https://polaris-staging.shopifycloud.com';
const LOCAL_DOMAIN = 'http://localhost:3000';

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
  await buildLocalServer();
}

// Step 2: Scrape the sitemap for all urls
let sitemap;
if (argv._[0] === 'reference') {
  sitemap = await getSitemapFromUrl(
    argv.from === 'stage' ? STAGE_DOMAIN : PROD_DOMAIN,
  );
} else if (argv._[0] === 'test') {
  sitemap = getSitemapFromDisk();
}

if (!sitemap?.urlset?.url?.length) {
  console.error(
    'Unable to determine URLs to screenshot; sitemap appears to be empty',
  );
  process.exit(-1);
}

// Step 3: Run the local server
let serverProcess;
if (
  (argv._[0] === 'reference' && argv.from === 'local') ||
  argv._[0] === 'test'
) {
  serverProcess = startLocalServer();
}

// Step 4: Convert sitemap into backstop test scenarios
const scenarios = sitemapToScenarios(
  sitemap,
  argv._[0] === 'test'
    ? PROD_DOMAIN
    : {local: LOCAL_DOMAIN, prod: PROD_DOMAIN, stage: STAGE_DOMAIN}[argv.from],
  argv._[0] === 'test' ? LOCAL_DOMAIN : PROD_DOMAIN,
);

console.log(`Processing ${scenarios.length} scenarios`);

// Step 5: Run the visual regression test
let exitCode = 0;
try {
  await runBackstop(argv._[0], scenarios);
} catch (error) {
  console.error(error);
  exitCode = -1;
} finally {
  // Step 6: Clean up
  if (serverProcess) {
    // Kill the yarn command _and_ the child process running node
    await terminate(serverProcess.pid, 'SIGKILL');
  }
  // Gracefully exit the process with whatever exit code backstop gave us
  process.exit(exitCode);
}

// ----

function buildLocalServer() {
  // NOTE: gen-assets runs `yarn next build` for us
  return execa('yarn', ['gen-assets'], {stdio: 'inherit'});
}

function startLocalServer() {
  return execa('yarn', ['next', 'start'], {
    stdio: 'inherit',
    shell: true,
  });
}

function getSitemapFromDisk() {
  const sitemapXml = fs.readFileSync('./public/sitemap.xml').toString();
  return new XMLParser().parse(sitemapXml);
}

async function getSitemapFromUrl(url) {
  const sitemapUrl = `${url}/sitemap.xml`;
  console.log(`Fetching urls from ${sitemapUrl}`);
  const response = await fetch(sitemapUrl);
  const sitemapXml = await response.text();
  return new XMLParser().parse(sitemapXml);
}

function sitemapToScenarios(sitemap, refDomain, testDomain) {
  return sitemap.urlset.url.map(({loc}) => ({
    // sitemap URLs are always prod, even when generated locally.
    referenceUrl: loc.replace(PROD_DOMAIN, refDomain),
    url: loc.replace(PROD_DOMAIN, testDomain),
    label: loc.replace(PROD_DOMAIN, ''),
  }));
}

function runBackstop(
  command,
  scenarios,
  // TODO: Generate these from our Polaris docs breakpoints
  viewports = [
    {
      label: 'phone',
      width: 320,
      height: 480,
    },
    {
      label: 'tablet',
      width: 1024,
      height: 768,
    },
  ],
) {
  return backstop(command, {
    config: {
      id: 'backstop_default',
      viewports,
      onBeforeScript: 'playwright/onBefore.js',
      onReadyScript: 'playwright/onReady.js',
      scenarios,
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
      },
      asyncCaptureLimit: 5,
      asyncCompareLimit: 50,
      debug: false,
      debugWindow: false,
    },
  });
}
