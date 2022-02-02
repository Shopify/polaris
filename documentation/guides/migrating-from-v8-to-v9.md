# Migrating from v8 to v9

Polaris v9.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v9.0.0)) features removal of the public scss api and removal of scss functions and mixins.

## Theme provider

## CSS Custom Properties

### Global CSS Custom Properties

|                 Before                 |               After                |
| :------------------------------------: | :--------------------------------: |
|        `--p-badge-font-weight`         |              removed               |
|        `--p-button-font-weight`        |              removed               |
|            `--p-override-*`            |              removed               |
|         `--p-non-null-content`         |              removed               |
|       `--p-badge-mix-blend-mode`       |              removed               |
|     `--p-range-slider-thumb-scale`     |              removed               |
|        `--global-ribbon-height`        |              removed               |
|         `--top-bar-background`         |              removed               |
| `--Polaris-RangeSlider-progress-lower` |              removed               |
| `--Polaris-RangeSlider-progress-upper` |              removed               |
|    `--Polaris-RangeSlider-progress`    |              removed               |
| `--Polaris-RangeSlider-output-factor`  |              removed               |
|           `--top-bar-color`            |              removed               |
|     `--top-bar-background-lighter`     |              removed               |
|     `--top-bar-background-darker`      |              removed               |
|           `--top-bar-border`           |              removed               |
|           `--p-frame-offset`           |              removed               |
|         `--p-checkbox-offset`          |              removed               |
|     `--p-scroll-bar-content-width`     |              removed               |
|    `--p-shadow-from-ambient-light`     |              removed               |
|     `--p-shadow-from-direct-light`     |              removed               |
|      `--p-shadow-from-dim-light`       |              removed               |
|          `--p-duration-1-0-0`          |         `--p-duration-100`         |
|          `--p-duration-1-5-0`          |         `--p-duration-150`         |
|           `--p-card-shadow`            |         `--p-shadow-card`          |
|          `--p-popover-shadow`          |        `--p-shadow-popover`        |
|           `--p-modal-shadow`           |         `--p-shadow-modal`         |
|          `--p-top-bar-shadow`          |        `--p-shadow-top-bar`        |
|        `--p-button-drop-shadow`        |        `--p-shadow-button`         |
|       `--p-button-inner-shadow`        |     `--p-shadows-inset-button`     |
|   `--p-button-pressed-inner-shadow`    | `--p-shadows-inset-button-pressed` |
|            `--p-icon-size`             |       `--p-icon-size-small`        |

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

## Development Workflow

Addition of a custom stylelint plugin to validate custom property usage across `polaris-react`.

`@shopify/custom-properties-allowed-list` Plugin Features:

- Specify a list of allowed custom property names permitted in a `.scss` file.
- Specify a list of allowed custom property values permitted in a `.scss` file.
  (Note: Allowed custom property values can be configured per CSS property)

The `@shopify/custom-properties-allowed-list` plugin has been configured in `polaris-react` to:

- Ensure local component custom properties have a `--pc-` prefix.
- Ensure local component custom properties do NOT set the `--p-` prefix.
  (Note: `--p-` custom properties are auto generated from our Polaris tokens)
- Validates `--p-*` custom properties match existing Polaris tokens.
