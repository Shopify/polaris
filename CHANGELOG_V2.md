# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines][changelog-guidelines].

<!-- ## Unreleased -->

## 2.0.0-beta.15 - 2018-04-11

### Breaking changes

* Renamed `Provider` component to `AppProvider`
  * To upgrade, replace `Provider` with `AppProvider`

### Bug fixes

* Fixed Button disabled styles

## 2.0.0-beta.14 - 2018-04-03

### Bug fixes

* Fixed Lodash imports where the whole library was being loaded (thanks to [@KrasiNedew](https://github.com/KrasiNedew) for the [original issue](https://github.com/Shopify/polaris/issues/289))

### Enhancements

* Exposed createPolarisContext utility to make testing easier in external apps

### Breaking changes

* Removed `EmbeddedApp` component in favour of using `Provider`
  * Upgrade path: Use `Provider` component with new embedded app props instead

## 2.0.0-beta.13 - 2018-03-29

### Enhancements

* Added Modal to polaris-react and combined Embeded Modal with Modal

### Breaking changes

* Changed Alert onCancel prop to onClose
* This change only impacts users of the Sass version of Polaris, more specifically the `color()` function.
  The `color($hue, $value: base, $for-background: null)` function in Sass now accepts strings for `$hue` and `$value` as advertised in [the documentation](https://polaris.shopify.com/sassdoc/#undefined-function-color).
  * Upgrade path:
    * replace `\bcolor\(([a-z-]+)\)` with `color('$1')`
    * replace `\bcolor\(([a-z-]+), ([a-z-]+)\)` with `color('$1', '$2')`
    * replace `\bcolor\(([a-z-]+), ([a-z-]+), (.*)\)` with `color('$1', '$2', $3)`

### Bug fixes

* Fixed an issue with Lodash to load only single functions instead of the whole library (thanks to [@KrasiNedew](https://github.com/KrasiNedew) for the [original issue](https://github.com/Shopify/polaris/issues/283))

## 2.0.0-beta.12 - 2018-03-23

### Bug fixes

* Fixed Provider props export

## 2.0.0-beta.11 - 2018-03-23

### Bug fixes

* Fixed Provider i18n demo code
* Fixed overflow bug causing TextFields border to be cut off

## 2.0.0-beta.10 - 2018-03-16

### New Components

* Data table component
* Drop zone component

### Enhancements

* Added optional `id` props to more components, and restructured the prop definitions to allow projects to make `id` props mandatory

## 2.0.0-beta.9 - 2018-03-12

* Merged latest changes from v1 into v2

## 2.0.0-beta.8 - 2018-03-01

### Enhancements

* Added fullWidth prop to Card.Section
* Added translation and Provider support to Resource List
* Added fullHeight prop to Popover to override max-height

### Breaking Changes

* All elements are now globally set to `box-sizing: border-box;` instead of `box-sizing: inherit;`. There is a very small chance of seeing any visual regressions in existing applications.
* Pseudo-elements (`*::before`) and (`*::after`) are now globally set to `box-sizing: border-box;`. Visual regressions are expected in applications setting `padding` and `border` on pseudo-elements.

## 2.0.0-beta.7 - 2018-02-14

* Updated ResourceList docs for new component API

## 2.0.0-beta.6 - 2018-02-02

### Enhancements

* Added `allowRange` as a property for DatePicker
* Added ExceptionList and Truncate components

### Bug fixes

* Allows specific props in TextField Component to pass through properties on the input

## 2.0.0-beta.5 - 2018-01-26

### Bug fixes

* Fixed ActionList component to provide section dividers when a title was not provided

### Enhancements

* Added EmptySearchResult component
* Added Portal component
* Updated Popover to use the new Portal component
* Brought FlashMessage over from polaris-next and updated it to use Portal
* Updated Tooltip to use Portal instead of layeredComponent.

### Breaking Changes

* Dropped support for React < 16. Upgrade `react` and `react-dom` packages to v16.

## 2.0.0-beta.2, 2.0.0-beta.3 - 2018-01-16

* Deploy scripts fixes

## 2.0.0-beta.1 - 2018-01-16

### Breaking Changes

* Anchor tags are no longer styled by Polaris when missing the `[data-polaris-unstyled]` attributes
* Tabs no longer accept `title` as a prop. Use `content` instead.
* Removed default white color from Icon CSS. Use `color` prop instead
* Updated TextField onChange prop to be required if not disabled or readonly (thanks to [@buggy](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/82))

[changelog-guidelines]: https://github.com/Shopify/polaris/blob/master/documentation/Versioning%20and%20changelog.md
