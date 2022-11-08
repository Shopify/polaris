const stylelint = require('stylelint');
const postcss = require('postcss');

const {
  ruleName,
  getRules,
  validateOptions,
  normalizeRuleSettings,
} = require('../coverage');

const commentContext = 'generated comment during stylelint-polaris init';

/**
 * @typedef {{
 *   [category: string]: import('stylelint').ConfigRules
 * }} PrimaryOptions
 */

module.exports = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primaryOptions */
  (primaryOptions) => {
    return (root, result) => {
      if (!validateOptions(result, primaryOptions)) return;

      getRules(primaryOptions).forEach(
        ({categoryRuleName, categoryRuleSettings}) =>
          stylelint.utils.checkAgainstRule(
            {
              ruleName: categoryRuleName,
              ruleSettings: normalizeRuleSettings(categoryRuleSettings),
              root,
              result,
            },
            (warning) => insertIgnoreComment(warning),
          ),
      );
    };
  },
);

/**
 * @param {postcss.Warning} warning
 */
function insertIgnoreComment(warning) {
  const disableNextLine = 'stylelint-disable-next-line';
  const node = warning.node;
  const prevNodeText = node.prev()?.text;

  if (prevNodeText?.includes(`${disableNextLine} -- polaris`)) {
    return;
  }

  // If a nextline comment already exists above the warning node,
  // combine the rules into a single disable comment.
  let otherNextLineRules = '';

  if (prevNodeText?.includes(disableNextLine)) {
    const rule = prevNodeText.split(`${disableNextLine} `)?.[1];
    if (rule.length) {
      otherNextLineRules = `, ${rule}`;
    }
    node.prev().remove();
  }

  const comment = new postcss.Comment({
    text: `stylelint-disable-next-line -- polaris: ${commentContext}${otherNextLineRules}`,
    raws: {
      left: ' ',
      right: '',
      inline: true,
    },
  });

  // Ensure the disable comment and the warning node only have
  // one new line between them.
  const beforeWhitespace = node.raws.before.replaceAll('\n', '');
  node.raws.before = `\n${beforeWhitespace}`;

  node.before(comment);
}
