# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

- Updated `react` and `react-dom` to version 16.14.0. This is now the minimum version of React required to use the `@shopify/polaris` library.
- Dropping support for node 10.x
- Dropped support for Desktop Safari versions less than 13.1, and ios Safari versions less than 13.6. ([#4304](https://github.com/Shopify/polaris-react/pull/4304))
- Made `autoComplete` prop in `TextField` a required string ([#4267](https://github.com/Shopify/polaris-react/pull/4267)). If you do not want the browser to autofill a user's information (for example an email input which is a customer's email, but not the email of the user who is entering the information), we recommend setting `autoComplete` to `"off"`.
- `Autocomplete` now requires `Autocomplete.TextField` to be used ([#3910](https://github.com/Shopify/polaris-react/pull/3910))
- Removed ComboBox as a named export on `Autocomplete` ([#3910](https://github.com/Shopify/polaris-react/pull/3910))

### Enhancements

- Added `id` prop to `Layout` and `Heading` for hash linking ([#4307](https://github.com/Shopify/polaris-react/pull/4307))

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Rebuilt `Autocomplete` internals using new `ComboBox` and `ListBox` components built on the ARIA 1.2 spec for improved accessibility ([#3910](https://github.com/Shopify/polaris-react/pull/3910))
- Modernized tests for Avatar, Backdrop, Badge, Banner components([#4306](https://github.com/Shopify/polaris-react/pull/4306))
- Modernized tests for Tooltip, Toast components([#4314](https://github.com/Shopify/polaris-react/pull/4314))
- Modernized tests for AccountConnection, ActionList components([#4316](https://github.com/Shopify/polaris-react/pull/4316))

### Deprecations
