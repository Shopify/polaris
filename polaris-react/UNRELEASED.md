# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Ported internal breakpoint and layout functions to SCSS variables ([#5722](https://github.com/Shopify/polaris/pull/5722))
- Added `extraSmall` to the available sizes of the `Thumbnail` and `SkeletonThumbnail` ([#5770](https://github.com/Shopify/polaris/pull/5770))
- Added support for tooltips on Navigation items ([#5750](https://github.com/Shopify/polaris/pull/5750))
- Change types for DataTable `totalsName` prop to allow for ReactNode ([#5454](https://github.com/Shopify/polaris/pull/5365/))
- Implemented accessibility role and attributes in `SettingToggle` ([#5470](https://github.com/Shopify/polaris/pull/5470))
- Updated experimental breakpoint values ([#5804](https://github.com/Shopify/polaris/pull/5804))
- Added `useEventListener` hook ([#5810](https://github.com/Shopify/polaris/pull/5810))

### Bug fixes

- Fixed vertical scroll on small screens in `EmptyState` ([#5779](https://github.com/Shopify/polaris/pull/5779))
- Fixed broken links in documentation ([#5824](https://github.com/Shopify/polaris/pull/5824))
- Fixed key prop error introduced in [sticky header](https://github.com/Shopify/polaris/pull/5494) ([#5826](https://github.com/Shopify/polaris/pull/5826))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations

- Deprecated `EventListener` in favor of `useEventListener` hook ([#5810](https://github.com/Shopify/polaris/pull/5810))
