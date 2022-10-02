const stylelint = require('stylelint');

const {isString, isRegExp, matchesStringOrRegExp} = require('../../utils');

const ruleName = 'stylelint-polaris/at-use-no-unused';

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @type {stylelint.RuleMessageFunc}
   */
  rejected: (atUseURLNamespace, atUseAsNamespace = '') =>
    `Unused @use [${atUseURLNamespace}]${
      atUseAsNamespace ? '' : ` with namespace [${atUseAsNamespace}]`
    }`,
});

/** @typedef {string} AtUseURL The full at-use URL*/

/** @typedef {string} AtUseURLNamespace The namespace extracted from the last component of the URL */

/** @typedef {string} AtUseAsNamespace The (optional) namespace defined by the at-use `as` keyword */

/** @typedef {AtUseURLNamespace | AtUseAsNamespace} AtUseNamespace The resolved at-use namespace to target in the stylesheet */

/**
 * @typedef {object} AtUseNamespaceResults
 * @property {boolean} used
 * @property {AtUseURL} atUseURL
 * @property {AtUseURLNamespace} atUseURLNamespace
 * @property {AtUseAsNamespace} [atUseAsNamespace]
 * @property {RegExp} atUseNamespaceIdentRegExp
 */

/**
 * @typedef {{
 *   [targetAtUseNamespace: AtUseNamespace]: AtUseNamespaceResults
 * }} TargetAtUseNamespaces
 */

/** @typedef {(string | RegExp)[]} AtUseURLPatterns */

/**
 * @typedef {Object} PrimaryOptions
 * @property {AtUseURLPatterns} atUseURLPatterns
 */

const {rule} = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primaryOptions */
  (primaryOptions) => {
    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: primaryOptions.atUseURLPatterns,
        possible: [isString, isRegExp],
      });

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`,
        );
      }

      /** @type {TargetAtUseNamespaces} */
      const targetAtUseNamespaces = {};

      root.walkAtRules('use', (atRule) => {
        // Replace duplicate spaces with a single character to simplify
        // the RegExps for extracting at-use URLs and namespaces
        const atUseParams = atRule.params.replace(/(\s|\n|\r\n?)+/g, ' ');

        // https://regex101.com/r/wptDNZ/1
        // Note: (.+?) can be further constrained e.g. valid url characters
        const atUseURL = atUseParams.match(/^["'](.+?)["']/)?.[1]?.trim();

        // https://regex101.com/r/KiMW0F/1
        // Note: (.+?) can be further constrained e.g. valid namespace characters
        const atUseAsNamespace = atUseParams
          .match(/\sas\s+(.+?)(\s|$)/)?.[1]
          ?.trim();

        if (
          !atUseURL ||
          !primaryOptions.atUseURLPatterns.some((atUseURLPattern) =>
            matchesStringOrRegExp(atUseURL, atUseURLPattern),
          )
        ) {
          return;
        }

        // Note: Could add Node's cross-platform path separator
        const atUseURLNamespace = atUseURL.split('/').at(-1);
        const atUseNamespace = atUseAsNamespace || atUseURLNamespace;

        targetAtUseNamespaces[atUseNamespace] = {
          used: false,
          atUseURL,
          atUseURLNamespace,
          atUseAsNamespace,
          atUseNamespaceIdentRegExp: getNamespaceIdentRegExp(atUseNamespace),
        };
      });

      root.walk((node) => {
        if (node.type === 'comment') return;

        if (node.type === 'rule') {
          const selector = node.selector;

          processText(selector);
          return;
        }

        if (node.type === 'atrule') {
          const atRuleName = node.name;
          const atRuleParams = node.params;

          processText(atRuleName);
          processText(atRuleParams);
          return;
        }

        if (node.type === 'decl') {
          const prop = node.prop;
          const value = node.value;

          processText(prop);
          processText(value);
        }
      });

      function processText(text) {
        Object.entries(targetAtUseNamespaces).forEach(
          ([atUseNamespace, {used, atUseNamespaceIdentRegExp}]) => {
            if (used || !atUseNamespaceIdentRegExp.test(text)) return;

            targetAtUseNamespaces[atUseNamespace].used = true;
          },
        );
      }

      Object.entries(targetAtUseNamespaces).forEach(
        ([, {used, atUseURLNamespace, atUseAsNamespace}]) => {
          if (used) return;

          stylelint.utils.report({
            ruleName,
            result,
            node: root,
            message: messages.rejected(atUseURLNamespace, atUseAsNamespace),
          });
        },
      );
    };
  },
);

module.exports = {
  rule,
  ruleName,
  messages,
};

/** Non-exhaustive CSS Ident RegExp allowing an optional `$` prefix to match Sass variables */
const customIdentRegExp = new RegExp(String.raw`\$?-?[a-zA-Z][\w-]*`);

/**
 * A collection of invalid characters preceding the namespaced ident.
 * These aim to prevent false positives e.g. substring matches,
 * selectors that look like namespaced idents, etc.
 */
const invalidNamespacePreviousChars = new RegExp(String.raw`(?<![-.#'"$\w\/])`);

function getNamespaceIdentRegExp(namespace) {
  // https://regex101.com/r/RYNHtB/1
  return new RegExp(
    String.raw`\b${invalidNamespacePreviousChars.source}${namespace}\.${customIdentRegExp.source}\b`,
  );
}
