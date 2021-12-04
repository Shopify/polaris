import {utils, createPlugin} from 'stylelint';

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

export const customPropertiesAllowedListPlugin = createPlugin(
  ruleName,
  (primary: PrimaryOptions) => {
    return (root, result) => {
      const invalidOptions: {
        invalidProperties: string[];
        invalidValues: string[];
      } = {
        invalidProperties: [],
        invalidValues: [],
      };

      const validOptions = utils.validateOptions(
        result,
        ruleName,
        {
          actual: primary.allowedProperties,
          possible: (option) => {
            const allowedProperties = option as PrimaryOptions['allowedProperties'];

            const [isValid, invalidPatterns] = validateAllowedOptions(
              allowedProperties,
            );

            invalidOptions.invalidProperties = invalidPatterns;

            return isValid;
          },
        },
        {
          actual: primary.allowedValues,
          possible: (option) => {
            const allowedValues = option as PrimaryOptions['allowedValues'];

            let isValid = true;

            Object.entries(allowedValues).forEach(([property, values]) => {
              const [isValidValues, invalidPatterns] = validateAllowedOptions(
                values,
              );

              if (isString(property) && isValidValues) return;

              invalidOptions.invalidValues.push(
                `${property}: [${invalidPatterns.join(', ')}]`,
              );

              isValid = false;
            });

            return isValid;
          },
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
          message: messages.rejected(value, invalidProperty, invalidValues),
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
  const invalidValues = [];

  const unprefixedProp = vendor.unprefixed(prop);

  /** Property key for the allowed values option */
  const propKey = Object.keys(primary.allowedValues).find((propIdentifier) =>
    matchesStringOrRegExp(unprefixedProp, propIdentifier),
  );

  if (!propKey) return;

  const allowedValues = primary.allowedValues[propKey];

  if (!allowedValues.length) return;

  const customPropertyRegex = /--[^),\s\n]+/g;

  let match;

  while ((match = customPropertyRegex.exec(value)) !== null) {
    const customProperty = match[0];

    if (!matchesStringOrRegExp(customProperty, allowedValues)) {
      invalidValues.push(customProperty);
    }
  }

  if (!invalidValues.length) return;

  return invalidValues;
}

export const messages = utils.ruleMessages(ruleName, {
  rejected: (
    value: string,
    invalidProperty = '',
    invalidValues: string[] = [],
  ) => {
    const invalidPropertyMessage = invalidProperty
      ? `Unexpected custom property [${invalidProperty}].`
      : null;

    const invalidValuesMessage = invalidValues.length
      ? `Invalid custom properties [${invalidValues.join(
          ', ',
        )}] in value [${value}].`
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
