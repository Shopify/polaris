const {getCustomPropertyNames, tokens} = require('@shopify/polaris-tokens');

/**
 * Internal Stylelint config for @shopify/polaris
 */

const {
  ruleName: customPropertiesAllowedListRuleName,
} = require('../plugins/custom-properties-allowed-list');
const {
  ruleName: mediaQueriesAllowedList,
} = require('../plugins/media-queries-allowed-list');

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
  plugins: [
    '../plugins/custom-properties-allowed-list',
    '../plugins/media-queries-allowed-list',
  ],
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
    [mediaQueriesAllowedList]: {
      // Allowed media types and media conditions
      // https://www.w3.org/TR/mediaqueries-5/#media
      allowedMedia: [
        'print',
        'screen',
        '-ms-high-contrast',
        'forced-colors',
        '$p-breakpoints-xs-up',
        '$p-breakpoints-xs-down',
        '$p-breakpoints-xs-only',
        '$p-breakpoints-sm-up',
        '$p-breakpoints-sm-down',
        '$p-breakpoints-sm-only',
        '$p-breakpoints-md-up',
        '$p-breakpoints-md-down',
        '$p-breakpoints-md-only',
        '$p-breakpoints-lg-up',
        '$p-breakpoints-lg-up',
        '$p-breakpoints-lg-down',
        '$p-breakpoints-xl-down',
        '$p-breakpoints-xl-only',
        '$p-breakpoints-xl-only',
      ],
    },
  },
};
