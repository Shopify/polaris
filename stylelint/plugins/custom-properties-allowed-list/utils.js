/**
 * Returns the vendor prefix extracted from an input string.
 *
 * @param {string} prop String with or without vendor prefix.
 *
 * @return {string} vendor prefix or empty string
 *
 * @example
 * vendorPrefix('-moz-tab-size') //=> '-moz-'
 * vendorPrefix('tab-size')      //=> ''
 */
function vendorPrefix(prop) {
  const match = prop.match(/^(-\w+-)/);

  if (match) {
    return match[0];
  }

  return '';
}

/**
 * Returns the input string stripped of its vendor prefix.
 *
 * @param {string} prop String with or without vendor prefix.
 *
 * @return {string} String name without vendor prefixes.
 *
 * @example
 * vendorUnprefixed('-moz-tab-size') //=> 'tab-size'
 */
function vendorUnprefixed(prop) {
  return prop.replace(/^-\w+-/, '');
}

// matchesStringOrRegExp

/**
 * Compares a string to a second value that, if it fits a certain convention,
 * is converted to a regular expression before the comparison.
 * If it doesn't fit the convention, then two strings are compared.
 *
 * Any strings starting and ending with `/` are interpreted
 * as regular expressions.
 *
 * @param {string} input
 * @param {string | RegExp | Array<string | RegExp>} comparison
 *
 * @returns {false | {match: string, pattern: (string | RegExp) }}
 */
function matchesStringOrRegExp(input, comparison) {
  if (!Array.isArray(input)) {
    return testAgainstStringOrRegExpOrArray(input, comparison);
  }

  for (const inputItem of input) {
    const testResult = testAgainstStringOrRegExpOrArray(inputItem, comparison);

    if (testResult) {
      return testResult;
    }
  }

  return false;
}

/**
 * @param {string} value
 * @param {string | RegExp | Array<string | RegExp>} comparison
 */
function testAgainstStringOrRegExpOrArray(value, comparison) {
  if (!Array.isArray(comparison)) {
    return testAgainstStringOrRegExp(value, comparison);
  }

  for (const comparisonItem of comparison) {
    const testResult = testAgainstStringOrRegExp(value, comparisonItem);

    if (testResult) {
      return testResult;
    }
  }

  return false;
}

/**
 * @param {string} value
 * @param {string | RegExp} comparison
 */
function testAgainstStringOrRegExp(value, comparison) {
  // If it's a RegExp, test directly
  if (comparison instanceof RegExp) {
    return comparison.test(value) ? {match: value, pattern: comparison} : false;
  }

  // Check if it's RegExp in a string
  const firstComparisonChar = comparison[0];
  const lastComparisonChar = comparison[comparison.length - 1];
  const secondToLastComparisonChar = comparison[comparison.length - 2];

  const comparisonIsRegex =
    firstComparisonChar === '/' &&
    (lastComparisonChar === '/' ||
      (secondToLastComparisonChar === '/' && lastComparisonChar === 'i'));

  const hasCaseInsensitiveFlag =
    comparisonIsRegex && lastComparisonChar === 'i';

  // If so, create a new RegExp from it
  if (comparisonIsRegex) {
    const valueMatches = hasCaseInsensitiveFlag
      ? new RegExp(comparison.slice(1, -2), 'i').test(value)
      : new RegExp(comparison.slice(1, -1)).test(value);

    return valueMatches ? {match: value, pattern: comparison} : false;
  }

  // Otherwise, it's a string. Do a strict comparison
  return value === comparison ? {match: value, pattern: comparison} : false;
}

// isCustomProperty

/**
 * Check whether a property is a custom one
 * @param {string} property
 * @returns {boolean}
 */
function isCustomProperty(property) {
  return property.startsWith('--');
}

// validateTypes

/**
 * Checks if the value is a boolean or a Boolean object.
 * @param {unknown} value
 * @returns {value is boolean}
 */
function isBoolean(value) {
  return typeof value === 'boolean' || value instanceof Boolean;
}

/**
 * Checks if the value is a number or a Number object.
 * @param {unknown} value
 * @returns {value is number}
 */
function isNumber(value) {
  return typeof value === 'number' || value instanceof Number;
}

/**
 * Checks if the value is a RegExp object.
 * @param {unknown} value
 * @returns {value is RegExp}
 */
function isRegExp(value) {
  return value instanceof RegExp;
}

/**
 * Checks if the value is a string or a String object.
 * @param {unknown} value
 * @returns {value is string}
 */
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

module.exports.vendorPrefix = vendorPrefix;
module.exports.vendorUnprefixed = vendorUnprefixed;
module.exports.matchesStringOrRegExp = matchesStringOrRegExp;
module.exports.isCustomProperty = isCustomProperty;
module.exports.isBoolean = isBoolean;
module.exports.isNumber = isNumber;
module.exports.isRegExp = isRegExp;
module.exports.isString = isString;
