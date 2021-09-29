# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

### Bug fixes

- Fixed a bug in `Banner` where loading state wasn't getting passed to `primaryAction` ([#4338](https://github.com/Shopify/polaris-react/pull/4338))
- Fixed `Popover` not correctly positioning itself ([#4357](https://github.com/Shopify/polaris-react/pull/4357))
- Fixed a bug `TextField` where Safari would render the incorrect text color ([#4344](https://github.com/Shopify/polaris-react/pull/4344))
- Fixed screen readers reading out the clear button in `TextField` when there is no input ([#4369](https://github.com/Shopify/polaris-react/pull/4369))
- Fix bug in Safari where `Button` text is gray instead of white after changing state from disabled to enabled ([#4270](https://github.com/Shopify/polaris-react/pull/4270))
- Bring back borders on the `IndexTable` sticky cells ([#4150](https://github.com/Shopify/polaris-react/pull/4150))
- Adjust `IndexTable` sticky z-index to avoid collisions with focused `TextField` ([#4150](https://github.com/Shopify/polaris-react/pull/4150))
- Adjust `IndexTable` rows to have a grey hover state when unselected ([#4359](https://github.com/Shopify/polaris-react/pull/4359))
- Properly support `selected` prop for `Navigation.Item` when `url` prop is not specified ([#4375](https://github.com/Shopify/polaris-react/pull/4375))
- Fixed an accessibility bug in `Icon` where `aria-label` was used incorrectly ([#4414](https://github.com/Shopify/polaris-react/pull/4414))
- Fixed a bug in `Option` where the label would cause scrollbars to appear instead of wrapping ([#4411](https://github.com/Shopify/polaris-react/pull/4411))
- Restored pointing device interactivity to prefix and suffix slots of the `TextField` component ([#4477](https://github.com/Shopify/polaris-react/pull/4477))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
