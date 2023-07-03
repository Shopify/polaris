---
'@shopify/polaris': patch
---

- [Internal]: Generate contiguous responsive CSS variables.

  Ensures the CSS vars set via `style` props will override the responsive-props
  SASS mixin which forces them to have a value of `initial`.

  Forcing to `initial` is required when components are nested to avoid an outer
  component accidentally setting a value for a nested component by specifying a
  CSS variable (CSS vars are globally scoped and later-in-DOM has more
  specificity).

  However, `initial` is [not usable within a
  `calc()`](https://polaris.shopify.com/sandbox?code=N4Igxg9gJgpiBcIA8UCWA3ABAZwC4E8AbGAXmGEwAcBDKNAOwHN5MAdcawsAClXtVypOmANSYAzACcYAWwCU7TAF8lAPlb1MmAMLV6AclyYArthiYkkWKr4ChhJAHorMVZj46Ayp4svVYTh45Jz8NJzR0dXoQABoQXAALWRhsBABtEEIIAOJ4GGiAXTiAd1QoRNT4NIKlIA),
  so any unset values will not [fallback as they would when the browser
  encounters a `var(--some-var-equals-initial, fallback)`](https://polaris.shopify.com/sandbox?code=N4Igxg9gJgpiBcIA8UCWA3ABAZwC4E8AbGAXmGEwHIBaagBzGuwgFsZr0BDAJ0vitQA7VLlSdClADSY6nKGkEBzfgB0QXbgApaDJq3YbpAZm4wWASjWYAvtYB8KwZkxJIsOxs3mkAejcw7TC5CAFcYbEwIADMXfzshETFCXzjMEOwYTFwAC0yo8UIAI04wAGsg8TDHXzR0OxBJEByzcIQAbRBCCDBxGHgYQRAAXUaAd1QoHOx2oesgA).

  Adding this `forceContiguous` flag means we can be sure we're setting exactly
  what the user asked for when passing in their prop, and not `initial`,
  therefore retaining the existing behaviour while forward supporting the usage
  of `calc()`. We still need the `initial` values to ensure any lower
  breakpoints that are unset do not inherit parent values accidentally.
