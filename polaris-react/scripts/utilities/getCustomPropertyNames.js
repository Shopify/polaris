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

/**
 * Used by the prepublish script in polaris-for-vscode to create an object of
 * grouped custom properties as VS Code CompletionItems
 */
const getGroupedCustomPropertyCompletionItems = () => {
  return Object.fromEntries(
    fs
      .readdirSync(tokenGroupsDir)
      .filter(
        (fileName) =>
          // we don't need dark or legacy tokens
          !fileName.startsWith('color.dark') &&
          !fileName.startsWith('legacy-tokens'),
      )
      .map((fileName) => {
        const tokenGroup = require(path.join(tokenGroupsDir, fileName));

        let tokenGroupName = path.basename(fileName, '.json');
        // rename the color.light tokens
        if (fileName.includes('.light')) {
          tokenGroupName = 'color';
        }
        const customPropertyCompletionItems = Object.keys(tokenGroup).map(
          (token) => {
            return {
              label: token,
              insertText: `var(--p-${token})`,
              value: tokenGroup[token],
            };
          },
        );
        return [tokenGroupName, customPropertyCompletionItems];
      }),
  );
};

module.exports = {
  getGroupedCustomPropertyCompletionItems,
  getCustomPropertyNames,
};
