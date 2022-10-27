const stylelint = require('stylelint');

const ruleName = 'stylelint-polaris/coverage';

/**
 * @typedef {{
 *   [category: string]: import('stylelint').ConfigRules
 * }} PrimaryOptions
 */

module.exports = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primaryOptions */
  (primaryOptions) => {
    return (root, result) => {
      if (typeof primaryOptions !== 'object' && primaryOptions !== null) return;

      for (const [categoryName, categoryConfigRules] of Object.entries(
        primaryOptions,
      )) {
        for (const [categoryRuleName, categoryRuleSettings] of Object.entries(
          categoryConfigRules,
        )) {
          stylelint.utils.checkAgainstRule(
            {
              ruleName: categoryRuleName,
              ruleSettings: categoryRuleSettings,
              root,
            },
            (warning) => {
              const coverageRuleName = `${ruleName}/${categoryName}`;
              const coverageMessage = warning.text.replace(
                categoryRuleName,
                coverageRuleName,
              );

              stylelint.utils.report({
                message: coverageMessage,
                ruleName: coverageRuleName,
                result,
                node: warning.node,
                line: warning.line,
                column: warning.column,
                endLine: warning.endLine,
                endColumn: warning.endColumn,
              });
            },
          );
        }
      }
    };
  },
);
