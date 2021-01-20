# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Changed `Label` and `Labelled`’s `label` prop type to `React.ReactNode` instead of `string` ([#3787](https://github.com/Shopify/polaris-react/pull/3787))
- Added `focusable` prop to `Scrollable` for when child content do not have focus ([#3867](https://github.com/Shopify/polaris-react/pull/3867))

### Bug fixes

- Fixed an incorrect translation key for `accessibilityLabel` in `Tooltip`([#3843](https://github.com/Shopify/polaris-react/pull/3843))
- Fix shadows on filled `Button`s not touching the bottom edge ([#3841](https://github.com/Shopify/polaris-react/pull/3841))
- Adjust `Thumbnail` icon color to be subdued ([#3846](https://github.com/Shopify/polaris-react/pull/3846))
- Updated ToastManager to use aria-live 'assertive' for accessibility ([#3837](https://github.com/Shopify/polaris-react/pull/3837))
- Fixed responsiveness of empty search state in `ResourceList` to support user text zoom settings ([#2983](https://github.com/Shopify/polaris-react/pull/2983))
- Fixed `ActionList` not rendering `.active` indicator ([#3854](https://github.com/Shopify/polaris-react/pull/3854))
- Prevent loss of focus when clicking clear all filters in `Filters` ([#3754](https://github.com/Shopify/polaris-react/pull/3754))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
