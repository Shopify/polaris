const {
  ruleName: customPropertiesAllowedListRuleName,
} = require('./plugins/custom-properties-allowed-list');
/**
 * Allowed Polaris token custom properties.
 *
 * @example ['--p-text', '--p-background']
 */
const polarisCustomPropertyNames = require('./tmp-tokens/polaris-custom-property-names');

/**
 * User defined custom property names.
 *
 * Determined by allowing any custom property that is not prefixed with `--p-` or `--pc-`.
 */
const userDefinedCustomPropertyNames = /--(?!pc?-).+/;

/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: ['./configs/shared'],
  plugins: ['./plugins/custom-properties-allowed-list'],
  rules: {
    /**
     * Custom property constraints:
     * - Allow any user defined custom properties
     * - Allow `--p-*` Polaris custom properties as values
     * - Disallow `--p-*` Polaris custom properties as property overrides
     * - Disallow `--pc-*` Polaris component custom properties as values and property overrides
     */
    [customPropertiesAllowedListRuleName]: [
      {
        allowedProperties: [userDefinedCustomPropertyNames],
        allowedValues: {
          '/.+/': [
            ...polarisCustomPropertyNames,
            userDefinedCustomPropertyNames,
          ],
        },
      },
      {severity: 'warning'},
    ],
  },
};
