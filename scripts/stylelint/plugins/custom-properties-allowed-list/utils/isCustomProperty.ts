/**
 * Check whether a property is a custom one
 * @param {string} property
 * @returns {boolean}
 */
export function isCustomProperty(property: string) {
  return property.startsWith('--');
}
