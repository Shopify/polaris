const {resolve} = require('path');

const {readFileSync} = require('fs-extra');
const {Logger, Build, ShrinkRayAPI, Check} = require('@shopify/shrink-ray');

process.on('unhandledRejection', (reason) => {
  throw reason;
});

const githubUrl = process.env.GITHUB_SERVER_URL;
const githubRepo = process.env.GITHUB_REPOSITORY;
const runId = process.env.GITHUB_RUN_ID;

startShrinkRayBuild({
  repo: 'polaris-react',
  baseSha: process.env.GH_BASE_SHA || process.env.GITHUB_SHA,
  sha: process.env.GH_HEAD_SHA || process.env.GITHUB_SHA,
  reportPath: resolve(
    __dirname,
    '..',
    'build/storybook/bundle-analysis/report.html',
  ),
  buildUrl: `${githubUrl}/${githubRepo}/actions/runs/${runId}`,
  skip: [Check.Entrypoints],
});

async function startShrinkRayBuild({
  baseSha,
  repo,
  sha,
  reportPath,
  buildUrl,
  skip,
}) {
  const logger = new Logger();

  if (!sha) {
    throw new Error('sha was not found.');
  }

  logger.header('Running shrink-ray prebuild script...');

  const shrinkRay = new ShrinkRayAPI();
  const build = new Build({
    repo,
    sha,
    masterSha: baseSha,
  });

  try {
    logger.header('Validating...');
    build.validate();
    logger.for('validation').log('✅ sha validation successful!');

    logger.header('Initializing check(s) on GitHub');
    await shrinkRay.create({...build, buildUrl, skip});

    logger.header(`Uploading build report to Shrink-Ray`);
    await shrinkRay.report(build, bundleAnalyzerReport(reportPath));
  } catch (error) {
    logger.header('shrink-ray build fail');
    logger.for('error').log(error);
    logger.for('error').log(`sending status to server for clean up `);
    await shrinkRay.error(build, error);
  }
}

function bundleAnalyzerReport(reportPath) {
  try {
    return readFileSync(reportPath, 'utf-8');
  } catch (error) {
    throw new Error(
      `Could not read webpack-bundle-analyzer report: ${reportPath}`,
    );
  }
}
