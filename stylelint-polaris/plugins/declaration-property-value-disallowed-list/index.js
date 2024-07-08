const stylelint = require('stylelint');

const {
  isRegExp,
  isString,
  validateObjectWithArrayProps,
} = require('../../utils');

const ruleName = 'polaris/declaration-property-value-disallowed-list';

/**
 * @typedef {{
 *   [property: string]: string | RegExp | (string | RegExp)[]
 * }} PrimaryOptions
 */

/**
 * Wrapper for the Stylelint `declaration-property-value-disallowed-list` rule
 * that ignores failures in `@font-face` at-rules.
 */
const {rule} = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primary */
  (primary) => {
    return async (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: primary,
        possible: [validateObjectWithArrayProps(isString, isRegExp)],
      });

      if (!validOptions) return;

      await stylelint.utils.checkAgainstRule(
        {
          ruleName: 'declaration-property-value-disallowed-list',
          ruleSettings: primary,
          root,
        },
        (warning) => {
          if (
            warning.node.type === 'decl' &&
            warning.node.parent.type === 'atrule' &&
            warning.node.parent.name === 'font-face'
          ) {
            return;
          }

          stylelint.utils.report({
            ruleName,
            result,
            node: warning.node,
            message: warning.text,
          });
        },
      );
    };
  },
);

module.exports = {
  rule,
  ruleName,
};
