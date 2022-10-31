const stylelint = require('stylelint');

const {isObject} = require('../../utils');

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
    const isPrimaryOptionsValid = validatePrimaryOptions(primaryOptions);

    const rules = !isPrimaryOptionsValid
      ? []
      : Object.entries(primaryOptions).flatMap(
          ([categoryName, categoryConfigRules]) =>
            Object.entries(categoryConfigRules).map(
              ([categoryRuleName, categoryRuleSettings]) => ({
                categoryRuleName,
                categoryRuleSettings,
                coverageRuleName: `${ruleName}/${categoryName}`,
              }),
            ),
        );

    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: isPrimaryOptionsValid,
      });

      if (!validOptions) return;

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

function validatePrimaryOptions(primaryOptions) {
  if (!isObject(primaryOptions)) return false;

  for (const categoryConfigRules of Object.values(primaryOptions)) {
    if (!isObject(categoryConfigRules)) return false;
  }

  return true;
}
