const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const {
  vendorUnprefixed,
  matchesStringOrRegExp,
  isCustomProperty,
  isRegExp,
  isString,
} = require('./utils');

const ruleName = '@shopify/custom-properties-allowed-list';

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @param {string} invalidProperty
   * @param {string[]} invalidValues
   */
  rejected: (invalidProperty = '', invalidValues = []) => {
    const invalidPropertyMessage = invalidProperty
      ? `Unexpected custom property [${invalidProperty}].`
      : null;

    const invalidValuesMessage = invalidValues.length
      ? `Invalid custom properties [${invalidValues.join(', ')}].`
      : null;

    return [invalidPropertyMessage, invalidValuesMessage]
      .filter(Boolean)
      .join(' ');
  },
});

/** @typedef {(string | RegExp)[]} AllowedPatterns */

/**
 * @typedef {Object} PrimaryOptions
 * @property {AllowedPatterns} allowedProperties
 * @property {{[property: string]: AllowedPatterns}} allowedValues
 */

/**
 * @typedef {Object} InvalidOptions
 * @property {string[]} invalidProperties
 * @property {string[]} invalidValues
 */

module.exports = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primary */
  (primary) => {
    return (root, result) => {
      /** @type {InvalidOptions} */
      const invalidOptions = {
        invalidProperties: [],
        invalidValues: [],
      };

      const validOptions = stylelint.utils.validateOptions(
        result,
        ruleName,
        {
          actual: primary.allowedProperties,
          possible: (options) =>
            validateAllowedPropertiesOption(options, invalidOptions),
        },
        {
          actual: primary.allowedValues,
          possible: (options) =>
            validateAllowedValuesOption(options, invalidOptions),
        },
      );

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n${JSON.stringify(
            invalidOptions,
            null,
            2,
          )}\n`,
        );
      }

      root.walkDecls((decl) => {
        const prop = decl.prop;
        const value = decl.value;

        const invalidProperty = validateCustomProperties(primary, prop);
        const invalidValues = validateCustomPropertyValues(
          primary,
          prop,
          value,
        );

        if (!invalidValues && !invalidProperty) return;

        stylelint.utils.report({
          message: messages.rejected(invalidProperty, invalidValues),
          node: decl,
          result,
          ruleName,
        });
      });
    };
  },
);

/**
 * @param {PrimaryOptions} primary
 * @param {string} prop
 */
function validateCustomProperties(primary, prop) {
  if (!isCustomProperty(prop)) return;

  const isValid = primary.allowedProperties.some((allowedProperty) => {
    return matchesStringOrRegExp(prop, allowedProperty);
  });

  if (isValid) return;

  return prop;
}

/**
 * @param {PrimaryOptions} primary
 * @param {string} prop
 * @param {string} value
 */
function validateCustomPropertyValues(primary, prop, value) {
  /** @type {string[]} */
  const invalidValues = [];

  const unprefixedProp = vendorUnprefixed(prop);

  /** Property key for the allowed values option */
  const propKey = Object.keys(primary.allowedValues).find((propIdentifier) =>
    matchesStringOrRegExp(unprefixedProp, propIdentifier),
  );

  if (!propKey) return;

  const allowedValues = primary.allowedValues[propKey];

  if (!allowedValues.length) return;

  valueParser(value).walk((node) => {
    if (
      node.type === 'word' &&
      isCustomProperty(node.value) &&
      !matchesStringOrRegExp(node.value, allowedValues)
    ) {
      invalidValues.push(node.value);
    }
  });

  if (!invalidValues.length) return;

  return invalidValues;
}

module.exports.ruleName = ruleName;
module.exports.messages = messages;

/**
 * @param {unknown} value
 * @returns {value is string | RegExp}
 */
function isStringOrRegExp(value) {
  return isString(value) || isRegExp(value);
}

/**
 * @param {AllowedPatterns} allowedArray
 */
function validateAllowedOptions(allowedArray) {
  /** @type {string[]} */
  const invalidPatterns = [];

  let isValid = true;

  allowedArray.forEach((pattern) => {
    if (isStringOrRegExp(pattern)) return;

    invalidPatterns.push(pattern);

    isValid = false;
  });

  return [isValid, invalidPatterns];
}

/**
 * @param {unknown} option
 * @param {InvalidOptions} invalidOptions
 */
function validateAllowedPropertiesOption(option, invalidOptions) {
  /** @type {PrimaryOptions['allowedProperties']} */
  const allowedProperties = option;

  const [isValid, invalidPatterns] = validateAllowedOptions(allowedProperties);

  invalidOptions.invalidProperties = invalidPatterns;

  return isValid;
}

/**
 * @param {unknown} option
 * @param {InvalidOptions} invalidOptions
 */
function validateAllowedValuesOption(option, invalidOptions) {
  /** @type {PrimaryOptions['allowedValues']} */
  const allowedValues = option;

  let isValid = true;

  Object.entries(allowedValues).forEach(([property, values]) => {
    const [isValidValues, invalidPatterns] = validateAllowedOptions(values);

    if (isString(property) && isValidValues) return;

    invalidOptions.invalidValues.push(
      `${property}: [${invalidPatterns.join(', ')}]`,
    );

    isValid = false;
  });

  return isValid;
}
