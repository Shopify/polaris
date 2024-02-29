const postcss = require('postcss');
/* Returns a safe-area-inset for iPhone X screen obtrusions.
  @param {String} - The property name i.e. padding-left.
  @param {Space} - The spacing value to be added to the safe-area
  value. i.e. var(--p-space-400).
  @param {string} - The area where the inset is to be added. i.e. left
  If overriding an existing padding / margin that value should be used as
  $spacing
*/
module.exports = (mixin, property, spacing, area) => {
  const spacingValue = spacing === 0 ? '0px' : spacing;
  const cssVarDecl = postcss.decl({
    prop: '--pc-safe-area-for-spacing',
    value: spacingValue,
  });
  const varDecl = postcss.decl({
    prop: property,
    value: `var(--pc-safe-area-for-spacing)`,
  });
  const constantDecl = postcss.decl({
    prop: property,
    value: `calc(
      var(--pc-safe-area-for-spacing) + constant(safe-area-inset-${area})
    )`,
  });
  const envDecl = postcss.decl({
    prop: property,
    value: `calc(
      var(--pc-safe-area-for-spacing) + env(safe-area-inset-${area})
    )`,
  });

  // We ahve to do a manual replace here
  // Because if we returned an object, declarations with the same property would be deduped.
  mixin.replaceWith([cssVarDecl, varDecl, constantDecl, envDecl]);
};
