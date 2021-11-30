# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

- Removed `ThemeProvider` component ([#4642](https://github.com/Shopify/polaris-react/pull/4642))
- Removed custom and unnecessary font weight properties ([#4687](https://github.com/Shopify/polaris-react/pull/4687))
- Moved `logo` from `ThemeProvider` to `Frame` context ([#4667](https://github.com/Shopify/polaris-react/pull/4667))
- Moved `frameOffset` from `ThemeProvider` to `offset` prop on `Frame` ([#4727](https://github.com/Shopify/polaris-react/pull/4727))
- Removed the deprecated `secondaryAction` prop on `SkeletonPage` ([#4742](https://github.com/Shopify/polaris-react/pull/4742))
- Removed filter sass function ([#4676](https://github.com/Shopify/polaris-react/pull/4676))
- Removed color-icon() mixin ([#4676](https://github.com/Shopify/polaris-react/pull/4676))
- Renamed `--p-duration-1-0-0` and `--p-duration-1-5-0` to `--p-duration-100` and `--p-duration-150`.
- Removed miscellaneous css custom properties ([#4686](https://github.com/Shopify/polaris-react/pull/4686))
- Removed `skeleton-shimmer` mixin ([#4462](https://github.com/Shopify/polaris-react/pull/4462))
- Remove `color-multiply` function ([#4714](https://github.com/Shopify/polaris-react/pull/4714))
- Remove `$color-palette-data` global variable ([#4714](https://github.com/Shopify/polaris-react/pull/4714))
- Removed the easing() function and replaced any instances with tokens ([#4698](https://github.com/Shopify/polaris-react/pull/4698))
- Removed `$easing-data` global variable ([#4698](https://github.com/Shopify/polaris-react/pull/4698))
- Removed the `duration()` scss function and replaced any instances with tokens ([#4699](https://github.com/Shopify/polaris-react/pull/4699))
- Removed the `$duration-data` global variable ([#4699](https://github.com/Shopify/polaris-react/pull/4699))
- Removed the `spacing()` scss function and replaced any instances with tokens ([#4691](https://github.com/Shopify/polaris-react/pull/4691/))
- Removed the `px()` scss function ([#4751](https://github.com/Shopify/polaris-react/pull/4751))
- Removed `z-index()` scss function ([#4753](https://github.com/Shopify/polaris-react/pull/4753))

### New components

- Added `CustomProperties` component ([#4642](https://github.com/Shopify/polaris-react/pull/4642))

### Enhancements

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Replaced font-weight values with tokens ([#4599](https://github.com/Shopify/polaris-react/issues/4599))

### Deprecations
