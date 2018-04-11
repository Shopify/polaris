# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines][changelog-guidelines].

<!-- ## Unreleased -->

## 2.0.0-beta.15 - 2018-04-11

### Breaking changes

* Renamed `Provider` component to `AppProvider` ([#1234](https://github.com/Shopify/polaris-react/pull/1234))
  * To upgrade, replace `Provider` with `AppProvider`

### Bug fixes

* Fixed Button disabled styles ([#1248](https://github.com/Shopify/polaris-react/pull/1248))

## 2.0.0-beta.14 - 2018-04-03

### Bug fixes

* Fixed Lodash imports where the whole library was being loaded ([#1233](https://github.com/Shopify/polaris-react/pull/1233)) (thanks to [@KrasiNedew](https://github.com/KrasiNedew) for the [original issue](https://github.com/Shopify/polaris/issues/289))

### Enhancements

* Exposed createPolarisContext utility to make testing easier in external apps ([#1211](https://github.com/Shopify/polaris-react/pull/1211))

### Breaking changes

* Removed `EmbeddedApp` component in favour of using `Provider` ([#1199](https://github.com/Shopify/polaris-react/pull/1199))
  * Upgrade path: Use `Provider` component with new embedded app props instead

## 2.0.0-beta.13 - 2018-03-29

### Enhancements

* Added Modal to polaris-react and combined Embeded Modal with Modal ([#1073](https://github.com/Shopify/polaris-react/pull/1073))

### Breaking changes

* Changed Alert onCancel prop to onClose ([#1073](https://github.com/Shopify/polaris-react/pull/1073))
* This change only impacts users of the Sass version of Polaris, more specifically the `color()` function.
  The `color($hue, $value: base, $for-background: null)` function in Sass now accepts strings for `$hue` and `$value` as advertised in [the documentation](https://polaris.shopify.com/sassdoc/#undefined-function-color).
  * Upgrade path:
    * replace `\bcolor\(([a-z-]+)\)` with `color('$1')`
    * replace `\bcolor\(([a-z-]+), ([a-z-]+)\)` with `color('$1', '$2')`
    * replace `\bcolor\(([a-z-]+), ([a-z-]+), (.*)\)` with `color('$1', '$2', $3)`

### Bug fixes

* Fixed an issue with Lodash to load only single functions instead of the whole library ([#1208](https://github.com/Shopify/polaris-react/pull/1208)) (thanks to [@KrasiNedew](https://github.com/KrasiNedew) for the [original issue](https://github.com/Shopify/polaris/issues/283))

## 2.0.0-beta.12 - 2018-03-23

### Bug fixes

* Fixed Provider props export ([#1195](https://github.com/Shopify/polaris-react/pull/1195))

## 2.0.0-beta.11 - 2018-03-23

### Bug fixes

* Fixed Provider i18n demo code ([#1161](https://github.com/Shopify/polaris-react/pull/1161))
* Fixed overflow bug causing TextFields border to be cut off ([#1180](https://github.com/Shopify/polaris-react/pull/1180))

## 2.0.0-beta.10 - 2018-03-16

### New Components

* Data table component ([#780](https://github.com/Shopify/polaris-react/pull/780))
* Drop zone component ([#1063](https://github.com/Shopify/polaris-react/pull/1063))

### Enhancements

* Added optional `id` props to more components, and restructured the prop definitions to allow projects to make `id` props mandatory ([#1138](https://github.com/Shopify/polaris-react/pull/1138))

## 2.0.0-beta.9 - 2018-03-12

* Merged latest changes from v1 into v2

## 2.0.0-beta.8 - 2018-03-01

### Enhancements

* Added fullWidth prop to Card.Section ([#1051](https://github.com/Shopify/polaris-react/pull/1051))
* Added translation and Provider support to Resource List ([#1097](https://github.com/Shopify/polaris-react/pull/1097))
* Added fullHeight prop to Popover to override max-height ([#1099](https://github.com/Shopify/polaris-react/pull/1099))

### Breaking Changes

* All elements are now globally set to `box-sizing: border-box;` instead of `box-sizing: inherit;`. There is a very small chance of seeing any visual regressions in existing applications. ([#996](https://github.com/Shopify/polaris-react/pull/996))
* Pseudo-elements (`*::before`) and (`*::after`) are now globally set to `box-sizing: border-box;`. Visual regressions are expected in applications setting `padding` and `border` on pseudo-elements. ([#996](https://github.com/Shopify/polaris-react/pull/996))

## 2.0.0-beta.7 - 2018-02-14

* Updated ResourceList docs for new component API

## 2.0.0-beta.6 - 2018-02-02

### Enhancements

* Added `allowRange` as a property for DatePicker ([#884](https://github.com/Shopify/polaris-react/pull/884))
* Added ExceptionList and Truncate components

### Bug fixes

* Allows specific props in TextField Component to pass through properties on the input ([#907](https://github.com/Shopify/polaris-react/pull/907))

## 2.0.0-beta.5 - 2018-01-26

### Bug fixes

* Fixed ActionList component to provide section dividers when a title was not provided ([#926](https://github.com/Shopify/polaris-react/pull/926))

### Enhancements

* Added EmptySearchResult component ([#955](https://github.com/Shopify/polaris-react/pull/955))
* Added Portal component ([#742](https://github.com/Shopify/polaris-react/pull/742))
* Updated Popover to use the new Portal component ([#742](https://github.com/Shopify/polaris-react/pull/742))
* Brought FlashMessage over from polaris-next and updated it to use Portal ([#945](https://github.com/Shopify/polaris-react/pull/945))
* Updated Tooltip to use Portal instead of layeredComponent. ([#982](https://github.com/Shopify/polaris-react/pull/982))

### Breaking Changes

* Dropped support for React < 16. Upgrade `react` and `react-dom` packages to v16. ([#936](https://github.com/shopify/polaris-react/pull/936))

## 2.0.0-beta.2, 2.0.0-beta.3 - 2018-01-16

* Deploy scripts fixes

## 2.0.0-beta.1 - 2018-01-16

### Breaking Changes

* Anchor tags are no longer styled by Polaris when missing the `[data-polaris-unstyled]` attributes ([#841](https://github.com/shopify/polaris-react/pull/841))
* Tabs no longer accept `title` as a prop. Use `content` instead. ([#909](https://github.com/Shopify/polaris-react/pull/909))
* Removed default white color from Icon CSS. Use `color` prop instead ([#540](https://github.com/Shopify/polaris-react/pull/540))
* Updated TextField onChange prop to be required if not disabled or readonly (thanks to [@buggy](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/82)) ([#870](https://github.com/Shopify/polaris-react/pull/870))

[changelog-guidelines]: https://github.com/Shopify/polaris/blob/master/documentation/Versioning%20and%20changelog.md
