# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Deprecations

- Deprecated Navigation `Item`'s `iconBody` prop. Pass a string into the `icon` prop instead. ([#1299](https://github.com/Shopify/polaris-react/pull/1299))

### New components

### Enhancements

- Updated `polaris-tokens` from `2.3.0` to `2.5.0` and converted all use of `duration` values ([#1268](https://github.com/Shopify/polaris-react/pull/1268))
- More consistent use of `text-breakword` mixin ([#1306](https://github.com/Shopify/polaris-react/pull/1306))
- Added an icon and screen reader hint when `Link` opens a new tab ([#1247](https://github.com/Shopify/polaris-react/pull/1247))

### Bug fixes

- Fixed Search overlay stretching below the viewport
- Stopped passing the `polaris` context into the div rendered by `Scrollable` ([#1271](https://github.com/Shopify/polaris-react/pull/1271))
- Fixed clickable area on sortable column headers on `DataTable` ([#1273](https://github.com/Shopify/polaris-react/pull/1273))
- Fixed `promotedBulkActions` not disabling in `ResourceList` ([#1316](https://github.com/Shopify/polaris-react/issues/1316))

### Documentation

### Development workflow

Upgraded Storybook to v5 ([#1140](https://github.com/Shopify/polaris-react/pull/1140))

### Dependency upgrades

- Upgraded Polaris icons to include the full icon set ([#1284](https://github.com/Shopify/polaris-react/pull/1284))

### Code quality

- Updated `ResourceList` to no longer use `componentWillReceiveProps`([#1235](https://github.com/Shopify/polaris-react/pull/1235))
- Updated `Tabs` to no longer use `componentWillReceiveProps`([#1221](https://github.com/Shopify/polaris-react/pull/1221))
- Removed an unneeded media query from Modal's `Header` component ([#1272](https://github.com/Shopify/polaris-react/pull/1272))
- Replaces all instances where we pass a string representing a bundled icon into `Button`. Prefer passing in the React Component from `@shopify/polaris-icons` ([#1297](https://github.com/Shopify/polaris-react/pull/1297))

### Deprecations
