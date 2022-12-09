const stylelint = require('stylelint');

const {matchesStringOrRegExp, isRegExp, isString} = require('../../utils');

const ruleName = 'polaris/at-rule-disallowed-list';

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @type {stylelint.RuleMessageFunc}
   */
  rejected: (atRuleName, atRuleId) => {
    return `Unexpected @${atRuleName} rule${atRuleId ? ` "${atRuleId}"` : ''}`;
  },
});

/** @typedef {(string | RegExp)[]} DisallowedPatterns */

/**
 * @typedef {{[atRuleName: string]: DisallowedPatterns}} PrimaryOptions
 */

const {rule} = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primary */
  (primary) => {
    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: primary,
        possible: validateAllowedValuesOption,
      });

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`,
        );
      }

      root.walkAtRules((atRule) => {
        const atRuleName = atRule.name;
        const disallowedPatterns = primary[atRuleName];

        if (!disallowedPatterns) return;

        const atRuleId = atRule.params;

        const found = disallowedPatterns.filter((test) => {
          return matchesStringOrRegExp(atRuleId, test);
        });

        if (!found || !found.length) return;

        found.forEach(() => {
          stylelint.utils.report({
            ruleName,
            result,
            node: atRule,
            message: messages.rejected(atRuleName, atRuleId),
          });
        });
      });
    };
  },
);

module.exports = {
  rule,
  ruleName,
  messages,
};

/**
 * Validates the input is an array of String or RegExp.
 * @param {unknown} disallowedPatterns
 * @returns {disallowedPatterns is DisallowedPatterns}
 */
function isDisallowedPatterns(disallowedPatterns) {
  if (!Array.isArray(disallowedPatterns)) return false;

  for (const pattern of disallowedPatterns) {
    if (!(isString(pattern) || isRegExp(pattern))) return false;
  }

  return true;
}

/**
 * @param {unknown} option - `primary` option.
 */
function validateAllowedValuesOption(option) {
  if (typeof option !== 'object' || option === null) return false;

  for (const [atRuleName, disallowedPatterns] of Object.entries(option)) {
    if (!(isString(atRuleName) && isDisallowedPatterns(disallowedPatterns))) {
      return false;
    }
  }

  return true;
}
