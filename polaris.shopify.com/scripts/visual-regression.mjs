#!/usr/bin/env node
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import fs from 'node:fs/promises';
import {promisify} from 'node:util';
import ora from 'ora';
import tmp from 'tmp';
import {metaThemeDefault, toPx} from '@shopify/polaris-tokens';

import {prettyExeca, genAssets, startLocalServer} from './util.mjs';

const SCREEN_RATIO = 3 / 4;

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
  scenarios: [
    {
      // When running in `reference` mode, will use the `referenceUrl` key.
      // When running in `test` mode, will use the `url` key.
      referenceUrl: '<TODO>',
      url: '<TODO>',
      // Just use the url as the label
      label: '<TODO>',
      // Hide the moving parts on motion pages
      ...(pathName === '/tokens/motion' && {
        removeSelectors: ['[data-preview]'],
      }),
    },
  ],
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
spinner.start(`Starting local server`);
const serverProcess = startLocalServer();
serverProcess.catch((err) => {
  console.error(err.stderr);
  process.exit(-1);
});
spinner.succeed(`Started local server`);

// Step 4: Convert sitemap into backstop test scenarios and write config to disk
spinner.start(`Preparing to capture screenshots`);
let configFilePath;
try {
  configFilePath = await promisify(tmp.file)({
    prefix: 'backstop-',
    postfix: '.json',
    discardDescriptor: true,
  });
  await fs.writeFile(configFilePath, JSON.stringify(BACKSTOP_DEFAULT_CONFIG));
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
