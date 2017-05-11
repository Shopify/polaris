## Unreleased

## 1.0.3 (May 11, 2017)
### Big fixes
* Fixed an issue where the embedded components would not reload the page within the Shopify admin (thanks [Rich](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/28)) ([#307](https://github.com/Shopify/polaris-internal/pull/307))
* Fixed the `spacing="none"` variation on `Stack` not working correctly, and added the missing `extraLarge` enum value for `spacing` ([#320](https://github.com/Shopify/polaris-internal/pull/320))
* Fixed `Banner`’s `onDismiss` callback not being called when the dismiss button was clicked (thanks to [Taylor](https://github.com/tlwirtz) for the [original issue](https://github.com/Shopify/polaris/issues/52)) ([76ce13f](https://github.com/Shopify/polaris-internal/commit/76ce13f328c2446c316f3d7f1f2a3f007658b6f7))

### Design updates
* Updated Badge text colors ([#319](https://github.com/Shopify/polaris-internal/pull/319))
* Updated line height for the small `DisplayText` variation ([#318](https://github.com/Shopify/polaris-internal/pull/318))
* Updated the default icon for error `Banner`s (thanks to [Michael](https://github.com/heyneff) for the [original issue](https://github.com/Shopify/polaris/issues/42)) ([#317](https://github.com/Shopify/polaris-internal/pull/317))

### Sketch UIKit
* Added app examples (thanks to [lukepxu](https://github.com/lukepxu) for the [original issue](https://github.com/Shopify/polaris/issues/17))
* Removed references to the Graphik typeface (thanks to [Adam](https://github.com/adamnel) for the [original issue](https://github.com/Shopify/polaris/issues/22))
* Left-aligned button text for better resizing
* Added Messenger link to navigation to better communicate that the channel nav collapses after 3 items
* Fixed alignment of table headers
* Minor updates to Dataviz and Reports examples
* Added indicators to Home notifications

### Documentation
* Synchronized component documentation with the style guide ([1e89559](https://github.com/Shopify/polaris-internal/commit/1e895594afedb63787e6c05a167f5146901e88e6))

### Chores
* Fixed an issue that prevented the public CHANGELOG from being generated correctly ([#292](https://github.com/Shopify/polaris-internal/pull/292))
* Added a hot-reloading Playground to easily try out different components ([#315](https://github.com/Shopify/polaris-internal/pull/315))
* Removed the references to Babel presets from `package.json` (thanks to [Massimo](https://github.com/macs91) for digging into this with us) ([#322](https://github.com/Shopify/polaris-internal/pull/322))
* Removed the `@import` statements at the top of source Sass files ([#312](https://github.com/Shopify/polaris-internal/pull/312))
* Updated TSLint and related linting dependencies ([#316](https://github.com/Shopify/polaris-internal/pull/316))

## 1.0.2 (April 25, 2017)
### Bug fixes
* Fixed an issue where subcomponents with variations would use a single `-` instead of `--` (thanks [johnsonab](https://github.com/johnsonab) for the [original issue](https://github.com/Shopify/polaris/issues/9)) ([#278](https://github.com/Shopify/polaris-internal/pull/278))
* Fixed a missing typing dependency and a missing `embedded` types entry point that were causing issues using this package with TypeScript (thanks to [Rich](https://github.com/buggy) for the [original](https://github.com/Shopify/polaris/issues/19) [issues](https://github.com/Shopify/polaris/issues/20)) ([#286](https://github.com/Shopify/polaris-internal/pull/286))
* Fixed an issue where the anchor tag for `ResourceList.Item`s would not span the full width of the item (thanks to [Steven](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris/issues/14)) ([0c11498](https://github.com/Shopify/polaris-internal/commit/0c11498406d90850f569824d0979c9a8f84d45c9))

### Dependency updates
* Started using the [`prop-types` package](https://github.com/reactjs/prop-types) instead of getting `PropTypes` from `react`, as the latter is deprecated as of React 15.5.0 ([#282](https://github.com/Shopify/polaris-internal/pull/282))

### Documentation
* Corrected the name of `documentation/Embeddded apps.md` to `documentation/Embedded apps.md` (thanks to [Chris](https://github.com/chrispappas) for the [original issue](https://github.com/Shopify/polaris/issues/10)) ([#269](https://github.com/Shopify/polaris-internal/pull/269))
* Fixed the `ColorPicker` documentation to show valid values for `saturation`, `brightness`, and `alpha` (thanks to [Allan](https://github.com/allanarmstrong) for the [original issue](https://github.com/Shopify/polaris/issues/13)) ([#284](https://github.com/Shopify/polaris-internal/pull/284))

### Chores
* Added a description to `package.json` ([#281](https://github.com/Shopify/polaris-internal/pull/281))
* Added license to `package.json` and to the root of the repo (thanks to [Daniel](https://github.com/d2s) for the [original issue](https://github.com/Shopify/polaris/issues/15)) ([#283](https://github.com/Shopify/polaris-internal/pull/283))
* Fixed an issue where the Webpack example would complain about a missing dependency (thanks to [Rafael](https://github.com/rafaedez) for the [original issue](https://github.com/Shopify/polaris/issues/21)) ([#279](https://github.com/Shopify/polaris-internal/pull/279))

## 1.0.1 (April 20, 2017)
### Chores
* Switch repo to public access

## 1.0.0 (April 20, 2017)
* Initial release
