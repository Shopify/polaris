const stylelint = require('stylelint');

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
    return (root, result) => {
      stylelint.utils.checkAgainstRule(
        {
          ruleName: 'declaration-property-value-disallowed-list',
          ruleSettings: primary,
          root,
        },
        (warning) => {
          // Ignore invalid options as they are already surfaced by Stylelint
          if (warning.stylelintType === 'invalidOption') return;

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
