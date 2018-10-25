# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines](https://git.io/polaris-changelog-guidelines).

<!-- Unreleased changes should go to UNRELEASED.md -->

---

## 2.12.1 - 2018-10-11

### Bug fixes

- Fixes type imports in the build

## 2.12.0 - 2018-10-11

### Enhancements

- Removed tip from `Popover`
- Increased speed of `Popover` transition from 500ms to 100ms
- Improved text contrast in `Badge`.
- Added named `medium` size to Button that renders the same as omiting the size attribute

### Bug fixes

- Fixed typo in `Collapsible` example
- Fixed padding and margins on `SkeletonPage` to match `Page`
- Fixed spacing between `Page` title and metadata

### Documentation

- Made `ActionList`, `OptionList` and `Popover` examples active by default so previews are visible without interacting
- Improved the manual accessibility checklist

### Development workflow

- Batched Percy snapshots per component

## 2.11.0 - 2018-10-03

### Enhancements

- `Tab.Item` with a `url` prop now renders an `UnstyledLink` instead of a `Button` when displayed in `Popover` and you can now keyboard navigate the disclosure in `Tabs`
- Refs can be placed on `DropZone.FileUpload`
- Use the new context API in `ResourceList`
- Use the new context API in `DropZone`
- Update example description in `ExceptionList` documentation
- Move Modal CloseButton into its own subcomponent, instead of being part of the Header subcomponent. This is an internal implementation detail if you are using the React component. If you are using (s)css and are defining class names manually you will need to update references to `Polaris-Modal-Header__CloseButton` and `Polaris-Modal-Header--withoutTitle` to `Polaris-Modal-CloseButton` and `Polaris-Modal-CloseButton--withoutTitle` respectively.

### Development workflow

- Added `d.ts` files to test coverage ignore
- `Page` is no longer self-closing in the playground

### Bug fixes

