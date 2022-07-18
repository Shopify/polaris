#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

// eslint-disable-next-line node/no-deprecated-api
if (!require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  require('ts-node').register(dev ? {project} : {});
}

try {
  require(path.join('..', dev ? 'src/index' : 'dist/index.js'));
} catch (error) {
  if (typeof error === 'number') {
    process.exit(error);
  }
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}
