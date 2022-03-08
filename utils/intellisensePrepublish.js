const fs = require('fs');
const path = require('path');

const generateTokensArray = require('./generateTokensArray');

// if the file is being run directly
const generateTokensForPrepublish = () => {
  const outDir = '../polaris-intellisense/src/data/allTokens.ts';

  const tokens = generateTokensArray(outDir);

  fs.writeFileSync(
    path.join(__dirname, outDir),
    `export const allTokens = ${JSON.stringify(tokens)};`,
  );
};

generateTokensForPrepublish();
