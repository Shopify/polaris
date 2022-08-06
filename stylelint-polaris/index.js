import {getCustomPropertyNames, tokens} from '@shopify/polaris-tokens';

import {
  ruleName: customPropertiesAllowedListRuleName,
} from './plugins/custom-properties-allowed-list';
import {
  ruleName: mediaQueriesAllowedList,
} from './plugins/media-queries-allowed-list';

/**
 * Allowed Polaris token custom properties.
 *
 * @example ['--p-text', '--p-background']
 */
const polarisCustomPropertyNames = getCustomPropertyNames(tokens);

/**
 * User defined custom property names.
 *
 * Determined by allowing any custom property that is not prefixed with `--p-` or `--pc-`.
 */
const userDefinedCustomPropertyNames = /--(?!pc?-).+/;

/**
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['./configs/shared'],
  plugins: [
    './plugins/custom-properties-allowed-list',
    './plugins/media-queries-allowed-list',
  ],
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
