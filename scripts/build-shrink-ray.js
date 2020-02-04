/* eslint-disable no-console */

require('isomorphic-fetch');

const {resolve} = require('path');
const {execSync} = require('child_process');
const {postReport, sendCommitStatus} = require('@shopify/shrink-ray');

const BASE_BRANCH = 'master';
const repo = 'polaris-react';
const sha = process.env.TRAVIS_COMMIT || process.env.CIRCLE_SHA1;

const report = resolve(
  __dirname,
  '../build/storybook/bundle-analysis/report.html',
);

process.on('unhandledRejection', (reason) => {
  throw reason;
});

if (sha) {
  setupShrinkRay();
} else {
  console.log(
    'sha is not available, building bundle without pinging shrink-ray',
  );
  buildPackages();
}

function buildPackages() {
  execSync('yarn run storybook:build --quiet', {
    stdio: 'inherit',
  });
}

function setupShrinkRay() {
  console.log('[shrink-ray] Running shrink-ray prebuild script...');

  // fetch latest in pipeline. Travis does a shallow clone by default,
  // --unshallow makes sure we can fetch the master commit
  execSync('git fetch --unshallow origin master:refs/remotes/origin/master', {
    encoding: 'utf8',
  });

  const masterSha = execSync(`git merge-base HEAD origin/${BASE_BRANCH}`, {
    encoding: 'utf8',
  }).trim();

  sendCommitStatus({repo, sha, state: 'pending'})
    .then(() => {
      console.log('[shrink-ray] shrink-ray prebuild script completed.');
      buildPackages();

      return postReport({
        repo,
        sha,
        baselineSha: masterSha,
        reportPath: report,
      });
    })
    .catch((error) => {
      console.log('ERROR: ', error);

      // eslint-disable-next-line promise/no-nesting
      sendCommitStatus({repo, sha, state: 'error'})
        .then(() => {
          throw error;
        })
        .catch(() => {
          throw error;
        });
    });
}
