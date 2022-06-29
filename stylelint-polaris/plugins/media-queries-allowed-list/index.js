const stylelint = require('stylelint');

const {isString} = require('../../utils');

const ruleName = 'stylelint-polaris/media-queries-allowed-list';

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @type {stylelint.RuleMessageFunc}
   */
  rejected: (invalidMedia) => `Invalid media query [${invalidMedia}].`,
});

/** @typedef {string[]} AllowedPatterns */

/**
 * @typedef {Object} PrimaryOptions
 * @property {AllowedPatterns} allowedMedia
 */

const {rule} = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primary */
  (primary) => {
    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: primary.allowedMedia,
        possible: isAllowedPatterns,
      });

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`,
        );
      }

      const {allowedMedia} = primary;

      root.walkAtRules('media', (atRule) => {
        const mediaCondition = atRule.params;

        const validMediaCondition = isValidMediaCondition(
          allowedMedia,
          mediaCondition,
        );

        if (validMediaCondition) return;

        stylelint.utils.report({
          message: messages.rejected(mediaCondition),
          node: atRule,
          result,
          ruleName,
        });
      });
    };
  },
);

/**
 * @param {NonNullable<PrimaryOptions['allowedMedia']>} allowedMedia
 * @param {string} mediaCondition
 */
function isValidMediaCondition(allowedMedia, mediaCondition) {
  if (
    hasWidthOrHeightInCondition(mediaCondition) ||
    !allowedMedia.some((media) => mediaCondition.includes(media))
  ) {
    return false;
  }

  return true;
}

// TODO: Update regex to match new media query range syntax:
// https://drafts.csswg.org/mediaqueries/#mq-range-context
function hasWidthOrHeightInCondition(mediaCondition) {
  // https://regex101.com/r/ka200N/1
  return /\(\s*(?:min-|max-)?(?:width|height)/.test(mediaCondition);
}

/**
 * Validates the input is an array of String or RegExp.
 * @param {unknown} allowedPatterns
 * @returns {allowedPatterns is AllowedPatterns}
 */
function isAllowedPatterns(allowedPatterns) {
  if (!Array.isArray(allowedPatterns)) return false;

  for (const pattern of allowedPatterns) {
    if (!isString(pattern)) return false;
  }

  return true;
}

module.exports = {
  rule,
  ruleName,
  messages,
};
