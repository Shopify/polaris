import {utils, createPlugin} from 'stylelint';
import valueParser from 'postcss-value-parser';

import {
  vendor,
  matchesStringOrRegExp,
  isCustomProperty,
  isRegExp,
  isString,
} from './utils';

export const ruleName = '@shopify/custom-properties-allowed-list';

type AllowedPatterns = (string | RegExp)[];

interface PrimaryOptions {
  allowedProperties: AllowedPatterns;
  allowedValues: {[property: string]: AllowedPatterns};
}

interface InvalidOptions {
  invalidProperties: string[];
  invalidValues: string[];
}

export const customPropertiesAllowedListPlugin = createPlugin(
  ruleName,
  (primary: PrimaryOptions) => {
    return (root, result) => {
      const invalidOptions: InvalidOptions = {
        invalidProperties: [],
        invalidValues: [],
      };

      const validOptions = utils.validateOptions(
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

        utils.report({
          message: messages.rejected(invalidProperty, invalidValues),
          node: decl,
          result,
          ruleName,
        });
      });
    };
  },
);

function validateCustomProperties(primary: PrimaryOptions, prop: string) {
  if (!isCustomProperty(prop)) return;

  const isValid = primary.allowedProperties.some((allowedProperty) => {
    return matchesStringOrRegExp(prop, allowedProperty);
  });

  if (isValid) return;

  return prop;
}

function validateCustomPropertyValues(
  primary: PrimaryOptions,
  prop: string,
  value: string,
) {
  const invalidValues: string[] = [];

  const unprefixedProp = vendor.unprefixed(prop);

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

export const messages = utils.ruleMessages(ruleName, {
  rejected: (invalidProperty = '', invalidValues: string[] = []) => {
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

function isStringOrRegExp(value: unknown): value is string | RegExp {
  return isString(value) || isRegExp(value);
}

function validateAllowedOptions(allowedArray: AllowedPatterns) {
  const invalidPatterns: string[] = [];

  let isValid = true;

  allowedArray.forEach((pattern) => {
    if (isStringOrRegExp(pattern)) return;

    invalidPatterns.push(pattern);

    isValid = false;
  });

  return [isValid, invalidPatterns] as const;
}

function validateAllowedPropertiesOption(
  option: unknown,
  invalidOptions: InvalidOptions,
) {
  const allowedProperties = option as PrimaryOptions['allowedProperties'];

  const [isValid, invalidPatterns] = validateAllowedOptions(allowedProperties);

  invalidOptions.invalidProperties = invalidPatterns;

  return isValid;
}

function validateAllowedValuesOption(
  option: unknown,
  invalidOptions: InvalidOptions,
) {
  const allowedValues = option as PrimaryOptions['allowedValues'];

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
