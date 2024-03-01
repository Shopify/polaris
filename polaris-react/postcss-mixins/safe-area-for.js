const postcss = require('postcss');

const {nullish} = require('./utils');

/* Returns a safe-area-inset for iPhone X screen obtrusions.
  @param {String} - The property name i.e. padding-left.
  @param {Space} - The spacing value to be added to the safe-area
  value. i.e. var(--p-space-400).
  @param {string} - The area where the inset is to be added. i.e. left
  If overriding an existing padding / margin that value should be used as
  $spacing
*/
module.exports = (mixin, property, spacing, area) => {
  const spacingValue =
    nullish(spacing) || spacing === 0 || spacing === '0' ? '0px' : spacing;
  const varDecl = postcss.decl({
    prop: property,
    value: spacingValue,
  });
  const constantDecl = postcss.decl({
    prop: property,
    value: `calc(
      ${spacingValue} + constant(safe-area-inset-${area})
    )`,
  });
  const envDecl = postcss.decl({
    prop: property,
    value: `calc(
      ${spacingValue} + env(safe-area-inset-${area})
    )`,
  });

  // We have to do a manual replace here
  // Because if we returned an object, declarations with the same property would be deduped.
  mixin.replaceWith([varDecl, constantDecl, envDecl]);
};
