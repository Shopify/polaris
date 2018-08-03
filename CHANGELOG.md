# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines][changelog-guidelines].

## Unreleased

### Enhancements

- Changed the esnext folder to contain individual, minimally transpiled JavaScript component files, and raw style/image assets ([#1729](https://github.com/Shopify/polaris-react/pull/1729))
- Added `Progress` export to Badge
- Added `iFrameName` prop to `<Modal />` to allow named iframe children ([#1822](https://github.com/Shopify/polaris-react/pull/1822))
- Added `Scrollable.ScrollTo` subcomponent ([#1816](https://github.com/Shopify/polaris-react/pull/1816))
- Changed the primary focus target of an activated Popover from the first item to the overlay itself ([#1618](https://github.com/Shopify/polaris-react/pull/1618))

### Bug fixes

- Fixed visibility of the hidden implicit submit button in form ([#1846](https://github.com/Shopify/polaris-react/pull/1846)) (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris/issues/386))
- Fixed alignment of wrapped empty state actions ([#1828](https://github.com/Shopify/polaris-react/pull/1828))
- Allowed an array of strings as button children ([#1817](https://github.com/Shopify/polaris-react/pull/1817))
- Swapped the import and export icons ([#1849](https://github.com/Shopify/polaris-react/pull/1849))

### Documentation

- Added iOS and Android examples for the RadioButton component ([#1830](https://github.com/Shopify/polaris-react/pull/1830))

### Documentation

- Added iOS and Android examples for the banner component ([#1829](https://github.com/Shopify/polaris-react/pull/1829))

## 2.5.0 - 2018-07-20

### Enhancements

- Updated sub component structure ([#1266](https://github.com/Shopify/polaris-react/pull/1266))
- Added `weekStartsOn` prop to date picker ([#1783](https://github.com/Shopify/polaris-react/pull/1783))

### Bug fixes

- Remove stickyManager from app provider props interface ([#1706](https://github.com/Shopify/polaris-react/pull/1706))
- Fixed a bug where `Layout.AnnotatedSection` would output a wrapper div for a `description` even when its contents were empty
- Remove extra padding from annotated section ([#1805](https://github.com/Shopify/polaris-react/pull/1805))

### Documentation

- Added iOS and Android examples for the card component ([#1784](https://github.com/Shopify/polaris-react/pull/1784))

### Development workflow

- Renamed `yarn start:vrt` to `yarn tophat` and updated the folder name to match ([#1754](https://github.com/Shopify/polaris-react/pull/1754), [#1764](https://github.com/Shopify/polaris-react/pull/1764))
- Improved `yarn tophat`’s design, and added a `/all-components` route ([#1709](https://github.com/Shopify/polaris-react/pull/1709))

## 2.4.0 - 2018-07-12

### Enhancements

- Changed Form to submit a form by default when the Enter key is pressed, and added the prop `implicitSubmit` to disable this default ([#1630](https://github.com/Shopify/polaris-react/pull/1630))

### Bug fixes

- Fixed text field padding when a prefix or suffix is included ([#1740](https://github.com/Shopify/polaris-react/pull/1740))

## 2.3.1 - 2018-07-05

### Enhancements

- Removed the min-width of 320px from Resource list ([#1599](https://github.com/Shopify/polaris-react/pull/1599))

### Bug fixes

- Resolve issue with RangeSlider not accepting `0` as a `max` value ([#1690](https://github.com/Shopify/polaris-react/pull/1690))
- Slightly reduce RangeSlider's `prefix/suffix` spacing ([#1690](https://github.com/Shopify/polaris-react/pull/1690))
- Fixed spacing for prefix and suffix on the text field component ([#1698](https://github.com/Shopify/polaris-react/pull/1698))
- Fixed a bug which caused data tables not rendered on first page load to have skewed cell heights ([#1619](https://github.com/Shopify/polaris-react/pull/1619)) (thanks [@flewid](https://github.com/flewid) for the [original issue](https://github.com/Shopify/polaris/issues/344))
- Fixed DatePicker month styling for previous years ([#1657](https://github.com/Shopify/polaris-react/pull/1658))

## 2.3.0 - 2018-07-03

### New components

#### [Option list](https://polaris.shopify.com/components/lists-and-tables/option-list)

Use Option list to present a group of selectable items outside of the context of a form.

### Documentation

- Fixed `Form` examples ([#1565](https://github.com/Shopify/polaris-react/pull/1565))

### Enhancements

- Added `prefix` and `suffix` props to `RangeSlider` for better layout control ([#1584](https://github.com/Shopify/polaris-react/pull/1584))
- Added testing documentation and examples in AppProvider ([#1556](https://github.com/Shopify/polaris-react/pull/1556))
- Performance: optimized avatar SVG files ([#1662](https://github.com/Shopify/polaris-react/pull/1662))
- Updated `yarn run optimize` to add new line at the end of SVG files ([#1685](https://github.com/Shopify/polaris-react/pull/1685))

### Bug fixes

- Adjusted padding on text field to work with Chrome’s autofill ([#1415](https://github.com/Shopify/polaris-react/pull/1415))
- Fixed a regression where the version of Polaris wasn’t globally available anymore ([#1555](https://github.com/Shopify/polaris-react/pull/1555))
- Updated the interaction state visuals for ActionList ([#1585](https://github.com/Shopify/polaris-react/pull/1585))
- Fixed z-index on resource list header with sorting options ([#1629](https://github.com/Shopify/polaris-react/pull/1629)) (thanks [@janklimo](https://github.com/janklimo) for the [original issue](https://github.com/Shopify/polaris/issues/355))
- Fixed an issue where Radio Buttons were not focusable in Safari ([#1626](https://github.com/Shopify/polaris-react/pull/1626))
- Fixed spacing for annotated section descriptions ([#1604](https://github.com/Shopify/polaris-react/pull/1604))
- Fixed a bug in EASDK action transforms that prevented external urls in embedded apps from opening ([#794](https://github.com/Shopify/polaris-react/pull/794)) (thanks [@dansundy](https://github.com/dansundy) for the [original issue](https://github.com/Shopify/polaris/issues/203))

### Dependency updates

- Updated [`@shopify/polaris-tokens`](https://npmjs.com/package/@shopify/polaris-tokens), the single source of truth for colors

## 2.2.0 - 2018-06-12

### New components

#### [Range slider](https://polaris.shopify.com/components/forms/range-slider)

Use range slider to select a number value between a min and max range.

### Enhancements

- Added a fixed prop to popover allowing for a fixed position ([#1524](https://github.com/Shopify/polaris-react/pull/1524))
- Added badge prop to the item descriptor type and action group ([#1295](https://github.com/Shopify/polaris-react/pull/1295))
- Added `text-breakword` mixin for easier word breaking when dealing with long unspaced strings ([#1543](https://github.com/Shopify/polaris-react/pull/1543))

### Bug fixes

- Fixed unexpected form submission when switching tabs in a tabs component wrapped in a form ([#1542](https://github.com/Shopify/polaris-react/pull/1542))
- Added missing `'Shopify.API.setWindowLocation'` message handler to the EASDK ([#1539](https://github.com/Shopify/polaris-react/pull/1539))

## 2.1.2 - 2018-06-06

### Enhancements

- Added support for cards to accept a block for a title ([#1412](https://github.com/Shopify/polaris-react/pull/1412))
- Added an intermediate prop typing for `Link` to allow redefinition of prop definitions ([#1439](https://github.com/Shopify/polaris-react/pull/1439))

### Bug fixes

- Fixed an issue where resource list filters lost padding ([#1438](https://github.com/Shopify/polaris-react/pull/1438)) (thanks to [@BarryCarlyon](https://github.com/BarryCarlyon) for the [original issue](https://github.com/Shopify/polaris/issues/330))
- Fixed unexpected focus jumps when date picker props are updated ([#1399](https://github.com/Shopify/polaris-react/pull/1399))
- Fixed the spacing and text wrapping of exception list title and description ([#1503](https://github.com/Shopify/polaris-react/pull/1503))

## 2.1.1 - 2018-05-30

### Bug fixes

- DropZone: fixed a bug where it would kick into small-size too soon ([#1434](https://github.com/Shopify/polaris-react/pull/1434))

### Documentation

- Various content and markdown fixes

## 2.1.0 - 2018-05-03

### New components

#### [Exception list](https://polaris.shopify.com/components/lists-and-tables/exception-list)

Use Exception lists to draw the merchant’s attention to important information that adds extra context to a task.

### Enhancements

- Added an `ellipsis` prop to ActionList.Item allowing for an ellipsis suffix after the content ([#1377](https://github.com/Shopify/polaris-react/pull/1377))
- Added a `preferredAlignment` prop to Popover allowing it to be aligned to the left, center, or right of its activator ([#1390](https://github.com/Shopify/polaris-react/pull/1390))
- Updated styling for Banners that appear in Cards or Modals ([#1394](https://github.com/Shopify/polaris-react/pull/1394))
- Added new size to DropZone component ([#1419](https://github.com/Shopify/polaris-react/pull/1419))
- Exposed Group interface from the Select component ([#1389](https://github.com/Shopify/polaris-react/pull/1389))
- Renamed `plain-list` mixin to `unstyled-list` ([#1375](https://github.com/Shopify/polaris-react/pull/1375))
- Removed padding from DropZone and applied it to FileUpload instead ([#1418](https://github.com/Shopify/polaris-react/pull/1418))

### Bug fixes

- Fixed unexpected window scroll on rendering data table ([#1383](https://github.com/Shopify/polaris-react/pull/1383)) (thanks to [@mfurniss](https://github.com/mfurniss) for the [original issue](https://github.com/Shopify/polaris/issues/317))
- Fixed focused inner interaction state on resource list item for reverse tabbing ([#1403](https://github.com/Shopify/polaris-react/pull/1403))
- Fixed border radius on card to match the padding on page ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Added target to the breadcrumb prop on page ([#1345](https://github.com/Shopify/polaris-react/pull/1345)) (thanks to [@sdn90](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris/issues/306))
- Fixed visual representation of disabled bulk action buttons in ResourceList ([#1396](https://github.com/Shopify/polaris-react/pull/1396))
- Fixed margins of a fullWidth Popover that appears above its activator ([#1388](https://github.com/Shopify/polaris-react/pull/1388))
- Fixed rendering of Popover when activator rerenders ([#1414](https://github.com/Shopify/polaris-react/pull/1414)) (thanks to [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris/issues/324))
- Fixed z-index calculation for PositionOverlay and Dialog ([#1421]([https://github.com/Shopify/polaris-react/pull/1421]))
- Fixed an issue where selecting a date in DatePicker would submit its enclosing form ([#1413](https://github.com/Shopify/polaris-react/pull/1413))
- Fixed ResourceList reverse tabbing focus interaction on Action Buttons ([#1406](https://github.com/Shopify/polaris-react/pull/1406))
- Fixed padding in the case where a Resource list had no filters ([#1438](https://github.com/Shopify/polaris-react/pull/1438))

## 2.0.0 - 2018-05-07

Summary: this is the first major version of Polaris React since launch. Included in this release are:

- Several new components, including data table, drop zone, app provider, and modal
- Improvements to existing components, such as resource list, choice list, and cards
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

For accessibility reasons, the `id` prop is now required on the Collapsible component.

##### Upgrade instructions

Pass a unique value as an `id` to all `<Collapsible>` components. For example, `<Collapsible id="my-unique-id">`.

#### EmbeddedApp component has been removed

The `EmbeddedApp` component has been removed. The `AppProvider` component now accepts the configuration needed to initialize an embedded app.

##### Upgrade instructions

Use the `AppProvider` component with the `apiKey` and `shopOrigin` props.

#### [Resource list](https://polaris.shopify.com/components/lists-and-tables/resource-list#navigation)

Shopify is organized around objects that represent a merchant’s business, such as customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects resources.

The resource list component functions as:

- A content format, presenting a set of individual resources in a compact form
- A system for taking action on one or more individual resources
- A way to navigate to the show page of an individual resource

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

The CSS for Icons will no longer apply a color to icons by default. You must use the `color` prop on the Icon component to specify the color.

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

- Added `error` prop to ChoiceList([#1292](https://github.com/Shopify/polaris-react/pull/1292))
- `TextField`, `Select`, and `Checkbox` now accept the types `string` or `ReactElement` for the `error` prop ([#1292](https://github.com/Shopify/polaris-react/pull/1292))
- Added optional `id` props to more components, and restructured the prop definitions to allow projects to make `id` props mandatory ([#1138](https://github.com/Shopify/polaris-react/pull/1138))
- Added `fullWidth` prop to `Card.Section` ([#1051](https://github.com/Shopify/polaris-react/pull/1051))
- Added `fullHeight` prop to `Popover` to override max-height ([#1099](https://github.com/Shopify/polaris-react/pull/1099))
- Added `allowRange` as a property for `DatePicker` ([#884](https://github.com/Shopify/polaris-react/pull/884))
- Added the `external` option to the `secondaryAction.action` prop on the `Banner` component ([#1263](https://github.com/Shopify/polaris-react/pull/1263)). Thank you to ([Andrew Cargill](https://github.com/cargix1)) for the issue ([#236](https://github.com/Shopify/polaris/issues/236))

### Bug fixes

- Enforced subdued description text style in `AnnotatedSection` ([#1294](https://github.com/Shopify/polaris-react/pull/1294))
- Fixed an overflow bug causing the border of `TextField` to be cut off ([#1180](https://github.com/Shopify/polaris-react/pull/1180))
- Allowed specific props in the `TextField` component to pass through properties to the input child ([#907](https://github.com/Shopify/polaris-react/pull/907))
- Fixed `ActionList` component to provide section dividers when a `title` was not provided ([#926](https://github.com/Shopify/polaris-react/pull/926))
- Fixed an issue in the `Select` component where placeholder didn’t properly appear on Firefox and appeared disabled on all browsers ([#1282](https://github.com/Shopify/polaris-react/pull/1282))

## 1.14.2 - 2018-05-02

_This will be the last v1.x release outside of critical security fixes._

### Bug fixes

- Add margin-left spacing to disclosure icon within Button component ([#1354](https://github.com/Shopify/polaris-react/pull/1354))
- Remove margins on segmented ButtonGroup ([#1352](https://github.com/Shopify/polaris-react/pull/1352))
- Fixed text alignment of link so that it inherits from its parent node ([#1343](https://github.com/Shopify/polaris-react/pull/1343#discussion_r185069280))

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

- Fixed external prop not working within ActionList component ([#1177](https://github.com/Shopify/polaris-react/pull/1177))
- Fixed a syntax error in one of the Card component examples ([#1175](https://github.com/Shopify/polaris-react/pull/1175)) (thanks [meecrobe](https://github.com/meecrobe) for the [original issue](https://github.com/Shopify/polaris/issues/281))

## 1.12.4 - 2018-03-19

- Enhanced Avatar to work better when provided non-square images ([#1124](https://github.com/Shopify/polaris-react/pull/1124))
- Move documentation file so it’s picked up by the styleguide ([#1162](https://github.com/Shopify/polaris-react/pull/1162))

## 1.12.3 - 2018-03-16

### Bug fixes

- Fixed disclosure centering on the tab component ([#1131](https://github.com/Shopify/polaris-react/pull/1131))
- Fixed an issue where a style void would appear between breakpoints at high text zoom levels ([#1071](https://github.com/Shopify/polaris-react/pull/1071))

### Documentation

- Removed purpose section from component READMEs ([#1134](https://github.com/Shopify/polaris-react/pull/1134))
- Added Embedded page under the Embedded section ([#956](https://github.com/Shopify/polaris-react/pull/956))
- Added “Using embedded components” section ([#959](https://github.com/Shopify/polaris-react/pull/959))
- Added screenshots to the embedded components ([#1008](https://github.com/Shopify/polaris-react/pull/1008))
- Clarified usage of card header and footer actions ([#1143](https://github.com/Shopify/polaris-react/pull/1143))

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

- Fixed TextField overflow issues when inside Scrollable ([#967](https://github.com/Shopify/polaris-react/pull/967))
- Fixed Select focus state bug occuring in Firefox ([#910](https://github.com/Shopify/polaris-react/pull/910))
- Fixed vertical alignment of text within full width variant of the button component ([#1083](https://github.com/Shopify/polaris-react/pull/1017))

### Enhancements

- Changed Checkbox label to allow string or React.ReactNode ([#894](https://github.com/Shopify/polaris-react/pull/894))
- Update `TextField` type with currency ([#908](https://github.com/Shopify/polaris-react/pull/908))
- Added `ariaControls`, `ariaExpanded` prop to Button ([#978](https://github.com/Shopify/polaris-react/pull/978/))
- Updated the base red color to improve contrast ([#1076](https://github.com/Shopify/polaris-react/pull/1076))
- Added a notification icon to the bundled icons available to use in the icon component’s source prop ([#1017](https://github.com/Shopify/polaris-react/pull/1017))
- Exposed Status from the Banner component ([#998](https://github.com/Shopify/polaris-react/pull/998))
- Added `titleHidden` prop to Page ([#1033](https://github.com/Shopify/polaris-react/pull/1033))

### Documentation

- Clarified intended usage for EmptyState ([#1068](https://github.com/Shopify/polaris-react/pull/1068))

### Chores

- Added version number to source ([#856](https://github.com/Shopify/polaris-react/pull/856))

## 1.11.0 - 2018-02-13

- Changed Action to Disableable Action in Card ([#838](https://github.com/Shopify/polaris-react/pull/838))

### Enhancements

- Added `renderChildren` prop to choice list component ([#993](https://github.com/Shopify/polaris-react/pull/993))

### Bug fixes

- Fixed an issue with footer help links not expanding to full-width on mobile devices ([#759](https://github.com/Shopify/polaris-react/issues/759))
- Added breadcrumbs to SkeletonPage ([#985](https://github.com/Shopify/polaris-react/pull/985))
- Added max-width and auto margin to EmptyState ([#969](https://github.com/Shopify/polaris-react/pull/969))
- Fixed outline button disabled state styles ([#972](https://github.com/Shopify/polaris-react/pull/972))
- Fixed Tag so the onRemove function is not imporperly called (thanks [chaddjohnson](https://github.com/chaddjohnson) for the [original issue](https://github.com/Shopify/polaris/issues/235) ) ([#970](https://github.com/Shopify/polaris-react/pull/970))
- Fixed border on inputs disabled state ([#1007](https://github.com/Shopify/polaris-react/pull/1007))
- Fixed an issue in TextInput, when you increment or decrement with a float value, and the digits after the decimal point where wrong ([#833](https://github.com/Shopify/polaris-react/pull/898)) (thanks to [@cgidzinski](https://github.com/cgidzinski) for the [original issue](https://github.com/Shopify/polaris-react/issues/761))
- Added top alignment to FormLayout.Group [#876](https://github.com/Shopify/polaris-react/pull/876)

### Documentation

- Fixed capitalization of prop names in Pagination component’s documentation (thanks [donnguyen](https://github.com/donnguyen) for the [original issue](https://github.com/Shopify/polaris/issues/141)) ([#975](https://github.com/Shopify/polaris-react/pull/975))
- Exposed Option from the Select component ([#976](https://github.com/Shopify/polaris-react/pull/976))

## 1.10.2 - 2018-01-22

### Bug fixes

- Fixed the public repository’s build (which was missing the new CircleCI configuration files) ([#951](https://github.com/Shopify/polaris-react/pull/951))

## 1.10.1 - 2018-01-19

### Bug fixes

- Fixed CSS only checkbox (thanks [daddy88](https://github.com/daddy88) for the [original issue](https://github.com/Shopify/polaris/issues/252)) ([#932](https://github.com/Shopify/polaris-react/pull/932))

## 1.10.0 - 2018-01-17

- Restored the correct `latest` version to the CDN
- Fixed rgbToHsb function when red is the largest number and added tests (thanks [emcmanus](https://github.com/emcmanus) for the [original issue](https://github.com/Shopify/polaris/issues/251)) ([#877](https://github.com/Shopify/polaris-react/pull/877))
- Fixed an issue where a hard-coded path would cause the build to fail on Windows ([#833](https://github.com/Shopify/polaris-react/pull/833)) (thanks to [@Invader444](https://github.com/Invader444) for the [original issue](https://github.com/Shopify/polaris/issues/245) and [pull request](https://github.com/Shopify/polaris/pull/246))
- Added `onClick` to `UnstyledLink` ([#832](https://github.com/Shopify/polaris-react/pull/832))
- Added tests to `Link` ([#832](https://github.com/Shopify/polaris-react/pull/897))

- Added tests for ColorPicker color utilities ([#905](https://github.com/Shopify/polaris-react/pull/905))

## 1.9.1 - 2017-12-21

### Documentation

- Ammending changelog

## 1.9.0 - 2017-12-21

### Enhancements

- Added `onActionAnyItem` prop to action list and used to close page `actionGroups` on click or keypress of any item ([#792](https://github.com/Shopify/polaris-react/pull/792))
- Added `content` prop to tabs and deprecated use of `title` ([#808](https://github.com/Shopify/polaris-react/pull/808))
- Added text container component ([#757](https://github.com/Shopify/polaris-react/pull/757/))
- Added `idForItem` prop to resource list ([#799](https://github.com/Shopify/polaris-react/pull/799/))
- Added `fullWidth` prop to layout section ([#743](https://github.com/Shopify/polaris-react/pull/743/))
- Added `indeterminate` as option for checkbox `checked` prop value ([#748](https://github.com/Shopify/polaris-react/pull/748))
- Added `singleColumn` prop to page ([#763](https://github.com/Shopify/polaris-react/pull/763))
- Added `focused` prop to text field [813](https://github.com/Shopify/polaris-react/pull/813)

### Bug fixes

- Fixed positioned overlay not responding to scrollable container events
- Fixed first focusable item focus in popovers ([#764](https://github.com/Shopify/polaris-react/pull/764))
- Fixed typos in the select component documentation (thanks [mattchidley](https://github.com/mattchidley) for the [original issue](https://github.com/Shopify/polaris/issues/224)) ([#773](https://github.com/Shopify/polaris-react/pull/773))

## 1.8.3 - 2017-10-26

### Bug fixes

- Moved react-transition-group from a dev dependency to a dependency

## 1.8.2 - 2017-10-24

### Bug fixes

- Fixed stack not returning children

## 1.8.1 - 2017-10-24

### Bug fixes

- Added missing yarn config file which was causing the build to fail

## 1.8.0 - 2017-10-23

### Documentation

- Updated README to consistently use contractions (thanks [stefanmiodrag](https://github.com/stefanmiodrag) for the [original pull request](https://github.com/Shopify/polaris/pull/191)) ([#682](https://github.com/Shopify/polaris-react/pull/682))
- Improved example description for Layout component ([#683](https://github.com/Shopify/polaris-react/pull/683))
- Updated Spinner documentation ([#696](https://github.com/Shopify/polaris-react/pull/696))
- Improved component purpose documentation across components ([#717](https://github.com/Shopify/polaris-react/pull/717))
- Improved documentation for Text style component ([#720](https://github.com/Shopify/polaris-react/pull/720))

### Enhancements

- Added support for React 16 ([#699](https://github.com/Shopify/polaris-react/pull/699))
- Added an option to show or hide unpublished products from the resource picker ([#628](https://github.com/Shopify/polaris-react/pull/628))
- Changed Popover component to use `react-transition-group` instead of our deprecated custom version in `@shopify/react-utilities` ([#718](https://github.com/Shopify/polaris-react/pull/718))
- Added new Progress bar component ([#659](https://github.com/Shopify/polaris-react/pull/659))
- Changed today’s date to be tabbable and clearly indicated in DatePicker ([#651](https://github.com/Shopify/polaris-react/pull/651))
- Added support for disabled choices in Choice list component ([#726](https://github.com/Shopify/polaris-react/pull/726))
- Added support for disabled secondary Page actions ([#650](https://github.com/Shopify/polaris-react/pull/650))
- Changed TextField and Select to now focus on clicking only within the area from the input to the end of its label text ([#694](https://github.com/Shopify/polaris-react/pull/694))

### Bug fixes

- Fixed Layout component example description
- Fixed SkeletonPage header appearing in embedded apps (thanks [rkbhochalya](https://github.com/rkbhochalya) for the [original issue](https://github.com/Shopify/polaris/issues/202))) ([#714](https://github.com/Shopify/polaris-react/pull/714))
- Fixed border-radius on Action list component in Chrome ([#719](https://github.com/Shopify/polaris-react/pull/719))

## 1.7.0 - 2017-10-06

### Enhancements

- Added SkeletonPage, SkeletonBodyText and SkeletonDisplayText components ([#615](https://github.com/Shopify/polaris-react/pull/615))
- Added Spinner component ([#621](https://github.com/Shopify/polaris-react/pull/621))
- Added hint prop to Scrollable and use in Popover ([#619](https://github.com/Shopify/polaris-react/pull/619))
- Updated Button component to use new Spinner component ([#621](https://github.com/Shopify/polaris-react/pull/621))
- Added external link support for Page secondaryActions ([#664](https://github.com/Shopify/polaris-react/pull/664/))
- Enabled the primaryAction of PageActions to be loading ([#653](https://github.com/Shopify/polaris-react/pull/653/))
- Stack now supports non-wrapping layouts on small screens ([#638](https://github.com/shopify/polaris-react/pull/638))
- Updated text field min and max documentation ([#635](https://github.com/shopify/polaris-react/pull/635))
- Breadcrumbs now accept a callback through onAction (thanks [arypbatista](https://github.com/arypbatista) for the [original issue](https://github.com/Shopify/polaris/issues/188)) ([#663](https://github.com/Shopify/polaris-react/pull/663))

### Bug fixes

- Fixed issue with embedded app breadcrumb linking to Shopify settings page (thanks [cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris/issues/116))([#663](https://github.com/Shopify/polaris-react/pull/663))
- Fixed Avatar to display image and initials simultaneously ([#642](https://github.com/shopify/polaris-react/pull/642))
- Fixed various links to embedded components ([#643](https://github.com/shopify/polaris-react/pull/643))
- Fixed left and right ends of TextField not responding to clicks([#644](https://github.com/shopify/polaris-react/pull/644))
- RadioButton & Checkbox now focus on clicking only within the area from the input to the end of its label text ([#671](https://github.com/shopify/polaris-react/pull/671))
- Fixed plain and fullWidth Button alignment ([#645](https://github.com/shopify/polaris-react/pull/645))
- Add a minor delay to tooltip display ([#678](https://github.com/Shopify/polaris-react/pull/678))

## 1.6.0 - 2017-09-25

### Enhancements

- Documented disabled prop for Checkbox and RadioButton (thanks [LeoAref](https://github.com/LeoAref) for the [original issue](https://github.com/Shopify/polaris/issues/114)) ([#627](https://github.com/Shopify/polaris-react/pull/627/files))
- Documented progress prop for Badge (thanks [sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris/issues/172)) ([#625](https://github.com/Shopify/polaris-react/pull/625/files))
- Added loading prop to Button (thanks [bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/30)) ([#626](https://github.com/Shopify/polaris-react/pull/626/files))
- Documented complex Select option (thanks [sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris/issues/174)) ([#630](https://github.com/Shopify/polaris-react/pull/630/files))
- Documented TextStyle component ([#631](https://github.com/Shopify/polaris-react/pull/631))
- Improved avatar typography spacing ([#629](https://github.com/Shopify/polaris-react/pull/629))
- Added subtract icon ([#648](https://github.com/Shopify/polaris-react/pull/648))
- Improved acessibility for Pagination ([#639](https://github.com/Shopify/polaris-react/pull/639))

### Bug fixes

- Fixed failed dependency installation for unauthenticated GitHub users (thanks [mikeyhew](https://github.com/mikeyhew) for the [original issue](https://github.com/Shopify/polaris/issues/184)) ([#623](https://github.com/Shopify/polaris-react/pull/623/files))
- Fixed Page header spacing ([#634](https://github.com/Shopify/polaris-react/pull/634))
- Fixed TextField focus ring transition ([#636](https://github.com/Shopify/polaris-react/pull/636))
- Fixed Popover not resizing on content updates ([#506](https://github.com/Shopify/polaris-react/pull/506))

## 1.5.2 - 2017-09-18

### Bug fixes

- Fixes alignment of page action links ([#589](https://github.com/Shopify/polaris-react/pull/589))

## 1.5.1 - 2017-08-30

### Bug fixes

- Fixed disabled buttons when using local class names ([#593](https://github.com/Shopify/polaris-react/pull/593))
- Fixed Scrollable resize listener not autobinding ([#592](https://github.com/Shopify/polaris-react/pull/592))

## 1.5.0 - 2017-08-30

### Enhancements

- Updated scrollable component to remember scroll position on re-render ([#583](https://github.com/Shopify/polaris-react/pull/583))
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
- Improved how ActionList handles images and groups ([#550](https://github.com/Shopify/polaris-react/pull/550))
- Exposed PopoverCloseSource from Popover component ([#562](https://github.com/Shopify/polaris-react/pull/562))

### Bug fixes

- Fixed PageActions spacing in IE11 ([#544](https://github.com/Shopify/polaris-react/pull/544))
- Fixed ID inconsistency on TextFields ([#553](https://github.com/Shopify/polaris-react/pull/553))
- Fixed spacing on Page component with no header (thanks [bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/160)) ([#563](https://github.com/Shopify/polaris-react/pull/563/files))
- Fixed disabled state on primary and destructive buttons ([#549](https://github.com/Shopify/polaris-react/pull/549/files))

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
- Added `fullWidth` option to Popover component ([#505](https://github.com/Shopify/polaris-react/pull/505))

### Bug fixes

- Updated Static HTML page examples to correct markup (thanks [bartcoppens](https://github.com/bartcoppens) for the [original issue](https://github.com/Shopify/polaris/issues/159)) ([#502](https://github.com/Shopify/polaris-react/pull/502))
- Hide increment and decrement buttons on number input when disabled (thanks [kguller](https://github.com/kguller) for the [original issue](https://github.com/Shopify/polaris/issues/163)) ([#524](https://github.com/Shopify/polaris-react/pull/524))
- Fixed link to product content documentation ([#528](https://github.com/Shopify/polaris-react/pull/528))
- Fixed documented type for error prop on Checkbox component ([#523](https://github.com/Shopify/polaris-react/pull/523))
- Fixed Popover reopening when clicking around during transition ([#531](https://github.com/Shopify/polaris-react/pull/531))
- Fixed Popover resizing on content updates ([#506](https://github.com/Shopify/polaris-react/pull/506))
- Fixed vertical alignment of Button content ([#525](https://github.com/Shopify/polaris-react/pull/525))

### Sketch UIKit

- Added Sketch color palette file

## 1.2.1 (July 27, 2017)

### Chores

- Fixed a repo issue that caused the public repo release not to happen

## 1.2.0 (July 27, 2017)

### Enhancements

- Added helpText to ChoiceList choices (thanks [cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris/issues/103)) ([#409](https://github.com/Shopify/polaris-react/pull/409))
- Added save icon ([#433](https://github.com/Shopify/polaris-react/pull/433))
- Added accessibilityLabel to Tabs ([#439](https://github.com/Shopify/polaris-react/pull/439))
- Updated icons for Banner ([#441](https://github.com/Shopify/polaris-react/pull/441))
- Improved Page component by fixing up spacing, addin a prop to show a separator below the page title, and changing the secondary actions to roll up into a dropdown menu on small screens ([#421](https://github.com/Shopify/polaris-react/pull/421)) ([#465](https://github.com/Shopify/polaris-react/pull/465)) ([#481](https://github.com/Shopify/polaris-react/pull/481))
- Improved default stacking behavior for Tooltip and Popover (thanks [Taphood](https://github.com/Taphood) for the [original issue](https://github.com/Shopify/polaris/issues/129)) ([#472](https://github.com/Shopify/polaris-react/pull/472))
- Added extraTight spacing option to Stack ([#474](https://github.com/Shopify/polaris-react/pull/474))
- Use default subheading type styles for ActionList ([#479](https://github.com/Shopify/polaris-react/pull/479))
- Improved large Button styles ([#442](https://github.com/Shopify/polaris-react/pull/442))
- Updated font-weight for text emphasis (thanks [bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/156)) ([#494](https://github.com/Shopify/polaris-react/pull/494/files))

### Bug fixes

- Removed the focus state for Banner on click ([#363](https://github.com/Shopify/polaris-react/pull/363))
- Fixed disabled Pagination button looking active
- Fixed alignment on Button
- Fixed min-width on TextField (thanks [Asa](https://github.com/asacarter) for the [original issue](https://github.com/Shopify/polaris/issues/96)) ([#440](https://github.com/Shopify/polaris-react/pull/440))
- Removed the border-top on EmptyState (thanks [Alex](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris/issues/102) [#408](https://github.com/Shopify/polaris-react/pull/408))
- Fixed Select placeholder value warnings (thanks [cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris/issues/98))
- Fixed disabled text on iOS ([#448](https://github.com/Shopify/polaris-react/pull/448))
- Fixed type for onChange event (thanks [Michaël](https://github.com/bakura10) for the original issue ([#461](https://github.com/Shopify/polaris-react/pull/461))

### Sketch UIKit

- Added color palette page to “Getting started”
- Button typography updated. More changes to come soon.
- Changed typeface from `San Francisco UI` to `San Francisco Pro`. You will need to download the updated typeface here. https://developer.apple.com/fonts/
- Updated to Sketch version 45.2
- Updated layer styles and fonts styles to take advantage of Sketch’s new organizational features.

### Documentation

- Fixed disabled Button documentation (thanks [Michael](https://github.com/michaelsunglee) for the [original issue](https://github.com/Shopify/polaris/issues/113)) ([#422](https://github.com/Shopify/polaris-react/pull/422))
- Fixed project URL in CircleCI badge ([#423](https://github.com/Shopify/polaris-react/pull/423))
- Fixed Stack documentation (thanks [Marco](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris/issues/120) ) ([#438](https://github.com/Shopify/polaris-react/pull/438))
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

- Added automatic inference of the `target` property of EASDK buttons in `Page`’s `primaryAction` and `secondaryActions` based on their URL (thanks [Dmitriy](https://github.com/jimmyn) for the [original issue](https://github.com/Shopify/polaris/issues/46)) ([#310](https://github.com/Shopify/polaris-react/pull/310))
- Added automatic inference of the `target` property of EASDK breadcrumbs in `Page`'s `breadcrumbs` prop based on the URL ([#396](https://github.com/Shopify/polaris-react/pull/396))
- `Select` option descriptors now accept a `diabled` attribute to disabled the generated `option` (thanks to [Hafiz](https://github.com/sogko) for the [original issue](https://github.com/Shopify/polaris/issues/68)) ([#349](https://github.com/Shopify/polaris-react/pull/349))
- `easdk.showFlashNotice` now accepts an optional options object as its second parameter. Passing `{error: true}` will cause the flash to appear as an error, matching the behaviour of [`ShopifyApp.flashError`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-flasherror-message) ([#392](https://github.com/Shopify/polaris-react/pull/392))
- `Checkbox`, `RadioButton`, `ChoiceList`, `Select`, and `TextField` now pass the ID of the changed input as the second argument to their `onChange` callback (thanks to [Miika](https://github.com/milep) for the [original issue](https://github.com/Shopify/polaris/issues/83)) ([#391](https://github.com/Shopify/polaris-react/pull/391))
- `Popover` now respects the `z-index` of the activator if it exists ([#347](https://github.com/Shopify/polaris-react/pull/347/files))
- When putting content as children of `Tabs`, the default panel that is generated now respects the `panelID` of the selected tab, and uses a sensible default based on the tab’s `id` if no `panelID` exists ([#347](https://github.com/Shopify/polaris-react/pull/347))
- When selecting a tab in `Tabs`, the matching panel is now focused by default ([#347](https://github.com/Shopify/polaris-react/pull/347))
- `easdk` methods are bound to the object so they can be freely passed as callbacks ([#392](https://github.com/Shopify/polaris-react/pull/392))

### Changes

- Avatar now renders as a `span` instead of a `div` ([#398](https://github.com/Shopify/polaris-react/pull/398))

### Bug fixes

- Fixed contents in `Layout.AnnotatedSection` breaking out of their container (thanks [Andrew](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris/issues/75)) ([#365](https://github.com/Shopify/polaris-react/pull/365))
- Fixed spacing above a primary action in `CalloutCard` when there is no secondary action ([#364](https://github.com/Shopify/polaris-react/pull/364))
- Aria attributes are now on the actionable elements of `Tabs` instead of in the list items ([#347](https://github.com/Shopify/polaris-react/pull/347))
- Exposed `Panel` as `Tabs.Panel` instead of `Tabs.panel` ([#347](https://github.com/Shopify/polaris-react/pull/347))
- Fixed the alignment of `prefix` and `suffix` content of `TextField` (thanks [bdillon3](https://github.com/bdillon3) for the [original issue](https://github.com/Shopify/polaris/issues/60)) ([#372](https://github.com/Shopify/polaris-react/pull/372))
- Fixed the disabled text color in `TextField` ([#372](https://github.com/Shopify/polaris-react/pull/372))
- `Checkbox`s and `RadioButton`s no longer generate invalid HTML in their labels (thanks [Ernesto](https://github.com/ernestogutierrez) for the [original issue](https://github.com/Shopify/polaris/issues/88)) ([#391](https://github.com/Shopify/polaris-react/pull/391))
- `Tabs` no longer steals focus from contained elements (thanks [Alex](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris/issues/74)) ([#347](https://github.com/Shopify/polaris-react/pull/347))

### Design updates

- Reduced horizontal padding on `Breadcrumbs` ([#334](https://github.com/Shopify/polaris-react/pull/334))
- Updated icon and internal padding of `FooterHelp` ([#357](https://github.com/Shopify/polaris-react/pull/357))
- Updated the `EmptyState` layout and typographic styles ([#376](https://github.com/Shopify/polaris-react/pull/376))

### Documentation

- Fixed the code examples o n the embedded app documentation ([#375](https://github.com/Shopify/polaris-react/pull/375))
- Added a simple embedded app example ([#308](https://github.com/Shopify/polaris-react/pull/308/files))
- Renamed the “Tables and lists” category to “Lists”
- A variety of other documentation updates (thanks to [Pablo](https://github.com/sebnun), [Asa](https://github.com/asacarter), and [David](https://github.com/resistorsoftware) for raising issues)

### Dependency updates

- Updated all dependencies ([#352](https://github.com/Shopify/polaris-react/pull/352))

### Chores

- Added a script to automatically match the published version number to the one referenced in the README ([#353](https://github.com/Shopify/polaris-react/pull/353))
- Added the correct viewport tag to the Playground ([#358](https://github.com/Shopify/polaris-react/pull/358))
- Hid deprecation errors during tests ([#391](https://github.com/Shopify/polaris-react/pull/391))

## 1.0.3 - 2017-05-11

### Big fixes

- Fixed an issue where the embedded components would not reload the page within the Shopify admin (thanks [Rich](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/28)) ([#307](https://github.com/Shopify/polaris-react/pull/307))
- Fixed the `spacing="none"` variation on `Stack` not working correctly, and added the missing `extraLarge` enum value for `spacing` ([#320](https://github.com/Shopify/polaris-react/pull/320))
- Fixed `Banner`’s `onDismiss` callback not being called when the dismiss button was clicked (thanks to [Taylor](https://github.com/tlwirtz) for the [original issue](https://github.com/Shopify/polaris/issues/52)) ([76ce13f](https://github.com/Shopify/polaris-react/commit/76ce13f328c2446c316f3d7f1f2a3f007658b6f7))

### Design updates

- Updated Badge text colors ([#319](https://github.com/Shopify/polaris-react/pull/319))
- Updated line height for the small `DisplayText` variation ([#318](https://github.com/Shopify/polaris-react/pull/318))
- Updated the default icon for error `Banner`s (thanks to [Michael](https://github.com/heyneff) for the [original issue](https://github.com/Shopify/polaris/issues/42)) ([#317](https://github.com/Shopify/polaris-react/pull/317))

### Sketch UIKit

- Added app examples (thanks to [lukepxu](https://github.com/lukepxu) for the [original issue](https://github.com/Shopify/polaris/issues/17))
- Removed references to the Graphik typeface (thanks to [Adam](https://github.com/adamnel) for the [original issue](https://github.com/Shopify/polaris/issues/22))
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
- Removed the references to Babel presets from `package.json` (thanks to [Massimo](https://github.com/macs91) for digging into this with us) ([#322](https://github.com/Shopify/polaris-react/pull/322))
- Removed the `@import` statements at the top of source Sass files ([#312](https://github.com/Shopify/polaris-react/pull/312))
- Updated TSLint and related linting dependencies ([#316](https://github.com/Shopify/polaris-react/pull/316))

## 1.0.2 - 2017-04-25

### Bug fixes

- Fixed an issue where subcomponents with variations would use a single `-` instead of `--` (thanks [johnsonab](https://github.com/johnsonab) for the [original issue](https://github.com/Shopify/polaris/issues/9)) ([#278](https://github.com/Shopify/polaris-react/pull/278))
- Fixed a missing typing dependency and a missing `embedded` types entry point that were causing issues using this package with TypeScript (thanks to [Rich](https://github.com/buggy) for the [original](https://github.com/Shopify/polaris/issues/19) [issues](https://github.com/Shopify/polaris/issues/20)) ([#286](https://github.com/Shopify/polaris-react/pull/286))
- Fixed an issue where the anchor tag for `ResourceList.Item`s would not span the full width of the item (thanks to [Steven](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris/issues/14)) ([0c11498](https://github.com/Shopify/polaris-react/commit/0c11498406d90850f569824d0979c9a8f84d45c9))

### Dependency updates

- Started using the [`prop-types` package](https://github.com/reactjs/prop-types) instead of getting `PropTypes` from `react`, as the latter is deprecated as of React 15.5.0 ([#282](https://github.com/Shopify/polaris-react/pull/282))

### Documentation

- Corrected the name of `documentation/Embeddded apps.md` to `documentation/Embedded apps.md` (thanks to [Chris](https://github.com/chrispappas) for the [original issue](https://github.com/Shopify/polaris/issues/10)) ([#269](https://github.com/Shopify/polaris-react/pull/269))
- Fixed the `ColorPicker` documentation to show valid values for `saturation`, `brightness`, and `alpha` (thanks to [Allan](https://github.com/allanarmstrong) for the [original issue](https://github.com/Shopify/polaris/issues/13)) ([#284](https://github.com/Shopify/polaris-react/pull/284))

### Chores

- Added a description to `package.json` ([#281](https://github.com/Shopify/polaris-react/pull/281))
- Added license to `package.json` and to the root of the repo (thanks to [Daniel](https://github.com/d2s) for the [original issue](https://github.com/Shopify/polaris/issues/15)) ([#283](https://github.com/Shopify/polaris-react/pull/283))
- Fixed an issue where the Webpack example would complain about a missing dependency (thanks to [Rafael](https://github.com/rafaedez) for the [original issue](https://github.com/Shopify/polaris/issues/21)) ([#279](https://github.com/Shopify/polaris-react/pull/279))

## 1.0.1 - 2017-04-20

### Chores

- Switch repo to public access

## 1.0.0 - 2017-04-20

- Initial release

[changelog-guidelines]: https://github.com/Shopify/polaris/blob/master/documentation/Versioning%20and%20changelog.md
