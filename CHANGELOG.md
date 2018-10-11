# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines](https://git.io/polaris-changelog-guidelines).

<!-- Unreleased changes should go to UNRELEASED.md -->

---

## 2.12.1 - 2018-10-11

### Bug fixes

- Fixes type imports in the build ([#2411](https://github.com/Shopify/polaris-react/pull/2411))

## 2.12.0 - 2018-10-11

### Enhancements

- Removed tip from `Popover` ([#1845](https://github.com/Shopify/polaris-react/pull/1845))
- Increased speed of `Popover` transition from 500ms to 100ms ([#2378](https://github.com/Shopify/polaris-react/pull/2378))
- Improved text contrast in `Badge` ([#2374](https://github.com/Shopify/polaris-react/pull/2374)).
- Added named `medium` size to Button that renders the same as omiting the size attribute ([#2392](https://github.com/Shopify/polaris-react/pull/2392))

### Bug fixes

- Fixed typo in `Collapsible` example ([#2398](https://github.com/Shopify/polaris-react/pull/2398))
- Fixed padding and margins on `SkeletonPage` to match `Page` ([#2167](https://github.com/Shopify/polaris-react/pull/2167))
- Fixed spacing between `Page` title and metadata ([#2382](https://github.com/Shopify/polaris-react/pull/2382))

### Documentation

- Made ActionList, OptionList and Popover examples active by default so previews are visible without interacting ([#2383](https://github.com/Shopify/polaris-react/pull/2383))
- Improved the manual accessibility checklist ([#2391](https://github.com/Shopify/polaris-react/pull/2391))

### Development workflow

- Batched Percy snapshots per component ([#2363](https://github.com/Shopify/polaris-react/pull/2363))

## 2.11.0 - 2018-10-03

### Enhancements

- `Tab.Item` with a `url` prop now renders an `UnstyledLink` instead of a `Button` when displayed in `Popover` and you can now keyboard navigate the disclosure in `Tabs` ([#2153](https://github.com/Shopify/polaris-react/pull/2153))
- Refs can be placed on `DropZone.FileUpload` ([#2319](https://github.com/Shopify/polaris-react/pull/2319))
- Use the new context API in `ResourceList` ([#2216](https://github.com/Shopify/polaris-react/pull/2216))
- Use the new context API in `DropZone` ([#2211](https://github.com/Shopify/polaris-react/pull/2211))
- Update example description in `ExceptionList` documentation ([#2277](https://github.com/Shopify/polaris-react/pull/2277))
- Move Modal CloseButton into its own subcomponent, instead of being part of the Header subcomponent. This is an internal implementation detail if you are using the React component. If you are using (s)css and are defining class names manually you will need to update references to `Polaris-Modal-Header__CloseButton` and `Polaris-Modal-Header--withoutTitle` to `Polaris-Modal-CloseButton` and `Polaris-Modal-CloseButton--withoutTitle` respectively. ([#2289](https://github.com/Shopify/polaris-react/pull/2289))

### Development workflow

- Added `d.ts` files to test coverage ignore ([#2018](https://github.com/Shopify/polaris-react/pull/2018))
- `Page` is no longer self-closing in the playground ([#2283](https://github.com/Shopify/polaris-react/pull/2283))

### Bug fixes

- Fixed `Button` alignment issue caused by unnecessary icon markup rendering ([#2339](Fixing button alignment #2339)) (thanks to ([@mbaumbach](https://github.com/mbaumbach)) for the ([original issue](https://github.com/Shopify/polaris/issues/429)))
- Fixed console error and used new ref syntax in `DataTable` ([#2196](https://github.com/Shopify/polaris-react/pull/2196)) (thanks to ([@duythien0912](https://github.com/duythien0912)) for the ([original issue](https://github.com/Shopify/polaris/issues/403)))
- Fixed margin of `InlineError` text to align with the `ChoiceList` labels ([#2275](https://github.com/Shopify/polaris-react/pull/2275))
- Replaced hardcoded `rem` values with globally scalable ones on `DataTable`’s collapsed shadow, and `TextStyle` code blocks ([#2293](https://github.com/Shopify/polaris-react/pull/2293))
- Fixed spacing of numbered `List` for double digits ([#121](https://github.com/Shopify/polaris-ux/issues/121))
- Fixed `ProgressBar` not showing up in Windows high contrast mode ([#1708](https://github.com/Shopify/polaris-react/issues/1708))
- Top aligned all cells in `DataTable` ([#2278](https://github.com/Shopify/polaris-react/pull/2278))
- Fixed stacking order of loading overlay in `ResourceList` ([#2258](https://github.com/Shopify/polaris-react/pull/2258))
- Fixed form inputs in `Popover` that were disappearing instead of top aligning ([#2326](https://github.com/Shopify/polaris-react/pull/2326)) thanks to [@mbaumbach](https://github.com/mbaumbach) for the [original issue](https://github.com/Shopify/polaris/issues/435)
- Removed a redundant class on `OptionList` list items ([#2338](https://github.com/Shopify/polaris-react/pull/2338))

### Documentation

- Made `Modal` examples show the modal dialog by default ([#2303](https://github.com/Shopify/polaris-react/pull/2303))
- Changed fitted `Tabs` to have equal width when enough space is present ([#2314](https://github.com/Shopify/polaris-react/issues/2314))

### New components

#### withContext

Use `withContext` to pass consumer context to a component.

#### withRef

Use `withRef` with `compose` to forwardRefs to a component.

## 2.10.0 - 2018-09-18

### Enhancements

- Updated `Button` to accept a `React.ReactNode` for its `icon` prop ([#2245](https://github.com/Shopify/polaris-react/pull/2245))

### Documentation

- Refined accessibility checklist ([#2235](https://github.com/Shopify/polaris-react/pull/2235))

### Bug Fixes

- Added truncation to `Tag` ([#2230](https://github.com/Shopify/polaris-react/pull/2230))

## 2.9.0 - 2018-09-10

### Enhancements

- Updated date filter labels in resource list ([#2185](https://github.com/Shopify/polaris-react/pull/2185))
- Changed `placeholder` prop in `Select` to be the default selection ([#2115](https://github.com/Shopify/polaris-react/pull/2115))
- Added a `loading` prop to `ResourceList` that places a spinner overtop items and disables bulk actions ([#1922](https://github.com/Shopify/polaris-react/pull/1922))

### Documentation

- Clarified when and how to use icons in the banner component ([#2106](https://github.com/Shopify/polaris-react/pull/2106))
- Updated footer help component guidelines to include content instructions for app developers ([#2023](https://github.com/Shopify/polaris-react/pull/2023#pullrequestreview-150272766))

### Bug fixes

- Fixed resource list component to correctly handle inclusive filter keys ([#2189](https://github.com/Shopify/polaris-react/pull/2189))
- Fixed date field in DateSelector to not render an error when date is added by the date picker and field is blurred ([#2180](https://github.com/Shopify/polaris-react/pull/2180))
- Fixed pagination from firing keypress events while focus is inside inputs or contenteditables ([#1900](https://github.com/Shopify/polaris-react/pull/1900))
- Fixed `EmptyState` horizontally scrolling when fully condensed ([#2062](https://github.com/Shopify/polaris-react/pull/2062))
- Fixed the bottom margin of elements inside `Page` being ignored in some browsers ([#2142](https://github.com/Shopify/polaris-react/pull/2142))
- Added required `url` prop to `breadcrumbs` in `Page` component examples ([#2182](https://github.com/Shopify/polaris-react/pull/2182))
- Fixed `ActionList` wrapping text within a `Popover` ([#2057](https://github.com/Shopify/polaris-react/pull/2057))
- Fixed `Banner` spacing when inside of a section ([#2188](https://github.com/Shopify/polaris-react/pull/2188))
- Fixed `Stack` so it doesn't add extra spacing between items in Safari ([#2195](https://github.com/Shopify/polaris-react/pull/2195))

## 2.8.0 - 2018-08-30

### Bug fixes

- Reverted a change that caused the built embedded.js bundle to be way larger than it should be due to broad imports ([#2102](https://github.com/Shopify/polaris-react/pull/2102))

### Enhancements

- Added support for boolean type on Choice error prop ([#2085](https://github.com/shopify/polaris-react/pull/2085))

### Documentation

- Updated banner guidelines to make it clearer when success banners should be used vs success toasts. ([#2046](https://github.com/Shopify/polaris-react/pull/2046))
- Updated display text documentation to have a separate example for medium and large display ([#2100](https://github.com/Shopify/polaris-react/pull/2100))

## 2.7.2 - 2018-08-27

### Bug fixes

- Reverted a change that caused items in a `Popover` component not to be clickable ([#2080](https://github.com/Shopify/polaris-react/pull/2080))

## 2.7.1 - 2018-08-27

### Documentation

- Fixed paths to images in the “Attention badge” example ([#2063](https://github.com/Shopify/polaris-react/pull/2063))

### Bug fixes

- Fixed the `Page` component's `primaryAction` to support `LoadableAction`s and `DisableableAction`s ([#2075](https://github.com/Shopify/polaris-react/pull/2075))

## 2.7.0 - 2018-08-27

### Enhancements

- Adjusted spacing for `ChoiceChildren` in `ChoiceList` for readability ([#2016](https://github.com/Shopify/polaris-react/pull/2016))
- Made `Card.Header` a seperate publically accessible component ([#1946](https://github.com/Shopify/polaris-react/pull/1946))
- Added support for complex operators in `ResourceList` component ([#2006](https://github.com/Shopify/polaris-react/pull/2006))
- Updated the `Page` component's `primaryAction` to support `Button` props. ([#1994](https://github.com/Shopify/polaris-react/pull/1994))
- Added validation for non-numeric input in a type="number" `TextField` ([#2001](https://github.com/Shopify/polaris-react/pull/2001))
- Added circle information icon ([#1967](https://github.com/Shopify/polaris-react/pull/1967))

### Documentation

- Updated `Banner` guidelines to make it clearer when success banners should be used vs success toasts ([#2046](https://github.com/Shopify/polaris-react/pull/2046))

## 2.6.1 - 2018-08-21

### Development workflow

- Moved `pa11y` and `object-hash` from dependencies to devDependencies ([#2003](https://github.com/Shopify/polaris-react/pull/2003))

### Bug fixes

- Fixed inconsistent `DropZone` error styling ([#1981](https://github.com/Shopify/polaris-react/pull/1981))

## 2.6.0 - 2018-08-21

### Development workflow

- Added a `test:coverage` script to gather and display test coverage results ([#1906](https://github.com/Shopify/polaris-react/pull/1906))
- Added Codecov test coverage checks to pull requests ([#1917](https://github.com/Shopify/polaris-react/pull/1917))
- Added automated a11y testing to CI ([#1921](https://github.com/Shopify/polaris-react/pull/1921))

### Enhancements

- Added support for `titleMetadata` in `Page` component ([#1960](https://github.com/Shopify/polaris-react/pull/1960))
- Added support for `FilterType.DateSelector` in `ResourceList` component ([#1898](https://github.com/Shopify/polaris-react/pull/1898))
- Added `code` as an accepted `variation` of the `TextStyle` component to provide support for accessible markup and styling of inline code snippets and code-like text ([#1889](https://github.com/Shopify/polaris-react/pull/1889))
- Added new `border-width` SCSS function ([#1953](https://github.com/Shopify/polaris-react/pull/1953))
- Added support for `fullWidth` and `connectedTop` props on `ButtonGroup` ([#1943](https://github.com/Shopify/polaris-react/pull/1943))
- Added `label` prop to `DropZone` for better accessibility ([#1950](https://github.com/Shopify/polaris-react/pull/1950))
- Added support for `RadioButton` to accept a block as a `label` ([#1880](https://github.com/Shopify/polaris-react/pull/1800))
- Added a `singleColumn` prop to the `SkeletonPage` component ([#1912](https://github.com/Shopify/polaris-react/pull/1912))
- Updated the transition on large `Modal` to match the default transition ([#1852](https://github.com/Shopify/polaris-react/pull/1852))
- Added `nextKeys`, `previousKeys`, `nextTooltip`, and `previousTooltip` props to the `Pagination` component to support keypress handling and `Tooltip` in pagination buttons. ([#1696](https://github.com/Shopify/polaris-react/pull/1696))
- Added examples to the `Layout` component documentation for two and three column grid layouts ([#1866](https://github.com/Shopify/polaris-react/pull/1866))
- Added an export for the `Progress` type to support downstream typechecking of the `Badge` component `progress` prop ([#1821](https://github.com/Shopify/polaris-react/pull/1821))
- Added an `iFrameName` prop to the `Modal` component to support named iframe children ([#1822](https://github.com/Shopify/polaris-react/pull/1822))
- Added a `ScrollTo` subcomponent to the `Scrollable` component to support scrolling to a child node programmatically ([#1816](https://github.com/Shopify/polaris-react/pull/1816))
- Added support for the `Button` component to accept an array of strings as children ([#1817](https://github.com/Shopify/polaris-react/pull/1817))
- Changed the primary focus target of an activated `Popover` from the first focusable child to the `Popover` itself ([#1589](https://github.com/Shopify/polaris-react/pull/1589))
- Added an improved error message when the child of an embedded `Alert` component is not a string ([#1803](https://github.com/Shopify/polaris-react/pull/1803)) (thanks [@superwhykz](https://github.com/superwhykz) for the [original issue](https://github.com/Shopify/polaris/issues/378))
- Added a minimum width to tab items to improve touch target sizing and account for smaller tab titles ([#1901](https://github.com/Shopify/polaris-react/pull/1901))
- Added support for additional accessibility attributes to the `TextField` and `OptionList` components ([#1879](https://github.com/Shopify/polaris-react/pull/1879))
- Added support for `OptionList` with `Avatar`, `Icon`, and `Thumbnail` when `options` descriptors have a `media` property ([#1895](https://github.com/Shopify/polaris-react/pull/1895))
- Added support for destructive `ActionList` items ([#1860](https://github.com/Shopify/polaris-react/pull/1860))
- Added support for `OptionList` `options` descriptors to accept a block for the `label` property ([#1920](https://github.com/Shopify/polaris-react/pull/1920))
- Added `$page-max-width` variable to capture page calculated `max-width` value and `page-when-not-max-width` mixin to trigger when page is resized horizontally ([#1886](https://github.com/Shopify/polaris-react/pull/1886))
- Added support for select error messages to be optional ([#1941](https://github.com/Shopify/polaris-react/pull/1941))
- Updated the `Breadcrumbs` component to support the `CallbackAction` type as a prop ([#1966](https://github.com/Shopify/polaris-react/pull/1966)) (thanks [@dylan](https://github.com/dylan) for the [current issue](https://github.com/Shopify/polaris/issues/278) and everyone who identified this.)
- Added support for `TextField` error messages to be optional ([#1940](https://github.com/Shopify/polaris-react/pull/1940))
- Added a `disabled` prop to the `Choice` component. `Checkbox` and `RadioButton` labels are now styled to reflect their disabled state ([#1956](https://github.com/Shopify/polaris-react/pull/1956))
- Added support for Windows High Contrast mode in the `Select`, `Checkbox` and `RadioButton` components ([#1956](https://github.com/Shopify/polaris-react/pull/1956))

### Bug fixes

- Fixed `TextField` resizer rendering when `multiline` was false ([#1853](https://github.com/Shopify/polaris-react/pull/1853))
- Fixed `Modal` header condensing ([#1894](https://github.com/Shopify/polaris-react/pull/1894))
- Fixed `Tooltip` so active prop activates on initial render ([#1903](https://github.com/Shopify/polaris-react/pull/1903))
- Fixed `Popover` border radius and left and right alignment ([#1796](https://github.com/Shopify/polaris-react/pull/1796))
- Fixed visibility of the hidden implicit submit button in `Form` ([#1846](https://github.com/Shopify/polaris-react/pull/1846)) (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris/issues/386))
- Fixed alignment of wrapped empty state actions ([#1828](https://github.com/Shopify/polaris-react/pull/1828))
- Swapped the import and export icons ([#1849](https://github.com/Shopify/polaris-react/pull/1849))
- Fixed incorrect `DataTable` column count and content skipping in assistive technologies ([#1723](https://github.com/Shopify/polaris-react/pull/1723))
- Fixed unintended form submittal by action list items enclosed in a `form` ([#1865](https://github.com/Shopify/polaris-react/pull/1865) (thanks [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris/issues/391)))
- Fixed text alignment of multiline `OptionList` option text [#1905](https://github.com/Shopify/polaris-react/pull/1905)
- Fixed an issue where the `Stack` component would render incorrectly nested items [#1924](https://github.com/Shopify/polaris-react/pull/1924)
- Fixed spacing above annotated sections on smaller screens [#1972](https://github.com/Shopify/polaris-react/pull/1972)
- Fixed an issue that caused problems for some build tools [#1978](https://github.com/Shopify/polaris-react/pull/1978)
- Fixed the word-break of long text in `Label` and `Banner` on small screens ([#1982](https://github.com/Shopify/polaris-react/pull/1982))

### Documentation

- Added examples for iOS and Android `RadioButton` ([#1830](https://github.com/Shopify/polaris-react/pull/1830))
- Added examples for iOS and Android `Banner` ([#1829](https://github.com/Shopify/polaris-react/pull/1829))
- Added `Toast` component ([#1844](https://github.com/Shopify/polaris-react/pull/1844))
- Added examples for iOS and Android `Button` ([#1863](https://github.com/Shopify/polaris-react/pull/1863))
- Added examples for iOS and Android `ButtonGroup` ([#1864](https://github.com/Shopify/polaris-react/pull/1864))
- Added examples for iOS and Android `Badge` ([#1892](https://github.com/Shopify/polaris-react/pull/1892))
- Added examples for iOS and Android `Avatar` ([#1904](https://github.com/Shopify/polaris-react/pull/1904))
- Added `Stepper` component ([#1914](https://github.com/Shopify/polaris-react/pull/1914))

### New components

#### [InlineError](https://polaris.shopify.com/components/forms/inline-error)

Use inline errors to describe custom form inputs or form groups when invalid.

## 2.5.0 - 2018-07-20

### Enhancements

- Updated sub component structure ([#1266](https://github.com/Shopify/polaris-react/pull/1266))
- Added `weekStartsOn` prop to `DatePicker` ([#1783](https://github.com/Shopify/polaris-react/pull/1783))

### Bug fixes

- Remove `stickyManager` from `AppProviderProps` interface ([#1706](https://github.com/Shopify/polaris-react/pull/1706))
- Fixed a bug where `Layout.AnnotatedSection` would output a wrapper div for a `description` even when its contents were empty ([#1766](https://github.com/Shopify/polaris-react/pull/1766))
- Remove extra padding from annotated section ([#1805](https://github.com/Shopify/polaris-react/pull/1805))

### Documentation

- Added iOS and Android examples to the `Card` component ([#1784](https://github.com/Shopify/polaris-react/pull/1784))
- Added iOS and Android examples to the `ChoiceList` component ([#1825](https://github.com/Shopify/polaris-react/pull/1825))

### Development workflow

- Renamed `yarn start:vrt` to `yarn tophat` and updated the folder name to match ([#1754](https://github.com/Shopify/polaris-react/pull/1754), [#1764](https://github.com/Shopify/polaris-react/pull/1764))
- Improved `yarn tophat`’s design, and added a `/all-components` route ([#1709](https://github.com/Shopify/polaris-react/pull/1709))

### Enhancements

- Added `weekStartsOn` prop to `DatePicker` ([#1783](https://github.com/Shopify/polaris-react/pull/1783))

## 2.4.0 - 2018-07-12

### Enhancements

- Changed `Form` to submit a form by default when the <kbd>enter</kbd> key is pressed, and added the prop `implicitSubmit` to disable this default ([#1630](https://github.com/Shopify/polaris-react/pull/1630))

### Bug fixes

- Fixed `TextField` padding when a `prefix` or `suffix` is included ([#1740](https://github.com/Shopify/polaris-react/pull/1740))

## 2.3.1 - 2018-07-05

### Enhancements

- Removed the min-width of 320px from `ResourceList` ([#1599](https://github.com/Shopify/polaris-react/pull/1599))

### Bug fixes

- Resolve issue with `RangeSlider` component not accepting `0` as a `max` value ([#1690](https://github.com/Shopify/polaris-react/pull/1690))
- Slightly reduced spacing for `prefix` and `suffix` on the `RangeSlider` component ([#1690](https://github.com/Shopify/polaris-react/pull/1690))
- Fixed spacing for `prefix` and `suffix` on the `TextField` component ([#1698](https://github.com/Shopify/polaris-react/pull/1698))
- Fixed height of cells in `DataTable` that are rendered after initial page load (for example: in a `Tab` or a `Popover`) ([#1619](https://github.com/Shopify/polaris-react/pull/1619)) (thanks [@flewid](https://github.com/flewid) for the [original issue](https://github.com/Shopify/polaris/issues/344))
- Fixed `DatePicker` month styling for previous years ([#1658](https://github.com/Shopify/polaris-react/pull/1658))

## 2.3.0 - 2018-07-03

### New components

#### [Option list](https://polaris.shopify.com/components/lists-and-tables/option-list)

Use `OptionList` to present a group of selectable items outside of the context of a `Form`.

### Documentation

- Fixed `Form` examples ([#1565](https://github.com/Shopify/polaris-react/pull/1565))

### Enhancements

- Added `prefix` and `suffix` props to `RangeSlider` for better layout control ([#1584](https://github.com/Shopify/polaris-react/pull/1584))
- Added testing documentation and examples in `AppProvider` ([#1556](https://github.com/Shopify/polaris-react/pull/1556))
- Performance: optimized avatar SVG files ([#1662](https://github.com/Shopify/polaris-react/pull/1662))
- Updated `yarn run optimize` to add new line at the end of SVG files ([#1685](https://github.com/Shopify/polaris-react/pull/1685))
- Added a more compact variant of `Select`, with the form label appearing inside the control) ([#1576](https://github.com/Shopify/polaris-react/pull/1576))

### Bug fixes

- Adjusted padding on `TextField` to work with Chrome’s autofill ([#1415](https://github.com/Shopify/polaris-react/pull/1415))
- Fixed a regression where the version of Polaris wasn’t globally available anymore ([#1555](https://github.com/Shopify/polaris-react/pull/1555))
- Updated the interaction state visuals for `ActionList` ([#1585](https://github.com/Shopify/polaris-react/pull/1585))
- Fixed z-index on `ResourceList` header with sorting options ([#1629](https://github.com/Shopify/polaris-react/pull/1629)) (thanks [@janklimo](https://github.com/janklimo) for the [original issue](https://github.com/Shopify/polaris/issues/355))
- Fixed an issue where `RadioButton` was not focusable in Safari ([#1626](https://github.com/Shopify/polaris-react/pull/1626))
- Fixed spacing for annotated section descriptions ([#1604](https://github.com/Shopify/polaris-react/pull/1604))
- Fixed a bug in EASDK action transforms that prevented external urls in embedded apps from opening ([#794](https://github.com/Shopify/polaris-react/pull/794)) (thanks [@dansundy](https://github.com/dansundy) for the [original issue](https://github.com/Shopify/polaris/issues/203))

### Dependency updates

- Updated [`@shopify/polaris-tokens`](https://npmjs.com/package/@shopify/polaris-tokens), the single source of truth for colors

## 2.2.0 - 2018-06-12

### New components

#### [Range slider](https://polaris.shopify.com/components/forms/range-slider)

Use `RangeSlider` to select a number value between a min and max range.

### Enhancements

- Added a fixed prop to `Popover` allowing for a fixed position ([#1524](https://github.com/Shopify/polaris-react/pull/1524))
- Added badge prop to the `ItemDescriptor` type and action group ([#1295](https://github.com/Shopify/polaris-react/pull/1295))
- Added `text-breakword` mixin for easier word breaking when dealing with long unspaced strings ([#1543](https://github.com/Shopify/polaris-react/pull/1543))

### Bug fixes

- Fixed unexpected form submission when switching tabs in a `Tabs` component wrapped in a `Form` ([#1542](https://github.com/Shopify/polaris-react/pull/1542))
- Added missing `'Shopify.API.setWindowLocation'` message handler to the EASDK ([#1539](https://github.com/Shopify/polaris-react/pull/1539))

## 2.1.2 - 2018-06-06

### Enhancements

- Added support for `Card` to accept a block for a title ([#1412](https://github.com/Shopify/polaris-react/pull/1412))
- Added an intermediate prop typing for `Link` to allow redefinition of prop definitions ([#1439](https://github.com/Shopify/polaris-react/pull/1439))

### Bug fixes

- Fixed an issue where `ResourceList` filters lost padding ([#1438](https://github.com/Shopify/polaris-react/pull/1438)) (thanks [@BarryCarlyon](https://github.com/BarryCarlyon) for the [original issue](https://github.com/Shopify/polaris/issues/330))
- Fixed unexpected focus jumps when `DatePicker` props are updated ([#1399](https://github.com/Shopify/polaris-react/pull/1399))
- Fixed the spacing and text wrapping of `ExceptionList` title and description ([#1503](https://github.com/Shopify/polaris-react/pull/1503))

## 2.1.1 - 2018-05-30

### Bug fixes

- Fixed `DropZone` to prevent it from kicking into small size too soon ([#1434](https://github.com/Shopify/polaris-react/pull/1434))

### Documentation

- Various content and markdown fixes

## 2.1.0 - 2018-05-03

### New components

#### [Exception list](https://polaris.shopify.com/components/lists-and-tables/exception-list)

Use Exception lists to draw the merchant’s attention to important information that adds extra context to a task.

### Enhancements

- Added an `ellipsis` prop to `ActionList.Item` allowing for an ellipsis suffix after the content ([#1377](https://github.com/Shopify/polaris-react/pull/1377))
- Added a `preferredAlignment` prop to `Popover` allowing it to be aligned to the left, center, or right of its activator ([#1390](https://github.com/Shopify/polaris-react/pull/1390))
- Updated styling for `Banner` that appear in a `Card` or a `Modal` ([#1394](https://github.com/Shopify/polaris-react/pull/1394))
- Added new size to `DropZone` component ([#1419](https://github.com/Shopify/polaris-react/pull/1419))
- Exposed Group interface from the `Select` component ([#1389](https://github.com/Shopify/polaris-react/pull/1389))
- Renamed `plain-list` mixin to `unstyled-list` ([#1375](https://github.com/Shopify/polaris-react/pull/1375))
- Removed padding from `DropZone` and applied it to `FileUpload` instead ([#1418](https://github.com/Shopify/polaris-react/pull/1418))

### Bug fixes

- Fixed unexpected window scroll on rendering `DataTable` ([#1383](https://github.com/Shopify/polaris-react/pull/1383)) (thanks [@mfurniss](https://github.com/mfurniss) for the [original issue](https://github.com/Shopify/polaris/issues/317))
- Fixed focused inner interaction state on `ResourceList.Item` for reverse tabbing ([#1403](https://github.com/Shopify/polaris-react/pull/1403))
- Fixed border radius on `Card` to match the padding on `Page` ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Added `target` to the `breadcrumb` prop on `Page` ([#1345](https://github.com/Shopify/polaris-react/pull/1345)) (thanks [@sdn90](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris/issues/306))
- Fixed visual representation of disabled bulk action buttons in `ResourceList` ([#1396](https://github.com/Shopify/polaris-react/pull/1396))
- Fixed margins of a `fullWidth` `Popover` that appears above its activator ([#1388](https://github.com/Shopify/polaris-react/pull/1388))
- Fixed rendering of `Popover` when activator rerenders ([#1414](https://github.com/Shopify/polaris-react/pull/1414)) (thanks [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris/issues/324))
- Fixed `z-index` calculation for `PositionOverlay` and `Dialog` ([#1421]([https://github.com/Shopify/polaris-react/pull/1421]))
- Fixed an issue where selecting a date in `DatePicker` would submit its enclosing form ([#1413](https://github.com/Shopify/polaris-react/pull/1413))
- Fixed `ResourceList` reverse tabbing focus interaction on action buttons ([#1406](https://github.com/Shopify/polaris-react/pull/1406))
- Fixed padding in the case where a `ResourceList` had no filters ([#1438](https://github.com/Shopify/polaris-react/pull/1438))

## 2.0.0 - 2018-05-07

Summary: this is the first major version of Polaris React since launch. Included in this release are:

- Several new components, including `DataTable`, `DropZone`, `AppProvider`, and `Modal`
- Improvements to existing components, such as `ResourceList`, `ChoiceList`, and `Card`
- A few breaking API changes

### Breaking changes

#### React 16+

We’re removing support for React 15 in order to make full use of some of the new features in React 16, such as fragments, error boundaries, and improved server-side rendering.

##### Upgrade instructions

Upgrade your app to the latest version of React.

#### [App provider](https://polaris.shopify.com/components/structure/app-provider)

The `AppProvider` component is now required in your app for Polaris components to function properly.

##### Upgrade instructions

Wrap your app in the `AppProvider` component.

#### [Collapsible](https://polaris.shopify.com/components/behavior/collapsible) component requires an `id` prop

For accessibility reasons, the `id` prop is now required on the `Collapsible` component.

##### Upgrade instructions

Pass a unique value as an `id` to all `Collapsible` components. For example, `<Collapsible id="my-unique-id">`.

#### EmbeddedApp component has been removed

The `EmbeddedApp` component has been removed. The `AppProvider` component now accepts the configuration needed to initialize an embedded app.

##### Upgrade instructions

Use the `AppProvider` component with the `apiKey` and `shopOrigin` props.

#### [Resource list](https://polaris.shopify.com/components/lists-and-tables/resource-list#navigation)

Shopify is organized around objects that represent a merchant’s business, such as customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects resources.

The resource list component functions as:

- A content format, presenting a set of individual resources in a compact form
- A system for taking action on one or more individual resources
- A way to navigate to the details page of an individual resource

Our current resource list component gave you some nice defaults out of the box, but didn’t take you much further than that. We recognized that each of these lists is unique and contains different information that is important to the merchant.

Our new resource list allow you to build custom items in the list, with their own layout, content, and styling. This gives you a powerful way to build these sorts of lists going forward.

We’ve also included in depth documentation and a tutorial on how to build your own custom resource list items.

#### Tabs no longer accept `title` prop

To be more consistent with our other component APIs, the `Tabs` component now uses `content` instead of `title`.

##### Upgrade instructions

Change all instances of `title` to be `content` instead.

#### TextField onChange is required

Because we require you to manage state for your inputs, we decided to make `onChange` required for `TextField` to avoid confusion.

##### Upgrade instructions

Add an `onChange` callback to each use of `TextField` that is not disabled or readonly.

#### Removed default white color from Icon CSS

The CSS for `Icon` will no longer apply a color to icons by default. You must use the `color` prop on the `Icon` component to specify the color.

##### Upgrade instructions

Use `color` prop on all instances of `Icon` component.

#### Anchor tags are no longer styled by Polaris components

To avoid conflicts with other styling or frameworks, we’re removing the styling we globally applied to all `a` elements.

##### Upgrade instructions

Use the `Link` component instead.

#### Changed Alert onCancel prop to onClose

This change only impacts users of the Sass version of Polaris, more specifically the `color()` function. The `color($hue, $value: base, $for-background: null)` function in Sass now accepts strings for `$hue` and `$value` as advertised in [the color function documentation](https://polaris.shopify.com/sassdoc/#undefined-function-color).

##### Upgrade instructions

If you’re using VS Code, here are the exact search / replace instructions to follow (toggle “Use Regular Expression”):

- replace `\bcolor\(([a-z-]+)\)` with `color('$1')`
- replace `\bcolor\(([a-z-]+), ([a-z-]+)\)` with `color('$1', '$2')`
- replace `\bcolor\(([a-z-]+), ([a-z-]+), (.*)\)` with `color('$1', '$2', $3)`

### New components

#### [Data table](https://polaris.shopify.com/components/lists-and-tables/data-table)

Since launching Polaris components, we’ve had many people ask why we didn’t include tables. While we have been moving away from using tables for comparisons that aren’t tabular data (resource lists, for example), we recognize that there are still cases to use them.

The data table component is our answer to those cases. While data visualizations represents part of a data set, data tables are used to organize and display all the information from a data set, allowing merchants view details from the entire set. This helps merchants compare and analyze all the data in a unified way.

#### [Drop zone](https://polaris.shopify.com/components/actions/drop-zone#navigation)

Currently we have several different interfaces for uploading files across Shopify, which leads to a lack of consistency and some missing features and capabilities. To solve this problem, we’re releasing a new drop zone component.

This new component allows merchants to upload files by dragging and dropping them into an area on a page. The component handles file type validation, dropping onto the window, and more, meaning more ease of use for merchants.

#### [Modal](https://polaris.shopify.com/components/overlays/modal#navigation)

In the original Polaris React, the modal component was only available to embedded apps. No longer. Our new modal component is universal in that it can be used in either standalone or embedded apps, and will handle the correct behavior for you.

#### [App provider](https://polaris.shopify.com/components/structure/app-provider#navigation)

The app provider is a required component that enables sharing global app config with the components in Polaris. This is used for the internationalization of strings in Polaris components, as well as set other configuration such as a custom link component that all the Polaris components will use. This unlocks new ways for us to share configuration at an app level and have the components react to that configuration.

### Enhancements

- Added `error` prop to `ChoiceList` ([#1292](https://github.com/Shopify/polaris-react/pull/1292))
- `TextField`, `Select`, and `Checkbox` now accept the types `string` or `ReactElement` for the `error` prop ([#1292](https://github.com/Shopify/polaris-react/pull/1292))
- Added optional `id` props to more components, and restructured the prop definitions to allow projects to make `id` props mandatory ([#1138](https://github.com/Shopify/polaris-react/pull/1138))
- Added `fullWidth` prop to `Card.Section` ([#1051](https://github.com/Shopify/polaris-react/pull/1051))
- Added `fullHeight` prop to `Popover` to override max-height ([#1099](https://github.com/Shopify/polaris-react/pull/1099))
- Added `allowRange` as a property for `DatePicker` ([#884](https://github.com/Shopify/polaris-react/pull/884))
- Added the `external` option to the `secondaryAction.action` prop on the `Banner` component ([#1263](https://github.com/Shopify/polaris-react/pull/1263)). Thank you to ([Andrew Cargill](https://github.com/cargix1)) for the issue ([#236](https://github.com/Shopify/polaris/issues/236))

### Bug fixes

- Enforced subdued description `TextStyle` in `AnnotatedSection` ([#1294](https://github.com/Shopify/polaris-react/pull/1294))
- Fixed overflow of `TextField` that caused the border to be cut off ([#1180](https://github.com/Shopify/polaris-react/pull/1180))
- Allowed specific props in the `TextField` component to pass through properties to the input child ([#907](https://github.com/Shopify/polaris-react/pull/907))
- Fixed `ActionList` component to provide section dividers when a `title` was not provided ([#926](https://github.com/Shopify/polaris-react/pull/926))
- Fixed an issue in the `Select` component where placeholder didn’t properly appear on Firefox and appeared disabled on all browsers ([#1282](https://github.com/Shopify/polaris-react/pull/1282))

## 1.14.2 - 2018-05-02

_This will be the last v1.x release outside of critical security fixes._

### Bug fixes

- Add margin-left spacing to disclosure icon within `Button` component ([#1354](https://github.com/Shopify/polaris-react/pull/1354))
- Remove margins on segmented `ButtonGroup` ([#1352](https://github.com/Shopify/polaris-react/pull/1352))
- Fixed text alignment of `Link` so that it inherits from its parent node ([#1343](https://github.com/Shopify/polaris-react/pull/1343#discussion_r185069280))

## 1.14.1 - 2018-04-10

### Bug fixes

- Fixing an error with the release process

## 1.14.0 - 2018-04-10

### Enhancements

- Changed `term` in `DescriptionList` component to accept `React.ReactNode` to allow for more than just `string` type

## 1.13.1 - 2018-03-29

- Added missing `publishConfig.access` setting in `package.json`, in accordance with the new Shipit requirements for public npm packages

## 1.13.0 - 2018-03-29

### Enhancements

- Added an `id` prop to Collapsible to be referenced by the `aria-controls` attribute of the component triggering the collapse ([#943](https://github.com/Shopify/polaris-react/pull/943))

### Bug fixes

- Fixed external prop not working within `ActionList` component ([#1177](https://github.com/Shopify/polaris-react/pull/1177))
- Fixed a syntax error in one of the `Card` component examples ([#1175](https://github.com/Shopify/polaris-react/pull/1175)) (thanks [@meecrobe](https://github.com/meecrobe) for the [original issue](https://github.com/Shopify/polaris/issues/281))

## 1.12.4 - 2018-03-19

- Enhanced `Avatar` to work better when provided non-square images ([#1124](https://github.com/Shopify/polaris-react/pull/1124))
- Move documentation file so it’s picked up by the style guide ([#1162](https://github.com/Shopify/polaris-react/pull/1162))

## 1.12.3 - 2018-03-16

### Bug fixes

- Fixed disclosure centering on the `Tabs` component ([#1131](https://github.com/Shopify/polaris-react/pull/1131))
- Fixed an issue where a style void would appear between breakpoints at high text zoom levels ([#1071](https://github.com/Shopify/polaris-react/pull/1071))

### Documentation

- Removed purpose section from component READMEs ([#1134](https://github.com/Shopify/polaris-react/pull/1134))
- Added `EmbeddedPage` under the Embedded section ([#956](https://github.com/Shopify/polaris-react/pull/956))
- Added “Using embedded components” section ([#959](https://github.com/Shopify/polaris-react/pull/959))
- Added screenshots to the embedded components ([#1008](https://github.com/Shopify/polaris-react/pull/1008))
- Clarified usage of `Card` header and `FooterActions` ([#1143](https://github.com/Shopify/polaris-react/pull/1143))

## 1.12.2 - 2018-03-08

### Documentation

- Moving property descriptions out of READMEs and into source files ([#1125](https://github.com/Shopify/polaris-react/pull/1125))

## 1.12.1 - 2018-03-06

### Bug fixes

- Fixed server-side environments ([#1120](https://github.com/Shopify/polaris-react/pull/1120))

### Documentation

- Updated component examples that use state to use an es6 class ([#1118](https://github.com/Shopify/polaris-react/pull/1118))

## 1.12.0 - 2018-02-28

### Bug fixes

- Fixed `TextField` overflow issues when inside `Scrollable` ([#967](https://github.com/Shopify/polaris-react/pull/967))
- Fixed `Select` focus state bug occuring in Firefox ([#910](https://github.com/Shopify/polaris-react/pull/910))
- Fixed vertical alignment of text within full width variant of the button component ([#1083](https://github.com/Shopify/polaris-react/pull/1017))

### Enhancements

- Changed `Checkbox` label to allow string or React.ReactNode ([#894](https://github.com/Shopify/polaris-react/pull/894))
- Update `TextField` type with currency ([#908](https://github.com/Shopify/polaris-react/pull/908))
- Added `ariaControls`, `ariaExpanded` prop to `Button` ([#978](https://github.com/Shopify/polaris-react/pull/978/))
- Updated the base red color to improve contrast ([#1076](https://github.com/Shopify/polaris-react/pull/1076))
- Added a notification icon to the bundled icons available to use in the icon component’s source prop ([#1017](https://github.com/Shopify/polaris-react/pull/1017))
- Exposed Status from the `Banner` component ([#998](https://github.com/Shopify/polaris-react/pull/998))
- Added `titleHidden` prop to `Page` ([#1033](https://github.com/Shopify/polaris-react/pull/1033))

### Documentation

- Clarified intended usage for `EmptyState` ([#1068](https://github.com/Shopify/polaris-react/pull/1068))

### Chores

- Added version number to source ([#856](https://github.com/Shopify/polaris-react/pull/856))

## 1.11.0 - 2018-02-13

- Changed Action to Disableable Action in Card ([#838](https://github.com/Shopify/polaris-react/pull/838))

### Enhancements

- Added `renderChildren` prop to `ChoiceList` component ([#993](https://github.com/Shopify/polaris-react/pull/993))

### Bug fixes

- Fixed an issue with `FooterHelp` links not expanding to full-width on mobile devices ([#759](https://github.com/Shopify/polaris-react/issues/759))
- Added breadcrumbs to `SkeletonPage` ([#985](https://github.com/Shopify/polaris-react/pull/985))
- Added max-width and auto margin to `EmptyState` ([#969](https://github.com/Shopify/polaris-react/pull/969))
- Fixed outline `Button` disabled state styles ([#972](https://github.com/Shopify/polaris-react/pull/972))
- Fixed `Tag` so the `onRemove` function is not improperly called ([#970](https://github.com/Shopify/polaris-react/pull/970)) (thanks [@chaddjohnson](https://github.com/chaddjohnson) for the [original issue](https://github.com/Shopify/polaris/issues/235))
- Fixed border on inputs disabled state ([#1007](https://github.com/Shopify/polaris-react/pull/1007))
- Fixed an issue in `TextInput`, when you increment or decrement with a float value, and the digits after the decimal point where wrong ([#833](https://github.com/Shopify/polaris-react/pull/898)) (thanks [@cgidzinski](https://github.com/cgidzinski) for the [original issue](https://github.com/Shopify/polaris-react/issues/761))
- Added top alignment to FormLayout.Group [#876](https://github.com/Shopify/polaris-react/pull/876)

### Documentation

- Fixed capitalization of prop names in `Pagination` component’s documentation ([#975](https://github.com/Shopify/polaris-react/pull/975)) (thanks [@donnguyen](https://github.com/donnguyen) for the [original issue](https://github.com/Shopify/polaris/issues/141))
- Exposed Option from the `Select` component ([#976](https://github.com/Shopify/polaris-react/pull/976))

## 1.10.2 - 2018-01-22

### Bug fixes

- Fixed the public repository’s build (which was missing the new CircleCI configuration files) ([#951](https://github.com/Shopify/polaris-react/pull/951))

## 1.10.1 - 2018-01-19

### Bug fixes

- Fixed CSS-only `Checkbox` ([#932](https://github.com/Shopify/polaris-react/pull/932)) (thanks [@daddy88](https://github.com/daddy88) for the [original issue](https://github.com/Shopify/polaris/issues/252))

## 1.10.0 - 2018-01-17

- Restored the correct `latest` version to the CDN
- Fixed rgbToHsb function when red is the largest number and added tests ([#877](https://github.com/Shopify/polaris-react/pull/877)) (thanks [@emcmanus](https://github.com/emcmanus) for the [original issue](https://github.com/Shopify/polaris/issues/251))
- Fixed an issue where a hard-coded path would cause the build to fail on Windows ([#833](https://github.com/Shopify/polaris-react/pull/833)) (thanks [@Invader444](https://github.com/Invader444) for the [original issue](https://github.com/Shopify/polaris/issues/245) and [pull request](https://github.com/Shopify/polaris/pull/246))
- Added `onClick` to `UnstyledLink` ([#832](https://github.com/Shopify/polaris-react/pull/832))
- Added tests to `Link` ([#832](https://github.com/Shopify/polaris-react/pull/897))

- Added tests for `ColorPicker` color utilities ([#905](https://github.com/Shopify/polaris-react/pull/905))

## 1.9.1 - 2017-12-21

### Documentation

- Ammending changelog

## 1.9.0 - 2017-12-21

### Enhancements

- Added `onActionAnyItem` prop to action list and used to close `Page` `actionGroups` on click or keypress of any item ([#792](https://github.com/Shopify/polaris-react/pull/792))
- Added `content` prop to `Tabs` and deprecated use of `title` ([#808](https://github.com/Shopify/polaris-react/pull/808))
- Added `TextContainer` component ([#757](https://github.com/Shopify/polaris-react/pull/757/))
- Added `idForItem` prop to resource list ([#799](https://github.com/Shopify/polaris-react/pull/799/))
- Added `fullWidth` prop to layout section ([#743](https://github.com/Shopify/polaris-react/pull/743/))
- Added `indeterminate` as option for checkbox `checked` prop value ([#748](https://github.com/Shopify/polaris-react/pull/748))
- Added `singleColumn` prop to page ([#763](https://github.com/Shopify/polaris-react/pull/763))
- Added `focused` prop to `TextField` [813](https://github.com/Shopify/polaris-react/pull/813)

### Bug fixes

- Fixed positioned overlay not responding to `Scrollable` container events
- Fixed first focusable item focus in `Popover` ([#764](https://github.com/Shopify/polaris-react/pull/764))
- Fixed typos in the select component documentation ([#773](https://github.com/Shopify/polaris-react/pull/773)) (thanks [@mattchidley](https://github.com/mattchidley) for the [original issue](https://github.com/Shopify/polaris/issues/224))

## 1.8.3 - 2017-10-26

### Bug fixes

- Moved react-transition-group from a dev dependency to a dependency

## 1.8.2 - 2017-10-24

### Bug fixes

- Fixed `Stack` not returning children

## 1.8.1 - 2017-10-24

### Bug fixes

- Added missing yarn config file which was causing the build to fail

## 1.8.0 - 2017-10-23

### Documentation

- Updated README to consistently use contractions ([#682](https://github.com/Shopify/polaris-react/pull/682)) (thanks [@stefanmiodrag](https://github.com/stefanmiodrag) for the [original pull request](https://github.com/Shopify/polaris/pull/191))
- Improved example description for `Layout` component ([#683](https://github.com/Shopify/polaris-react/pull/683))
- Updated `Spinner` documentation ([#696](https://github.com/Shopify/polaris-react/pull/696))
- Improved component purpose documentation across components ([#717](https://github.com/Shopify/polaris-react/pull/717))
- Improved documentation for `TextStyle` component ([#720](https://github.com/Shopify/polaris-react/pull/720))

### Enhancements

- Added support for React 16 ([#699](https://github.com/Shopify/polaris-react/pull/699))
- Added an option to show or hide unpublished products from the `ResourcePicker` ([#628](https://github.com/Shopify/polaris-react/pull/628))
- Changed `Popover` component to use `react-transition-group` instead of our deprecated custom version in `@shopify/react-utilities` ([#718](https://github.com/Shopify/polaris-react/pull/718))
- Added new `ProgressBar` component ([#659](https://github.com/Shopify/polaris-react/pull/659))
- Changed today’s date to be tabbable and clearly indicated in `DatePicker` ([#651](https://github.com/Shopify/polaris-react/pull/651))
- Added support for disabled choices in `ChoiceList` component ([#726](https://github.com/Shopify/polaris-react/pull/726))
- Added support for disabled secondary `Page` actions ([#650](https://github.com/Shopify/polaris-react/pull/650))
- Changed `TextField` and `Select` to now focus on clicking only within the area from the input to the end of its label text ([#694](https://github.com/Shopify/polaris-react/pull/694))

### Bug fixes

- Fixed `Layout` component example description
- Fixed `SkeletonPage` header appearing in embedded apps ([#714](https://github.com/Shopify/polaris-react/pull/714)) (thanks [@rkbhochalya](https://github.com/rkbhochalya) for the [original issue](https://github.com/Shopify/polaris/issues/202)))
- Fixed border-radius on `ActionList` component in Chrome ([#719](https://github.com/Shopify/polaris-react/pull/719))

## 1.7.0 - 2017-10-06

### Enhancements

- Added `SkeletonPage`, `SkeletonBodyText` and `SkeletonDisplayText` components ([#615](https://github.com/Shopify/polaris-react/pull/615))
- Added `Spinner` component ([#621](https://github.com/Shopify/polaris-react/pull/621))
- Added hint prop to `Scrollable` and use in `Popover` ([#619](https://github.com/Shopify/polaris-react/pull/619))
- Updated `Button` component to use new `Spinner` component ([#621](https://github.com/Shopify/polaris-react/pull/621))
- Added external link support for `Page` `secondaryActions` ([#664](https://github.com/Shopify/polaris-react/pull/664/))
- Enabled the `primaryAction` of `PageActions` to be loading ([#653](https://github.com/Shopify/polaris-react/pull/653/))
- `Stack` now supports non-wrapping layouts on small screens ([#638](https://github.com/shopify/polaris-react/pull/638))
- Updated `TextField` min and max documentation ([#635](https://github.com/shopify/polaris-react/pull/635))
- Breadcrumbs now accept a callback through onAction ([#663](https://github.com/Shopify/polaris-react/pull/663)) (thanks [@arypbatista](https://github.com/arypbatista) for the [original issue](https://github.com/Shopify/polaris/issues/188))

### Bug fixes

- Fixed issue with embedded app breadcrumb linking to Shopify settings page ([#663](https://github.com/Shopify/polaris-react/pull/663)) (thanks [@cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris/issues/116))
- Fixed `Avatar` to display image and initials simultaneously ([#642](https://github.com/shopify/polaris-react/pull/642))
- Fixed various links to embedded components ([#643](https://github.com/shopify/polaris-react/pull/643))
- Fixed left and right ends of `TextField` not responding to clicks([#644](https://github.com/shopify/polaris-react/pull/644))
- `RadioButton` & `Checkbox` now focus on clicking only within the area from the input to the end of its label text ([#671](https://github.com/shopify/polaris-react/pull/671))
- Fixed plain and `fullWidth` `Button` alignment ([#645](https://github.com/shopify/polaris-react/pull/645))
- Add a minor delay to `Tooltip` display ([#678](https://github.com/Shopify/polaris-react/pull/678))

## 1.6.0 - 2017-09-25

### Enhancements

- Documented disabled prop for `Checkbox` and `RadioButton` ([#627](https://github.com/Shopify/polaris-react/pull/627/files)) (thanks [@LeoAref](https://github.com/LeoAref) for the [original issue](https://github.com/Shopify/polaris/issues/114))
- Documented progress prop for `Badge` ([#625](https://github.com/Shopify/polaris-react/pull/625/files)) (thanks [@sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris/issues/172))
- Added loading prop to `Button` ([#626](https://github.com/Shopify/polaris-react/pull/626/files)) (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/30))
- Documented complex `Select` option ([#630](https://github.com/Shopify/polaris-react/pull/630/files)) (thanks [@sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris/issues/174))
- Documented `TextStyle` component ([#631](https://github.com/Shopify/polaris-react/pull/631))
- Improved `Avatar` typography spacing ([#629](https://github.com/Shopify/polaris-react/pull/629))
- Added subtract icon ([#648](https://github.com/Shopify/polaris-react/pull/648))
- Improved acessibility for `Pagination` ([#639](https://github.com/Shopify/polaris-react/pull/639))

### Bug fixes

- Fixed failed dependency installation for unauthenticated GitHub users ([#623](https://github.com/Shopify/polaris-react/pull/623/files)) (thanks [@mikeyhew](https://github.com/mikeyhew) for the [original issue](https://github.com/Shopify/polaris/issues/184))
- Fixed `Page` header spacing ([#634](https://github.com/Shopify/polaris-react/pull/634))
- Fixed `TextField` focus ring transition ([#636](https://github.com/Shopify/polaris-react/pull/636))
- Fixed `Popover` not resizing on content updates ([#506](https://github.com/Shopify/polaris-react/pull/506))

## 1.5.2 - 2017-09-18

### Bug fixes

- Fixes alignment of `PageAction` links ([#589](https://github.com/Shopify/polaris-react/pull/589))

## 1.5.1 - 2017-08-30

### Bug fixes

- Fixed disabled `Button` when using local class names ([#593](https://github.com/Shopify/polaris-react/pull/593))
- Fixed `Scrollable` resize listener not autobinding ([#592](https://github.com/Shopify/polaris-react/pull/592))

## 1.5.0 - 2017-08-30

### Enhancements

- Updated `Scrollable` component to remember scroll position on re-render ([#583](https://github.com/Shopify/polaris-react/pull/583))
- Added checkmark icon to the `Icon` component ([#584](https://github.com/Shopify/polaris-react/pull/584))
- Added an example for a disabled `TextField`

### Bug fixes

- Fixed typo in `Icon` code example ([#581](https://github.com/Shopify/polaris-react/pull/581))

## 1.4.1 - 2017-08-24

Various documentation fixes.

## 1.4.0 - 2017-08-22

### Enhancements

- Updated import, export, and view icons ([#543](https://github.com/Shopify/polaris-react/pull/543))
- Improved documentation of various components
- Improved how `ActionList` handles images and groups ([#550](https://github.com/Shopify/polaris-react/pull/550))
- Exposed PopoverCloseSource from `Popover` component ([#562](https://github.com/Shopify/polaris-react/pull/562))

### Bug fixes

- Fixed `PageActions` spacing in IE11 ([#544](https://github.com/Shopify/polaris-react/pull/544))
- Fixed ID inconsistency on `TextField` ([#553](https://github.com/Shopify/polaris-react/pull/553))
- Fixed spacing on `Page` component with no header ([#563](https://github.com/Shopify/polaris-react/pull/563/files)) (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/160))
- Fixed disabled state on primary and destructive `Button` ([#549](https://github.com/Shopify/polaris-react/pull/549/files))

### Chores

- Upgraded javascript-utilities to the latest version ([#542](https://github.com/Shopify/polaris-react/pull/542))

## 1.3.1 - 2017-08-10

### Bug fixes

- Fixed classnames in built \*.scss files ([#537](https://github.com/Shopify/polaris-react/pull/537))
- Fixed broken link in description list README ([#534](https://github.com/Shopify/polaris-react/pull/534))

## 1.3.0 - 2017-08-09

### Enhancements

- Added an `esnext` build (allows production builds to perform class/method tree shaking) ([#491](https://github.com/Shopify/polaris-react/pull/491))
- Changed KeyboardKey component to use `kbd` tag ([#500](https://github.com/Shopify/polaris-react/pull/500))
- Added publishing `docs` folder to npm package ([#504](https://github.com/Shopify/polaris-react/pull/504))
- Added `fullWidth` option to `Popover` component ([#505](https://github.com/Shopify/polaris-react/pull/505))

### Bug fixes

- Updated Static HTML page examples to correct markup ([#502](https://github.com/Shopify/polaris-react/pull/502)) (thanks [@bartcoppens](https://github.com/bartcoppens) for the [original issue](https://github.com/Shopify/polaris/issues/159))
- Hide increment and decrement buttons on number input when disabled ([#524](https://github.com/Shopify/polaris-react/pull/524)) (thanks [@kguller](https://github.com/kguller) for the [original issue](https://github.com/Shopify/polaris/issues/163))
- Fixed link to product content documentation ([#528](https://github.com/Shopify/polaris-react/pull/528))
- Fixed documented type for error prop on `Checkbox` component ([#523](https://github.com/Shopify/polaris-react/pull/523))
- Fixed `Popover` reopening when clicking around during transition ([#531](https://github.com/Shopify/polaris-react/pull/531))
- Fixed `Popover` resizing on content updates ([#506](https://github.com/Shopify/polaris-react/pull/506))
- Fixed vertical alignment of `Button` content ([#525](https://github.com/Shopify/polaris-react/pull/525))

### Sketch UIKit

- Added Sketch color palette file

## 1.2.1 (July 27, 2017)

### Chores

- Fixed a repo issue that caused the public repo release not to happen

## 1.2.0 (July 27, 2017)

### Enhancements

- Added helpText to `ChoiceList` choices ([#409](https://github.com/Shopify/polaris-react/pull/409)) (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris/issues/103))
- Added save icon ([#433](https://github.com/Shopify/polaris-react/pull/433))
- Added `accessibilityLabel` to `Tabs` ([#439](https://github.com/Shopify/polaris-react/pull/439))
- Updated icons for `Banner` ([#441](https://github.com/Shopify/polaris-react/pull/441))
- Improved `Page` component by fixing up spacing, addin a prop to show a separator below the page title, and changing the secondary actions to roll up into a dropdown menu on small screens ([#421](https://github.com/Shopify/polaris-react/pull/421)) ([#465](https://github.com/Shopify/polaris-react/pull/465)) ([#481](https://github.com/Shopify/polaris-react/pull/481))
- Improved default stacking behavior for Tooltip and `Popover` ([#472](https://github.com/Shopify/polaris-react/pull/472)) (thanks [@Taphood](https://github.com/Taphood) for the [original issue](https://github.com/Shopify/polaris/issues/129))
- Added extraTight spacing option to Stack ([#474](https://github.com/Shopify/polaris-react/pull/474))
- Use default subheading type styles for `ActionList` ([#479](https://github.com/Shopify/polaris-react/pull/479))
- Improved large `Button` styles ([#442](https://github.com/Shopify/polaris-react/pull/442))
- Updated font-weight for text emphasis ([#494](https://github.com/Shopify/polaris-react/pull/494/files)) (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/156))

### Bug fixes

- Removed the focus state for `Banner` on click ([#363](https://github.com/Shopify/polaris-react/pull/363))
- Fixed disabled `Pagination` button looking active
- Fixed alignment on `Button`
- Fixed min-width on `TextField` ([#440](https://github.com/Shopify/polaris-react/pull/440)) (thanks [@asacarter](https://github.com/asacarter) for the [original issue](https://github.com/Shopify/polaris/issues/96))
- Removed the border-top on `EmptyState` ([#408](https://github.com/Shopify/polaris-react/pull/408))) (thanks [@alexdover](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris/issues/102)
- Fixed `Select` placeholder value warnings (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris/issues/98))
- Fixed disabled text on iOS ([#448](https://github.com/Shopify/polaris-react/pull/448))
- Fixed type for `onChange` event ([#461](https://github.com/Shopify/polaris-react/pull/461) (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/135))

### Sketch UIKit

- Added color palette page to “Getting started”
- `Button` typography updated. More changes to come soon.
- Changed typeface from `San Francisco UI` to `San Francisco Pro`. You will need to download the updated typeface here. https://developer.apple.com/fonts/
- Updated to Sketch version 45.2
- Updated layer styles and fonts styles to take advantage of Sketch’s new organizational features.

### Documentation

- Fixed disabled `Button` documentation ([#422](https://github.com/Shopify/polaris-react/pull/422)) (thanks [@michaelsunglee](https://github.com/michaelsunglee) for the [original issue](https://github.com/Shopify/polaris/issues/113))
- Fixed project URL in CircleCI badge ([#423](https://github.com/Shopify/polaris-react/pull/423))
- Fixed Stack documentation ([#438](https://github.com/Shopify/polaris-react/pull/438)) (thanks [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris/issues/120))
- Added embedded Alert documentation and updated other embedded documentation ([#446](https://github.com/Shopify/polaris-react/pull/446/files))

### Dependency updates

- Updated React TypeScript definitions ([#452](https://github.com/Shopify/polaris-react/pull/452))

### Chores

- Updated EASDK metadata structure for generic interfaces ([#435](https://github.com/Shopify/polaris-react/pull/435))
- Removed postinstall hook ([#444](https://github.com/Shopify/polaris-react/pull/444))

## 1.1.1 - 2017-06-19

### Chores

- Fixed a repo issue that caused the public repo release not to happen

## 1.1.0 - 2017-06-19

### Enhancements

- Added automatic inference of the `target` property of EASDK buttons in `Page` `primaryAction` and `secondaryAction` based on their URL ([#310](https://github.com/Shopify/polaris-react/pull/310)) (thanks [@jimmyn](https://github.com/jimmyn) for the [original issue](https://github.com/Shopify/polaris/issues/46))
- Added automatic inference of the `target` property of EASDK breadcrumbs in `Page` `breadcrumbs` prop based on the URL ([#396](https://github.com/Shopify/polaris-react/pull/396))
- `Select` option descriptors now accept a `disabled` attribute to disable the generated `option` ([#349](https://github.com/Shopify/polaris-react/pull/349)) (thanks [@sogko](https://github.com/sogko) for the [original issue](https://github.com/Shopify/polaris/issues/68))
- `easdk.showFlashNotice` now accepts an optional options object as its second parameter. Passing `{error: true}` will cause the flash to appear as an error, matching the behaviour of [`ShopifyApp.flashError`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-flasherror-message) ([#392](https://github.com/Shopify/polaris-react/pull/392))
- `Checkbox`, `RadioButton`, `ChoiceList`, `Select`, and `TextField` now pass the ID of the changed input as the second argument to their `onChange` callback ([#391](https://github.com/Shopify/polaris-react/pull/391)) (thanks [@milep](https://github.com/milep) for the [original issue](https://github.com/Shopify/polaris/issues/83))
- `Popover` now respects the `z-index` of the activator if it exists ([#347](https://github.com/Shopify/polaris-react/pull/347/files))
- When putting content as children of `Tabs`, the default panel that is generated now respects the `panelID` of the selected tab, and uses a sensible default based on the tab’s `id` if no `panelID` exists ([#347](https://github.com/Shopify/polaris-react/pull/347))
- When selecting a tab in `Tabs`, the matching panel is now focused by default ([#347](https://github.com/Shopify/polaris-react/pull/347))
- `easdk` methods are bound to the object so they can be freely passed as callbacks ([#392](https://github.com/Shopify/polaris-react/pull/392))

### Changes

- `Avatar` now renders as a `span` instead of a `div` ([#398](https://github.com/Shopify/polaris-react/pull/398))

### Bug fixes

- Fixed contents in `Layout.AnnotatedSection` breaking out of their container ([#365](https://github.com/Shopify/polaris-react/pull/365)) (thanks [@cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris/issues/75))
- Fixed spacing above a `primaryAction` in `CalloutCard` when there is no `secondaryAction` ([#364](https://github.com/Shopify/polaris-react/pull/364))
- Aria attributes are now on the actionable elements of `Tabs` instead of in the list items ([#347](https://github.com/Shopify/polaris-react/pull/347))
- Exposed `Panel` as `Tabs.Panel` instead of `Tabs.panel` ([#347](https://github.com/Shopify/polaris-react/pull/347))
- Fixed the alignment of `prefix` and `suffix` content of `TextField` ([#372](https://github.com/Shopify/polaris-react/pull/372)) (thanks [@bdillon3](https://github.com/bdillon3) for the [original issue](https://github.com/Shopify/polaris/issues/60))
- Fixed the disabled text color in `TextField` ([#372](https://github.com/Shopify/polaris-react/pull/372))
- `Checkbox` and `RadioButton` no longer generate invalid HTML in their labels ([#391](https://github.com/Shopify/polaris-react/pull/391)) (thanks [@ernestogutierrez](https://github.com/ernestogutierrez) for the [original issue](https://github.com/Shopify/polaris/issues/88))
- `Tabs` no longer steal focus from contained elements ([#347](https://github.com/Shopify/polaris-react/pull/347)) (thanks [@alexdover](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris/issues/74))

### Design updates

- Reduced horizontal padding on `Breadcrumbs` ([#334](https://github.com/Shopify/polaris-react/pull/334))
- Updated icon and internal padding of `FooterHelp` ([#357](https://github.com/Shopify/polaris-react/pull/357))
- Updated the `EmptyState` layout and typographic styles ([#376](https://github.com/Shopify/polaris-react/pull/376))

### Documentation

- Fixed the code examples on the `EmbeddedApp` documentation ([#375](https://github.com/Shopify/polaris-react/pull/375))
- Added a simple `EmbeddedApp` example ([#308](https://github.com/Shopify/polaris-react/pull/308/files))
- Renamed the “Tables and lists” category to “Lists”
- A variety of other documentation updates (thanks [@sebnun](https://github.com/sebnun), [@asacarter](https://github.com/asacarter), and [@resistorsoftware](https://github.com/resistorsoftware) for raising issues)

### Dependency updates

- Updated all dependencies ([#352](https://github.com/Shopify/polaris-react/pull/352))

### Chores

- Added a script to automatically match the published version number to the one referenced in the README ([#353](https://github.com/Shopify/polaris-react/pull/353))
- Added the correct viewport tag to the Playground ([#358](https://github.com/Shopify/polaris-react/pull/358))
- Hid deprecation errors during tests ([#391](https://github.com/Shopify/polaris-react/pull/391))

## 1.0.3 - 2017-05-11

### Big fixes

- Fixed an issue where the embedded components would not reload the page within the Shopify admin ([#307](https://github.com/Shopify/polaris-react/pull/307)) (thanks [@buggy](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/28))
- Fixed the `spacing="none"` variation on `Stack` not working correctly, and added the missing `extraLarge` enum value for `spacing` ([#320](https://github.com/Shopify/polaris-react/pull/320))
- Fixed `Banner`’s `onDismiss` callback not being called when the dismiss button was clicked ([76ce13f](https://github.com/Shopify/polaris-react/commit/76ce13f328c2446c316f3d7f1f2a3f007658b6f7)) (thanks [@tlwirtz](https://github.com/tlwirtz) for the [original issue](https://github.com/Shopify/polaris/issues/52))

### Design updates

- Updated `Badge` text colors ([#319](https://github.com/Shopify/polaris-react/pull/319))
- Updated line height for the small `DisplayText` variation ([#318](https://github.com/Shopify/polaris-react/pull/318))
- Updated the default icon for error `Banner` ([#317](https://github.com/Shopify/polaris-react/pull/317)) (thanks [@heyneff](https://github.com/heyneff) for the [original issue](https://github.com/Shopify/polaris/issues/42))

### Sketch UIKit

- Added app examples (thanks [@lukepxu](https://github.com/lukepxu) for the [original issue](https://github.com/Shopify/polaris/issues/17))
- Removed references to the Graphik typeface (thanks [@adamnel](https://github.com/adamnel) for the [original issue](https://github.com/Shopify/polaris/issues/22))
- Left-aligned button text for better resizing
- Added Messenger link to navigation to better communicate that the channel nav collapses after 3 items
- Fixed alignment of table headers
- Minor updates to Dataviz and Reports examples
- Added indicators to Home notifications

### Documentation

- Synchronized component documentation with the style guide ([1e89559](https://github.com/Shopify/polaris-react/commit/1e895594afedb63787e6c05a167f5146901e88e6))

### Chores

- Fixed an issue that prevented the public CHANGELOG from being generated correctly ([#292](https://github.com/Shopify/polaris-react/pull/292))
- Added a hot-reloading Playground to easily try out different components ([#315](https://github.com/Shopify/polaris-react/pull/315))
- Removed the references to Babel presets from `package.json` ([#322](https://github.com/Shopify/polaris-react/pull/322)) (thanks [@macs91](https://github.com/macs91) for digging into this with us)
- Removed the `@import` statements at the top of source Sass files ([#312](https://github.com/Shopify/polaris-react/pull/312))
- Updated TSLint and related linting dependencies ([#316](https://github.com/Shopify/polaris-react/pull/316))

## 1.0.2 - 2017-04-25

### Bug fixes

- Fixed an issue where subcomponents with variations would use a single `-` instead of `--` ([#278](https://github.com/Shopify/polaris-react/pull/278)) (thanks [@johnsonab](https://github.com/johnsonab) for the [original issue](https://github.com/Shopify/polaris/issues/9))
- Fixed a missing typing dependency and a missing `embedded` types entry point that were causing issues using this package with TypeScript ([#286](https://github.com/Shopify/polaris-react/pull/286)) (thanks [@buggy](https://github.com/buggy) for the [original](https://github.com/Shopify/polaris/issues/19) [issues](https://github.com/Shopify/polaris/issues/20))
- Fixed an issue where the anchor tag for `ResourceList.Item` would not span the full width of the item ([0c11498](https://github.com/Shopify/polaris-react/commit/0c11498406d90850f569824d0979c9a8f84d45c9)) (thanks [@sdn90](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris/issues/14))

### Dependency updates

- Started using the [`prop-types` package](https://github.com/reactjs/prop-types) instead of getting `PropTypes` from `react`, as the latter is deprecated as of React 15.5.0 ([#282](https://github.com/Shopify/polaris-react/pull/282))

### Documentation

- Corrected the name of `documentation/Embeddded apps.md` to `documentation/Embedded apps.md` ([#269](https://github.com/Shopify/polaris-react/pull/269)) (thanks [@chrispappas](https://github.com/chrispappas) for the [original issue](https://github.com/Shopify/polaris/issues/10))
- Fixed the `ColorPicker` documentation to show valid values for `saturation`, `brightness`, and `alpha` ([#284](https://github.com/Shopify/polaris-react/pull/284)) (thanks [@allanarmstrong](https://github.com/allanarmstrong) for the [original issue](https://github.com/Shopify/polaris/issues/13))

### Chores

- Added a description to `package.json` ([#281](https://github.com/Shopify/polaris-react/pull/281))
- Added license to `package.json` and to the root of the repo ([#283](https://github.com/Shopify/polaris-react/pull/283)) (thanks [@d2s](https://github.com/d2s) for the [original issue](https://github.com/Shopify/polaris/issues/15))
- Fixed an issue where the Webpack example would complain about a missing dependency ([#279](https://github.com/Shopify/polaris-react/pull/279)) (thanks [@rafaedez](https://github.com/rafaedez) for the [original issue](https://github.com/Shopify/polaris/issues/21))

## 1.0.1 - 2017-04-20

### Chores

- Switch repo to public access

## 1.0.0 - 2017-04-20

- Initial release
