# Migrating from v8 to v9

Polaris v9.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v9.0.0)) features removal of the public scss api and removal of scss functions and mixins.

## Theme provider

## Removal of the public scss api

Any functions that were being consumed from `build/styles/_public-api.scss` have been removed. The functions can be found in the following permalinks.

[`./foundation/layout`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/foundation/_layout.scss)

[`./foundation/focus-ring`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/foundation/_focus-ring.scss)

[`./shared/accessibility`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_accessibility.scss)

[`./shared/breakpoints`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_breakpoints.scss)

[`./shared/buttons`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_buttons.scss)

[`./shared/controls`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_controls.scss)

[`./shared/forms`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_forms.scss)

[`./shared/icons`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_icons.scss)

[`./shared/layout`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_layout.scss)

[`./shared/page`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_page.scss)

[`./shared/typography`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_typography.scss)

[`./shared/skeleton`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_skeleton.scss)

[`./shared/interaction-state`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_interaction-state.scss)

[`./shared/printing`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_printing.scss)
