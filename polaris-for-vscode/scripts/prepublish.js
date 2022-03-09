const fs = require('fs');
const path = require('path');

const getCustomPropertyNames = require('../../scripts/utilities/getCustomPropertyNames');

const outDir = '../polaris-intellisense/src/data/allTokens.ts';

const tokens = getCustomPropertyNames();

fs.writeFileSync(
  path.join(__dirname, outDir),
  `export const allTokens = ${JSON.stringify(tokens)};`,
);
