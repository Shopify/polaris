# Unreleased changes for version 4.0.0

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

- Increased peer-dependencies on `react` and `react-dom` to 16.8.6 to enable the use of hooks ([#1525](https://github.com/Shopify/polaris-react/pull/1525))

### New components

### Enhancements

### Design updates

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

- Removed `@types/prop-types` and `prop-types` ([#1505](https://github.com/Shopify/polaris-react/pull/1505))
- Updated`react` to 16.8.6 and `enzyme` to 3.9.1 ([#1392](https://github.com/Shopify/polaris-react/pull/1392))

### Code quality

- Remove `withRef` and `withContext` from `DropZone.FileUpload` ([#1491](https://github.com/Shopify/polaris-react/pull/1491))
- Updated `OptionList` to no longer use `componentWillReceiveProps`([#1557](https://github.com/Shopify/polaris-react/pull/1557))
- Updated all our context files to export react context rather than a provider and consumer ([#1459](https://github.com/Shopify/polaris-react/pull/1459))
- Upgraded the `Autocomplete` component from legacy context API to use createContext ([#1403](https://github.com/Shopify/polaris-react/pull/1403))
- Removed testID warning in tests ([#1447](https://github.com/Shopify/polaris-react/pull/1447))
- Updated `ThemeProvider` to use the new context api ([#1396](https://github.com/Shopify/polaris-react/pull/1396))
- Updated `AppProvider` to no longer use `componentWillReceiveProps`([#1255](https://github.com/Shopify/polaris-react/pull/1255))
- Removed `withContext` from `Scrollable.ScrollTo` and added a test to boost coverage ([#1499](https://github.com/Shopify/polaris-react/pull/1499))
- Upgraded the `Navigation` component from legacy context API to use createContext ([#1402](https://github.com/Shopify/polaris-react/pull/1402))
- Updated `ThemeProvider` to no longer use `componentWillReceiveProps`([#1254](https://github.com/Shopify/polaris-react/pull/1254))
- Removed unused context from `Scrollable` ([#1253](https://github.com/Shopify/polaris-react/pull/1253))
- Removed `withContext` from `Loading` ([#1497](https://github.com/Shopify/polaris-react/pull/1497))
- Removed `withRef` from `UnstyledLink` ([#1501](https://github.com/Shopify/polaris-react/pull/1501))
- Upgraded the `Banner`, `Card`, and `Modal` components from legacy context API to use createContext ([#786](https://github.com/Shopify/polaris-react/pull/786))
- Refactored `Frame` and its subcomponents to use the `createContext` API instead of legacy context ([#803](https://github.com/Shopify/polaris-react/pull/803))
- Removed `withContext` from `Toast` ([#1494](https://github.com/Shopify/polaris-react/pull/1494))

### Deprecations
