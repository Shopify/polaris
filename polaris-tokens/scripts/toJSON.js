const fs = require('fs');
const path = require('path');

function getFileName(fileName) {
  return path.join(__dirname, '../dist', fileName);
}

async function toJSON(tokens) {
  for (const [tokenGroup, tokenProps] of Object.entries(tokens)) {
    if (tokenGroup === 'colorSchemes') {
      for (const [colorTokenGroup, colorTokenProps] of Object.entries(
        tokenProps,
      )) {
        const fileName = getFileName(`colors.${colorTokenGroup}.json`);

        await fs.promises.writeFile(fileName, JSON.stringify(colorTokenProps));
      }
    } else {
      const fileName = getFileName(`${tokenGroup}.json`);

      await fs.promises.writeFile(fileName, JSON.stringify(tokenProps));
    }
  }
}

module.exports = {toJSON};
