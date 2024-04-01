const {nullish} = require('./utils');

/* Returns a safe-area-inset for iPhone X screen obtrusions.
  @param {String} - The property name i.e. padding-left.
  @param {Space} - The spacing value to be added to the safe-area
  value. i.e. var(--p-space-400).
  @param {string} - The area where the inset is to be added. i.e. left
  If overriding an existing padding / margin that value should be used as
  $spacing
*/
module.exports = (_, property, spacing, area) => {
  const spacingValue =
    nullish(spacing) || spacing === 0 || spacing === '0' ? '0px' : spacing;
  return {
    [property]: [
      spacingValue,
      `calc(${spacingValue} + constant(safe-area-inset-${area}))`,
      `calc(${spacingValue} + env(safe-area-inset-${area}))`,
    ],
  };
};
