const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const {
  vendorUnprefixed,
  matchesStringOrRegExp,
  isCustomProperty,
  isRegExp,
  isString,
} = require('../../utils');

const ruleName = 'polaris/custom-property-disallowed-list';

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @type {stylelint.RuleMessageFunc}
   */
  rejected: (prop, value, isInvalidProp, invalidValues) => {
    const invalidPropertyMessage = isInvalidProp
      ? `Unexpected custom property definition "${prop}"`
      : null;

    const plural = (invalidValues?.length ?? 0) > 1;

    const invalidValueMessage = invalidValues
      ? `Unexpected value${plural ? 's' : ''} ${invalidValues
          .map((token) => `"${token}"`)
          .join(', ')} for property "${prop}"`
      : null;

    const message = [invalidPropertyMessage, invalidValueMessage]
      .filter(Boolean)
      .join('. ');

    return message;
  },
});

/** @typedef {(string | RegExp)[]} DisallowedPatterns */

/**
 * @typedef {Object} PrimaryOptions
 * @property {DisallowedPatterns} [disallowedProperties]
 * @property {{[property: string]: DisallowedPatterns}} [disallowedValues]
 */

const {rule} = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primary */
  (primary) => {
    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(
        result,
        ruleName,
        {
          actual: primary.disallowedProperties,
          possible: isDisallowedPatterns,
          optional: true,
        },
        {
          actual: primary.disallowedValues,
          possible: validateDisallowedValuesOption,
          optional: true,
        },
      );

      if (!validOptions) {
        return;
      }

      const {disallowedProperties = [], disallowedValues = {}} = primary;

      root.walkDecls((decl) => {
        const prop = decl.prop;
        const value = decl.value;

        const isInvalidProperty = isInvalidCustomProperty(
          disallowedProperties,
          prop,
        );

        const invalidValues = getInvalidCustomPropertyValues(
          disallowedValues,
          prop,
          value,
        );

        if (isInvalidProperty || invalidValues) {
          stylelint.utils.report({
            message: messages.rejected(
              prop,
              value,
              isInvalidProperty,
              invalidValues,
            ),
            node: decl,
            result,
            ruleName,
          });
        }
      });
    };
  },
);

/**
 * @param {NonNullable<PrimaryOptions['disallowedProperties']>} disallowedProperties
 * @param {string} property
 */
function isInvalidCustomProperty(disallowedProperties, property) {
  if (!isCustomProperty(property)) return false;

  const isInvalid = disallowedProperties.some((disallowedProperty) => {
    return matchesStringOrRegExp(property, disallowedProperty);
  });

  return isInvalid;
}

/**
 * @param {NonNullable<PrimaryOptions['disallowedValues']>} disallowedValues
 * @param {string} prop
 * @param {string} value
 * @returns {string[] | undefined}
 */
function getInvalidCustomPropertyValues(disallowedValues, prop, value) {
  const invalidValues = [];

  const unprefixedProp = vendorUnprefixed(prop);

  /** Property key for the disallowed values option */
  const propKey = Object.keys(disallowedValues).find((propIdentifier) =>
    matchesStringOrRegExp(unprefixedProp, propIdentifier),
  );

  if (!propKey) return;

  const disallowedPatterns = disallowedValues[propKey];

  if (!disallowedPatterns.length) return;

  valueParser(value).walk((node) => {
    if (
      node.type === 'word' &&
      isCustomProperty(node.value) &&
      matchesStringOrRegExp(node.value, disallowedPatterns)
    ) {
      invalidValues.push(node.value);
    }
  });

  if (invalidValues.length > 0) return invalidValues;
}

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
 * @param {unknown} option - `primary.disallowedValues` option.
 */
function validateDisallowedValuesOption(option) {
  if (typeof option !== 'object' || option === null) return false;

  for (const [property, disallowedPatterns] of Object.entries(option)) {
    if (!(isString(property) && isDisallowedPatterns(disallowedPatterns))) {
      return false;
    }
  }

  return true;
}
