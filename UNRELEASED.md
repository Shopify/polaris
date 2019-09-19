# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Updated `trigger` to use `act` ([#2141](https://github.com/Shopify/polaris-react/pull/2141))
- Changed border color of `Drop zone` to have better contrast from the background and to be lighter when disabled ([#2119](https://github.com/Shopify/polaris-react/pull/2119))
- Adjusted search results overlay to take up 100% height of the screen on small screens and to match the width of the search bar on large screens. ([#2103](https://github.com/Shopify/polaris-react/pull/2103))
- Added skipToContentTarget prop to Frame component ([#2080](https://github.com/Shopify/polaris-react/pull/2080))

### Bug fixes

- Fixed vertical alignment of Tabs disclosure activator ([#2087](https://github.com/Shopify/polaris-react/pull/2087))
- Fixed `Modal` setting an invalid `id` on `aria-labelledby` when no `title` is set ([#2115](https://github.com/Shopify/polaris-react/pull/2115))
- Fixed error warnings in `Card` and `RollupActions` tests ([#2125](https://github.com/Shopify/polaris-react/pull/2125))
- Fixed modal border not being visible in Windows high contrast mode ([#2114](https://github.com/Shopify/polaris-react/pull/2114))
- Added default accessibility label from `ResourceItem` ([#2097](https://github.com/Shopify/polaris-react/pull/2097))
- Reverted `Page.primaryAction` forcing `primary` to be `true` ([#2137](https://github.com/Shopify/polaris-react/pull/2137))
- Removed `React.Children.only` from `AppProvider`and `ThemeProvider` ([#2121](https://github.com/Shopify/polaris-react/pull/2121))
- Fixed visual bug where button width changed in Filters component ([#1853](https://github.com/Shopify/polaris-react/issues/1853))

### Documentation

- Converted `Autocomplete`, `Banner`, and `ChoiceList` examples to functional components ([#2127](https://github.com/Shopify/polaris-react/pull/2127))
- Converted `Collapsible`, `ColorPicker`, and `DataTable` examples to functional components ([#2128](https://github.com/Shopify/polaris-react/pull/2128))
- Converted `Modal`, `OptionList`, and `Popover` examples to functional components ([#2131](https://github.com/Shopify/polaris-react/pull/2131))
- Converted `RadioButton`, `RangeSlider`, and `ResourceItem` examples to functional components ([#2132](https://github.com/Shopify/polaris-react/pull/2132))
- Converted `ResourceList`, `ResourcePicker`, and `Select` examples to functional components ([#2133](https://github.com/Shopify/polaris-react/pull/2133))
- Converted `TextField`, `Toast`, and `TopBar` examples to functional components ([#2135](https://github.com/Shopify/polaris-react/pull/2135))
- Updated the `withContext` section in the [v3 to v4 migration guide](https://github.com/Shopify/polaris-react/blob/master/documentation/guides/migrating-from-v3-to-v4.md) ([#2124](https://github.com/Shopify/polaris-react/pull/2124))
- Clarify when to use the `external` prop on the `Link` component ([#2153](https://github.com/Shopify/polaris-react/pull/2153))

### Development workflow

- Added [`yarn splash` (beta)](/scripts/splash/), a command-line interface to observe the splash zone of a change across the component library ([#2113](https://github.com/Shopify/polaris-react/pull/2113))
- Updated Storybook – [v5.2 release notes](https://medium.com/storybookjs/storybook-5-2-794958b9b111) ([#2157](https://github.com/Shopify/polaris-react/pull/2157))

### Dependency upgrades

### Code quality

- Added `useLazyRef` hook to use while building components ([#2166](https://github.com/Shopify/polaris-react/pull/2166))
- Migrated `FilterCreator` to use hooks instead of withAppProvider ([#2156](https://github.com/Shopify/polaris-react/pull/2156))
- Created a custom error for lack of context providers ([#2136](https://github.com/Shopify/polaris-react/pull/2136))
- Migrated `ContextualSaveBar` to use hooks instead of `withAppProvider` ([#2091](https://github.com/Shopify/polaris-react/pull/2091))
- Migrated `RangeSlider`, `ScrollLock` and `TopBar.SearchField` to use hooks instead of withAppProvider ([#2083](https://github.com/Shopify/polaris-react/pull/2083))
- Updated `ResourceItem` to no longer rely on withAppProvider ([#2094](https://github.com/Shopify/polaris-react/pull/2094))
- Migrated `TextField` and `Resizer` to use hooks ([#1997](https://github.com/Shopify/polaris-react/pull/1997))
- Migrated `Avatar` to use hooks instead of withAppProvider ([#2067](https://github.com/Shopify/polaris-react/pull/2067))

### Deprecations
