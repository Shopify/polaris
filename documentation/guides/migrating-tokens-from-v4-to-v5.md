## Migrating from v4 to v5

Polaris Tokens v5.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/tokens-v5.0.0)) features an overhaul of the package and the APIs for accessing tokens. Documentation on all of the available tokens can be found at [polaris.shopify.com/tokens/getting-started-with-tokens](https://polaris.shopify.com/tokens/getting-started-with-tokens).

The Sass variables and map keys, CSS Filters, and ability to access tokens via the Rails assets pipelines have all been removed. This new version is based on js files and using javascript utility and build functions to compose the final artifacts.

This new version standardizes the variable naming across all of the packages output. Each variable is formatted in [kebab-case](https://wiki.c2.com/?KebabCase) following common CSS variable name conventions.
