import {getCustomPropertyNames, tokens} from '@shopify/polaris-tokens';

/**
 * Internal Stylelint config for @shopify/polaris
 */

import {
  ruleName: customPropertiesAllowedListRuleName,
} from '../plugins/custom-properties-allowed-list';
import {
  ruleName: mediaQueriesAllowedList,
} from '../plugins/media-queries-allowed-list';

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
export default {
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
    [mediaQueriesAllowedList]: [
      {
        // Allowed media types and media conditions
        // https://www.w3.org/TR/mediaqueries-5/#media
        allowedMediaTypes: ['print', 'screen'],
        allowedMediaFeatureNames: ['forced-colors', '-ms-high-contrast'],
        allowedScssInterpolations: [
          // TODO: Add utility to @shopify/polaris-tokens to getMediaConditionNames
          /^\$p-breakpoints-(xs|sm|md|lg|xl)-(up|down|only)$/,
        ],
      },
      {severity: 'warning'},
    ],
  },
};
