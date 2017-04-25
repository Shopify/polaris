## Unreleased

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
