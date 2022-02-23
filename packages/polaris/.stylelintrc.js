const fs = require('fs');
const path = require('path');

const tokenGroupsDir = path.join(__dirname, './src/tokens/token-groups');

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

/**
 * Allowed custom property names in Polaris component styles.
 */
const polarisComponentCustomProperties = /--pc-.+/;

module.exports = {
  extends: ['@shopify/stylelint-plugin/prettier'],
  plugins: [
    path.join(__dirname, './stylelint/plugins/custom-properties-allowed-list'),
  ],
  rules: {
    '@shopify/custom-properties-allowed-list': {
      allowedProperties: [
        '--polaris-version-number',
        polarisComponentCustomProperties,
      ],
      allowedValues: {
        '/.+/': [
          polarisComponentCustomProperties,
          ...polarisTokenCustomProperties,
        ],
      },
    },
  },
};
