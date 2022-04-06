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

const getCategorizedCustomProperties = () => {
  const categorizedTokens = {};
  fs.readdirSync(tokenGroupsDir).map((file) => {
    const tokenGroup = require(path.join(tokenGroupsDir, file));
    const tokenGroupCustomProperties = {};

    Object.keys(tokenGroup).map((token) => {
      tokenGroupCustomProperties[`--p-${token}`] = tokenGroup[token];
    });

    categorizedTokens[file.replace('.json', '')] = tokenGroupCustomProperties;
  });

  console.log(categorizedTokens);
  return categorizedTokens;
};

module.exports = getCategorizedCustomProperties;
