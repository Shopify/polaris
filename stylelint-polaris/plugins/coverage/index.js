const stylelint = require('stylelint');

const {isPlainObject} = require('../../utils');

const coverageRuleName = 'stylelint-polaris/coverage';

/* The stylelint-polaris/coverage rule is configured by categorizing Stylelint rules in order to enable reporting of problems by coverage category

(e.g., Unexpected named color "blue" (color-named) Stylelint(stylelint-polaris/coverage/colors") */

/**
 * @typedef {import('stylelint').ConfigRules} StylelintRules
 */

/**
 * @typedef {object} CategorySettings
 * @property {string} [message] - Category message appended to the warning
 * @property {import('stylelint').RuleMeta} [meta] - Category documentation URL hyperlinked to the reported rule in the VS Code diagnostic
 */

/**
 * @typedef {{
 *   [category: string]: StylelintRuleConfig | [
 *     StylelintRuleConfig, CategorySettings
 *   ]
 * }} CategorizedRules
 */

module.exports = stylelint.createPlugin(
  coverageRuleName,
  /**
   * @param {CategorizedRules} categorizedRules - Configured Stylelint rules grouped by Polaris coverage category
   */
  (categorizedRules) => {
    const isPrimaryOptionsValid = validatePrimaryOptions(categorizedRules);

    const coverageRules = [];

    for (const [category, categoryConfig] of Object.entries(categorizedRules)) {
      const [stylelintRules, categorySettings] =
        normalizeConfig(categoryConfig);
      for (const [stylelintRuleName, ruleSettings] of Object.entries(
        stylelintRules,
      )) {
        coverageRules.push({
          ruleName: `${coverageRuleName}/${category}`,
          stylelintRuleName,
          ruleSettings,
          message: ruleSettings?.[1]?.message || categorySettings?.message,
          metadata: categorySettings?.meta,
          severity: ruleSettings?.[1]?.severity,
          fix: !ruleSettings?.[1]?.disableFix,
        });
      }
    }

    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(
        result,
        coverageRuleName,
        {
          actual: isPrimaryOptionsValid,
        },
      );

      if (!validOptions) return;

      for (const rule of coverageRules) {
        const {
          ruleName,
          stylelintRuleName,
          ruleSettings,
          message,
          ruleMetadata,
          severity,
          fix,
        } = rule;

        stylelint.utils.checkAgainstRule(
          {
            ruleName: stylelintRuleName,
            ruleSettings,
            fix,
            root,
            result,
          },
          (warning) => {
            // Setting `line` to an invalid line number forces the warning to be reported and the `report({node})` option is used to display the location information: https://github.com/stylelint/stylelint/blob/57cbcd4eb0ee809006a1e3d2ccfe73af48744ad5/lib/utils/report.js#L49-L52
            const forceReport = {line: -1};

            result.stylelint.ruleMetadata[ruleName] = ruleMetadata;

            stylelint.utils.report({
              result,
              ruleName,
              message: `${warning.text} ${message ? ` - ${message}` : ''}`,
              severity:
                severity ?? result.stylelint.config?.defaultSeverity ?? 'error',
              // If `warning.node` is NOT present, the warning is referring to a misconfigured rule
              ...(warning.node ? {node: warning.node} : forceReport),
            });
          },
        );
      }
    };
  },
);

function normalizeConfig(config) {
  return Array.isArray(config) ? config : [config, {}];
}

function validatePrimaryOptions(primaryOptions) {
  if (!isPlainObject(primaryOptions)) return false;

  for (const categoryConfigRules of Object.values(primaryOptions)) {
    if (!isPlainObject(categoryConfigRules)) return false;
  }

  return true;
}
