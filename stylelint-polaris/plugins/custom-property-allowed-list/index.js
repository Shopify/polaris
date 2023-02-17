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
    if (isInvalidProp) {
      return `Unexpected prefix "${prefix}" for defined custom property "${prop}" - Properties with prefixes "--p-" or "--pc-" cannot be defined outside of Polaris"`;
    }

    if (invalidValues) {
      const plural = invalidValues.length > 1;
      return `Unexpected value "${value}" for property "${prop}" - Token${
        plural ? 's' : ''
      } ${invalidValues.map((token) => `"${token}"`).join(', ')} ${
        plural ? 'are' : 'is'
      } either private or ${plural ? 'do' : 'does'} not exist`;
    }
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
          `Invalid options were provided to the [${ruleName}] rule in your Stylelint config.\n`,
        );
      }

      const {allowedProperties = [], allowedValues = {}} = primary;

      root.walkDecls((decl) => {
        const prop = decl.prop;
        const value = decl.value;

        const isInvalidProperty = isInvalidCustomProperty(
          allowedProperties,
          prop,
        );

        const invalidValues = getInvalidCustomPropertyValues(
          allowedValues,
          prop,
          value,
        );

        if (isInvalidProperty) {
          stylelint.utils.report({
            message: messages.rejected(
              prop,
              value,
              getCustomPropertyPrefix(prop),
              isInvalidProperty,
              invalidValues,
            ),
            node: decl,
            result,
            ruleName,
          });
        }

        if (invalidValues) {
          stylelint.utils.report({
            message: messages.rejected(
              prop,
              value,
              undefined,
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
 * Returns the prefix of a custom property.
 * @param {string} property
 * @returns {string}
 */
function getCustomPropertyPrefix(property) {
  return `--${property.split('-')[2]}-`;
}

/**
 * @param {NonNullable<PrimaryOptions['allowedProperties']>} allowedProperties
 * @param {string} property
 */
function isInvalidCustomProperty(allowedProperties, property) {
  if (!isCustomProperty(property)) return false;

  const isValid = allowedProperties.some((allowedProperty) => {
    return matchesStringOrRegExp(property, allowedProperty);
  });

  return !isValid;
}

/**
 * @param {NonNullable<PrimaryOptions['allowedValues']>} allowedValues
 * @param {string} prop
 * @param {string} value
 * @returns {string[] | undefined}
 */
function getInvalidCustomPropertyValues(allowedValues, prop, value) {
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

  if (invalidValues.length > 0) return invalidValues;
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
