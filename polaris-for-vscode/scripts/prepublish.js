const fs = require('fs');
const path = require('path');

const {
  getCustomPropertyNames,
  getGroupedCustomPropertyCompletionItems,
} = require('../../polaris-react/scripts/utilities/getCustomPropertyNames');

const dirPath = path.join(__dirname, '../server/src/tmp-tokens');
const outFile = 'allTokens.ts';
const filePath = path.join(dirPath, outFile);

const groupedTokens = getGroupedCustomPropertyCompletionItems();
const tokens = getCustomPropertyNames();

try {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(
    filePath,
    `
    export const allTokens = ${JSON.stringify(tokens)};

    export const groupedTokens = ${JSON.stringify(groupedTokens)};
    `,
  );
} catch (err) {
  throw new Error(
    `Could not create custom properties file "${filePath}": ${err}`,
  );
}
