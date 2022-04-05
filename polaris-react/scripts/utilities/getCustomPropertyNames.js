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
        .filter((file) => !file.includes('keyframes'))
        .map((file) => {
          const tokenGroup = require(path.join(tokenGroupsDir, file));

          return Object.keys(tokenGroup).map((token) => `--p-${token}`);
        })
        .flat(),
    ),
  );

  return polarisTokenCustomProperties;
};

module.exports = getCustomPropertyNames;
