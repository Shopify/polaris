const stylelint = require('stylelint');

// const {isPlainObject} = require('../../utils');

const customMessages = require('./customMessages');

const coverageRuleName = 'stylelint-polaris/coverage';

/**
 * @typedef {{
 *    [category: string]: import('stylelint').ConfigRules | [
 *      import('stylelint').ConfigRules,
 *      {
 *        defaultMessage: import('stylelint').RuleMessage,
 *        meta: import('stylelint').RuleMeta
 *      }
 *    ]
 * }} CategorizedRules
 */

// Setting `line` to an invalid line number forces the warning to be reported and the `report({node})` option is used to display the location information: https://github.com/stylelint/stylelint/blob/57cbcd4eb0ee809006a1e3d2ccfe73af48744ad5/lib/utils/report.js#L49-L52
const forceReport = {line: -1};

module.exports = stylelint.createPlugin(
  coverageRuleName,
  /**
   * @param {CategorizedRules} categorizedRules - Configured Stylelint rules grouped by Polaris coverage category
   */
  (categorizedRules, _, context) => {
    // const isPrimaryOptionsValid = validatePrimaryOptions(categorizedRules);

    const rules = [];

    for (const [category, [primaryOptions, secondaryOptions]] of Object.entries(
      categorizedRules,
    )) {
      for (const [stylelintRuleName, ruleSettings] of Object.entries(
        primaryOptions,
      )) {
        rules.push({
          ruleName: `${coverageRuleName}/${category}`,
          stylelintRuleName,
          ruleSettings,
          customMessage: customMessages[category][stylelintRuleName] || {
            message: secondaryOptions.defaultMessage,
          },
          metadata: secondaryOptions.meta,
          severity: ruleSettings?.[1]?.severity,
          fix: context.fix && !ruleSettings?.[1]?.disableFix,
        });
      }
    }

    return (root, result) => {
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
            /* tl;dr: Instead of reporting all problems under a single "stylelint-polaris/coverage" rule, the coverage plugin reports problems by category (e.g., "stylelint-polaris/coverage/colors") and augments the Stylelint PostCSS `result` with category specific metadata and an actionable message before reporting.

            Through its Plugin API, Stylelint supports creating custom rules complete with user defined messages and metadata. However, the API does not lend itself to the specificity that we want to give our users when indicating coverage problems out of the box.

            Stylelint's VS Code extension renders either:
              1) the `messages` and `meta` values set on the built-in stylelint rules _or_
              2) the custom messages and metadata found on the `customMessages` and `ruleMetadata` properties of the Stylelint PostCSS `result`

            The `customMessages` and `ruleMetadata` properties of the Stylelint PostCSS `result` are derived from the optional `messages` and `meta` properties that can be set on a plugin's rule function. The coverage plugin reports several rules instead of one single rule, as each coverage category is reported as a rule (e.g., stylelint-polaris/coverage/colors). This means we need to set the custom message and metatdata URL directly onto the `customMessages` and `ruleMetadata` properties of the `result` using the rule name set on the problem reported, so that Stylelint's VS Code extension and CLI are able to link the reported coverage problem with a custom message and metadata URL

            **See the relevant lines of source code permalinked below for more context:

            Stylelint `StylelintPostCSSResult` type => https://github.com/stylelint/stylelint/blob/11b3c1e5b446f39c9d90b9da55bd2353fe6d3210/types/stylelint/index.d.ts#L98)

            Stylelint `report` utility => https://github.com/stylelint/stylelint/blob/2290f557cb028242d978b06465dc108aa04a0c3a/lib/utils/report.js#L113

            Stylelint VS Code `warningToDiagnostic` function => https://github.com/stylelint/vscode-stylelint/blob/5b3b4f6b04f2eacbf7cacc7694025dbe96abd128/src/utils/stylelint/warning-to-diagnostic.ts#L44 */

            const {message, args = ['value']} = customMessage;
            const messageArgs = args.map(
              (nodeProp) => warning?.node?.[nodeProp],
            );

            result.stylelint.customMessages[ruleName] = message(...messageArgs);
            result.stylelint.ruleMetadata[ruleName] = metadata;

            stylelint.utils.report({
              result,
              ruleName,
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

// function validatePrimaryOptions(primaryOptions) {
//   if (!isPlainObject(primaryOptions)) return false;

//   for (const [options] of Object.values(primaryOptions)) {
//     if (!isPlainObject(options)) return false;
//   }

//   return true;
// }
