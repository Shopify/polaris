const stylelint = require('stylelint');

const {isPlainObject} = require('../../utils');

const coverageRuleName = 'polaris/coverage';

/**
 * @typedef {import('stylelint').ConfigRules} StylelintConfigRules
 * @property {string} message - Message appended to the warning in place of the default category message
 */

/**
 * @typedef {object} CategorySettings
 * @property {import('stylelint').RuleMessage} [message] - Message appended to the warning if no custom message is set on a rule's secondary options
 * @property {(stylelintRuleName: string) => import('stylelint').RuleMeta} [meta] - Category documentation URL hyperlinked to the reported rule in the VS Code diagnostic
 */

/**
 * @typedef {{
 *   [category: string]: StylelintConfigRules | [
 *     StylelintConfigRules, CategorySettings
 *   ]
 * }} PrimaryOptions - Configured Stylelint rules grouped by Polaris coverage category
 */

/**
 * @typedef {object} CoverageRule
 * @property { string } ruleName - The dynamic coverage rule name
 * @property { string } stylelintRuleName - The Stylelint rule name
 * @property { import('stylelint').ConfigRuleSettings } ruleSettings - The Stylelint rule settings
 * @property { import('stylelint').RuleSeverity } [severity] - The severity of the rule
 * @property { boolean } fix - Whether the rule should be autofixed
 * @property { string } [appendedMessage] - Message appended to the warning text
 * @property { (stylelintRuleName: string) => import('stylelint').RuleMeta } [meta] - Category documentation URL hyperlinked to the reported rule in the VS Code diagnostic
 */

// Setting `line` to an invalid line number forces the warning to be reported
// and the `report({node})` option is used to display the location information:
// https://github.com/stylelint/stylelint/blob/57cbcd4eb0ee809006a1e3d2ccfe73af48744ad5/lib/utils/report.js#L49-L52
const forceReport = {line: -1};

module.exports = stylelint.createPlugin(
  coverageRuleName,
  /**
   * @param {PrimaryOptions} categorizedRules
   * @param {import('stylelint').RuleContext} context
   */
  (categorizedRules, _, context) => {
    const isPrimaryOptionsValid = validatePrimaryOptions(categorizedRules);

    /** @type {CoverageRule[]} */
    const coverageRules = [];

    for (const [category, categoryConfig] of Object.entries(categorizedRules)) {
      const [stylelintRules, categorySettings] =
        normalizeConfig(categoryConfig);

      for (const [stylelintRuleName, stylelintRuleSettings] of Object.entries(
        stylelintRules,
      )) {
        coverageRules.push({
          ruleName: `polaris/${category}/${stylelintRuleName}`,
          stylelintRuleName,
          ruleSettings: stylelintRuleSettings,
          severity: stylelintRuleSettings?.[1]?.severity,
          fix: context.fix && !stylelintRuleSettings?.[1]?.disableFix,
          appendedMessage:
            stylelintRuleSettings?.[1]?.message || categorySettings?.message,
          meta: getMeta(category, stylelintRuleName),
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
          fix,
          meta,
          appendedMessage = '',
          severity = result.stylelint.config?.defaultSeverity,
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
            const warningText = warning.text.replace(
              ` (${stylelintRuleName})`,
              '',
            );

            // We insert the meta for the rules on the stylelint result, because the rules are reported with dynamic rule names instead of each category being its own plugin. See Stylelint issue for context: https://github.com/stylelint/stylelint/issues/6513
            result.stylelint.ruleMetadata[ruleName] = meta;

            const message = appendedMessage
              ? `${warningText} - ${appendedMessage}`
              : warningText;

            stylelint.utils.report({
              result,
              ruleName,
              message,
              severity: severity || 'error',
              // If `warning.node` is NOT present, the warning is referring to a misconfigured rule
              ...(warning.node ? {node: warning.node} : forceReport),
            });
          },
        );
      }
    };
  },
);

/**
 * @param {string} category
 * @param {string} stylelintRuleName
 * @returns {import('stylelint').RuleMeta}
 */
function getMeta(category, stylelintRuleName) {
  const baseMetaUrl =
    'https://polaris.shopify.com/tools/stylelint-polaris/rules';

  return {
    url: `${baseMetaUrl}/${category}-${stylelintRuleName.replace('/', '-')}`,
  };
}

/**
 * @param {PrimaryOptions} categoryConfigRules
 * @returns {[StylelintConfigRules, CategorySettings]}
 */
function normalizeConfig(categoryConfigRules) {
  return Array.isArray(categoryConfigRules)
    ? categoryConfigRules
    : [categoryConfigRules, {}];
}

function validatePrimaryOptions(categorizedRules) {
  if (!isPlainObject(categorizedRules)) return false;

  for (const categoryConfig of Object.values(categorizedRules)) {
    if (
      !(
        isPlainObject(categoryConfig) ||
        (Array.isArray(categoryConfig) &&
          categoryConfig.length === 2 &&
          categoryConfig.every(isPlainObject))
      )
    ) {
      return false;
    }
  }

  return true;
}
