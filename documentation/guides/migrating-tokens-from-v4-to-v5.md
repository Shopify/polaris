## Migrating from Polaris Tokens v4 to v5

Polaris Tokens v5.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/tokens-v5.0.0)) features an overhaul of the package and the APIs for accessing tokens. Documentation on all of the available tokens can be found at [polaris.shopify.com/tokens/getting-started-with-tokens](https://polaris.shopify.com/tokens/getting-started-with-tokens).

The Sass variables, maps, functions, mixins, and CSS Filters have all been removed. In addition to deprecating access to tokens via the Rails assets pipelines. This new version leverages JavaScript objects for each Token Group which are passed through various build transforms to compose the distributed artifacts.

This new version standardizes the token naming across all of the package outputs. Each token is formatted in [kebab-case](https://wiki.c2.com/?KebabCase) following common CSS variable name conventions.
