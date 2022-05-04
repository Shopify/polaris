const stylelint = require('stylelint');

const {isRegExp, isString, matchesStringOrRegExp} = require('../../utils');

const ruleName = 'stylelint-polaris/global-disallowed-list';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (value) => `Unexpected disallowed value "${value}"`,
});

const {rule} = stylelint.createPlugin(
  ruleName,
  /** @param {(string | RegExp)[]} primary */
  (primary) => {
    return (postcssRoot, postcssResult) => {
      const validOptions = stylelint.utils.validateOptions(
        postcssResult,
        ruleName,
        {
          actual: primary,
          possible: [isRegExp, isString],
        },
      );

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`,
        );
      }

      postcssRoot.walkDecls((decl) => {
        const found = primary.filter((test) => {
          return matchesStringOrRegExp(decl.value, test);
        });

        if (!found || !found.length) {
          return;
        }

        found.forEach((test) => {
          const invalidValue = isString(test)
            ? test
            : /** @type {string} */ (decl.value.match(test)?.[0]);

          stylelint.utils.report({
            ruleName,
            result: postcssResult,
            message: messages.rejected(invalidValue),
            node: decl,
            word: invalidValue,
          });
        });
      });
    };
  },
);

rule.primaryOptionArray = true;

module.exports = {
  rule,
  ruleName,
  messages,
};
