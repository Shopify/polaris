## Unreleased

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
