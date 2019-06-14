# Unreleased changes for version 4.0.0

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

- Increased peer-dependencies on `react` and `react-dom` to 16.8.6 to enable the use of hooks ([#1525](https://github.com/Shopify/polaris-react/pull/1525))
- We now use default imports for React. Applications that consume polaris using sewing-kit shall need to enable [`esModuleInterop`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop) in their `tsconfig.json` files. ([#1523](https://github.com/Shopify/polaris-react/pull/1523))
- `ChoiceList` `title` is required for accessibility. It can be hidden with `titleHidden`. ([#1575](https://github.com/Shopify/polaris-react/pull/1575))
- Remove the WithRef component. This was never documented and was intended for internal use only but was part of our public API ([#1610](https://github.com/Shopify/polaris-react/pull/1610)).
- Remove the WithContext component. This was never documented and was intended for internal use only but was part of our public API ([#1641](https://github.com/Shopify/polaris-react/pull/1641)).
- Removed support for passing a string into `<Icon source>` to load a bundled icon. You must load the required icon directly from `@shopify/polaris-icons` instead ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed support for passing a "SvgSource" shaped object into `<Icon source>` to load an icon imported using Shopify's legacy icon loader. You must update sewing-kit to at least v0.82.0 which replaced the legacy loader with using SVGR ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed support for passing a React Element into `<Icon source>`. You must pass in a React Component that returns an SVG element instead. ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed support for `<Icon untrusted>`. Passing a string into `source` will now always load an untrusted icon, you don't need that additional property. ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Now `i18n` is a required prop on `AppProvider`. [Usage instructions](https://polaris.shopify.com/components/structure/app-provider#using-translations) are included in the `AppProvider` docs ([#1530](https://github.com/Shopify/polaris-react/pull/1530))

### New components

### Enhancements

### Design updates

### Bug fixes

- Updated translation.yml with the new locales path ([#1649](https://github.com/Shopify/polaris-react/pull/1649))
- Fixed a bug that affected sizing and spacing of elements in some writing systems (notably Chinese, Japanese, and Korean) ([#1590](https://github.com/Shopify/polaris-react/pull/1590))
- Fixed a bug when converting `em` units to `rem` units ([#1590](https://github.com/Shopify/polaris-react/pull/1590))

### Documentation

### Development workflow

- Created `toBeDisabled`, `mountWithContext` and added custom testing matchers ([#1596](https://github.com/Shopify/polaris-react/pull/1596))

### Dependency upgrades

- Added `@shopify/react-testing` ([#1596](https://github.com/Shopify/polaris-react/pull/1596))
- Removed`@shopify/css-utilities` ([#1586](https://github.com/Shopify/polaris-react/pull/1586))
- Removed `@types/prop-types` and `prop-types` ([#1505](https://github.com/Shopify/polaris-react/pull/1505))
- Updated`react` to 16.8.6 and `enzyme` to 3.9.1 ([#1392](https://github.com/Shopify/polaris-react/pull/1392))

### Code quality

- Added hooks to storybooks scope ([#1672](https://github.com/Shopify/polaris-react/pull/1672))
- Simplified `WithinContentContainer` context type ([#1602](https://github.com/Shopify/polaris-react/pull/1602))
- Remove `withRef` and `withContext` from `DropZone.FileUpload` ([#1491](https://github.com/Shopify/polaris-react/pull/1491))
- Updated `PositionedOverlay` to no longer use `componentWillReceiveProps`([#1621](https://github.com/Shopify/polaris-react/pull/1621))
- Updated `OptionList` to no longer use `componentWillReceiveProps`([#1557](https://github.com/Shopify/polaris-react/pull/1557))
- Updated all our context files to export react context rather than a provider and consumer ([#1459](https://github.com/Shopify/polaris-react/pull/1459))
- Upgraded the `Autocomplete` component from legacy context API to use createContext ([#1403](https://github.com/Shopify/polaris-react/pull/1403))
- Removed `withContext` from `Navigation.Item` ([#1502](https://github.com/Shopify/polaris-react/pull/1502))
- Alphabetized component export order and kebab-case files ([#1674](https://github.com/Shopify/polaris-react/pull/1674))
- Removed testID warning in tests ([#1447](https://github.com/Shopify/polaris-react/pull/1447))
- Updated `ThemeProvider` to use the new context api ([#1396](https://github.com/Shopify/polaris-react/pull/1396))
- Removed `withContext` from `ResourceList.Item` ([#1503](https://github.com/Shopify/polaris-react/pull/1503))
- Updated `AppProvider` to no longer use `componentWillReceiveProps`([#1255](https://github.com/Shopify/polaris-react/pull/1255))
- Removed `withContext` from `Scrollable.ScrollTo` and added a test to boost coverage ([#1499](https://github.com/Shopify/polaris-react/pull/1499))
- Removed `withContext` from `ResourceList.FilterControl` ([#1500](https://github.com/Shopify/polaris-react/pull/1500))
- Upgraded the `Navigation` component from legacy context API to use createContext ([#1402](https://github.com/Shopify/polaris-react/pull/1402))
- Updated `ThemeProvider` to no longer use `componentWillReceiveProps`([#1254](https://github.com/Shopify/polaris-react/pull/1254))
- Removed `withContext` and `withAppProvider` from `ContextualSaveBar` ([#1498](https://github.com/Shopify/polaris-react/pull/1498))
- Removed unused context from `Scrollable` ([#1253](https://github.com/Shopify/polaris-react/pull/1253))
- Removed `withContext` from `Loading` ([#1497](https://github.com/Shopify/polaris-react/pull/1497))
- Removed `withRef` from `UnstyledLink` ([#1501](https://github.com/Shopify/polaris-react/pull/1501))
- Upgraded the `Banner`, `Card`, and `Modal` components from legacy context API to use createContext ([#786](https://github.com/Shopify/polaris-react/pull/786))
- Refactored `Frame` and its subcomponents to use the `createContext` API instead of legacy context ([#803](https://github.com/Shopify/polaris-react/pull/803))
- Removed `withContext` from `Toast` ([#1494](https://github.com/Shopify/polaris-react/pull/1494))
- Update React imports to use the default imports intead of `import * as` ([1523](https://github.com/Shopify/polaris-react/pull/1523))

### Deprecations

- Renamed `singleColumn`on`Page`to`narrowWidth` ([#1606](https://github.com/Shopify/polaris-react/pull/1606)).