- Fixed `Button` alignment issue caused by unnecessary icon markup rendering ([#2339](Fixing button alignment #2339)) (thanks to ([@mbaumbach](https://github.com/mbaumbach)) for the ([original issue](https://github.com/Shopify/polaris-react/issues/429)))
- Fixed console error and used new ref syntax in `DataTable` (thanks to ([@duythien0912](https://github.com/duythien0912)) for the ([original issue](https://github.com/Shopify/polaris-react/issues/403)))
- Fixed margin of `InlineError` text to align with the `ChoiceList` labels
- Replaced hardcoded `rem` values with globally scalable ones on `DataTable`’s collapsed shadow, and `TextStyle` code blocks
- Fixed spacing of numbered `List` for double digits ([#121](https://github.com/Shopify/polaris-ux/issues/121))
- Fixed `ProgressBar` not showing up in Windows high contrast mode ([#1708](https://github.com/Shopify/polaris-react/issues/1708))
- Top aligned all cells in `DataTable`
- Fixed stacking order of loading overlay in `ResourceList`
- Fixed form inputs in `Popover` that were disappearing instead of top aligning thanks to [@mbaumbach](https://github.com/mbaumbach) for the [original issue](https://github.com/Shopify/polaris-react/issues/435)
- Removed a redundant class on `OptionList` list items

### Documentation

- Made `Modal` examples show the modal dialog by default
- Changed fitted `Tabs` to have equal width when enough space is present ([#2314](https://github.com/Shopify/polaris-react/issues/2314))

### New components

#### withContext

Use `withContext` to pass consumer context to a component.

#### withRef

Use `withRef` with `compose` to forwardRefs to a component.

## 2.10.0 - 2018-09-18

### Enhancements

- Updated `Button` to accept a `React.ReactNode` for its `icon` prop

### Documentation

- Refined accessibility checklist

### Bug Fixes

- Added truncation to `Tag`

## 2.9.0 - 2018-09-10

### Enhancements

- Updated date filter labels in resource list
- Changed `placeholder` prop in `Select` to be the default selection
- Added a `loading` prop to `ResourceList` that places a spinner overtop items and disables bulk actions

### Documentation

- Clarified when and how to use icons in the banner component
- Updated footer help component guidelines to include content instructions for app developers

### Bug fixes

- Fixed resource list component to correctly handle inclusive filter keys
- Fixed date field in DateSelector to not render an error when date is added by the date picker and field is blurred
- Fixed pagination from firing keypress events while focus is inside inputs or contenteditables
- Fixed `EmptyState` horizontally scrolling when fully condensed
- Fixed the bottom margin of elements inside `Page` being ignored in some browsers
- Added required `url` prop to `breadcrumbs` in `Page` component examples
- Fixed `ActionList` wrapping text within a `Popover`
- Fixed `Banner` spacing when inside of a section
- Fixed `Stack` so it doesn't add extra spacing between items in Safari

## 2.8.0 - 2018-08-30

### Bug fixes

- Reverted a change that caused the built embedded.js bundle to be way larger than it should be due to broad imports

### Enhancements

- Added support for boolean type on Choice error prop

### Documentation

- Updated banner guidelines to make it clearer when success banners should be used vs success toasts.
- Updated display text documentation to have a separate example for medium and large display

## 2.7.2 - 2018-08-27

### Bug fixes

- Reverted a change that caused items in a `Popover` component not to be clickable

## 2.7.1 - 2018-08-27

### Documentation

- Fixed paths to images in the “Attention badge” example

### Bug fixes

- Fixed the `Page` component's `primaryAction` to support `LoadableAction`s and `DisableableAction`s

## 2.7.0 - 2018-08-27

### Enhancements

- Adjusted spacing for `ChoiceChildren` in `ChoiceList` for readability
- Made `Card.Header` a seperate publically accessible component
- Added support for complex operators in `ResourceList` component
- Updated the `Page` component's `primaryAction` to support `Button` props.
- Added validation for non-numeric input in a type="number" `TextField`
- Added circle information icon

### Documentation

- Updated `Banner` guidelines to make it clearer when success banners should be used vs success toasts

## 2.6.1 - 2018-08-21

### Development workflow

- Moved `pa11y` and `object-hash` from dependencies to devDependencies

### Bug fixes

- Fixed inconsistent `DropZone` error styling

## 2.6.0 - 2018-08-21

### Development workflow

- Added a `test:coverage` script to gather and display test coverage results
- Added Codecov test coverage checks to pull requests
- Added automated a11y testing to CI

### Enhancements

- Added support for `titleMetadata` in `Page` component
- Added support for `FilterType.DateSelector` in `ResourceList` component
- Added `code` as an accepted `variation` of the `TextStyle` component to provide support for accessible markup and styling of inline code snippets and code-like text
- Added new `border-width` SCSS function
- Added support for `fullWidth` and `connectedTop` props on `ButtonGroup`
- Added `label` prop to `DropZone` for better accessibility
- Added support for `RadioButton` to accept a block as a `label`
- Added a `singleColumn` prop to the `SkeletonPage` component
- Updated the transition on large `Modal` to match the default transition
- Added `nextKeys`, `previousKeys`, `nextTooltip`, and `previousTooltip` props to the `Pagination` component to support keypress handling and `Tooltip` in pagination buttons.
- Added examples to the `Layout` component documentation for two and three column grid layouts
- Added an export for the `Progress` type to support downstream typechecking of the `Badge` component `progress` prop
- Added an `iFrameName` prop to the `Modal` component to support named iframe children
- Added a `ScrollTo` subcomponent to the `Scrollable` component to support scrolling to a child node programmatically
- Added support for the `Button` component to accept an array of strings as children
- Changed the primary focus target of an activated `Popover` from the first focusable child to the `Popover` itself
- Added an improved error message when the child of an embedded `Alert` component is not a string (thanks [@superwhykz](https://github.com/superwhykz) for the [original issue](https://github.com/Shopify/polaris-react/issues/378))
- Added a minimum width to tab items to improve touch target sizing and account for smaller tab titles
- Added support for additional accessibility attributes to the `TextField` and `OptionList` components
- Added support for `OptionList` with `Avatar`, `Icon`, and `Thumbnail` when `options` descriptors have a `media` property
- Added support for destructive `ActionList` items
- Added support for `OptionList` `options` descriptors to accept a block for the `label` property
- Added `$page-max-width` variable to capture page calculated `max-width` value and `page-when-not-max-width` mixin to trigger when page is resized horizontally
- Added support for select error messages to be optional
- Updated the `Breadcrumbs` component to support the `CallbackAction` type as a prop (thanks [@dylan](https://github.com/dylan) for the [current issue](https://github.com/Shopify/polaris-react/issues/278) and everyone who identified this.)
- Added support for `TextField` error messages to be optional
- Added a `disabled` prop to the `Choice` component. `Checkbox` and `RadioButton` labels are now styled to reflect their disabled state
- Added support for Windows High Contrast mode in the `Select`, `Checkbox` and `RadioButton` components

### Bug fixes

- Fixed `TextField` resizer rendering when `multiline` was false
- Fixed `Modal` header condensing
- Fixed `Tooltip` so active prop activates on initial render
- Fixed `Popover` border radius and left and right alignment
- Fixed visibility of the hidden implicit submit button in `Form` (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris-react/issues/386))
- Fixed alignment of wrapped empty state actions
- Swapped the import and export icons
- Fixed incorrect `DataTable` column count and content skipping in assistive technologies
- Fixed unintended form submittal by action list items enclosed in a `form` (thanks [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris-react/issues/391))
- Fixed text alignment of multiline `OptionList` option text
- Fixed an issue where the `Stack` component would render incorrectly nested items
- Fixed spacing above annotated sections on smaller screens
- Fixed an issue that caused problems for some build tools
- Fixed the word-break of long text in `Label` and `Banner` on small screens

### Documentation

- Added examples for iOS and Android `RadioButton`
- Added examples for iOS and Android `Banner`
- Added `Toast` component
- Added examples for iOS and Android `Button`
- Added examples for iOS and Android `ButtonGroup`
- Added examples for iOS and Android `Badge`
- Added examples for iOS and Android `Avatar`
- Added `Stepper` component

### New components

#### [InlineError](https://polaris.shopify.com/components/forms/inline-error)

Use inline errors to describe custom form inputs or form groups when invalid.

## 2.5.0 - 2018-07-20

### Enhancements

- Updated sub component structure
- Added `weekStartsOn` prop to `DatePicker`

### Bug fixes

- Remove `stickyManager` from `AppProviderProps` interface
- Fixed a bug where `Layout.AnnotatedSection` would output a wrapper div for a `description` even when its contents were empty
- Remove extra padding from annotated section

### Documentation

- Added iOS and Android examples to the `Card` component
- Added iOS and Android examples to the `ChoiceList` component

### Development workflow

- Renamed `yarn start:vrt` to `yarn tophat` and updated the folder name to match
- Improved `yarn tophat`’s design, and added a `/all-components` route

### Enhancements

- Added `weekStartsOn` prop to `DatePicker`

## 2.4.0 - 2018-07-12

### Enhancements

- Changed `Form` to submit a form by default when the <kbd>enter</kbd> key is pressed, and added the prop `implicitSubmit` to disable this default

### Bug fixes

- Fixed `TextField` padding when a `prefix` or `suffix` is included

## 2.3.1 - 2018-07-05

### Enhancements

- Removed the min-width of 320px from `ResourceList`

### Bug fixes

- Resolve issue with `RangeSlider` component not accepting `0` as a `max` value
- Slightly reduced spacing for `prefix` and `suffix` on the `RangeSlider` component
- Fixed spacing for `prefix` and `suffix` on the `TextField` component
- Fixed height of cells in `DataTable` that are rendered after initial page load (for example: in a `Tab` or a `Popover`) (thanks [@flewid](https://github.com/flewid) for the [original issue](https://github.com/Shopify/polaris-react/issues/344))
- Fixed `DatePicker` month styling for previous years

## 2.3.0 - 2018-07-03

### New components

#### [Option list](https://polaris.shopify.com/components/lists-and-tables/option-list)

Use `OptionList` to present a group of selectable items outside of the context of a `Form`.

### Documentation

- Fixed `Form` examples

### Enhancements

- Added `prefix` and `suffix` props to `RangeSlider` for better layout control
- Added testing documentation and examples in `AppProvider`
- Performance: optimized avatar SVG files
- Updated `yarn run optimize` to add new line at the end of SVG files
- Added a more compact variant of `Select`, with the form label appearing inside the control)

### Bug fixes

- Adjusted padding on `TextField` to work with Chrome’s autofill
- Fixed a regression where the version of Polaris wasn’t globally available anymore
- Updated the interaction state visuals for `ActionList`
- Fixed z-index on `ResourceList` header with sorting options (thanks [@janklimo](https://github.com/janklimo) for the [original issue](https://github.com/Shopify/polaris-react/issues/355))
- Fixed an issue where `RadioButton` was not focusable in Safari
- Fixed spacing for annotated section descriptions
- Fixed a bug in EASDK action transforms that prevented external urls in embedded apps from opening (thanks [@dansundy](https://github.com/dansundy) for the [original issue](https://github.com/Shopify/polaris-react/issues/203))

### Dependency updates

- Updated [`@shopify/polaris-tokens`](https://npmjs.com/package/@shopify/polaris-tokens), the single source of truth for colors

## 2.2.0 - 2018-06-12

### New components

#### [Range slider](https://polaris.shopify.com/components/forms/range-slider)

Use `RangeSlider` to select a number value between a min and max range.

### Enhancements

- Added a fixed prop to `Popover` allowing for a fixed position
- Added badge prop to the `ItemDescriptor` type and action group
- Added `text-breakword` mixin for easier word breaking when dealing with long unspaced strings

### Bug fixes

- Fixed unexpected form submission when switching tabs in a `Tabs` component wrapped in a `Form`
- Added missing `'Shopify.API.setWindowLocation'` message handler to the EASDK

## 2.1.2 - 2018-06-06

### Enhancements

- Added support for `Card` to accept a block for a title
- Added an intermediate prop typing for `Link` to allow redefinition of prop definitions

### Bug fixes

- Fixed an issue where `ResourceList` filters lost padding (thanks [@BarryCarlyon](https://github.com/BarryCarlyon) for the [original issue](https://github.com/Shopify/polaris-react/issues/330))
- Fixed unexpected focus jumps when `DatePicker` props are updated
- Fixed the spacing and text wrapping of `ExceptionList` title and description

## 2.1.1 - 2018-05-30

### Bug fixes

- Fixed `DropZone` to prevent it from kicking into small size too soon

### Documentation

- Various content and markdown fixes

## 2.1.0 - 2018-05-03

### New components

#### [Exception list](https://polaris.shopify.com/components/lists-and-tables/exception-list)

Use Exception lists to draw the merchant’s attention to important information that adds extra context to a task.

### Enhancements

- Added an `ellipsis` prop to `ActionList.Item` allowing for an ellipsis suffix after the content
- Added a `preferredAlignment` prop to `Popover` allowing it to be aligned to the left, center, or right of its activator
- Updated styling for `Banner` that appear in a `Card` or a `Modal`
- Added new size to `DropZone` component
- Exposed Group interface from the `Select` component
- Renamed `plain-list` mixin to `unstyled-list`
- Removed padding from `DropZone` and applied it to `FileUpload` instead

### Bug fixes

- Fixed unexpected window scroll on rendering `DataTable` (thanks [@mfurniss](https://github.com/mfurniss) for the [original issue](https://github.com/Shopify/polaris-react/issues/317))
- Fixed focused inner interaction state on `ResourceList.Item` for reverse tabbing
- Fixed border radius on `Card` to match the padding on `Page`
- Added `target` to the `breadcrumb` prop on `Page` (thanks [@sdn90](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris-react/issues/306))
- Fixed visual representation of disabled bulk action buttons in `ResourceList`
- Fixed margins of a `fullWidth` `Popover` that appears above its activator
- Fixed rendering of `Popover` when activator rerenders (thanks [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris-react/issues/324))
- Fixed `z-index` calculation for `PositionOverlay` and `Dialog`
- Fixed an issue where selecting a date in `DatePicker` would submit its enclosing form
- Fixed `ResourceList` reverse tabbing focus interaction on action buttons
- Fixed padding in the case where a `ResourceList` had no filters

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

- Added `error` prop to `ChoiceList`
- `TextField`, `Select`, and `Checkbox` now accept the types `string` or `ReactElement` for the `error` prop
- Added optional `id` props to more components, and restructured the prop definitions to allow projects to make `id` props mandatory
- Added `fullWidth` prop to `Card.Section`
- Added `fullHeight` prop to `Popover` to override max-height
- Added `allowRange` as a property for `DatePicker`
- Added the `external` option to the `secondaryAction.action` prop on the `Banner` component. Thank you to ([Andrew Cargill](https://github.com/cargix1)) for the issue ([#236](https://github.com/Shopify/polaris-react/issues/236))

### Bug fixes

- Enforced subdued description `TextStyle` in `AnnotatedSection`
- Fixed overflow of `TextField` that caused the border to be cut off
- Allowed specific props in the `TextField` component to pass through properties to the input child
- Fixed `ActionList` component to provide section dividers when a `title` was not provided
- Fixed an issue in the `Select` component where placeholder didn’t properly appear on Firefox and appeared disabled on all browsers

## 1.14.2 - 2018-05-02

_This will be the last v1.x release outside of critical security fixes._

### Bug fixes

- Add margin-left spacing to disclosure icon within `Button` component
- Remove margins on segmented `ButtonGroup`
- Fixed text alignment of `Link` so that it inherits from its parent node

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

- Added an `id` prop to Collapsible to be referenced by the `aria-controls` attribute of the component triggering the collapse

### Bug fixes

- Fixed external prop not working within `ActionList` component
- Fixed a syntax error in one of the `Card` component examples (thanks [@meecrobe](https://github.com/meecrobe) for the [original issue](https://github.com/Shopify/polaris-react/issues/281))

## 1.12.4 - 2018-03-19

- Enhanced `Avatar` to work better when provided non-square images
- Move documentation file so it’s picked up by the style guide

## 1.12.3 - 2018-03-16

### Bug fixes

- Fixed disclosure centering on the `Tabs` component
- Fixed an issue where a style void would appear between breakpoints at high text zoom levels

### Documentation

- Removed purpose section from component READMEs
- Added `EmbeddedPage` under the Embedded section
- Added “Using embedded components” section
- Added screenshots to the embedded components
- Clarified usage of `Card` header and `FooterActions`

## 1.12.2 - 2018-03-08

### Documentation

- Moving property descriptions out of READMEs and into source files

## 1.12.1 - 2018-03-06

### Bug fixes

- Fixed server-side environments

### Documentation

- Updated component examples that use state to use an es6 class

## 1.12.0 - 2018-02-28

### Bug fixes

- Fixed `TextField` overflow issues when inside `Scrollable`
- Fixed `Select` focus state bug occuring in Firefox
- Fixed vertical alignment of text within full width variant of the button component

### Enhancements

- Changed `Checkbox` label to allow string or React.ReactNode
- Update `TextField` type with currency
- Added `ariaControls`, `ariaExpanded` prop to `Button`
- Updated the base red color to improve contrast
- Added a notification icon to the bundled icons available to use in the icon component’s source prop
- Exposed Status from the `Banner` component
- Added `titleHidden` prop to `Page`

### Documentation

- Clarified intended usage for `EmptyState`

### Chores

- Added version number to source

## 1.11.0 - 2018-02-13

- Changed Action to Disableable Action in Card

### Enhancements

- Added `renderChildren` prop to `ChoiceList` component

### Bug fixes

- Fixed an issue with `FooterHelp` links not expanding to full-width on mobile devices ([#759](https://github.com/Shopify/polaris-react/issues/759))
- Added breadcrumbs to `SkeletonPage`
- Added max-width and auto margin to `EmptyState`
- Fixed outline `Button` disabled state styles
- Fixed `Tag` so the `onRemove` function is not improperly called (thanks [@chaddjohnson](https://github.com/chaddjohnson) for the [original issue](https://github.com/Shopify/polaris-react/issues/235))
- Fixed border on inputs disabled state
- Fixed an issue in `TextInput`, when you increment or decrement with a float value, and the digits after the decimal point where wrong (thanks [@cgidzinski](https://github.com/cgidzinski) for the [original issue](https://github.com/Shopify/polaris-react/issues/761))
- Added top alignment to FormLayout.Group

### Documentation

- Fixed capitalization of prop names in `Pagination` component’s documentation (thanks [@donnguyen](https://github.com/donnguyen) for the [original issue](https://github.com/Shopify/polaris-react/issues/141))
- Exposed Option from the `Select` component

## 1.10.2 - 2018-01-22

### Bug fixes

- Fixed the public repository’s build (which was missing the new CircleCI configuration files)

## 1.10.1 - 2018-01-19

### Bug fixes

- Fixed CSS-only `Checkbox` (thanks [@daddy88](https://github.com/daddy88) for the [original issue](https://github.com/Shopify/polaris-react/issues/252))

## 1.10.0 - 2018-01-17

- Restored the correct `latest` version to the CDN
- Fixed rgbToHsb function when red is the largest number and added tests (thanks [@emcmanus](https://github.com/emcmanus) for the [original issue](https://github.com/Shopify/polaris-react/issues/251))
- Fixed an issue where a hard-coded path would cause the build to fail on Windows (thanks [@Invader444](https://github.com/Invader444) for the [original issue](https://github.com/Shopify/polaris-react/issues/245) and [pull request](https://github.com/Shopify/polaris-react/pull/246))
- Added `onClick` to `UnstyledLink`
- Added tests to `Link`

- Added tests for `ColorPicker` color utilities

## 1.9.1 - 2017-12-21

### Documentation

- Ammending changelog

## 1.9.0 - 2017-12-21

### Enhancements

- Added `onActionAnyItem` prop to action list and used to close `Page` `actionGroups` on click or keypress of any item
- Added `content` prop to `Tabs` and deprecated use of `title`
- Added `TextContainer` component
- Added `idForItem` prop to resource list
- Added `fullWidth` prop to layout section
- Added `indeterminate` as option for checkbox `checked` prop value
- Added `singleColumn` prop to page
- Added `focused` prop to `TextField`

### Bug fixes

- Fixed positioned overlay not responding to `Scrollable` container events
- Fixed first focusable item focus in `Popover`
- Fixed typos in the select component documentation (thanks [@mattchidley](https://github.com/mattchidley) for the [original issue](https://github.com/Shopify/polaris-react/issues/224))

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

- Updated README to consistently use contractions (thanks [@stefanmiodrag](https://github.com/stefanmiodrag) for the [original pull request](https://github.com/Shopify/polaris-react/pull/191))
- Improved example description for `Layout` component
- Updated `Spinner` documentation
- Improved component purpose documentation across components
- Improved documentation for `TextStyle` component

### Enhancements

- Added support for React 16
- Added an option to show or hide unpublished products from the `ResourcePicker`
- Changed `Popover` component to use `react-transition-group` instead of our deprecated custom version in `@shopify/react-utilities`
- Added new `ProgressBar` component
- Changed today’s date to be tabbable and clearly indicated in `DatePicker`
- Added support for disabled choices in `ChoiceList` component
- Added support for disabled secondary `Page` actions
- Changed `TextField` and `Select` to now focus on clicking only within the area from the input to the end of its label text

### Bug fixes

- Fixed `Layout` component example description
- Fixed `SkeletonPage` header appearing in embedded apps (thanks [@rkbhochalya](https://github.com/rkbhochalya) for the [original issue](https://github.com/Shopify/polaris-react/issues/202)))
- Fixed border-radius on `ActionList` component in Chrome

## 1.7.0 - 2017-10-06

### Enhancements

- Added `SkeletonPage`, `SkeletonBodyText` and `SkeletonDisplayText` components
- Added `Spinner` component
- Added hint prop to `Scrollable` and use in `Popover`
- Updated `Button` component to use new `Spinner` component
- Added external link support for `Page` `secondaryActions`
- Enabled the `primaryAction` of `PageActions` to be loading
- `Stack` now supports non-wrapping layouts on small screens
- Updated `TextField` min and max documentation
- Breadcrumbs now accept a callback through onAction (thanks [@arypbatista](https://github.com/arypbatista) for the [original issue](https://github.com/Shopify/polaris-react/issues/188))

### Bug fixes

- Fixed issue with embedded app breadcrumb linking to Shopify settings page (thanks [@cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris-react/issues/116))
- Fixed `Avatar` to display image and initials simultaneously
- Fixed various links to embedded components
- Fixed left and right ends of `TextField` not responding to clicks
- `RadioButton` & `Checkbox` now focus on clicking only within the area from the input to the end of its label text
- Fixed plain and `fullWidth` `Button` alignment
- Add a minor delay to `Tooltip` display

## 1.6.0 - 2017-09-25

### Enhancements

- Documented disabled prop for `Checkbox` and `RadioButton` (thanks [@LeoAref](https://github.com/LeoAref) for the [original issue](https://github.com/Shopify/polaris-react/issues/114))
- Documented progress prop for `Badge` (thanks [@sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris-react/issues/172))
- Added loading prop to `Button` (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/30))
- Documented complex `Select` option (thanks [@sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris-react/issues/174))
- Documented `TextStyle` component
- Improved `Avatar` typography spacing
- Added subtract icon
- Improved acessibility for `Pagination`

### Bug fixes

- Fixed failed dependency installation for unauthenticated GitHub users (thanks [@mikeyhew](https://github.com/mikeyhew) for the [original issue](https://github.com/Shopify/polaris-react/issues/184))
- Fixed `Page` header spacing
- Fixed `TextField` focus ring transition
- Fixed `Popover` not resizing on content updates

## 1.5.2 - 2017-09-18

### Bug fixes

- Fixes alignment of `PageAction` links

## 1.5.1 - 2017-08-30

### Bug fixes

- Fixed disabled `Button` when using local class names
- Fixed `Scrollable` resize listener not autobinding

## 1.5.0 - 2017-08-30

### Enhancements

- Updated `Scrollable` component to remember scroll position on re-render
- Added checkmark icon to the `Icon` component
- Added an example for a disabled `TextField`

### Bug fixes

- Fixed typo in `Icon` code example

## 1.4.1 - 2017-08-24

Various documentation fixes.

## 1.4.0 - 2017-08-22

### Enhancements

- Updated import, export, and view icons
- Improved documentation of various components
- Improved how `ActionList` handles images and groups
- Exposed PopoverCloseSource from `Popover` component

### Bug fixes

- Fixed `PageActions` spacing in IE11
- Fixed ID inconsistency on `TextField`
- Fixed spacing on `Page` component with no header (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/160))
- Fixed disabled state on primary and destructive `Button`

### Chores

- Upgraded javascript-utilities to the latest version

## 1.3.1 - 2017-08-10

### Bug fixes

- Fixed classnames in built \*.scss files
- Fixed broken link in description list README

## 1.3.0 - 2017-08-09

### Enhancements

- Added an `esnext` build (allows production builds to perform class/method tree shaking)
- Changed KeyboardKey component to use `kbd` tag
- Added publishing `docs` folder to npm package
- Added `fullWidth` option to `Popover` component

### Bug fixes

- Updated Static HTML page examples to correct markup (thanks [@bartcoppens](https://github.com/bartcoppens) for the [original issue](https://github.com/Shopify/polaris-react/issues/159))
- Hide increment and decrement buttons on number input when disabled (thanks [@kguller](https://github.com/kguller) for the [original issue](https://github.com/Shopify/polaris-react/issues/163))
- Fixed link to product content documentation
- Fixed documented type for error prop on `Checkbox` component
- Fixed `Popover` reopening when clicking around during transition
- Fixed `Popover` resizing on content updates
- Fixed vertical alignment of `Button` content

### Sketch UIKit

- Added Sketch color palette file

## 1.2.1 (July 27, 2017)

### Chores

- Fixed a repo issue that caused the public repo release not to happen

## 1.2.0 (July 27, 2017)

### Enhancements

- Added helpText to `ChoiceList` choices (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris-react/issues/103))
- Added save icon
- Added `accessibilityLabel` to `Tabs`
- Updated icons for `Banner`
- Improved `Page` component by fixing up spacing, addin a prop to show a separator below the page title, and changing the secondary actions to roll up into a dropdown menu on small screens
- Improved default stacking behavior for Tooltip and `Popover` (thanks [@Taphood](https://github.com/Taphood) for the [original issue](https://github.com/Shopify/polaris-react/issues/129))
- Added extraTight spacing option to Stack
- Use default subheading type styles for `ActionList`
- Improved large `Button` styles
- Updated font-weight for text emphasis (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/156))

### Bug fixes

- Removed the focus state for `Banner` on click
- Fixed disabled `Pagination` button looking active
- Fixed alignment on `Button`
- Fixed min-width on `TextField` (thanks [@asacarter](https://github.com/asacarter) for the [original issue](https://github.com/Shopify/polaris-react/issues/96))
- Removed the border-top on `EmptyState`) (thanks [@alexdover](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris-react/issues/102)
- Fixed `Select` placeholder value warnings (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris-react/issues/98))
- Fixed disabled text on iOS
- Fixed type for `onChange` event (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/135))

### Sketch UIKit

- Added color palette page to “Getting started”
- `Button` typography updated. More changes to come soon.
- Changed typeface from `San Francisco UI` to `San Francisco Pro`. You will need to download the updated typeface here. https://developer.apple.com/fonts/
- Updated to Sketch version 45.2
- Updated layer styles and fonts styles to take advantage of Sketch’s new organizational features.

### Documentation

- Fixed disabled `Button` documentation (thanks [@michaelsunglee](https://github.com/michaelsunglee) for the [original issue](https://github.com/Shopify/polaris-react/issues/113))
- Fixed project URL in CircleCI badge
- Fixed Stack documentation (thanks [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris-react/issues/120))
- Added embedded Alert documentation and updated other embedded documentation

### Dependency updates

- Updated React TypeScript definitions

### Chores

- Updated EASDK metadata structure for generic interfaces
- Removed postinstall hook

## 1.1.1 - 2017-06-19

### Chores

- Fixed a repo issue that caused the public repo release not to happen

## 1.1.0 - 2017-06-19

### Enhancements

- Added automatic inference of the `target` property of EASDK buttons in `Page` `primaryAction` and `secondaryAction` based on their URL (thanks [@jimmyn](https://github.com/jimmyn) for the [original issue](https://github.com/Shopify/polaris-react/issues/46))
- Added automatic inference of the `target` property of EASDK breadcrumbs in `Page` `breadcrumbs` prop based on the URL
- `Select` option descriptors now accept a `disabled` attribute to disable the generated `option` (thanks [@sogko](https://github.com/sogko) for the [original issue](https://github.com/Shopify/polaris-react/issues/68))
- `easdk.showFlashNotice` now accepts an optional options object as its second parameter. Passing `{error: true}` will cause the flash to appear as an error, matching the behaviour of [`ShopifyApp.flashError`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-flasherror-message)
- `Checkbox`, `RadioButton`, `ChoiceList`, `Select`, and `TextField` now pass the ID of the changed input as the second argument to their `onChange` callback (thanks [@milep](https://github.com/milep) for the [original issue](https://github.com/Shopify/polaris-react/issues/83))
- `Popover` now respects the `z-index` of the activator if it exists
- When putting content as children of `Tabs`, the default panel that is generated now respects the `panelID` of the selected tab, and uses a sensible default based on the tab’s `id` if no `panelID` exists
- When selecting a tab in `Tabs`, the matching panel is now focused by default
- `easdk` methods are bound to the object so they can be freely passed as callbacks

### Changes

- `Avatar` now renders as a `span` instead of a `div`

### Bug fixes

- Fixed contents in `Layout.AnnotatedSection` breaking out of their container (thanks [@cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris-react/issues/75))
- Fixed spacing above a `primaryAction` in `CalloutCard` when there is no `secondaryAction`
- Aria attributes are now on the actionable elements of `Tabs` instead of in the list items
- Exposed `Panel` as `Tabs.Panel` instead of `Tabs.panel`
- Fixed the alignment of `prefix` and `suffix` content of `TextField` (thanks [@bdillon3](https://github.com/bdillon3) for the [original issue](https://github.com/Shopify/polaris-react/issues/60))
- Fixed the disabled text color in `TextField`
- `Checkbox` and `RadioButton` no longer generate invalid HTML in their labels (thanks [@ernestogutierrez](https://github.com/ernestogutierrez) for the [original issue](https://github.com/Shopify/polaris-react/issues/88))
- `Tabs` no longer steal focus from contained elements (thanks [@alexdover](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris-react/issues/74))

### Design updates

- Reduced horizontal padding on `Breadcrumbs`
- Updated icon and internal padding of `FooterHelp`
- Updated the `EmptyState` layout and typographic styles

### Documentation

- Fixed the code examples on the `EmbeddedApp` documentation
- Added a simple `EmbeddedApp` example
- Renamed the “Tables and lists” category to “Lists”
- A variety of other documentation updates (thanks [@sebnun](https://github.com/sebnun), [@asacarter](https://github.com/asacarter), and [@resistorsoftware](https://github.com/resistorsoftware) for raising issues)

### Dependency updates

- Updated all dependencies

### Chores

- Added a script to automatically match the published version number to the one referenced in the README
- Added the correct viewport tag to the Playground
- Hid deprecation errors during tests

## 1.0.3 - 2017-05-11

### Big fixes

- Fixed an issue where the embedded components would not reload the page within the Shopify admin (thanks [@buggy](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris-react/issues/28))
- Fixed the `spacing="none"` variation on `Stack` not working correctly, and added the missing `extraLarge` enum value for `spacing`
- Fixed `Banner`’s `onDismiss` callback not being called when the dismiss button was clicked ([76ce13f](https://github.com/Shopify/polaris-react/commit/76ce13f328c2446c316f3d7f1f2a3f007658b6f7)) (thanks [@tlwirtz](https://github.com/tlwirtz) for the [original issue](https://github.com/Shopify/polaris-react/issues/52))

### Design updates

- Updated `Badge` text colors
- Updated line height for the small `DisplayText` variation
- Updated the default icon for error `Banner` (thanks [@heyneff](https://github.com/heyneff) for the [original issue](https://github.com/Shopify/polaris-react/issues/42))

### Sketch UIKit

- Added app examples (thanks [@lukepxu](https://github.com/lukepxu) for the [original issue](https://github.com/Shopify/polaris-react/issues/17))
- Removed references to the Graphik typeface (thanks [@adamnel](https://github.com/adamnel) for the [original issue](https://github.com/Shopify/polaris-react/issues/22))
- Left-aligned button text for better resizing
- Added Messenger link to navigation to better communicate that the channel nav collapses after 3 items
- Fixed alignment of table headers
- Minor updates to Dataviz and Reports examples
- Added indicators to Home notifications

### Documentation

- Synchronized component documentation with the style guide ([1e89559](https://github.com/Shopify/polaris-react/commit/1e895594afedb63787e6c05a167f5146901e88e6))

### Chores

- Fixed an issue that prevented the public CHANGELOG from being generated correctly
- Added a hot-reloading Playground to easily try out different components
- Removed the references to Babel presets from `package.json` (thanks [@macs91](https://github.com/macs91) for digging into this with us)
- Removed the `@import` statements at the top of source Sass files
- Updated TSLint and related linting dependencies

## 1.0.2 - 2017-04-25

### Bug fixes

- Fixed an issue where subcomponents with variations would use a single `-` instead of `--` (thanks [@johnsonab](https://github.com/johnsonab) for the [original issue](https://github.com/Shopify/polaris-react/issues/9))
- Fixed a missing typing dependency and a missing `embedded` types entry point that were causing issues using this package with TypeScript (thanks [@buggy](https://github.com/buggy) for the [original](https://github.com/Shopify/polaris-react/issues/19) [issues](https://github.com/Shopify/polaris-react/issues/20))
- Fixed an issue where the anchor tag for `ResourceList.Item` would not span the full width of the item ([0c11498](https://github.com/Shopify/polaris-react/commit/0c11498406d90850f569824d0979c9a8f84d45c9)) (thanks [@sdn90](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris-react/issues/14))

### Dependency updates

- Started using the [`prop-types` package](https://github.com/reactjs/prop-types) instead of getting `PropTypes` from `react`, as the latter is deprecated as of React 15.5.0

### Documentation

- Corrected the name of `documentation/Embeddded apps.md` to `documentation/Embedded apps.md` (thanks [@chrispappas](https://github.com/chrispappas) for the [original issue](https://github.com/Shopify/polaris-react/issues/10))
- Fixed the `ColorPicker` documentation to show valid values for `saturation`, `brightness`, and `alpha` (thanks [@allanarmstrong](https://github.com/allanarmstrong) for the [original issue](https://github.com/Shopify/polaris-react/issues/13))

### Chores

- Added a description to `package.json`
- Added license to `package.json` and to the root of the repo (thanks [@d2s](https://github.com/d2s) for the [original issue](https://github.com/Shopify/polaris-react/issues/15))
- Fixed an issue where the Webpack example would complain about a missing dependency (thanks [@rafaedez](https://github.com/rafaedez) for the [original issue](https://github.com/Shopify/polaris-react/issues/21))

## 1.0.1 - 2017-04-20

### Chores

- Switch repo to public access

## 1.0.0 - 2017-04-20

- Initial release
