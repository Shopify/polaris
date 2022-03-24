const {
  ruleName: customPropertiesAllowedListRuleName,
} = require('../plugins/custom-properties-allowed-list');

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-background', '--p-text', etc...]
 */
const polarisCustomPropertyNames = require('../data/polaris-custom-property-names');

/**
 * Allowed custom property names in Polaris component styles.
 */
const polarisComponentCustomProperties = /--pc-.+/;

module.exports = {
  extends: ['@shopify/stylelint-plugin/prettier'],
  plugins: ['../plugins/custom-properties-allowed-list'],
  rules: {
    [customPropertiesAllowedListRuleName]: {
      allowedProperties: [
        '--polaris-version-number',
        polarisComponentCustomProperties,
      ],
      allowedValues: {
        '/.+/': [
          polarisComponentCustomProperties,
          ...polarisCustomPropertyNames,
        ],
      },
    },
  },
};
