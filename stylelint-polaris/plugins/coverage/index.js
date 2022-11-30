const stylelint = require('stylelint');

const {isPlainObject} = require('../../utils');

const ruleName = 'stylelint-polaris/coverage';

/**
 * @typedef {object} CategorySecondaryOptions
 * @property {string} [message] - Message appended to each error in a given category
 */

/** @typedef {stylelint.ConfigRules | [stylelint.ConfigRules, CategorySecondaryOptions?]} CategoryConfigRules */

/** @typedef {{[category: string]: CategoryConfigRules}} PrimaryOptions */

// Setting `line` to an invalid line number forces the warning to be reported
// and the `report({node})` option is used to display the location information:
// https://github.com/stylelint/stylelint/blob/57cbcd4eb0ee809006a1e3d2ccfe73af48744ad5/lib/utils/report.js#L49-L52
const forceReport = {line: -1};

module.exports = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primaryOptions */
  (primaryOptions, secondaryOptions, context) => {
    const isPrimaryOptionsValid = validatePrimaryOptions(primaryOptions);

    const rules = [];

    for (const [categoryName, categoryConfigRules] of Object.entries(
      primaryOptions,
    )) {
      const normalizedCategoryConfigRules = Array.isArray(categoryConfigRules)
        ? /** @type {CategoryConfigRules} */ (categoryConfigRules)
        : [categoryConfigRules, {}];

      for (const [categoryRuleName, categoryRuleSettings] of Object.entries(
        normalizedCategoryConfigRules[0],
      )) {
        rules.push({
          coverageRuleName: `${ruleName}/${categoryName}`,
          categoryRuleName,
          categoryRuleSettings,
          categoryRuleSeverity: categoryRuleSettings?.[1]?.severity,
          categoryRuleFix:
            context.fix && !categoryRuleSettings?.[1]?.disableFix,
          categoryMessage:
            !categoryRuleSettings?.[1]?.message &&
            categoryConfigRules[1]?.message,
        });
      }
    }

    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: isPrimaryOptionsValid,
      });

      if (!validOptions) return;

      for (const rule of rules) {
        const {
          coverageRuleName,
          categoryRuleName,
          categoryRuleSettings,
          categoryRuleSeverity,
          categoryRuleFix,
          categoryMessage,
        } = rule;

        stylelint.utils.checkAgainstRule(
          {
            ruleName: categoryRuleName,
            ruleSettings: categoryRuleSettings,
            fix: categoryRuleFix,
            root,
            result,
          },
          (warning) => {
            stylelint.utils.report({
              result,
              ruleName: coverageRuleName,
              message: categoryMessage
                ? `${warning.text} ${categoryMessage}`
                : warning.text,
              severity:
                categoryRuleSeverity ??
                result.stylelint.config?.defaultSeverity ??
                'error',
              // If `warning.node` is NOT present, the warning is
              // referring to a misconfigured rule
              ...(warning.node ? {node: warning.node} : forceReport),
            });
          },
        );
      }
    };
  },
);

function validatePrimaryOptions(primaryOptions) {
  if (!isPlainObject(primaryOptions)) return false;

  for (const categoryConfigRules of Object.values(primaryOptions)) {
    if (
      !(
        isPlainObject(categoryConfigRules) ||
        (Array.isArray(categoryConfigRules) &&
          categoryConfigRules.length === 2 &&
          categoryConfigRules.every(isPlainObject))
      )
    ) {
      return false;
    }
  }

  return true;
}
