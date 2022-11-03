const stylelint = require('stylelint');

const {isObject, isNumber} = require('../../utils');

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
          // Setting `line` to an invalid line number forces the warning to be
          // reported and the above comment `node` is used to display the
          // location information:
          // https://github.com/stylelint/stylelint/blob/57cbcd4eb0ee809006a1e3d2ccfe73af48744ad5/lib/utils/report.js#L49-L52
          line: -1,
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
 * Check if the disabled range includes both stylelint-disable and stylelint-enable comments
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
  if (!isObject(primaryOptions)) return false;

  for (const categoryConfigRules of Object.values(primaryOptions)) {
    if (!isObject(categoryConfigRules)) return false;
  }

  return true;
}
