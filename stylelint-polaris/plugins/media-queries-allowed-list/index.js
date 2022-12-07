const stylelint = require('stylelint');
const mediaParser = require('postcss-media-query-parser').default;

const {
  hasScssInterpolation,
  scssInterpolationRegExp,
  scssInterpolationExpression,
  isString,
  isRegExp,
  matchesStringOrRegExp,
} = require('../../utils');

const ruleName = 'polaris/media-queries-allowed-list';

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @type {stylelint.RuleMessageFunc}
   */
  rejected: (invalidMedia) => `Unexpected media query "${invalidMedia}"`,
});

/** @typedef {(string | RegExp)[]} AllowedPatterns */

/**
 * @typedef {Object} PrimaryOptions
 * @property {AllowedPatterns} allowedMediaTypes
 * @property {AllowedPatterns} allowedMediaFeatureNames
 * @property {AllowedPatterns} allowedScssInterpolations
 */

const {rule} = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primary */
  (primary) => {
    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(
        result,
        ruleName,
        {
          actual: primary.allowedMediaTypes,
          possible: [isString, isRegExp],
          optional: true,
        },
        {
          actual: primary.allowedMediaFeatureNames,
          possible: [isString, isRegExp],
          optional: true,
        },
        {
          actual: primary.allowedScssInterpolations,
          possible: [isString, isRegExp],
          optional: true,
        },
      );

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`,
        );
      }

      const {
        allowedMediaTypes = [],
        allowedMediaFeatureNames = [],
        allowedScssInterpolations = [],
      } = primary;

      // Pass `primary.allowedMediaFeatureNames` to the
      // built-in `media-feature-name-allowed-list` rule
      stylelint.utils.checkAgainstRule(
        {
          ruleName: 'media-feature-name-allowed-list',
          ruleSettings: allowedMediaFeatureNames,
          root,
        },
        (warning) => {
          if (
            // The built-in `media-feature-name-allowed-list` rule
            // doesn't handle this case:
            allowedMediaFeatureNames.includes('-ms-high-contrast') &&
            warning.text.includes('-ms-high-contrast')
          ) {
            return;
          }

          stylelint.utils.report({
            message: messages.rejected(warning.node.params),
            ruleName,
            result,
            node: warning.node,
            line: warning.line,
            column: warning.column,
            endLine: warning.endLine,
            endColumn: warning.endColumn,
          });
        },
      );

      root.walkAtRules('media', (atRule) => {
        const media = atRule.params;

        if (hasScssInterpolation(media)) {
          const scssInterpolations = [
            ...media.matchAll(new RegExp(scssInterpolationRegExp, 'g')),
          ].map((match) => match[0]);

          for (const scssInterpolation of scssInterpolations) {
            const expression = scssInterpolationExpression(scssInterpolation);

            if (matchesStringOrRegExp(expression, allowedScssInterpolations)) {
              return;
            }

            stylelint.utils.report({
              message: messages.rejected(media),
              node: atRule,
              result,
              ruleName,
            });
          }
        }

        mediaParser(media).walk('media-type', (node) => {
          const mediaType = node.value;

          if (
            // Ignore SCSS interpolated media-types as they are handled
            // in the above scssInterpolationRegExp check
            hasScssInterpolation(mediaType) ||
            matchesStringOrRegExp(mediaType, allowedMediaTypes)
          ) {
            return;
          }

          stylelint.utils.report({
            message: messages.rejected(media),
            node: atRule,
            result,
            ruleName,
          });
        });
      });
    };
  },
);

module.exports = {
  rule,
  ruleName,
  messages,
};
