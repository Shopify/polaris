# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Added `id` prop to `Layout` and `Heading` for hash linking ([#4307](https://github.com/Shopify/polaris-react/pull/4307))
- Added `external` prop to `Navigation.Item` component ([#4310](https://github.com/Shopify/polaris-react/pull/4310))
- Added `ariaLabelledBy` props to `Navigation` component to allow a hidden label for accessibility ([#4343](https://github.com/Shopify/polaris-react/pull/4343))
- Prevented `KeypressListener` attaching/detaching on every render ([#4173](https://github.com/Shopify/polaris-react/pull/4173))
- Added `animated` prop in `ProgressBar` ([#4251](https://github.com/Shopify/polaris-react/pull/4251))
- Added `divider` prop to `Page` component ([#4260](https://github.com/Shopify/polaris-react/pull/4260))
- Add `activator` prop to `Sheet` so the triggering element will regain focus ([#4201](https://github.com/Shopify/polaris-react/pull/4201))
- Rename and expose Card compound components types ([#4261](https://github.com/Shopify/polaris-react/pull/4261))
- Add `monospaced` prop to `TextField` component ([#4264](https://github.com/Shopify/polaris-react/pull/4264))
- Add base tight spacing option to `Stack` component([#4273](https://github.com/Shopify/polaris-react/pull/4273))
- Add `variableHeight` prop to `DropZone` so children control its height ([#4136](https://github.com/Shopify/polaris-react/pull/4136))
- Add print styles to `Card`, `Heading`, `Layout`, `Layout.Section`, `Subheading`, `TextStyle` components ([#4142](https://github.com/Shopify/polaris-react/pull/4142))
- Add `fullWidth` prop to `ColorPicker` so the color picker can take the full width ([#4152](https://github.com/Shopify/polaris-react/pull/4152))
- Add `noScroll` prop to `Modal` which prevents modal contents from scrolling ([#4153](https://github.com/Shopify/polaris-react/pull/4153))
- Added new `color` prop to ProgressBar ([#3415](https://github.com/Shopify/polaris-react/pull/3415))
- Added `requiredIndicator` prop to `Label`, `Labelled`, `Select` and `TextField` ([#4119](https://github.com/Shopify/polaris-react/pull/4119))
- Add `small` prop to `Modal` so that width can be decreased to 380px ([#4177](https://github.com/Shopify/polaris-react/pull/4177))
- Add `status` prop to `IndexTable.Row` to allow table rows to specify background colors([#4146](https://github.com/Shopify/polaris-react/pull/4146))
- Disabled `pointer-events` on the prefix and suffix elements of the `TextField` component ([#4207](https://github.com/Shopify/polaris-react/pull/4207))
- Add `last` prop to `IndexTable.Cell` to create a sticky last cell on viewports larger than small ([#4150](https://github.com/Shopify/polaris-react/pull/4150))

### Bug fixes

- Fixed a bug in `Banner` where loading state wasn't getting passed to `primaryAction` ([#4338](https://github.com/Shopify/polaris-react/pull/4338))
- Fixed a bug `TextField` where Safari would render the incorrect text color ([#4344](https://github.com/Shopify/polaris-react/pull/4344))

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
- Modernized tests for PageActions, Page and its components ([#4326](https://github.com/Shopify/polaris-react/pull/4326))
- Modernized tests for FormLayout and some components of ColorPicker ([#4330](https://github.com/Shopify/polaris-react/pull/4330))
- Modernized tests for Breadcrumbs, BulkActions, Button, ButtonGroup/Item, and ButtonGroup components([#4315](https://github.com/Shopify/polaris-react/pull/4315))
- Modernized tests for DualThumb ([#4341](https://github.com/Shopify/polaris-react/pull/4341))

### Deprecations
