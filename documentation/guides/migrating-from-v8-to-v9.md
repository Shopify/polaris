# Migrating from v8 to v9

Polaris v9.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v9.0.0)) features removal of the public scss api and removal of scss functions and mixins.

## Theme provider

## CSS Custom Properties

CSS custom properties that were renamed can be replaced with the new CSS custom property name.

|              Before               |               After                |
| :-------------------------------: | :--------------------------------: |
|      `--p-badge-font-weight`      |     `--p-font-weight-regular`      |
|     `--p-button-font-weight`      |      `--p-font-weight-medium`      |
|       `--p-duration-1-0-0`        |         `--p-duration-100`         |
|       `--p-duration-1-5-0`        |         `--p-duration-150`         |
|         `--p-card-shadow`         |         `--p-shadow-card`          |
|       `--p-popover-shadow`        |        `--p-shadow-popover`        |
|        `--p-modal-shadow`         |         `--p-shadow-modal`         |
|       `--p-top-bar-shadow`        |        `--p-shadow-top-bar`        |
|     `--p-button-drop-shadow`      |        `--p-shadow-button`         |
|     `--p-button-inner-shadow`     |     `--p-shadows-inset-button`     |
| `--p-button-pressed-inner-shadow` | `--p-shadows-inset-button-pressed` |
|          `--p-icon-size`          |       `--p-icon-size-small`        |

CSS Custom Properties that have been deprecated can be replaced with the CSS property value.

|             Before              |          Value           |
| :-----------------------------: | :----------------------: |
|       `--p-override-none`       |          `none`          |
|   `--p-override-transparent`    |      `transparent`       |
|       `--p-override-one`        |           `1`            |
|     `--p-override-visible`      |        `visible`         |
|       `--p-override-zero`       |           `0`            |
|     `--p-non-null-content`      |           `''`           |
|   `--p-badge-mix-blend-mode`    |       `luminosity`       |
| `--p-range-slider-thumb-scale`  |          `1.5`           |
|       `--p-frame-offset`        |          `0px`           |
| `--p-shadow-from-ambient-light` | `rgba(23, 24, 24, 0.05)` |
| `--p-shadow-from-direct-light`  |  `rgba(0, 0, 0, 0.15)`   |
|   `--p-shadow-from-dim-light`   |   `rgba(0, 0, 0, 0.2)`   |

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
