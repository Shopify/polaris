# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

- Removed `ThemeProvider` component ([#4642](https://github.com/Shopify/polaris-react/pull/4642))
- Removed custom and unnecessary font weight properties ([#4687](https://github.com/Shopify/polaris-react/pull/4687))
- Moved `logo` from `ThemeProvider` to `Frame` context ([#4667](https://github.com/Shopify/polaris-react/pull/4667))
- Moved `frameOffset` from `ThemeProvider` to `offset` prop on `Frame` ([#4727](https://github.com/Shopify/polaris-react/pull/4727))
- Removed the deprecated `secondaryAction` prop on `SkeletonPage` ([#4742](https://github.com/Shopify/polaris-react/pull/4742))
- Removed `filter()` sass function ([#4676](https://github.com/Shopify/polaris-react/pull/4676))
- Removed `color-icon()` mixin ([#4676](https://github.com/Shopify/polaris-react/pull/4676))
- Renamed `--p-duration-1-0-0` and `--p-duration-1-5-0` to `--p-duration-100` and `--p-duration-150`.
- Removed miscellaneous css custom properties ([#4686](https://github.com/Shopify/polaris-react/pull/4686))
- Removed `skeleton-shimmer` mixin ([#4462](https://github.com/Shopify/polaris-react/pull/4462))
- Remove `color-multiply` function ([#4714](https://github.com/Shopify/polaris-react/pull/4714))
- Remove `$color-palette-data` global variable ([#4714](https://github.com/Shopify/polaris-react/pull/4714))
- Removed the `easing()` function and replaced any instances with tokens ([#4698](https://github.com/Shopify/polaris-react/pull/4698))
- Removed `$easing-data` global variable ([#4698](https://github.com/Shopify/polaris-react/pull/4698))
- Removed the `duration()` scss function and replaced any instances with tokens ([#4699](https://github.com/Shopify/polaris-react/pull/4699))
- Removed the `$duration-data` global variable ([#4699](https://github.com/Shopify/polaris-react/pull/4699))
- Removed the `spacing()` scss function and replaced any instances with tokens ([#4691](https://github.com/Shopify/polaris-react/pull/4691/))
- Removed the `px()` scss function ([#4751](https://github.com/Shopify/polaris-react/pull/4751))
- Removed the `em()` scss function ([#4937](https://github.com/Shopify/polaris-react/pull/4937))
- Removed the `z-index()` scss function ([#4753](https://github.com/Shopify/polaris-react/pull/4753))
- Removed `nonDesignLangaugeCustomProperties` and `designLangaugeCustomProperties` ([#4770](https://github.com/Shopify/polaris-react/pull/4770))
- Removed the `rem()` scss function and any references ([#4761](https://github.com/Shopify/polaris-react/pull/4761/))
- Removed unnecessary `--p-border-radius-` properties and moved border-radius custom properties to tokens ([#4763](https://github.com/Shopify/polaris-react/pull/4763))
- Dropped support for node < 16 ([#4778](https://github.com/Shopify/polaris-react/pull/4778))
- Removed `build/styles` directory from build output ([#4728](https://github.com/Shopify/polaris-react/pull/4728))
- Updated `--global-ribbon-height` CSS custom property to `--pc-frame-global-ribbon-height` ([#4804](https://github.com/Shopify/polaris-react/pull/4804))
- Updated `--p-frame-offset` CSS custom property to `--pc-frame-offset` ([#4804](https://github.com/Shopify/polaris-react/pull/4804))
- Updated all `--top-bar-*` CSS custom properties to `--pc-top-bar-*` ([#4804](https://github.com/Shopify/polaris-react/pull/4804))
- Removed the `border-radius()` function and replaced any instances with tokens ([#4793](https://github.com/Shopify/polaris-react/pull/4793))
- Removed the `shadow()` function (replaced any instances with tokens) and renamed shadow legacy tokens ([#4823](https://github.com/Shopify/polaris-react/pull/4823))
- Removed the `ms-high-contrast-color()` function and replaced any instances with values ([#4938](https://github.com/Shopify/polaris-react/pull/4938))
- Removed the `border()` scss function ([#4934](https://github.com/Shopify/polaris-react/pull/4934))
- Removed the `font-family()` function and replaced any instances with tokens ([#4940](https://github.com/Shopify/polaris-react/pull/4940))
- Removed the `available-names()` scss function ([#4967](https://github.com/Shopify/polaris-react/pull/4967))
- Removed the `unstyled-link()` mixin and replaced any instances with values ([#4951](https://github.com/Shopify/polaris-react/pull/4951))
- Removed the `unstyled-list()` mixin and replaced any instances with values ([#4960](https://github.com/Shopify/polaris-react/pull/4960))

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
