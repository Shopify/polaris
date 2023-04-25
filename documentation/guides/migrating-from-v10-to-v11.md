# Migrating from v10 to v11

Polaris v11.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v11.0.0)) features...

## Table of Contents

- [Node support](#node-support)
- [Components](#components)
  - [Removed deprecated Collapsible argument](#removed-deprecated-collapsible-argument)
  - [Removed KonamiCode component](#removed-konamicode-component)
- [Tokens](#tokens)
  - [Border](#border)
  - [Color](#color)
  - [Depth](#depth)
  - [Motion](#motion)
  - [Legacy](#legacy)
  - [Z-index](#z-index)

## Node support

NodeJS version 14 is no longer supported. NodeJS 18 is recommended and 16 is the minimum supported version.

## React support

React version 16 and 17 is no longer supported. React 18 is the minimum supported version.

## Webpack support

Webpack version 4 is no longer supported. Webpack 5 is the minimum supported version.

## TypeScript

Built types in `@shopify/polaris` have moved from `build/ts/latest` to `build/ts`.

**Legacy TypeScript Support**

Polaris no longer supports multiple versions of TypeScript with downlevel-dts. Polaris only builds one set of types based on the current version of TypeScript in the project.

## Components

### Removed deprecated Collapsible argument

We've removed the following deprecated prop from the Collapsible component:

`- preventMeasuringOnChildrenUpdate?: boolean;`

### Removed KonamiCode component

We are removing low usage components from Polaris. We love fun but we also want to ensure we are shipping exactly what our users need. If you want to use this in your project feel free to copy the [component sourcecode](https://github.com/Shopify/polaris/blob/%40shopify/polaris%4010.24.0/polaris-react/src/components/KonamiCode/KonamiCode.tsx).

## Tokens

The following tokens have either been renamed or removed. You will need to replace any instances of them with their new name or value equivalents.

### Border

To replace these deprecated border custom properties you can run the [v11-styles-replace-custom-property-border](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-border) migration.

| Deprecated Token             | Replacement Value                                             |
| ---------------------------- | ------------------------------------------------------------- |
| `--p-border-radius-base`     | `--p-border-radius-1`                                         |
| `--p-border-radius-large`    | `--p-border-radius-2`                                         |
| `--p-border-radius-half`     | `--p-border-radius-full`                                      |
| `--p-border-base`            | `var(--p-border-width-1) solid var(--p-color-border-subdued)` |
| `--p-border-dark`            | `var(--p-border-width-1) solid var(--p-color-border)`         |
| `--p-border-transparent`     | `var(--p-border-width-1) solid transparent`                   |
| `--p-border-divider`         | `var(--p-border-width-1) solid var(--p-color-border-subdued)` |
| `--p-border-divider-on-dark` | `var(--p-border-width-1) solid var(--p-color-border-inverse)` |

### Color

To replace these deprecated color custom properties you can run the [v11-styles-replace-custom-property-color](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-color) migration.

| Deprecated Token                         | Replacement Value                                                                                                                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--p-text-warning`                       | `--p-color-text-caution`                                                                                                                                                                                                                                                   |
| `--p-text-success`                       | `--p-color-text-success`                                                                                                                                                                                                                                                   |
| `--p-text-subdued-on-dark`               | `--p-color-text-inverse-subdued`                                                                                                                                                                                                                                           |
| `--p-text-subdued`                       | `--p-color-text-subdued`                                                                                                                                                                                                                                                   |
| `--p-text-primary-pressed`               | `--p-color-text-primary`                                                                                                                                                                                                                                                   |
| `--p-text-primary-hovered`               | `--p-color-text-primary-hover`                                                                                                                                                                                                                                             |
| `--p-text-primary`                       | `--p-color-text-primary`                                                                                                                                                                                                                                                   |
| `--p-text-on-primary`                    | `--p-color-text-on-color`                                                                                                                                                                                                                                                  |
| `--p-text-on-interactive`                | `--p-color-text-on-color`                                                                                                                                                                                                                                                  |
| `--p-text-on-dark`                       | `--p-color-text-inverse`                                                                                                                                                                                                                                                   |
| `--p-text-on-critical`                   | `--p-color-text-on-color`                                                                                                                                                                                                                                                  |
| `--p-text-highlight`                     | `--p-color-text-info`                                                                                                                                                                                                                                                      |
| `--p-text-disabled`                      | `--p-color-text-disabled`                                                                                                                                                                                                                                                  |
| `--p-text-critical`                      | `--p-color-text-critical`                                                                                                                                                                                                                                                  |
| `--p-text`                               | `--p-color-text`                                                                                                                                                                                                                                                           |
| `--p-surface-warning-subdued-pressed`    | `--p-color-bg-caution-subdued-active`                                                                                                                                                                                                                                      |
| `--p-surface-warning-subdued-hovered`    | `--p-color-bg-caution-subdued-hover`                                                                                                                                                                                                                                       |
| `--p-surface-warning-subdued`            | `--p-color-bg-caution-subdued`                                                                                                                                                                                                                                             |
| `--p-surface-warning`                    | `--p-color-bg-warning`                                                                                                                                                                                                                                                     |
| `--p-surface-success-subdued-pressed`    | `--p-color-bg-success-subdued-active`                                                                                                                                                                                                                                      |
| `--p-surface-success-subdued-hovered`    | `--p-color-bg-success-subdued-hover`                                                                                                                                                                                                                                       |
| `--p-surface-success-subdued `           | `--p-color-bg-success-subdued`                                                                                                                                                                                                                                             |
| `--p-surface-success`                    | `--p-color-bg-success`                                                                                                                                                                                                                                                     |
| `--p-surface-subdued`                    | `--p-color-bg-subdued`                                                                                                                                                                                                                                                     |
| `--p-surface-selected-pressed`           | `--p-color-bg-interactive-subdued-active`                                                                                                                                                                                                                                  |
| `--p-surface-selected-hovered`           | `--p-color-bg-interactive-subdued-hover`                                                                                                                                                                                                                                   |
| `--p-surface-selected`                   | `--p-color-bg-interactive-selected`                                                                                                                                                                                                                                        |
| `--p-surface-search-field-dark`          | `--p-color-bg-inverse`                                                                                                                                                                                                                                                     |
| `--p-surface-search-field`               | `--p-color-bg-inset`                                                                                                                                                                                                                                                       |
| `--p-surface-primary-selected-pressed`   | `--p-color-bg-primary-subdued-active`                                                                                                                                                                                                                                      |
| `--p-surface-primary-selected-hovered`   | `--p-color-bg-primary-subdued-hover`                                                                                                                                                                                                                                       |
| `--p-surface-primary-selected`           | `--p-color-bg-primary-subdued-selected`                                                                                                                                                                                                                                    |
| `--p-surface-pressed-dark`               | `--p-color-bg-inverse-active`                                                                                                                                                                                                                                              |
| `--p-surface-pressed`                    | `--p-color-bg-active`                                                                                                                                                                                                                                                      |
| `--p-surface-neutral-subdued-dark`       | `--p-color-bg-inverse`                                                                                                                                                                                                                                                     |
| `--p-surface-neutral-subdued`            | `--p-color-bg-subdued`                                                                                                                                                                                                                                                     |
| `--p-surface-neutral-pressed`            | `--p-color-bg-strong-active`                                                                                                                                                                                                                                               |
| `--p-surface-neutral-hovered`            | `--p-color-bg-strong-hover`                                                                                                                                                                                                                                                |
| `--p-surface-neutral-disabled`           | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-surface-neutral`                    | `--p-color-bg-strong`                                                                                                                                                                                                                                                      |
| `--p-surface-hovered-dark`               | `--p-color-bg-inverse-hover`                                                                                                                                                                                                                                               |
| `--p-surface-hovered`                    | `--p-color-bg-hover`                                                                                                                                                                                                                                                       |
| `--p-surface-highlight-subdued-pressed`  | `--p-color-bg-info-subdued-active`                                                                                                                                                                                                                                         |
| `--p-surface-highlight-subdued-hovered`  | `--p-color-bg-info-subdued-hover`                                                                                                                                                                                                                                          |
| `--p-surface-highlight-subdued`          | `--p-color-bg-info-subdued`                                                                                                                                                                                                                                                |
| `--p-surface-highlight`                  | `--p-color-bg-info`                                                                                                                                                                                                                                                        |
| `--p-surface-disabled`                   | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-surface-depressed`                  | `--p-color-bg-inset`                                                                                                                                                                                                                                                       |
| `--p-surface-dark`                       | `--p-color-bg-inverse`                                                                                                                                                                                                                                                     |
| `--p-surface-critical-subdued-pressed`   | `--p-color-bg-critical-subdued-active`                                                                                                                                                                                                                                     |
| `--p-surface-critical-subdued-hovered`   | `--p-color-bg-critical-subdued-hover`                                                                                                                                                                                                                                      |
| `--p-surface-critical-subdued-depressed` | `--p-color-bg-critical`                                                                                                                                                                                                                                                    |
| `--p-surface-critical-subdued`           | `--p-color-bg-critical-subdued`                                                                                                                                                                                                                                            |
| `--p-surface-critical`                   | `--p-color-bg-critical`                                                                                                                                                                                                                                                    |
| `--p-surface-attention`                  | `--p-color-bg-caution`                                                                                                                                                                                                                                                     |
| `--p-surface`                            | `--p-color-bg`                                                                                                                                                                                                                                                             |
| `--p-shadow-color-picker-dragger`        | `rgba(33, 43, 54, 0.32)`                                                                                                                                                                                                                                                   |
| `--p-shadow-color-picker`                | `rgba(0, 0, 0, 0.5)`                                                                                                                                                                                                                                                       |
| `--p-overlay`                            | `rgba(255, 255, 255, 0.5)`                                                                                                                                                                                                                                                 |
| `--p-interactive-pressed-on-dark`        | `--p-color-text-interactive-inverse`                                                                                                                                                                                                                                       |
| `--p-interactive-pressed`                | For `color` properties: `--p-color-text-interactive-active`<br> For `background` properties: `--p-color-bg-interactive-active` <br> For `border` properties: `--p-color-border-interactive-active` <br> For `fill` properties: `--p-color-icon-interactive-active`         |
| `--p-interactive-on-dark`                | `--p-color-text-interactive-inverse`                                                                                                                                                                                                                                       |
| `--p-interactive-hovered`                | For `color` properties: `--p-color-text-interactive-hover`<br> For `background` properties: `--p-color-bg-interactive-hover` <br> For `border` properties: `--p-color-border-interactive-hover` <br> For `fill` properties: `--p-color-icon-interactive-hover`             |
| `--p-interactive-disabled`               | For `color` properties: `--p-color-text-interactive-disabled`<br> For `background` properties: `--p-color-bg-interactive-disabled` <br> For `border` properties: `--p-color-border-interactive-disabled` <br> For `fill` properties: `--p-color-icon-interactive-disabled` |
| `--p-interactive-critical-pressed`       | `--p-color-text-critical-active`                                                                                                                                                                                                                                           |
| `--p-interactive-critical-hovered`       | `--p-color-bg-critical-strong-hover`                                                                                                                                                                                                                                       |
| `--p-interactive-critical-disabled`      | `--p-color-text-disabled`                                                                                                                                                                                                                                                  |
| `--p-interactive-critical`               | For `color` properties: `--p-color-text-critical`<br> For `background` properties: `--p-color-bg-critical` <br> For `border` properties: `--p-color-border-critical` <br> For `fill` properties: `--p-color-icon-critical`                                                 |
| `--p-interactive`                        | For `color` properties: `--p-color-text-interactive`<br> For `background` properties: `--p-color-bg-interactive` <br> For `border` properties: `--p-color-border-interactive` <br> For `fill` properties: `--p-color-icon-interactive`                                     |
| `--p-icon-warning`                       | `--p-color-icon-caution`                                                                                                                                                                                                                                                   |
| `--p-icon-success`                       | `--p-color-icon-success`                                                                                                                                                                                                                                                   |
| `--p-icon-subdued`                       | `--p-color-icon-subdued`                                                                                                                                                                                                                                                   |
| `--p-icon-pressed`                       | `--p-color-icon-active`                                                                                                                                                                                                                                                    |
| `--p-icon-on-primary`                    | `--p-color-icon-on-color`                                                                                                                                                                                                                                                  |
| `--p-icon-on-interactive`                | `--p-color-icon-on-color`                                                                                                                                                                                                                                                  |
| `--p-icon-on-dark`                       | `--p-color-icon-inverse`                                                                                                                                                                                                                                                   |
| `--p-icon-on-critical`                   | `--p-color-icon-on-color`                                                                                                                                                                                                                                                  |
| `--p-icon-hovered`                       | `--p-color-icon-hover`                                                                                                                                                                                                                                                     |
| `--p-icon-highlight`                     | `--p-color-icon-info`                                                                                                                                                                                                                                                      |
| `--p-icon-disabled`                      | `--p-color-icon-disabled`                                                                                                                                                                                                                                                  |
| `--p-icon-critical`                      | `--p-color-icon-critical`                                                                                                                                                                                                                                                  |
| `--p-icon-attention`                     | `--p-color-icon-caution`                                                                                                                                                                                                                                                   |
| `--p-icon`                               | `--p-color-icon`                                                                                                                                                                                                                                                           |
| `--p-hint-from-direct-light`             | `rgba(0, 0, 0, 0.15)`                                                                                                                                                                                                                                                      |
| `--p-focused`                            | `--p-color-border-interactive-focus`                                                                                                                                                                                                                                       |
| `--p-divider-dark`                       | `--p-color-border-inverse`                                                                                                                                                                                                                                                 |
| `--p-divider`                            | `--p-color-border-subdued`                                                                                                                                                                                                                                                 |
| `--p-decorative-two-text`                | `rgba(73, 11, 28, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-two-surface`             | `rgba(255, 196, 176, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-two-icon`                | `rgba(175, 41, 78, 1)`                                                                                                                                                                                                                                                     |
| `--p-decorative-three-text`              | `rgba(0, 47, 25, 1)`                                                                                                                                                                                                                                                       |
| `--p-decorative-three-surface`           | `rgba(146, 230, 181, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-three-icon`              | `rgba(0, 109, 65, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-one-text`                | `rgba(61, 40, 0, 1)`                                                                                                                                                                                                                                                       |
| `--p-decorative-one-surface`             | `rgba(255, 201, 107, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-one-icon`                | `rgba(126, 87, 0, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-four-text`               | `rgba(0, 45, 45, 1)`                                                                                                                                                                                                                                                       |
| `--p-decorative-four-surface`            | `rgba(145, 224, 214, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-four-icon`               | `rgba(0, 106, 104, 1)`                                                                                                                                                                                                                                                     |
| `--p-decorative-five-text`               | `rgba(79, 14, 31, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-five-surface`            | `rgba(253, 201, 208, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-five-icon`               | `rgba(174, 43, 76, 1)`                                                                                                                                                                                                                                                     |
| `--p-border-warning-subdued`             | `--p-color-border-caution-subdued`                                                                                                                                                                                                                                         |
| `--p-border-warning`                     | `--p-color-border-caution`                                                                                                                                                                                                                                                 |
| `--p-border-success-subdued`             | `--p-color-border-success-subdued`                                                                                                                                                                                                                                         |
| `--p-border-success`                     | `--p-color-border-success`                                                                                                                                                                                                                                                 |
| `--p-border-subdued`                     | `--p-color-border-subdued`                                                                                                                                                                                                                                                 |
| `--p-border-shadow-subdued`              | `--p-color-border-input`                                                                                                                                                                                                                                                   |
| `--p-border-shadow`                      | `--p-color-border-input`                                                                                                                                                                                                                                                   |
| `--p-border-on-dark`                     | `--p-color-border-inverse`                                                                                                                                                                                                                                                 |
| `--p-border-neutral-subdued`             | `--p-color-border-strong`                                                                                                                                                                                                                                                  |
| `--p-border-hovered`                     | `--p-color-border-hover`                                                                                                                                                                                                                                                   |
| `--p-border-highlight-subdued`           | `--p-color-border-info-subdued`                                                                                                                                                                                                                                            |
| `--p-border-highlight`                   | `--p-color-border-info`                                                                                                                                                                                                                                                    |
| `--p-border-disabled`                    | `--p-color-border-disabled`                                                                                                                                                                                                                                                |
| `--p-border-depressed`                   | `--p-color-border-inverse`                                                                                                                                                                                                                                                 |
| `--p-border-critical-subdued`            | `--p-color-border-critical-subdued`                                                                                                                                                                                                                                        |
| `--p-border-critical-disabled`           | `--p-color-border-disabled`                                                                                                                                                                                                                                                |
| `--p-border-critical`                    | `--p-color-border-critical`                                                                                                                                                                                                                                                |
| `--p-border`                             | `--p-color-border`                                                                                                                                                                                                                                                         |
| `--p-background-selected`                | `--p-color-bg-app-selected`                                                                                                                                                                                                                                                |
| `--p-background-pressed`                 | `--p-color-bg-app-active`                                                                                                                                                                                                                                                  |
| `--p-background-hovered`                 | `--p-color-bg-app-hover`                                                                                                                                                                                                                                                   |
| `--p-background`                         | `--p-color-bg-app`                                                                                                                                                                                                                                                         |
| `--p-backdrop`                           | `rgba(0, 0, 0, 0.5)`                                                                                                                                                                                                                                                       |
| `--p-action-secondary-pressed-dark`      | `--p-color-bg-inverse-active`                                                                                                                                                                                                                                              |
| `--p-action-secondary-pressed`           | `--p-color-bg-subdued-active`                                                                                                                                                                                                                                              |
| `--p-action-secondary-hovered-dark`      | `--p-color-bg-inverse-hover`                                                                                                                                                                                                                                               |
| `--p-action-secondary-hovered`           | `--p-color-bg-subdued-hover`                                                                                                                                                                                                                                               |
| `--p-action-secondary-disabled`          | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-action-secondary-depressed`         | `--p-color-bg-inset-strong`                                                                                                                                                                                                                                                |
| `--p-action-secondary`                   | `--p-color-bg-subdued`                                                                                                                                                                                                                                                     |
| `--p-action-primary-pressed`             | `--p-color-bg-primary-active`                                                                                                                                                                                                                                              |
| `--p-action-primary-hovered`             | `--p-color-bg-primary-hover`                                                                                                                                                                                                                                               |
| `--p-action-primary-disabled`            | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-action-primary-depressed`           | `--p-color-bg-primary-active`                                                                                                                                                                                                                                              |
| `--p-action-primary`                     | For `color` properties: `--p-color-text-primary`<br> For `background` properties: `--p-color-bg-primary` <br> For `border` properties: `--p-color-border-primary` <br> For `fill` properties: `--p-color-icon-primary`                                                     |
| `--p-action-critical-pressed`            | `--p-color-bg-critical-strong-active`                                                                                                                                                                                                                                      |
| `--p-action-critical-hovered`            | `--p-color-bg-critical-strong-hover`                                                                                                                                                                                                                                       |
| `--p-action-critical-disabled`           | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-action-critical-depressed`          | `--p-color-bg-critical-strong-active`                                                                                                                                                                                                                                      |
| `--p-action-critical`                    | `--p-color-bg-critical-strong`                                                                                                                                                                                                                                             |

### Depth

To replace these deprecated depth custom properties you can run the [v11-styles-replace-custom-property-depth](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-depth) migration.

| Deprecated Token                   | Replacement Value     |
| ---------------------------------- | --------------------- |
| `--p-shadow-transparent`           | `--p-shadow-none`     |
| `--p-shadow-faint`                 | `--p-shadow-sm`       |
| `--p-shadow-base`                  | `--p-shadow-md`       |
| `--p-shadow-deep`                  | `--p-shadow-md`       |
| `--p-shadow-button`                | `--p-shadow-sm`       |
| `--p-shadow-top-bar`               | `--p-shadow-sm`       |
| `--p-shadow-card`                  | `--p-shadow-md`       |
| `--p-shadow-popover`               | `--p-shadow-xl`       |
| `--p-shadow-layer`                 | `--p-shadow-2xl`      |
| `--p-shadow-modal`                 | `--p-shadow-2xl`      |
| `--p-shadows-inset-button`         | `--p-shadow-none`     |
| `--p-shadows-inset-button-pressed` | `--p-shadow-inset-md` |

### Legacy

To replace these deprecated legacy custom properties you can run the [v11-styles-replace-custom-property-legacy](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-legacy) migration.

| Deprecated Token                     | Replacement Value                                                                                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--p-override-loading-z-index`       | `--p-z-index-6`                                                                                                                                       |
| `--p-choice-size`                    | `20px` / `1.25rem`                                                                                                                                    |
| `--p-icon-size-small`                | `8px` / `0.5rem`                                                                                                                                      |
| `--p-icon-size-medium`               | `20px` / `1.25rem`                                                                                                                                    |
| `--p-choice-margin`                  | `--p-space-025`                                                                                                                                       |
| `--p-control-border-width`           | `--p-border-width-2`                                                                                                                                  |
| `--p-banner-border-default`          | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-strong), inset 0 0 0 (--p-border-width-1) var(--p-color-border-strong)`                     |
| `--p-banner-border-success`          | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-success-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-success-subdued)`   |
| `--p-banner-border-highlight`        | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-info-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-info-subdued)`         |
| `--p-banner-border-warning`          | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-caution-subdued), inset 0 0 0 (--p-border-width-1)var(--p-color-border-caution-subdued)`    |
| `--p-banner-border-critical`         | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-critical-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-critical-subdued)` |
| `--p-thin-border-subdued`            | `var(--p-border-width-1) solid var(--p-color-border-subdued)`                                                                                         |
| `--p-text-field-spinner-offset`      | `2px` / `0.125rem`                                                                                                                                    |
| `--p-text-field-focus-ring-offset`   | `-4px` / `-0.25rem`                                                                                                                                   |
| `--p-button-group-item-spacing`      | `calc(-1 * var(--p-space-025))`                                                                                                                       |
| `--p-range-slider-thumb-size-base`   | `16px` / `1rem`                                                                                                                                       |
| `--p-range-slider-thumb-size-active` | `24px` / `1.5rem`                                                                                                                                     |
| `--p-frame-offset`                   | `0`                                                                                                                                                   |

### Motion

To replace these deprecated motion custom properties you can run the [v11-styles-replace-custom-property-motion](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-motion) migration.

| Deprecated Token             | Replacement Value                   |
| ---------------------------- | ----------------------------------- |
| `--p-linear`                 | `--p-motion-linear`                 |
| `--p-ease-in-out`            | `--p-motion-ease-in-out`            |
| `--p-ease-out`               | `--p-motion-ease-out`               |
| `--p-ease-in`                | `--p-motion-ease-in`                |
| `--p-ease`                   | `--p-motion-ease`                   |
| `--p-duration-0`             | `--p-motion-duration-0`             |
| `--p-duration-50`            | `--p-motion-duration-50`            |
| `--p-duration-100`           | `--p-motion-duration-100`           |
| `--p-duration-150`           | `--p-motion-duration-150`           |
| `--p-duration-200`           | `--p-motion-duration-200`           |
| `--p-duration-250`           | `--p-motion-duration-250`           |
| `--p-duration-300`           | `--p-motion-duration-300`           |
| `--p-duration-350`           | `--p-motion-duration-350`           |
| `--p-duration-400`           | `--p-motion-duration-400`           |
| `--p-duration-450`           | `--p-motion-duration-450`           |
| `--p-duration-500`           | `--p-motion-duration-500`           |
| `--p-duration-5000`          | `--p-motion-duration-5000`          |
| `--p-keyframes-bounce`       | `--p-motion-keyframes-bounce`       |
| `--p-keyframes-fade-in`      | `--p-motion-keyframes-fade-in`      |
| `--p-keyframes-pulse`        | `--p-motion-keyframes-pulse`        |
| `--p-keyframes-spin`         | `--p-motion-keyframes-spin`         |
| `--p-keyframes-appear-above` | `--p-motion-keyframes-appear-above` |
| `--p-keyframes-appear-below` | `--p-motion-keyframes-appear-below` |

### Z-index

To replace these deprecated z-index custom properties you can run the [v11-styles-replace-custom-property-zindex](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-zindex) migration.

| Deprecated Token | Replacement Value |
| ---------------- | ----------------- |
| `--p-z-1`        | `--p-z-index-1`   |
| `--p-z-2`        | `--p-z-index-2`   |
| `--p-z-3`        | `--p-z-index-3`   |
| `--p-z-4`        | `--p-z-index-4`   |
| `--p-z-5`        | `--p-z-index-5`   |
| `--p-z-6`        | `--p-z-index-6`   |
| `--p-z-7`        | `--p-z-index-7`   |
| `--p-z-8`        | `--p-z-index-8`   |
| `--p-z-9`        | `--p-z-index-9`   |
| `--p-z-10`       | `--p-z-index-10`  |
| `--p-z-11`       | `--p-z-index-11`  |
| `--p-z-12`       | `--p-z-index-12`  |
