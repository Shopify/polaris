#!/usr/bin/env node
const glob = require('glob');

const nodeIndex = parseInt(process.env.BUILDKITE_PARALLEL_JOB, 10);
const nodeTotal = parseInt(process.env.BUILDKITE_PARALLEL_JOB_COUNT, 10);

if (isNaN(nodeIndex) || isNaN(nodeTotal)) {
  throw new Error(
    `Buildkite env variables are missing (BUILDKITE_PARALLEL_JOB=${nodeIndex}, BUILDKITE_PARALLEL_JOB_COUNT=${nodeTotal})`,
  );
}

const tests = glob
  .sync('{app,client,packages,repo,server,tests}/**/*.test.{ts,tsx}')
  .sort()
  .filter((path, index) => index % nodeTotal === nodeIndex);

console.log(tests.join('|'));
