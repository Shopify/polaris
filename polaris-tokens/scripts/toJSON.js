const fs = require('fs');
const path = require('path');

function getFileName(fileName) {
  return path.join(__dirname, '../dist', fileName);
}

function toJSON(tokens) {
  Object.entries(tokens).forEach(([tokenGroup, tokenProps]) => {
    if (tokenGroup === 'colorSchemes') {
      Object.entries(tokenProps).forEach(
        ([colorTokenGroup, colorTokenProps]) => {
          const fileName = getFileName(`colors.${colorTokenGroup}.json`);

          fs.writeFileSync(fileName, JSON.stringify(colorTokenProps));
        },
      );
    } else {
      const fileName = getFileName(`${tokenGroup}.json`);

      fs.writeFileSync(fileName, JSON.stringify(tokenProps));
    }
  });
}

module.exports = {toJSON};
