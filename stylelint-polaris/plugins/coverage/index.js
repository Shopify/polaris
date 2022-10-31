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
    if (typeof primaryOptions !== 'object' && primaryOptions !== null) return;

    const rules = [];

    for (const [categoryName, categoryConfigRules] of Object.entries(
      primaryOptions,
    )) {
      for (const [categoryRuleName, categoryRuleSettings] of Object.entries(
        categoryConfigRules,
      )) {
        rules.push({
          categoryRuleName,
          categoryRuleSettings,
          coverageRuleName: `${ruleName}/${categoryName}`,
        });
      }
    }

    return (root, result) => {
      for (const rule of rules) {
        const {categoryRuleName, categoryRuleSettings, coverageRuleName} = rule;

        stylelint.utils.checkAgainstRule(
          {
            ruleName: categoryRuleName,
            ruleSettings: categoryRuleSettings,
            root,
          },
          (warning) => {
            stylelint.utils.report({
              result,
              node: warning.node,
              ruleName: coverageRuleName,
              message: warning.text.replace(categoryRuleName, coverageRuleName),
            });
          },
        );
      }
    };
  },
);
