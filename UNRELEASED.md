# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

- Removed `groups` prop on `Select`. Pass groups to the `options` prop instead. ([#1831](https://github.com/Shopify/polaris-react/pull/1831))
- Removed `Autocomplete.ComboBox.TextField` and `Autocomplete.ComboBox.OptionList`. You should use the `Autocomplete.TextField` and `OptionList` components instead. ([#1830](https://github.com/Shopify/polaris-react/pull/1830))
- Removed `secondaryFooterAction` prop on `Card`. Pass an array of secondary actions to the `secondaryFooterActions` prop instead. ([#1831](https://github.com/Shopify/polaris-react/pull/1831))
- Removed `iconBody` prop on `Navigation`. Pass a string to the `icon` prop instead. ([#1831](https://github.com/Shopify/polaris-react/pull/1831))
- Removed the `WithContext` component, as it was an undocumented part of the public API meant for internal use only ([#1641](https://github.com/Shopify/polaris-react/pull/1641))
- Removed the `WithRef` component, as it was an undocumented part of the public API meant for internal use only ([#1610](https://github.com/Shopify/polaris-react/pull/1610))
- Removed support for passing a string into `<Icon source>` to load a bundled icon. You must load the required icon directly from `@shopify/polaris-icons` instead ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed support for passing an `SvgSource` shaped object into `<Icon source>` to load an icon imported using Shopify’s legacy icon loader. You must update sewing-kit to at least v0.82.0 which replaced the legacy loader with using SVGR ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed support for passing a React Element into `<Icon source>`. You must pass in a React Component that returns an SVG element instead. ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed support for `<Icon untrusted>`. Passing a string into `source` will now always load an untrusted icon, you don't need that additional property. ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed `Navigation.UserMenu`. Use `TopBar.UserMenu` instead ([#1599](https://github.com/Shopify/polaris-react/pull/1599))
- Made `ChoiceList`’s `title` prop required to improve accessibility. It can be hidden with `titleHidden`. ([#1575](https://github.com/Shopify/polaris-react/pull/1575))
- Made `AppProvider`’s `i18n` prop required. [Usage instructions](https://polaris.shopify.com/components/structure/app-provider#using-translations) are included in the `AppProvider` docs ([#1530](https://github.com/Shopify/polaris-react/pull/1530))
- Increased peer-dependencies on `react` and `react-dom` to 16.8.6 to enable the use of hooks ([#1525](https://github.com/Shopify/polaris-react/pull/1525))
- Changed the import method for React to use default imports. Applications consuming Polaris using TypeScript must enable [`esModuleInterop`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop) in `tsconfig.json`. ([#1523](https://github.com/Shopify/polaris-react/pull/1523))
- Removed `LinkLikeComponent` type export. Use `AppProviderProps['linkComponent']` instead. ([#1864](https://github.com/Shopify/polaris-react/pull/1864))
- Removed the `Modal.Dialog` and `Tabs.Panel` subcomponents as they were undocumented parts of our public API meant for internal use only. ([#1899](https://github.com/Shopify/polaris-react/pull/1899)).

### Enhancements

- Added a new create-react-app example in typescript demonstrating polaris and react-testing ([#1937](https://github.com/Shopify/polaris-react/pull/1937))
- Exported `AppliedFilterInterface` and `FilterInterface` from `Filters` ([#1924](https://github.com/Shopify/polaris-react/pull/1924))
- Improved color contrast of links inside `Banner` ([#1651](https://github.com/Shopify/polaris-react/pull/1651))
- Add underline to Links and Plain button on hover, so it doesn't rely on color alone for accessibility ([#1885](https://github.com/Shopify/polaris-react/pull/1885))
- Add `onQueryFocus` callback prop to the `Filters` component ([#1948](https://github.com/Shopify/polaris-react/pull/1948))
- Moved `ResourceItem` to its own component ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Updated `ResourceList` sort to show an inline label ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Removed the `tap-highlight-color` for `Buttons` ([#1545](https://github.com/Shopify/polaris-react/pull/1545))

### Bug fixes

- Fixed types merge of `ActionMenu` `MenuAction` and `MenuGroup.actions` ([#1895](https://github.com/Shopify/polaris-react/pull/1895))
- Fixed the activator buttons of `Page` `actionGroups` not toggling the `Popover` `active` state on click [#1905](https://github.com/Shopify/polaris-react/pull/1905)
- Fixed Windows high contrast support of `Badge` `progress` ([#1928](https://github.com/Shopify/polaris-react/pull/1928))
- Fixed `BulkActionButton` from throwing an error in `componentDidMount` ([#1913](https://github.com/Shopify/polaris-react/pull/1913))
- Fixed `ToastManager` from not working correctly in `React.StrictMode` ([#1741](https://github.com/Shopify/polaris-react/pull/1741))
- Updated translation.yml with the new locales path ([#1649](https://github.com/Shopify/polaris-react/pull/1649))
- Fixed accessibility issue with `Tabs` list item presentation role ([#1958](https://github.com/Shopify/polaris-react/pull/1958))
- Removed `Tooltip` on disabled `Pagination` buttons ([#1963](https://github.com/Shopify/polaris-react/pull/1963))
- Fixed accessibility labels on `ResourceList.Item` persistent action disclosure icon ([#1973](https://github.com/Shopify/polaris-react/pull/1973))
- Fixed accessibility issue with `Autocomplete` where keyboard navigation of options was laggy and skipped options([#1887](https://github.com/Shopify/polaris-react/pull/1887))
- Fixed bug where `Autocomplete` was bubbling up the `Enter` key event unexpectedly ([#1887](https://github.com/Shopify/polaris-react/pull/1887))
- Fixed `ContextualSaveBar` actions overflowing on small screens ([#1967](https://github.com/Shopify/polaris-react/pull/1967))
- Fixed cross-origin error being thrown in `Modal` when loading an external app ([#1992](https://github.com/Shopify/polaris-react/pull/1992))

### Documentation

- Updated example section to include new examples and remove old ones ([#1979](https://github.com/Shopify/polaris-react/pull/1979))
- Updated `AppProvider` app bridge example to use our `AppBridgeContext`([#1877](https://github.com/Shopify/polaris-react/pull/1877))
- Updated example for the `ResourceList.Item` persistent actions accessibility labels ([#1973](https://github.com/Shopify/polaris-react/pull/1973))
- Removed `FilterControl` documentation and case studies from `ResourceList` documentation ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Updated `ResourceList` examples to use `Filters` ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Added an example to `Filters` showing the use of `children` ([#1774](https://github.com/Shopify/polaris-react/pull/1774))

### Development workflow

- Added support for React hooks in Storybook ([#1665](https://github.com/Shopify/polaris-react/pull/1665))
- Created `toBeDisabled`, `mountWithContext` and added custom testing matchers ([#1596](https://github.com/Shopify/polaris-react/pull/1596))
- Added `PolarisTestProvider` helper to ease configuration of required Polaris contexts in tests, see [polaris examples](https://github.com/Shopify/polaris-react/tree/master/examples) for usage ([#1810](https://github.com/Shopify/polaris-react/pull/1810))
- Enabled strict mode in TypeScript ([#1883](https://github.com/Shopify/polaris-react/pull/1883))
- Moved to `unpkg.com` for our CDN CSS assets, instead of using `sdks.shopifycdn.com`. Existing URLs will continue to work but new versions will only be available on `unpkg.com` ([#1960](https://github.com/Shopify/polaris-react/pull/1960))
- Added [ChromaUI](https://www.chromaui.com/) integration for previewing Storybook builds, to potentially replace our self-hosted Heroku instance ([#1975](https://github.com/Shopify/polaris-react/pull/1975))

### Dependency upgrades

- Updated `@shopify/polaris` in all examples to 4.0.0-rc.2 ([#1937](https://github.com/Shopify/polaris-react/pull/1937))
- Added `@material-ui/react-transition-group` and removed `react-transition-group` to support `React.StrictMode` ([#1759](https://github.com/Shopify/polaris-react/pull/1759))
- Added `@shopify/react-testing` ([#1596](https://github.com/Shopify/polaris-react/pull/1596))
- Removed`@shopify/css-utilities` ([#1586](https://github.com/Shopify/polaris-react/pull/1586))
- Removed `@types/prop-types` and `prop-types` ([#1505](https://github.com/Shopify/polaris-react/pull/1505))
- Updated`react` to 16.8.6 and `enzyme` to 3.9.1 ([#1392](https://github.com/Shopify/polaris-react/pull/1392))

### Code quality

- Removed mocks in various tests suites that are now redundant ([#1978](https://github.com/Shopify/polaris-react/pull/1978))
- Bumped test coverage in `Collapsible` ([#1929](https://github.com/Shopify/polaris-react/pull/1929))
- Bumped test coverage in `DropZone`, `Frame`, `Icon`, and `Loading` ([#1927](https://github.com/Shopify/polaris-react/pull/1927))
- Removed unused type definitions ([#1862](https://github.com/Shopify/polaris-react/pull/1862))
- Ignored deprecation warnings related to Shopify App Bridge in tests ([#1852](https://github.com/Shopify/polaris-react/pull/1852))
- Updated `withAppProvider` to use a functional component rather than a class component ([#1813](https://github.com/Shopify/polaris-react/pull/1813))
- Updated `Link` to use `useI18n` rather than `withAppProvider` ([#1806](https://github.com/Shopify/polaris-react/pull/1806))
- Updated several components to use hooks instead of `withAppProvider` ([#1797](https://github.com/Shopify/polaris-react/pull/1797))
- Removed `CSSTransition` from `PopoverOverlay` ([#1756](https://github.com/Shopify/polaris-react/pull/1756))
- Updated exports in `src/utilities` and `src/test-utilities` to named exports ([#1717](https://github.com/Shopify/polaris-react/pull/1717))
- Removed test errors and non-deprecation warnings ([#1715](https://github.com/Shopify/polaris-react/pull/1715))
- Enabled `React.StrictMode` in test components and Storybook ([#1709](https://github.com/Shopify/polaris-react/pull/1709))
- Removed all uses of `ReactDOM.findDOMNode` ([#1696](https://github.com/Shopify/polaris-react/pull/1696))
- Enabled `react/no-unsafe` ESLint rule with `checkAliases` ([#1695](https://github.com/Shopify/polaris-react/pull/1695))
- Alphabetized component export order and kebab-case files ([#1674](https://github.com/Shopify/polaris-react/pull/1674))
- Updated `Collapsible` to no longer use `componentWillReceiveProps`([#1670](https://github.com/Shopify/polaris-react/pull/1670))
- Restructured context structure to be more modular ([#1664](https://github.com/Shopify/polaris-react/pull/1664))
- Updated `PositionedOverlay` to no longer use `componentWillReceiveProps`([#1621](https://github.com/Shopify/polaris-react/pull/1621))
- Simplified `WithinContentContainer` context type ([#1602](https://github.com/Shopify/polaris-react/pull/1602))
- Updated `OptionList` to no longer use `componentWillReceiveProps`([#1557](https://github.com/Shopify/polaris-react/pull/1557))
- Refactored `DualThumb` tests ([#1548](https://github.com/Shopify/polaris-react/pull/1548))
- Converted `Sheet` to a functional component ([#1548](https://github.com/Shopify/polaris-react/pull/1548))
- Removed `withContext` from `ResourceList.Item` ([#1503](https://github.com/Shopify/polaris-react/pull/1503))
- Removed `withContext` from `Navigation.Item` ([#1502](https://github.com/Shopify/polaris-react/pull/1502))
- Removed `withRef` from `UnstyledLink` ([#1501](https://github.com/Shopify/polaris-react/pull/1501))
- Removed `withContext` from `ResourceList.FilterControl` ([#1500](https://github.com/Shopify/polaris-react/pull/1500))
- Removed `withContext` from `Scrollable.ScrollTo` and added a test to boost coverage ([#1499](https://github.com/Shopify/polaris-react/pull/1499))
- Removed `withContext` from `Loading` ([#1497](https://github.com/Shopify/polaris-react/pull/1497))
- Removed `withContext` and `withAppProvider` from `ContextualSaveBar` ([#1498](https://github.com/Shopify/polaris-react/pull/1498))
- Removed `withContext` from `Toast` ([#1494](https://github.com/Shopify/polaris-react/pull/1494))
- Removed `withRef` and `withContext` from `DropZone.FileUpload` ([#1491](https://github.com/Shopify/polaris-react/pull/1491))
- Created `useAppBridge` hook ([#1482](https://github.com/Shopify/polaris-react/pull/1482))
- Removed testID warning in tests ([#1447](https://github.com/Shopify/polaris-react/pull/1447))
- Updated `AppProvider` to use the new context API and refactored other instances to follow a new pattern and refactor test utilities ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Updated all context files to export react context rather than a provider and consumer ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Deleted `withSticky` ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Upgraded the `Autocomplete` component from legacy context API to use createContext ([#1403](https://github.com/Shopify/polaris-react/pull/1403))
- Upgraded the `Navigation` component from legacy context API to use createContext ([#1402](https://github.com/Shopify/polaris-react/pull/1402))
- Updated `ThemeProvider` to use the new context api ([#1396](https://github.com/Shopify/polaris-react/pull/1396))
- Updated `AppProvider` to no longer use `componentWillReceiveProps`([#1255](https://github.com/Shopify/polaris-react/pull/1255))
- Removed unused context from `Scrollable` ([#1253](https://github.com/Shopify/polaris-react/pull/1253))
- Updated `ThemeProvider` to no longer use `componentWillReceiveProps` ([#1254](https://github.com/Shopify/polaris-react/pull/1254))
- Removed context from `Collapsible` ([#1114](https://github.com/Shopify/polaris-react/pull/1114))
- Refactored `Frame` and its subcomponents to use the `createContext` API instead of legacy context ([#803](https://github.com/Shopify/polaris-react/pull/803))
- Upgraded the `Banner`, `Card`, and `Modal` components from legacy context API to use `createContext` ([#786](https://github.com/Shopify/polaris-react/pull/786))

### Deprecations

- Renamed `singleColumn` on `Page` to `narrowWidth` ([#1606](https://github.com/Shopify/polaris-react/pull/1606))
- Deprecated `FilterControl`. Use `Filters` instead ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
