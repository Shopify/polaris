const path = require('path');

const {tokenList} = require('./build/cjs/token-list');

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
        '/.+/': [polarisComponentCustomProperties, ...tokenList],
      },
    },
  },
};
