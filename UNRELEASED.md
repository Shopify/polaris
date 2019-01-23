# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### New components

### Enhancements

### Bug fixes

- Removed a duplicate `activatorWrapper` in `Popover` when destructuring props ([#916](https://github.com/Shopify/polaris-react/pull/916))
- Fixed `Banner` secondaryAction content wrapping in Firefox ([#719](https://github.com/Shopify/polaris-react/pull/719))
- Added `onKeyPress`, `onKeyDown`, and `onKeyUp` to `Button` ([#860](https://github.com/Shopify/polaris-react/pull/860))
- Added `monochrome` prop to `Button` and `Link` component ([#821](https://github.com/Shopify/polaris-react/pull/821))
- Updated `Frame` layout and made `TopBar.UserMenu` visible on mobile ([#852](https://github.com/Shopify/polaris-react/pull/852))
- Changed `Tabs` example to contain children so the `Panel` renders for accessibility ([#893](https://github.com/Shopify/polaris-react/pull/893))
- Fixed timezone not being accounted for in `ResourceList` date filter control ([#710](https://github.com/Shopify/polaris-react/pull/710))

### Documentation

- Added `Stack.Item` properties and description to [style guide](https://polaris.shopify.com)’s ([#772](https://github.com/Shopify/polaris-react/pull/772))
- Added accessibility documentation to the `Resource list` and `Data table` components ([#...]())

### Development workflow

- Improve Build speed ([#912](https://github.com/Shopify/polaris-react/pull/912) and [#920](https://github.com/Shopify/polaris-react/pull/920))

### Dependency upgrades

- Updated App Bridge to version 1.0.3 ([#844](https://github.com/Shopify/polaris-react/pull/844))

### Code quality

### Deprecations

- Deprecated `Navigation.UserMenu` in favor of `TopBar.UserMenu` ([#849](https://github.com/Shopify/polaris-react/pull/849))
