const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const {
  vendorUnprefixed,
  matchesStringOrRegExp,
  isCustomProperty,
  isRegExp,
  isString,
} = require('../../utils');

const ruleName = 'polaris/custom-property-allowed-list';

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @type {stylelint.RuleMessageFunc}
   */
  rejected: (prop, value, prefix, isInvalidProp, invalidValues) => {
    const invalidDefinition = isInvalidProp
      ? `Unexpected prefix "${prefix}" for defined custom property "${prop}"`
      : null;

    const invalidUse =
      invalidValues?.length > 0
        ? `Unexpected value${
            invalidValues.length > 1 ? 's' : ''
          } "${value}" for property "${prop}"`
        : null;

    return [invalidDefinition, invalidUse].filter(Boolean).join(' ');
  },
});

/** @typedef {(string | RegExp)[]} AllowedPatterns */

/**
 * @typedef {Object} PrimaryOptions
 * @property {AllowedPatterns} [allowedProperties]
 * @property {{[property: string]: AllowedPatterns}} [allowedValues]
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
          actual: primary.allowedProperties,
          possible: isAllowedPatterns,
          optional: true,
        },
        {
          actual: primary.allowedValues,
          possible: validateAllowedValuesOption,
          optional: true,
        },
      );

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`,
        );
      }

      const {allowedProperties = [], allowedValues = {}} = primary;

      root.walkDecls((decl) => {
        const prop = decl.prop;
        const value = decl.value;

        const invalidProperty = !isAllowedCustomPropertyName(
          allowedProperties,
          prop,
        );

        const invalidValues = isValidCustomPropertyValue(
          allowedValues,
          prop,
          value,
        );

        if (!invalidProperty && invalidValues.length === 0) return;

        if (invalidProperty) {
          stylelint.utils.report({
            message: messages.rejected(
              prop,
              value,
              prop.split('-')[0],
              invalidProperty,
            ),
            node: decl,
            result,
            ruleName,
          });
        }

        if (invalidValues.length > 0) {
          stylelint.utils.report({
            message: messages.rejected(
              prop,
              value,
              undefined,
              undefined,
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
 * @param {NonNullable<PrimaryOptions['allowedProperties']>} allowedProperties
 * @param {string} prop
 */
function isAllowedCustomPropertyName(allowedProperties, prop) {
  if (!isCustomProperty(prop)) return;

  const isValidName = allowedProperties.some((allowedProperty) => {
    return matchesStringOrRegExp(prop, allowedProperty);
  });

  if (isValidName) true;

  return false;
}

/**
 * @param {NonNullable<PrimaryOptions['allowedValues']>} allowedValues
 * @param {string} prop
 * @param {string} value
 * @returns {string[]}
 */
function isValidCustomPropertyValue(allowedValues, prop, value) {
  const invalidValues = [];

  const unprefixedProp = vendorUnprefixed(prop);

  /** Property key for the allowed values option */
  const propKey = Object.keys(allowedValues).find((propIdentifier) =>
    matchesStringOrRegExp(unprefixedProp, propIdentifier),
  );

  if (!propKey) return;

  const allowedPatterns = allowedValues[propKey];

  if (!allowedPatterns.length) return;

  valueParser(value).walk((node) => {
    if (
      node.type === 'word' &&
      isCustomProperty(node.value) &&
      !matchesStringOrRegExp(node.value, allowedPatterns)
    ) {
      invalidValues.push(node.value);
    }
  });

  return invalidValues;
}

module.exports = {
  rule,
  ruleName,
  messages,
};

/**
 * Validates the input is an array of String or RegExp.
 * @param {unknown} allowedPatterns
 * @returns {allowedPatterns is AllowedPatterns}
 */
function isAllowedPatterns(allowedPatterns) {
  if (!Array.isArray(allowedPatterns)) return false;

  for (const pattern of allowedPatterns) {
    if (!(isString(pattern) || isRegExp(pattern))) return false;
  }

  return true;
}

/**
 * @param {unknown} option - `primary.allowedValues` option.
 */
function validateAllowedValuesOption(option) {
  if (typeof option !== 'object' || option === null) return false;

  for (const [property, allowedPatterns] of Object.entries(option)) {
    if (!(isString(property) && isAllowedPatterns(allowedPatterns))) {
      return false;
    }
  }

  return true;
}
