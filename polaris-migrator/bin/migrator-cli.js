#!/usr/bin/env node

const {cli, run} = require('./../dist/cjs');

(async function () {
  const [migration, files] = cli.input;
  const flags = cli.flags;
  await run(migration, files, flags);
})();
