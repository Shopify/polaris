# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Added optional `onClick` key to `secondaryAction` on `Nav/Item` component ([#4374](https://github.com/Shopify/polaris-react/pull/4374))
- Added `id` prop to `Layout` and `Heading` for hash linking ([#4307](https://github.com/Shopify/polaris-react/pull/4307))
- Added `external` prop to `Navigation.Item` component ([#4310](https://github.com/Shopify/polaris-react/pull/4310))
- Added consistent spacing to `ActionList` ([#4355](https://github.com/Shopify/polaris-react/pull/4355))
- Added `ariaLabelledBy` props to `Navigation` component to allow a hidden label for accessibility ([#4343](https://github.com/Shopify/polaris-react/pull/4343))
- Add `lastColumnSticky` prop to `IndexTable` to create a sticky last cell and optional sticky last heading on viewports larger than small ([#4150](https://github.com/Shopify/polaris-react/pull/4150))
- Allow promoted actions to be rendered as a menu on the `BulkAction` component ([#4266](https://github.com/Shopify/polaris-react/pull/4266))

### Bug fixes

- Fixed a bug in `Banner` where loading state wasn't getting passed to `primaryAction` ([#4338](https://github.com/Shopify/polaris-react/pull/4338))
- Fixed `Popover` not correctly positioning itself ([#4357](https://github.com/Shopify/polaris-react/pull/4357))
- Fixed a bug `TextField` where Safari would render the incorrect text color ([#4344](https://github.com/Shopify/polaris-react/pull/4344))
- Fix bug in Safari where `Button` text is gray instead of white after changing state from disabled to enabled ([#4270](https://github.com/Shopify/polaris-react/pull/4270))
- Bring back borders on the `IndexTable` sticky cells ([#4150](https://github.com/Shopify/polaris-react/pull/4150))
- Adjust `IndexTable` sticky z-index to avoid collisions with focused `TextField` ([#4150](https://github.com/Shopify/polaris-react/pull/4150))
- Adjust `IndexTable` rows to have a grey hover state when unselected ([#4359](https://github.com/Shopify/polaris-react/pull/4359))
- Properly support `selected` prop for `Navigation.Item` when `url` prop is not specified ([#4375](https://github.com/Shopify/polaris-react/pull/4375))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Modernized tests for Avatar, Backdrop, Badge, Banner components([#4306](https://github.com/Shopify/polaris-react/pull/4306))
- Modernized test for Card: Subsection, Header, Sections and Card ([#4325](https://github.com/Shopify/polaris-react/pull/4325)).
- Modernized tests for Item, Panel, List, Tab, TabMeasurer (from Tabs components). ([#4313](https://github.com/Shopify/polaris-react/pull/4313))
- Modernized tests for Tooltip, Toast components([#4314](https://github.com/Shopify/polaris-react/pull/4314))
- Modernized tests for AccountConnection, ActionList components([#4316](https://github.com/Shopify/polaris-react/pull/4316))
- Modernized tests for ActionMenu and its subcomponents ([#4318](https://github.com/Shopify/polaris-react/pull/4318))
- Modernized tests for Loading-List-Item-Label components([#4321](https://github.com/Shopify/polaris-react/pull/4321))
- Modernizes test for DiscardConfirmationModal, ContextualSaveBar, Loading, Toast, ToastManager, Frame (from Frame components) ([#4324](https://github.com/Shopify/polaris-react/pull/4324))
- Modernized tests for PageActions, Page and its components ([#4326](https://github.com/Shopify/polaris-react/pull/4326))
- Modernized tests for FormLayout and some components of ColorPicker ([#4330](https://github.com/Shopify/polaris-react/pull/4330))
- Modernized tests for Breadcrumbs, BulkActions, Button, ButtonGroup/Item, and ButtonGroup components([#4315](https://github.com/Shopify/polaris-react/pull/4315))
- Modernized tests for DualThumb ([#4341](https://github.com/Shopify/polaris-react/pull/4341))
- Modernized tests for AppProvider, AfterInitialMount components([#4331](https://github.com/Shopify/polaris-react/pull/4331))
- Modernized tests for SkeletonBodyTest, SkeletonDisplayTest, SkeletonPage, SkeletonThumbnail, and Spinner components ([#4353](https://github.com/Shopify/polaris-react/pull/4353))
- Modernized tests for Message, Menu, Search, SearchDismissOverlay, SearchField, UserMenu and TopBar components. ([#4311](https://github.com/Shopify/polaris-react/pull/4311))
- Modernized tests for Konami, Labelled, and Link components([#4389](https://github.com/Shopify/polaris-react/pull/4389))

### Deprecations
