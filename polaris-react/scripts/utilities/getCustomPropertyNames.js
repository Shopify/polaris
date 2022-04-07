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
  const groupedTokens = {};
  fs.readdirSync(tokenGroupsDir).map((file) => {
    const tokenGroup = require(path.join(tokenGroupsDir, file));

    if (file.includes('color')) {
      file = 'color';
    }

    let tokenGroupCustomProperties = Object.keys(tokenGroup).map(
      (token) => `--p-${token}`,
    );

    groupedTokens[file.replace('.json', '')] = tokenGroupCustomProperties;
  });

  return groupedTokens;
};

module.exports = {getGroupedCustomPropertyNames, getCustomPropertyNames};
