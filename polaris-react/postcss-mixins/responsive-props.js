const scopeCustomProperty = require('./scope-custom-property');

module.exports = (mixin, componentName, componentProp, declarationProp) => {
  return {
    ...scopeCustomProperty(mixin, componentName, componentProp, true),
    [declarationProp]: `var(--pc-${componentName}-${componentProp}-xs)`,
    '@media (--p-breakpoints-sm-up)': {
      [declarationProp]: `var(
        --pc-${componentName}-${componentProp}-sm,
        var(--pc-${componentName}-${componentProp}-xs)
      )`,
    },
    '@media (--p-breakpoints-md-up)': {
      [declarationProp]: `var(
        --pc-${componentName}-${componentProp}-md,
        var(
          --pc-${componentName}-${componentProp}-sm,
          var(--pc-${componentName}-${componentProp}-xs)
        )
      )`,
    },
    '@media (--p-breakpoints-lg-up)': {
      [declarationProp]: `var(
        --pc-${componentName}-${componentProp}-lg,
        var(
          --pc-${componentName}-${componentProp}-md,
          var(
            --pc-${componentName}-${componentProp}-sm,
            var(--pc-${componentName}-${componentProp}-xs)
          )
        )
      )`,
    },
    '@media (--p-breakpoints-xl-up)': {
      [declarationProp]: `var(
        --pc-${componentName}-${componentProp}-xl,
        var(
          --pc-${componentName}-${componentProp}-lg,
          var(
            --pc-${componentName}-${componentProp}-md,
            var(
              --pc-${componentName}-${componentProp}-sm,
              var(--pc-${componentName}-${componentProp}-xs)
            )
          )
        )
      )`,
    },
  };
};
