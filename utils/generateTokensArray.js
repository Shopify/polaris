const fs = require('fs');
const path = require('path');

const tokenGroupsDir = path.join(__dirname, '../src/tokens/token-groups');

const generateTokensArray = () => {
  /**
   * Allowed Polaris token custom properties.
   *
   * Result: ['--p-background', '--p-text', etc...]
   */
  const polarisTokenCustomProperties = Array.from(
    new Set(
      fs
        .readdirSync(tokenGroupsDir)
        .map((file) => {
          const tokenGroup = require(path.join(tokenGroupsDir, file));

          return Object.keys(tokenGroup).map((token) => `--p-${token}`);
        })
        .flat(),
    ),
  );

  return polarisTokenCustomProperties;
};

module.exports = generateTokensArray;
