# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### New components

### Enhancements

### Bug fixes

- Fixed vertical misalignment in `Banner.Header`([#870](https://github.com/Shopify/polaris-react/pull/870))
- Removed a duplicate `activatorWrapper` in `Popover` when destructuring props ([#916](https://github.com/Shopify/polaris-react/pull/916))
- Fixed `Banner` secondaryAction content wrapping in Firefox ([#719](https://github.com/Shopify/polaris-react/pull/719))
- Added `onKeyPress`, `onKeyDown`, and `onKeyUp` to `Button` ([#860](https://github.com/Shopify/polaris-react/pull/860))
- Added `monochrome` prop to `Button` and `Link` component ([#821](https://github.com/Shopify/polaris-react/pull/821))
- Updated `Frame` layout and made `TopBar.UserMenu` visible on mobile ([#852](https://github.com/Shopify/polaris-react/pull/852))
- Added a `forceRender` prop to `Page` to not delegate to the app bridge TitleBar action ([#695](https://github.com/Shopify/polaris-react/pull/695))
- Changed `Tabs` example to contain children so the `Panel` renders for accessibility ([#893](https://github.com/Shopify/polaris-react/pull/893))
- Fixed timezone not being accounted for in `ResourceList` date filter control ([#710](https://github.com/Shopify/polaris-react/pull/710))
- Removed unnecessary tooltip text in the `TopBar` component ([#859](https://github.com/Shopify/polaris-react/pull/859))

### Documentation

- Added `Stack.Item` properties and description to [style guide](https://polaris.shopify.com)’s ([#772](https://github.com/Shopify/polaris-react/pull/772))
- Added accessibility documentation to the resource list and data table components ([#927](https://github.com/Shopify/polaris-react/pull/927))
- Added accessibility recommendations for the caption component ([#928](https://github.com/Shopify/polaris-react/pull/928/))

### Development workflow

- Improved build speed by adjusting our rollup workflow ([#912](https://github.com/Shopify/polaris-react/pull/912)) and not optimizing svgs in the node_modules folder ([#920](https://github.com/Shopify/polaris-react/pull/920))
- Fixed an issue where deployments would use an old version of Yarn, and open a pull request to polaris-styleguide with thousands of deleted integrity hashes in `yarn.lock` ([#856](https://github.com/Shopify/polaris-react/pull/856))

### Dependency upgrades

- Updated App Bridge to version 1.0.3 ([#844](https://github.com/Shopify/polaris-react/pull/844))

### Code quality

### Deprecations

- Deprecated `Navigation.UserMenu` in favor of `TopBar.UserMenu` ([#849](https://github.com/Shopify/polaris-react/pull/849))
