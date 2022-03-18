const fs = require('fs');
const path = require('path');

const getCustomPropertyNames = require('../../scripts/utilities/getCustomPropertyNames');

const dirPath = path.join(__dirname, '../src/data');
const outFile = 'allTokens.ts';
const filePath = path.join(dirPath, outFile);

const tokens = getCustomPropertyNames();

try {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(
    filePath,
    `export const allTokens = ${JSON.stringify(tokens)};`,
  );
} catch (err) {
  throw new Error(
    `Could not create custom properties file "${filePath}": ${err}`,
  );
}
