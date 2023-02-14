/**
 * Compares a string to a second value that, if it fits a certain convention,
 * is converted to a regular expression before the comparison.
 * If it doesn't fit the convention, then two strings are compared.
 *
 * Any strings starting and ending with `/` are interpreted
 * as regular expressions.
 */
export function matchesStringOrRegExp(
  input: string,
  comparison: string | RegExp | (string | RegExp)[],
): false | {match: string; pattern: string | RegExp} {
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

function testAgainstStringOrRegExpOrArray(
  value: string,
  comparison: string | RegExp | (string | RegExp)[],
) {
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

function testAgainstStringOrRegExp(value: string, comparison: string | RegExp) {
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
