# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines][changelog-guidelines].

## Unreleased

# 2.0.0-beta.6 - 2018-02-02
### Enhancements
- Added `allowRange` as a property for DatePicker ([#884](https://github.com/Shopify/polaris-react/pull/884))

### Bug fixes
- Allows specific props in TextField Component to pass through properties on the input ([#907](https://github.com/Shopify/polaris-react/pull/907))

## 2.0.0-beta.5 - 2018-01-26
### Bug fixes
- Fixed ActionList component to provide section dividers when a title was not provided ([#926](https://github.com/Shopify/polaris-react/pull/926))

### Enhancements
- Added EmptySearchResult component ([#955](https://github.com/Shopify/polaris-react/pull/955))
- Added Portal component ([#742](https://github.com/Shopify/polaris-react/pull/742))
- Updated Popover to use the new Portal component ([#742](https://github.com/Shopify/polaris-react/pull/742))

### Breaking Changes
- Dropped support for React < 16. Upgrade `react` and `react-dom` packages to v16. ([#936](https://github.com/shopify/polaris-react/pull/936))

## 2.0.0-beta.2, 2.0.0-beta.3 - 2018-01-16
- Deploy scripts fixes

## 2.0.0-beta.1 - 2018-01-16
### Breaking Changes
- Anchor tags are no longer styled by Polaris when missing the `[data-polaris-unstyled]` attributes ([#841](https://github.com/shopify/polaris-react/pull/841))
- Tabs no longer accept `title` as a prop. Use `content` instead. ([#909](https://github.com/Shopify/polaris-react/pull/909))
- Removed default white color from Icon CSS. Use `color` prop instead ([#540](https://github.com/Shopify/polaris-react/pull/540))
- Updated TextField onChange prop to be required if not disabled or readonly (thanks to [@buggy](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/82)) ([#870](https://github.com/Shopify/polaris-react/pull/870))

[changelog-guidelines]: https://github.com/Shopify/polaris/blob/master/documentation/Versioning%20and%20changelog.md
