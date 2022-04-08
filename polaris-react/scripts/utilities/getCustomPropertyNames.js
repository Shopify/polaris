const fs = require('fs');
const path = require('path');

const tokenGroupsDir = path.join(__dirname, '../../src/tokens/token-groups');

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-background', '--p-text', etc...]
 */
const getCustomPropertyNames = () => {
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

const getGroupedCustomPropertyNames = () => {
  return Object.fromEntries(
    fs.readdirSync(tokenGroupsDir).map((fileName) => {
      const tokenGroup = require(path.join(tokenGroupsDir, fileName));

      let tokenGroupName = path.basename(fileName, '.json');
      if (fileName.startsWith('color.')) {
        tokenGroupName = 'color';
      }
      const customPropertyNames = Object.keys(tokenGroup).map(
        (token) => `--p-${token}`,
      );
      return [tokenGroupName, customPropertyNames];
    }),
  );
};

module.exports = {getGroupedCustomPropertyNames, getCustomPropertyNames};
