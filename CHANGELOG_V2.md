# Changelog

<!-- ## Unreleased -->

## 2.0.0-beta.2, 2.0.0-beta.3 - 2018-01-16

- Deploy scripts fixes

## 2.0.0-beta.1 - 2018-01-16

### Breaking Changes
- Anchor tags are no longer styled by Polaris when missing the `[data-polaris-unstyled]` attributes ([#841](https://github.com/shopify/polaris-react/pull/841))
- Tabs no longer accept `title` as a prop. Use `content` instead. ([#909](https://github.com/Shopify/polaris-react/pull/909))
- Removed default white color from Icon CSS. Use `color` prop instead ([#540](https://github.com/Shopify/polaris-react/pull/540))
- Updated TextField onChange prop to be required if not disabled or readonly (thanks to [@buggy](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/82)) ([#870](https://github.com/Shopify/polaris-react/pull/870))
