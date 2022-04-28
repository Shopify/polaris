const {getCustomPropertyNames, tokens} = require('@shopify/polaris-tokens');

/**
 * Internal Stylelint config for @shopify/polaris
 */

const {
  ruleName: customPropertiesAllowedListRuleName,
} = require('../plugins/custom-properties-allowed-list');
/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-background', '--p-text', etc...]
 */
const polarisCustomPropertyNames = getCustomPropertyNames(tokens);

/**
 * Allowed custom property names in Polaris component styles.
 */
const polarisComponentCustomProperties = /--pc-.+/;

/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: ['./shared'],
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
