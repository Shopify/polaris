const stylelint = require('stylelint');

const {isPlainObject, isNumber} = require('../../utils');

const ruleName = 'stylelint-polaris/coverage';

/**
 * @typedef {{
 *   [category: string]: import('stylelint').ConfigRules
 * }} PrimaryOptions
 */

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
      for (const [categoryRuleName, categoryRuleSettings] of Object.entries(
        categoryConfigRules,
      )) {
        rules.push({
          coverageRuleName: `${ruleName}/${categoryName}`,
          categoryRuleName,
          categoryRuleSettings,
          categoryRuleSeverity: categoryRuleSettings?.[1]?.severity,
          categoryRuleFix:
            context.fix && !categoryRuleSettings?.[1]?.disableFix,
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
        } = rule;

        stylelint.utils.checkAgainstRule(
          {
            ruleName: categoryRuleName,
            ruleSettings: normalizeRuleSettings(categoryRuleSettings),
            fix: categoryRuleFix,
            root,
            result,
          },
          (warning) => {
            stylelint.utils.report({
              result,
              ruleName: coverageRuleName,
              message: warning.text,
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

      const disabledCoverageWarnings =
        result.stylelint.disabledWarnings?.filter((disabledWarning) =>
          disabledWarning.rule.startsWith(ruleName),
        );

      if (!disabledCoverageWarnings?.length) return;

      const disabledCoverageLines = Array.from(
        new Set(disabledCoverageWarnings.map(({line}) => line)),
      );

      // Ensure all stylelint-polaris/coverage disable comments
      // have a description prefixed with "polaris:"
      for (const disabledRange of result.stylelint.disabledRanges.all) {
        if (
          !isDisabledCoverageRule(disabledCoverageLines, disabledRange) ||
          disabledRange.description?.startsWith('polaris:')
        ) {
          continue;
        }

        const stylelintDisableText = disabledRange.comment.text
          .split('--')[0]
          .trim();

        stylelint.utils.report({
          message: `Expected /* ${stylelintDisableText} -- polaris: Reason for disabling */`,
          ruleName,
          result,
          node: disabledRange.comment,
          // Note: `stylelint-disable` comments (without next-line) appear to
          // be special cased in that they do not trigger warnings when reported.
          ...forceReport,
        });
      }
    };
  },
);

/**
 * @param {number[]} disabledCoverageLines
 * @param {import('stylelint').DisabledRange} disabledRange
 */
function isDisabledCoverageRule(disabledCoverageLines, disabledRange) {
  if (isUnclosedDisabledRange(disabledRange)) {
    return disabledCoverageLines.some(
      (disabledCoverageLine) => disabledCoverageLine >= disabledRange.start,
    );
  }

  return disabledCoverageLines.some(
    (coverageDisabledLine) =>
      coverageDisabledLine >= disabledRange.start &&
      coverageDisabledLine <= disabledRange.end,
  );
}

/**
 * Checks if the `disabledRange` is an unclosed `stylelint-disable` comment
 * e.g. The `stylelint-disable` comment is NOT followed by `stylelint-enable`
 * @param {import('stylelint').DisabledRange} disabledRange
 */
function isUnclosedDisabledRange(disabledRange) {
  if (
    !disabledRange.comment.text.startsWith('stylelint-disable-next-line') &&
    !isNumber(disabledRange.end)
  ) {
    return true;
  }

  return false;
}

function validatePrimaryOptions(primaryOptions) {
  if (!isPlainObject(primaryOptions)) return false;

  for (const categoryConfigRules of Object.values(primaryOptions)) {
    if (!isPlainObject(categoryConfigRules)) return false;
  }

  return true;
}

/**
 * @param {import('stylelint').ConfigRuleSettings} ruleSettings
 */
function normalizeRuleSettings(ruleSettings) {
  if (
    // Let `stylelint` normalize the rule settings
    !Array.isArray(ruleSettings) ||
    // Assume rule settings are already normalized
    Array.isArray(ruleSettings[0]) ||
    // Assume rule settings are already normalized
    isPlainObject(ruleSettings[1])
  ) {
    return ruleSettings;
  }

  return [ruleSettings];
}
