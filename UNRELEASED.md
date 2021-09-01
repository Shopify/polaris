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
- Add `extraSmall` prop to `Avatar` ([#4371](https://github.com/Shopify/polaris-react/pull/4371))
- Add `critical` color option to `ProgressBar` component ([#4408](https://github.com/Shopify/polaris-react/pull/4408))
- `Popover` now exposes an imperative `forceReLayout()` API for programmatically triggering a re-render of the underlying overlay component ([#4385](https://github.com/Shopify/polaris-react/pull/4385))
- `PositionedOverlay` now exposes an imperative `forceReLayout()` API for programmatically triggering a re-render of the component ([#4385](https://github.com/Shopify/polaris-react/pull/4385))
- `Popover` now exposes an imperative `forceUpdatePosition()` API for programmatically triggering a re-render of the underlying overlay component ([#4385](https://github.com/Shopify/polaris-react/pull/4385))
- `PositionedOverlay` now exposes an imperative `forceUpdatePosition()` API for programmatically triggering a re-render of the component ([#4385](https://github.com/Shopify/polaris-react/pull/4385))
- Updated `IndexTable` component to hide checkboxes when `selectable` prop is `false` ([#4376](https://github.com/Shopify/polaris-react/pull/4376))

### Bug fixes

- Fixed a bug in `Banner` where loading state wasn't getting passed to `primaryAction` ([#4338](https://github.com/Shopify/polaris-react/pull/4338))
- Fixed `Popover` not correctly positioning itself ([#4357](https://github.com/Shopify/polaris-react/pull/4357))
- Fixed a bug `TextField` where Safari would render the incorrect text color ([#4344](https://github.com/Shopify/polaris-react/pull/4344))
- Fixed screen readers reading out the clear button in `TextField` when there is no input ([#4369](https://github.com/Shopify/polaris-react/pull/4369))
- Fix bug in Safari where `Button` text is gray instead of white after changing state from disabled to enabled ([#4270](https://github.com/Shopify/polaris-react/pull/4270))
- Bring back borders on the `IndexTable` sticky cells ([#4150](https://github.com/Shopify/polaris-react/pull/4150))
- Adjust `IndexTable` sticky z-index to avoid collisions with focused `TextField` ([#4150](https://github.com/Shopify/polaris-react/pull/4150))
- Adjust `IndexTable` rows to have a grey hover state when unselected ([#4359](https://github.com/Shopify/polaris-react/pull/4359))
- Properly support `selected` prop for `Navigation.Item` when `url` prop is not specified ([#4375](https://github.com/Shopify/polaris-react/pull/4375))
- Fixed an accessibility bug in `Icon` where `aria-label` was used incorrectly ([#4414](https://github.com/Shopify/polaris-react/pull/4414))
- Fixed a bug in `Option` where the label would cause scrollbars to appear instead of wrapping ([#4411](https://github.com/Shopify/polaris-react/pull/4411))

### Documentation

- Fixed incorrect url for tophatting the `Playground` component inside an iframe ([4392](https://github.com/Shopify/polaris-react/pull/4392))
- Simplified content guidelines section for text field component and linked out to thorough guidelines on the text fields experience page ([#4422](https://github.com/Shopify/polaris-react/pull/4422))

### Development workflow

### Dependency upgrades

### Code quality

- Modernized tests for Avatar, Backdrop, Badge, Banner components([#4306](https://github.com/Shopify/polaris-react/pull/4306))
- Modernized tests for Card: Subsection, Header, Sections and Card ([#4325](https://github.com/Shopify/polaris-react/pull/4325)).
- Modernized tests for Item, Panel, List, Tab, TabMeasurer (from Tabs components). ([#4313](https://github.com/Shopify/polaris-react/pull/4313))
- Modernized tests for Tooltip, Toast components([#4314](https://github.com/Shopify/polaris-react/pull/4314))
- Modernized tests for AccountConnection, ActionList components([#4316](https://github.com/Shopify/polaris-react/pull/4316))
- Modernized tests for ActionMenu and its subcomponents ([#4318](https://github.com/Shopify/polaris-react/pull/4318))
- Modernized tests for Loading-List-Item-Label components([#4321](https://github.com/Shopify/polaris-react/pull/4321))
- Modernized tests for DiscardConfirmationModal, ContextualSaveBar, Loading, Toast, ToastManager, Frame (from Frame components) ([#4324](https://github.com/Shopify/polaris-react/pull/4324))
- Modernized tests for Truncate and UnstyledButton ([#4327](https://github.com/Shopify/polaris-react/pull/4327)).
- Modernized tests for PageActions, Page and its components ([#4326](https://github.com/Shopify/polaris-react/pull/4326))
- Modernized tests for FormLayout and some components of ColorPicker ([#4330](https://github.com/Shopify/polaris-react/pull/4330))
- Modernized tests for Breadcrumbs, BulkActions, Button, ButtonGroup/Item, and ButtonGroup components([#4315](https://github.com/Shopify/polaris-react/pull/4315))
- Modernized tests for DualThumb ([#4341](https://github.com/Shopify/polaris-react/pull/4341))
- Modernized tests for AppProvider, AfterInitialMount components([#4331](https://github.com/Shopify/polaris-react/pull/4331))
- Modernized tests for SkeletonBodyTest, SkeletonDisplayTest, SkeletonPage, SkeletonThumbnail, and Spinner components ([#4353](https://github.com/Shopify/polaris-react/pull/4353))
- Modernized tests for CalloutCard, Caption, CheckableButton, Resizer, VideoThumbnail ([#4387](https://github.com/Shopify/polaris-react/pull/4387))
- Modernized tests for Message, Menu, Search, SearchDismissOverlay, SearchField, UserMenu and TopBar components. ([#4311](https://github.com/Shopify/polaris-react/pull/4311))
- Modernized tests for UnstyledLink, Tag, DisplayText, FileUpload, MessageIndicator, Choice and Dialog ([#4407](https://github.com/Shopify/polaris-react/pull/4407)).
- Modernized tests for Konami, Labelled, and Link components([#4389](https://github.com/Shopify/polaris-react/pull/4389))
- Modernized tests for TextStyle, Collapsible, Tabs ([#4453](https://github.com/Shopify/polaris-react/pull/4453))
- Modernized tests for Scrollable, ScrollTo, ScrollLock, Select, SettingToggle, Sheet, Spinner, and Sticky components([#4386](https://github.com/Shopify/polaris-react/pull/4386))
- Modernized tests for Message, Menu, Search, SearchDismissOverlay, SearchField, UserMenu and TopBar components. ([#4311](https://github.com/Shopify/polaris-react/pull/4311))
- Modernized tests for ResourceItem, ResourceList ([#4362](https://github.com/Shopify/polaris-react/pull/4362))
- Modernized tests for MediaCard, and Layout components ([#4393](https://github.com/Shopify/polaris-react/pull/4393))
- Modernized tests for Image and Icon components ([#4418](https://github.com/Shopify/polaris-react/pull/4418))
- Modernized tests for EventListener and EmptySearch components([#4423](https://github.com/Shopify/polaris-react/pull/4423))
- Modernized tests for Pane, Section, PositionedOverlay, SingleThumb, RangeSlider, and ConnectedFilter components ([#4429](https://github.com/Shopify/polaris-react/pull/4429))
- Modernized tests for ContextualSaveBar and DataTable and its subcomponents ([#4397](https://github.com/Shopify/polaris-react/pull/4397))
- Modernized tests for IndexTable, Indicator, InlineError, KeyboardKey, and KeypressListener components([#4431](https://github.com/Shopify/polaris-react/pull/4431))
- Modernized tests for Form and Filters components ([#4434](https://github.com/Shopify/polaris-react/pull/4434)).
- Modernized tests for OptionList and its subcomponents ([#4441](https://github.com/Shopify/polaris-react/pull/4441))
- Modernized tests for Modal ([#4433](https://github.com/Shopify/polaris-react/pull/4433))
- Modernized tests for Navigation and Navigation.Section ([#4440](https://github.com/Shopify/polaris-react/pull/4440))
- Modernized tests for EmptyState component ([#4427](https://github.com/Shopify/polaris-react/pull/4427))
- Modernized tests for Pagination, FilterControl, FilterCreator, FilterValueSelector, and DateSelector components ([#4438](https://github.com/Shopify/polaris-react/pull/4438))
- Modernized tests for PopoverOverlay component([#4430](https://github.com/Shopify/polaris-react/pull/4430))
- Modernized tests for Dropzone, ExceptionList, and ConnectedFilterControl > Item components([#4412](https://github.com/Shopify/polaris-react/pull/4412))
- Modernized tests for DatePicker, DescriptionList, and DisplayText ([#4360](https://github.com/Shopify/polaris-react/pull/4360))

### Deprecations
