## Unreleased

## 1.4.1 (August 24, 2017)

Various documentation fixes.

## 1.4.0 (August 22, 2017)

### Enhancements
* Updated import, export, and view icons
* Improved documentation of various components
* Improved how ActionList handles images and groups
* Exposed PopoverCloseSource from Popover component

### Bug fixes
* Fixed PageActions spacing in IE11
* Fixed ID inconsistency on TextFields
* Fixed spacing on Page component with no header (thanks [bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/160))
* Fixed disabled state on primary and destructive buttons

### Chores
* Upgraded javascript-utilities to the latest version

## 1.3.1 (August 10, 2017)
### Bug fixes
* Fixed classnames in built *.scss files
* Fixed broken link in description list README

## 1.3.0 (August 9, 2017)

### Enhancements
* Added an `esnext` build (allows production builds to perform class/method tree shaking)
* Changed KeyboardKey component to use `kbd` tag
* Added publishing `docs` folder to npm package
* Added `fullWidth` option to Popover component

### Bug fixes
* Updated Static HTML page examples to correct markup (thanks [bartcoppens](https://github.com/bartcoppens) for the [original issue](https://github.com/Shopify/polaris/issues/159))
* Hide increment and decrement buttons on number input when disabled (thanks [kguller](https://github.com/kguller) for the [original issue](https://github.com/Shopify/polaris/issues/163))
* Fixed link to product content documentation
* Fixed documented type for error prop on Checkbox component
* Fixed Popover reopening when clicking around during transition
* Fixed Popover resizing on content updates
* Fixed vertical alignment of Button content

### Sketch UIKit
* Added Sketch color palette file

## 1.2.1 (July 27, 2017)

### Chores
* Fixed a repo issue that caused the public repo release not to happen

## 1.2.0 (July 27, 2017)
### Enhancements
* Added helpText to ChoiceList choices (thanks [cgenevier](https://github.com/cgenevier)  for the [original issue](https://github.com/Shopify/polaris/issues/103))
* Added save icon
* Added accessibilityLabel to Tabs
* Updated icons for Banner
* Improved Page component by fixing up spacing, addin a prop to show a separator below the page title, and changing the secondary actions to roll up into a dropdown menu on small screens
* Improved default stacking behavior for Tooltip and Popover (thanks [Taphood](https://github.com/Taphood)  for the [original issue](https://github.com/Shopify/polaris/issues/129))
* Added extraTight spacing option to Stack
* Use default subheading type styles for ActionList
* Improved large Button styles
* Updated font-weight for text emphasis (thanks  [bakura10](https://github.com/bakura10)  for the  [original issue](https://github.com/Shopify/polaris/issues/156))

### Bug fixes
* Removed the focus state for Banner on click
* Fixed disabled Pagination button looking active
* Fixed alignment on Button
* Fixed min-width on TextField (thanks [Asa](https://github.com/asacarter)  for the [original issue](https://github.com/Shopify/polaris/issues/96))
* Removed the border-top on EmptyState (thanks [Alex](https://github.com/alexdover)  for the [original issue](https://github.com/Shopify/polaris/issues/102)  [#408](https://github.com/Shopify/polaris-react/pull/408)) 
* Fixed Select placeholder value warnings (thanks [cgenevier](https://github.com/cgenevier)  for the [original issue](https://github.com/Shopify/polaris/issues/98))
* Fixed disabled text on iOS
* Fixed type for onChange event (thanks [Michaël](https://github.com/bakura10)  for the original issue

### Sketch UIKit
* Added color palette page to “Getting started”
* Button typography updated. More changes to come soon. 
* Changed typeface from `San Francisco UI` to `San Francisco Pro`. You will need to download the updated typeface here. https://developer.apple.com/fonts/
* Updated to Sketch version 45.2
* Updated layer styles and fonts styles to take advantage of Sketch’s new organizational features.

### Documentation
* Fixed disabled Button documentation (thanks [Michael](https://github.com/michaelsunglee)  for the [original issue](https://github.com/Shopify/polaris/issues/113))
* Fixed project URL in CircleCI badge
* Fixed Stack documentation (thanks [Marco](https://github.com/nerfologist)  for the [original issue](https://github.com/Shopify/polaris/issues/120) )
* Added embedded Alert documentation and updated other embedded documentation

### Dependency updates
* Updated React TypeScript definitions
	
### Chores
* Updated EASDK metadata structure for generic interfaces
* Removed postinstall hook

## 1.1.1 (June 19, 2017)

### Chores
* Fixed a repo issue that caused the public repo release not to happen

## 1.1.0 (June 19, 2017)

### Enhancements
* Added automatic inference of the `target` property of EASDK buttons in `Page`’s `primaryAction` and `secondaryActions` based on their URL (thanks [Dmitriy](https://github.com/jimmyn) for the [original issue](https://github.com/Shopify/polaris/issues/46))
* Added automatic inference of the `target` property of EASDK breadcrumbs in `Page`'s `breadcrumbs` prop based on the URL
* `Select` option descriptors now accept a `diabled` attribute to disabled the generated `option` (thanks to [Hafiz](https://github.com/sogko) for the [original issue](https://github.com/Shopify/polaris/issues/68))
* `easdk.showFlashNotice` now accepts an optional options object as its second parameter. Passing `{error: true}` will cause the flash to appear as an error, matching the behaviour of  [`ShopifyApp.flashError`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-flasherror-message)
* `Checkbox`, `RadioButton`, `ChoiceList`, `Select`, and `TextField` now pass the ID of the changed input as the second argument to their `onChange` callback (thanks to [Miika](https://github.com/milep) for the [original issue](https://github.com/Shopify/polaris/issues/83))
* `Popover` now respects the `z-index` of the activator if it exists
* When putting content as children of `Tabs`, the default panel that is generated now respects the `panelID` of the selected tab, and uses a sensible default based on the tab’s `id` if no `panelID` exists
* When selecting a tab in `Tabs`, the matching panel is now focused by default
* `easdk` methods are bound to the object so they can be freely passed as callbacks

### Changes
* Avatar now renders as a `span` instead of a `div` 

### Bug fixes
* Fixed contents in `Layout.AnnotatedSection` breaking out of their container (thanks [Andrew](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris/issues/75))
* Fixed spacing above a primary action in `CalloutCard` when there is no secondary action
* Aria attributes are now on the actionable elements of `Tabs` instead of in the list items
* Exposed `Panel` as `Tabs.Panel` instead of `Tabs.panel`
* Fixed the alignment of `prefix` and `suffix` content of `TextField` (thanks [bdillon3](https://github.com/bdillon3) for the [original issue](https://github.com/Shopify/polaris/issues/60))
* Fixed the disabled text colour in `TextField`
* `Checkbox`s and `RadioButton`s no longer generate invalid HTML in their labels (thanks [Ernesto](https://github.com/ernestogutierrez) for the [original issue](https://github.com/Shopify/polaris/issues/88))
* `Tabs` no longer steals focus from contained elements (thanks [Alex](https://github.com/alexdover) for the  [original issue](https://github.com/Shopify/polaris/issues/74))

### Design updates
* Reduced horizontal padding on `Breadcrumbs`
* Updated icon and internal padding of `FooterHelp`
* Updated the `EmptyState` layout and typographic styles

### Documentation
* Fixed the code examples o n the embedded app documentation
* Added a simple embedded app example
* Renamed the “Tables and lists” category to “Lists”
* A variety of other documentation updates (thanks to [Pablo](https://github.com/sebnun), [Asa](https://github.com/asacarter), and [David](https://github.com/resistorsoftware) for raising issues)

### Dependency updates
* Updated all dependencies

### Chores
* Added a script to automatically match the published version number to the one referenced in the README
* Added the correct viewport tag to the Playground
* Hid deprecation errors during tests

## 1.0.3 (May 11, 2017)
### Big fixes
* Fixed an issue where the embedded components would not reload the page within the Shopify admin (thanks [Rich](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/28))
* Fixed the `spacing="none"` variation on `Stack` not working correctly, and added the missing `extraLarge` enum value for `spacing`
* Fixed `Banner`’s `onDismiss` callback not being called when the dismiss button was clicked (thanks to [Taylor](https://github.com/tlwirtz) for the [original issue](https://github.com/Shopify/polaris/issues/52))

### Design updates
* Updated Badge text colors
* Updated line height for the small `DisplayText` variation
* Updated the default icon for error `Banner`s (thanks to [Michael](https://github.com/heyneff) for the [original issue](https://github.com/Shopify/polaris/issues/42))

### Sketch UIKit
* Added app examples (thanks to [lukepxu](https://github.com/lukepxu) for the [original issue](https://github.com/Shopify/polaris/issues/17))
* Removed references to the Graphik typeface (thanks to [Adam](https://github.com/adamnel) for the [original issue](https://github.com/Shopify/polaris/issues/22))
* Left-aligned button text for better resizing
* Added Messenger link to navigation to better communicate that the channel nav collapses after 3 items
* Fixed alignment of table headers
* Minor updates to Dataviz and Reports examples
* Added indicators to Home notifications

### Documentation
* Synchronized component documentation with the style guide

### Chores
* Fixed an issue that prevented the public CHANGELOG from being generated correctly
* Added a hot-reloading Playground to easily try out different components
* Removed the references to Babel presets from `package.json` (thanks to [Massimo](https://github.com/macs91) for digging into this with us)
* Removed the `@import` statements at the top of source Sass files
* Updated TSLint and related linting dependencies

## 1.0.2 (April 25, 2017)
### Bug fixes
* Fixed an issue where subcomponents with variations would use a single `-` instead of `--` (thanks [johnsonab](https://github.com/johnsonab) for the [original issue](https://github.com/Shopify/polaris/issues/9))
* Fixed a missing typing dependency and a missing `embedded` types entry point that were causing issues using this package with TypeScript (thanks to [Rich](https://github.com/buggy) for the [original](https://github.com/Shopify/polaris/issues/19) [issues](https://github.com/Shopify/polaris/issues/20))
* Fixed an issue where the anchor tag for `ResourceList.Item`s would not span the full width of the item (thanks to [Steven](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris/issues/14))

### Dependency updates
* Started using the [`prop-types` package](https://github.com/reactjs/prop-types) instead of getting `PropTypes` from `react`, as the latter is deprecated as of React 15.5.0

### Documentation
* Corrected the name of `documentation/Embeddded apps.md` to `documentation/Embedded apps.md` (thanks to [Chris](https://github.com/chrispappas) for the [original issue](https://github.com/Shopify/polaris/issues/10))
* Fixed the `ColorPicker` documentation to show valid values for `saturation`, `brightness`, and `alpha` (thanks to [Allan](https://github.com/allanarmstrong) for the [original issue](https://github.com/Shopify/polaris/issues/13))

### Chores
* Added a description to `package.json`
* Added license to `package.json` and to the root of the repo (thanks to [Daniel](https://github.com/d2s) for the [original issue](https://github.com/Shopify/polaris/issues/15))
* Fixed an issue where the Webpack example would complain about a missing dependency (thanks to [Rafael](https://github.com/rafaedez) for the [original issue](https://github.com/Shopify/polaris/issues/21))

## 1.0.1 (April 20, 2017)
### Chores
* Switch repo to public access

## 1.0.0 (April 20, 2017)
* Initial release
