#!/usr/bin/env node
const {run} = require('../dist');

try {
  run();
} catch (error) {
  if (typeof error === 'number') {
    process.exit(error);
  }
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}
