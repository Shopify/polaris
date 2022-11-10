const stylelint = require('stylelint');

const {isPlainObject} = require('../../utils');

const coverageRuleName = 'polaris/coverage';
const customMessages = require('./customMessages');
const ruleMetadata = require('./ruleMetadata');

/**
 * @typedef {{
 *   [category: string]: import('stylelint').ConfigRules
 * }} PrimaryOptions
 */

// Setting `line` to an invalid line number forces the warning to be reported and the `report({node})` option is used to display the location information: https://github.com/stylelint/stylelint/blob/57cbcd4eb0ee809006a1e3d2ccfe73af48744ad5/lib/utils/report.js#L49-L52
const forceReport = {line: -1};

module.exports = stylelint.createPlugin(
  coverageRuleName,
  /** @param {PrimaryOptions} primaryOptions */
  (primaryOptions, secondaryOptions, context) => {
    const isPrimaryOptionsValid = validatePrimaryOptions(primaryOptions);

    const rules = [];

    for (const [categoryName, categoryConfigRules] of Object.entries(
      primaryOptions,
    )) {
      for (const [stylelintRuleName, ruleSettings] of Object.entries(
        categoryConfigRules,
      )) {
        rules.push({
          ruleName: `polaris/${coverageRuleName}/${categoryName}`,
          stylelintRuleName,
          ruleSettings,
          customMessage: customMessages[categoryName][stylelintRuleName],
          metadata: ruleMetadata[categoryName],
          severity: ruleSettings?.[1]?.severity,
          fix: context.fix && !ruleSettings?.[1]?.disableFix,
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

      for (const rule of rules) {
        const {
          ruleName,
          stylelintRuleName,
          ruleSettings,
          customMessage,
          metadata,
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
            const {message, args = ['value']} = customMessage;

            const messageArgs = args.map(
              (nodeProp) => warning?.node?.[nodeProp],
            );
            // Stylelint's VS Code extension only looks for custom messages and metadata on the `customMessages` and `ruleMetadata` properties of the stylelint postcss result, otherwise it uses the `messages` and `meta` values set on the built in stylelint rule functions.
            result.stylelint.customMessages[ruleName] = message(...messageArgs);
            result.stylelint.ruleMetadata[ruleName] = metadata;

            stylelint.utils.report({
              result,
              ruleName: coverageRuleName,
              message: warning.text.replace(` (${stylelintRuleName})`, ''),
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

function validatePrimaryOptions(primaryOptions) {
  if (!isPlainObject(primaryOptions)) return false;

  for (const categoryConfigRules of Object.values(primaryOptions)) {
    if (!isPlainObject(categoryConfigRules)) return false;
  }

  return true;
}
