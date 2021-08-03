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
- Added `external` prop to `Navigation.Item` component ([#4310](https://github.com/Shopify/polaris-react/pull/4310))
- Added `ariaLabelledBy` props to `Navigation` component to allow a hidden label for accessibility ([#4343](https://github.com/Shopify/polaris-react/pull/4343))

### Bug fixes

- Fixed a bug in `Banner` where loading state wasn't getting passed to `primaryAction` ([#4338](https://github.com/Shopify/polaris-react/pull/4338))
- Fixed a bug `TextField` where Safari would render the incorrect text color ([#4344](https://github.com/Shopify/polaris-react/pull/4344))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Rebuilt `Autocomplete` internals using new `ComboBox` and `ListBox` components built on the ARIA 1.2 spec for improved accessibility ([#3910](https://github.com/Shopify/polaris-react/pull/3910))
- Modernized tests for Avatar, Backdrop, Badge, Banner components([#4306](https://github.com/Shopify/polaris-react/pull/4306))
- Modernized test for Card: Subsection, Header, Sections and Card ([#4325](https://github.com/Shopify/polaris-react/pull/4325)).
- Modernized tests for Item, Panel, List, Tab, TabMeasurer (from Tabs components). ([#4313](https://github.com/Shopify/polaris-react/pull/4313))
- Modernized tests for Tooltip, Toast components([#4314](https://github.com/Shopify/polaris-react/pull/4314))
- Modernized tests for AccountConnection, ActionList components([#4316](https://github.com/Shopify/polaris-react/pull/4316))
- Updated `@shopify/react-testing` to v3.2.0 for React 17 support in tests ([#4349](https://github.com/Shopify/polaris-react/pull/4349))
- Modernized tests for ActionMenu and its subcomponents ([#4318](https://github.com/Shopify/polaris-react/pull/4318))
- Modernized tests for Loading-List-Item-Label components([#4321](https://github.com/Shopify/polaris-react/pull/4321))
- Modernized tests for PageActions, Page and its components ([#4326](https://github.com/Shopify/polaris-react/pull/4326))
- Modernized tests for FormLayout and some components of ColorPicker ([#4330](https://github.com/Shopify/polaris-react/pull/4330))
- Modernized tests for Breadcrumbs, BulkActions, Button, ButtonGroup/Item, and ButtonGroup components([#4315](https://github.com/Shopify/polaris-react/pull/4315))
- Modernized tests for DualThumb ([#4341](https://github.com/Shopify/polaris-react/pull/4341))

### Deprecations
