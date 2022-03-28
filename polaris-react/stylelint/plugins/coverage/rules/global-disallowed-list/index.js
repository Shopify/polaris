const {ruleMessages, validateOptions, report} = require('stylelint').utils;

const {isRegExp, isString, namespace} = require('../../utils');

const ruleName = namespace('global-disallowed-list');

const messages = ruleMessages(ruleName, {
  rejected: (value) => `Unexpected disallowed value "${value}"`,
});

const rule = (primary) => {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: primary,
      possible: [isRegExp, isString],
    });

    if (!validOptions) {
      throw new Error(
        `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`,
      );
    }

    postcssRoot.walkDecls((decl) => {
      const found = primary.filter((test) => {
        return testStringOrRegEx(test, decl.value);
      });

      if (!found || !found.length) {
        return;
      }

      found.forEach((test) => {
        const invalidValue = isString(test) ? test : decl.value.match(test)[0];

        report({
          ruleName,
          result: postcssResult,
          message: messages.rejected(invalidValue),
          node: decl,
          word: invalidValue,
        });
      });
    });
  };
};

function testStringOrRegEx(stringOrRegEx, value) {
  if (isString(stringOrRegEx)) {
    return value.includes(stringOrRegEx);
  }

  return stringOrRegEx.test(value);
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
