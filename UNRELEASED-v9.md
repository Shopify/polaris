# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

**CSS custom properties**

- Removed `--p-badge-font-weight` and `--p-button-font-weight` ([#4687](https://github.com/Shopify/polaris-react/pull/4687))
- Renamed `--p-duration-1-0-0` and `--p-duration-1-5-0` to `--p-duration-100` and `--p-duration-150`.
- Removed `--p-override-*` `--p-non-null-content` `--p-badge-mix-blend-mode` `--p-range-slider-thumb-scale` custom properties ([#4686](https://github.com/Shopify/polaris-react/pull/4686))
- Removed `nonDesignLangaugeCustomProperties` and `designLangaugeCustomProperties` ([#4770](https://github.com/Shopify/polaris-react/pull/4770))
- Renamed shadow custom properties ([#4823](https://github.com/Shopify/polaris-react/pull/4823))
- Renamed border radius custom properties ([#4763](https://github.com/Shopify/polaris-react/pull/4763))
- Renamed `--p-icon-size` to `--p-icon-size-small` ([#4990](https://github.com/Shopify/polaris-react/pull/4990))
- Updated `--global-ribbon-height` to `--pc-frame-global-ribbon-height` ([#4804](https://github.com/Shopify/polaris-react/pull/4804))
- Updated `--p-frame-offset` to `--pc-frame-offset` ([#4804](https://github.com/Shopify/polaris-react/pull/4804))
- Updated `--top-bar-*` to `--pc-top-bar-*` ([#4804](https://github.com/Shopify/polaris-react/pull/4804))

**Sass functions and mixins**

- Removed the `color()` function ([#4696](https://github.com/Shopify/polaris-react/pull/4696))
- Removed the `filter()` function ([#4676](https://github.com/Shopify/polaris-react/pull/4676))
- Removed the `px()` function ([#4751](https://github.com/Shopify/polaris-react/pull/4751))
- Removed the `em()` function ([#4937](https://github.com/Shopify/polaris-react/pull/4937))
- Removed the `rem()` function ([#4761](https://github.com/Shopify/polaris-react/pull/4761/))
- Removed the `color-multiply` function ([#4714](https://github.com/Shopify/polaris-react/pull/4714))
- Removed the `z-index()` function ([#4753](https://github.com/Shopify/polaris-react/pull/4753))
- Removed the `border()` function ([#4934](https://github.com/Shopify/polaris-react/pull/4934))
- Removed the `available-names()` function ([#4967](https://github.com/Shopify/polaris-react/pull/4967))
- Removed the `map-extend` function ([#4970](https://github.com/Shopify/polaris-react/pull/4970))
- Removed the `spacing()` function and replaced with tokens ([#4691](https://github.com/Shopify/polaris-react/pull/4691/))
- Removed the `easing()` function and replaced with tokens ([#4698](https://github.com/Shopify/polaris-react/pull/4698))
- Removed the `duration()` function and replaced with tokens ([#4699](https://github.com/Shopify/polaris-react/pull/4699))
- Removed the `border-radius()` function and replaced with tokens ([#4793](https://github.com/Shopify/polaris-react/pull/4793))
- Removed the `shadow()` function and replaced with tokens ([#4823](https://github.com/Shopify/polaris-react/pull/4823))
- Removed the `font-family()` function and replaced with tokens ([#4940](https://github.com/Shopify/polaris-react/pull/4940))
- Removed the `ms-high-contrast-color()` function and replaced with values ([#4938](https://github.com/Shopify/polaris-react/pull/4938))
- Removed the `color-icon()` mixin ([#4676](https://github.com/Shopify/polaris-react/pull/4676))
- Removed the `skeleton-shimmer` mixin ([#4462](https://github.com/Shopify/polaris-react/pull/4462))
- Removed the `state()` mixin ([#4989](https://github.com/Shopify/polaris-react/pull/4989))
- Removed the `skeleton-page-header-layout` mixin ([#4991](https://github.com/Shopify/polaris-react/pull/4991))
- Removed the `skeleton-page-secondary-actions-layout` mixin ([#4991](https://github.com/Shopify/polaris-react/pull/4991))
- Removed the `unstyled-link()` mixin and replaced with values ([#4951](https://github.com/Shopify/polaris-react/pull/4951))
- Removed the `unstyled-list()` mixin and replaced with values ([#4960](https://github.com/Shopify/polaris-react/pull/4960))
- Removed the `high-contrast-outline()` and `high-contrast-border()` mixins and replaced with tokens and values ([#4962](https://github.com/Shopify/polaris-react/pull/4962))
- Removed the `when-printing`, `when-not-printing`, `hidden-when-printing`, and `print-hidden` scss mixins ([#4995](https://github.com/Shopify/polaris-react/pull/4995))
- Replaced the `icon-size()` function with the `--p-icon-size-medium` custom property ([#4990](https://github.com/Shopify/polaris-react/pull/4990))
- Removed the public scss api ([#4993](https://github.com/Shopify/polaris-react/pull/4993))

**Sass global variables**

- Removed `$color-palette-data` ([#4714](https://github.com/Shopify/polaris-react/pull/4714))
- Removed `$easing-data` ([#4698](https://github.com/Shopify/polaris-react/pull/4698))
- Removed `$duration-data` ([#4699](https://github.com/Shopify/polaris-react/pull/4699))

**ThemeProvider**

- Removed `ThemeProvider` component ([#4642](https://github.com/Shopify/polaris-react/pull/4642))
- Moved `logo` from `ThemeProvider` to `Frame` context ([#4667](https://github.com/Shopify/polaris-react/pull/4667))
- Moved `frameOffset` from `ThemeProvider` to `offset` prop on `Frame` ([#4727](https://github.com/Shopify/polaris-react/pull/4727))

**Components**

- Removed the deprecated `secondaryAction` prop on `SkeletonPage` ([#4742](https://github.com/Shopify/polaris-react/pull/4742))

**Development workflow**

- Removed `build/styles` directory from build output ([#4728](https://github.com/Shopify/polaris-react/pull/4728))
- Dropped support for node < 16 ([#4778](https://github.com/Shopify/polaris-react/pull/4778))

### New components

- Added `CustomProperties` component ([#4642](https://github.com/Shopify/polaris-react/pull/4642))

### Enhancements

- Added duration token values between `0` and `500` with `50ms` increments ([#4781](https://github.com/Shopify/polaris-react/pull/4781))
- Aligned easing tokens and values with CSS defaults ([#4790](https://github.com/Shopify/polaris-react/pull/4790))

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

- Removed `@shopify/polaris-tokens` dependency ([#4868](https://github.com/Shopify/polaris-react/pull/4868))

### Code quality

- Replaced font-weight values with tokens ([#4599](https://github.com/Shopify/polaris-react/issues/4599))
- Replaced hardcoded spacing values with spacing tokens ([#4775](https://github.com/Shopify/polaris-react/pull/4775))
- Avoid some usage of `/` for division in preparation for dart-sass support [#4933](https://github.com/Shopify/polaris-react/pull/4933))

### Deprecations
