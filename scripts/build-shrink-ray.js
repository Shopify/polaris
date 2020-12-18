const {resolve} = require('path');
const {execSync} = require('child_process');

const {readFileSync} = require('fs-extra');
const {Logger, Build, ShrinkRayAPI, Check} = require('@shopify/shrink-ray');

process.on('unhandledRejection', (reason) => {
  throw reason;
});

const githubUrl = process.env.GITHUB_SERVER_URL;
const githubRepo = process.env.GITHUB_REPOSITORY;
const runId = process.env.GITHUB_ACTION;

startShrinkRayBuild({
  masterBranchName: 'master',
  repo: 'polaris-react',
  sha: process.env.GITHUB_SHA,
  reportPath: resolve(
    __dirname,
    '..',
    'build/storybook/bundle-analysis/report.html',
  ),
  buildUrl: `${githubUrl}/${githubRepo}/runs/${runId}`,
  skip: [Check.Entrypoints],
});

async function startShrinkRayBuild({
  masterBranchName,
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

  // fetch latest in pipeline. Travis does a shallow clone by default,
  // --unshallow makes sure we can fetch the master commit in case it is not
  // included in the initial shallow clone
  execSync('git fetch --unshallow origin master:refs/remotes/origin/master');

  const masterSha = execSync(`git merge-base HEAD origin/${masterBranchName}`, {
    encoding: 'utf8',
  }).trim();

  const shrinkRay = new ShrinkRayAPI();
  const build = new Build({
    repo,
    sha,
    masterSha,
  });

  try {
    logger.header('Validating...');
    build.validate();
    logger.for('validation').log('✅ sha validation successful!');

    logger.header('Initializing check(s) on GitHub');
    await shrinkRay.create({...build, buildUrl, skip});

    logger.header('Running storybook build...');
    execSync('yarn run storybook:build --quiet', {
      stdio: 'inherit',
    });

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
