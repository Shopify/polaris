# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Changed border color of `Drop zone` to have better contrast from the background and to be lighter when disabled ([#2119](https://github.com/Shopify/polaris-react/pull/2119))
- Adjusted search results overlay to take up 100% height of the screen on small screens and to match the width of the search bar on large screens. ([#2103](https://github.com/Shopify/polaris-react/pull/2103))
- Added skipToContentTarget prop to Frame component ([#2080](https://github.com/Shopify/polaris-react/pull/2080))

### Bug fixes

- Fixed vertical alignment of Tabs disclosure activator ([#2087](https://github.com/Shopify/polaris-react/pull/2087))
- Fixed `Modal` setting an invalid `id` on `aria-labelledby` when no `title` is set ([#2115](https://github.com/Shopify/polaris-react/pull/2115))
- Fixed error warnings in `Card` and `RollupActions` tests ([#2125](https://github.com/Shopify/polaris-react/pull/2125))
- Added default accessibility label from `ResourceItem` ([#2097](https://github.com/Shopify/polaris-react/pull/2097))

### Documentation

- Updated the `withContext` section in the [v3 to v4 migration guide](https://github.com/Shopify/polaris-react/blob/master/documentation/guides/migrating-from-v3-to-v4.md) ([#2124](https://github.com/Shopify/polaris-react/pull/2124))

### Development workflow

### Dependency upgrades

### Code quality

- Migrated `ContextualSaveBar` to use hooks instead of `withAppProvider` ([#2091](https://github.com/Shopify/polaris-react/pull/2091))
- Migrated `RangeSlider`, `ScrollLock` and `TopBar.SearchField` to use hooks instead of withAppProvider ([#2083](https://github.com/Shopify/polaris-react/pull/2083))
- Updated `ResourceItem` to no longer rely on withAppProvider ([#2094](https://github.com/Shopify/polaris-react/pull/2094))

### Deprecations
