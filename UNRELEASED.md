# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Deprecations

- Deprecated Navigation `Item`'s `iconBody` prop. Pass a string into the `icon` prop instead. ([#1299](https://github.com/Shopify/polaris-react/pull/1299))

### New components

### Enhancements

- Improved the performance of `ResourceList` ([#1313](https://github.com/Shopify/polaris-react/pull/1313))
- Added an onChange handler to `CheckableButton` ([#1326](https://github.com/Shopify/polaris-react/pull/1326))
- `Labelled` now wraps its content, no longer causing a `label + action` to get unreasonably squished ([#1309](https://github.com/Shopify/polaris-react/pull/1309))
- Updated `polaris-tokens` from `2.3.0` to `2.5.0` and converted all use of `duration` values ([#1268](https://github.com/Shopify/polaris-react/pull/1268))
- More consistent use of `text-breakword` mixin ([#1306](https://github.com/Shopify/polaris-react/pull/1306))
- Added an icon and screen reader hint when `Link` opens a new tab ([#1247](https://github.com/Shopify/polaris-react/pull/1247))
- Updated open styleguide pr to create multiple pull requests to update `polaris-react` across multiple repos ([#1069](https://github.com/Shopify/polaris-react/pull/1069))
- Updated the pull request creation to retry when it fails ([#1069](https://github.com/Shopify/polaris-react/pull/1069))
- Exported overlay and layer data attributes for use in consumer components ([#1266](https://github.com/Shopify/polaris-react/pull/1266))

- Updated `Resizer` to schedule `handleHeightCheck` to run in next animation frame ([#1301](https://github.com/Shopify/polaris-react/pull/1301))

### Bug fixes

- Fixed `ResourceList.Item` interaction states from being incorrectly applied ([#1312](https://github.com/Shopify/polaris-react/pull/1312)
- Fixed `ResourceList` actions from show at incorrect breakpoints or while in select mode ([#1333](https://github.com/Shopify/polaris-react/pull/1333))
- Fixed Search overlay stretching below the viewport ([#1260](https://github.com/Shopify/polaris-react/pull/1260))
- Added `onChange` and `value` to select `AppProvider` examples to remove console errors ([#1320](https://github.com/Shopify/polaris-react/pull/1320))
- Fixed promoted bulk actions in `ResourceList` not properly disabling ([#1317](https://github.com/Shopify/polaris-react/pull/1317)) (thanks [@jineshshah36](https://github.com/jineshshah36) for the [issue report](https://github.com/Shopify/polaris-react/issues/1316))
- Fixed `ResourceList` header from displaying when `EmptySearchResult` exists ([#1286](https://github.com/Shopify/polaris-react/pull/1286))
- Stopped passing the `polaris` context into the div rendered by `Scrollable` ([#1271](https://github.com/Shopify/polaris-react/pull/1271))
- Fixed clickable area on sortable column headers on `DataTable` ([#1273](https://github.com/Shopify/polaris-react/pull/1273))

### Documentation

### Development workflow

Upgraded Storybook to v5 ([#1140](https://github.com/Shopify/polaris-react/pull/1140))

### Dependency upgrades

- Remove core-js ([#1328](https://github.com/Shopify/polaris-react/pull/1328))
- Upgraded Polaris icons to include the full icon set ([#1284](https://github.com/Shopify/polaris-react/pull/1284))

### Code quality

- Migrated the refs in `DropZone` to use the new createRef API ([#1063](https://github.com/Shopify/polaris-react/pull/1063))
- Updated `ResourceList` to no longer use `componentWillReceiveProps`([#1235](https://github.com/Shopify/polaris-react/pull/1235))
- Updated `Tabs` to no longer use `componentWillReceiveProps`([#1221](https://github.com/Shopify/polaris-react/pull/1221))
- Removed an unneeded media query from Modal's `Header` component ([#1272](https://github.com/Shopify/polaris-react/pull/1272))
- Replaces all instances where we pass a string representing a bundled icon into `Button`. Prefer passing in the React Component from `@shopify/polaris-icons` ([#1297](https://github.com/Shopify/polaris-react/pull/1297))

### Deprecations
