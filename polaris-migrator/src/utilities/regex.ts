export interface ReplacementMap {
  [key: string]: string;
}

/**
 * Creates a regex that can be used to replace a mapping of keys with a corresponding value.
 * @param {ReplacementMap} replacementMap -  The key is the current string and the value is the replacement string.
 * @returns {RegExp}
 */
export const createRegexFromMap = (replacementMap: ReplacementMap) =>
  new RegExp(
    Object.keys(replacementMap)
      .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g',
  );
