# Migrating from v10 to v11

Polaris v11.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v11.0.0)) features...

## Table of Contents

- [Node support](#node-support)
- [Components](#components)
  - [Removed deprecated Collapsible argument](#removed-deprecated-collapsible-argument)
  - [Removed KonamiCode component](#removed-konamicode-component)
- [Tokens](#tokens)

## Node support

NodeJS version 14 is no longer supported. NodeJS 18 is recommended and 16 is the minimum supported version.

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

| Deprecated Token                     | Replacement Value                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `--p-border-radius-base`             | `--p-border-radius-1`                                                                                |
| `--p-border-radius-large`            | `--p-border-radius-2`                                                                                |
| `--p-border-radius-half`             | `--p-border-radius-full`                                                                             |
| `--p-shadow-transparent`             | `0 0 0 0 transparent`                                                                                |
| `--p-duration-0`                     | `0ms`                                                                                                |
| `--p-space-0`                        | `0`                                                                                                  |
| `--p-z-1`                            | `--p-z-index-1`                                                                                      |
| `--p-z-2`                            | `--p-z-index-2`                                                                                      |
| `--p-z-3`                            | `--p-z-index-3`                                                                                      |
| `--p-z-4`                            | `--p-z-index-4`                                                                                      |
| `--p-z-5`                            | `--p-z-index-5`                                                                                      |
| `--p-z-6`                            | `--p-z-index-6`                                                                                      |
| `--p-z-7`                            | `--p-z-index-7`                                                                                      |
| `--p-z-8`                            | `--p-z-index-8`                                                                                      |
| `--p-z-9`                            | `--p-z-index-9`                                                                                      |
| `--p-z-10`                           | `--p-z-index-10`                                                                                     |
| `--p-z-11`                           | `--p-z-index-11`                                                                                     |
| `--p-z-12`                           | `--p-z-index-12`                                                                                     |
| `--p-override-loading-z-index`       | `--p-z-index-6`                                                                                      |
| `--p-choice-size`                    | `20px`                                                                                               |
| `--p-icon-size-small`                | `8px`                                                                                                |
| `--p-icon-size-medium`               | `20px`                                                                                               |
| `--p-choice-margin`                  | `--p-space-025`                                                                                      |
| `--p-control-border-width`           | `--p-border-radius-05`                                                                               |
| `--p-banner-border-default`          | `inset 0 1px 0 0 var(--p-border-strong), inset 0 0 0 1px var(--p-border-strong)`                     |
| `--p-banner-border-success`          | `inset 0 1px 0 0 var(--p-border-success-subdued), inset 0 0 0 1px var(--p-border-success-subdued)`   |
| `--p-banner-border-highlight`        | `inset 0 1px 0 0 var(--p-border-info-subdued), inset 0 0 0 1px var(--p-border-info-subdued)`         |
| `--p-banner-border-warning`          | `inset 0 1px 0 0 var(--p-border-caution-subdued), inset 0 0 0 1px var(--p-border-caution-subdued)`   |
| `--p-banner-border-critical`         | `inset 0 1px 0 0 var(--p-border-critical-subdued), inset 0 0 0 1px var(--p-border-critical-subdued)` |
| `--p-thin-border-subdued`            | `--p-border-base`                                                                                    |
| `--p-text-field-spinner-offset`      | `2px`                                                                                                |
| `--p-text-field-focus-ring-offset`   | `-4px`                                                                                               |
| `--p-button-group-item-spacing`      | `calc(-1 * var(--p-space-025))`                                                                      |
| `--p-range-slider-thumb-size-base`   | `16px`                                                                                               |
| `--p-range-slider-thumb-size-active` | `24px`                                                                                               |
| `--p-frame-offset`                   | `0`                                                                                                  |
