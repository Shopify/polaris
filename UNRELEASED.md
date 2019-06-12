# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

- `Page > Header` now must pass `content` to the `actions` within `secondaryActions` and `actionGroups` ([#1653](https://github.com/Shopify/polaris-react/pull/1653))

### Deprecations

### New components

- `ActionMenu`: Use for display of actions and action groups within the context of a header ([#1653](https://github.com/Shopify/polaris-react/pull/1653))

### Enhancements

- `ActionList` can now pass a unique `accessibilityLabel` to each `Item` ([#1653](https://github.com/Shopify/polaris-react/pull/1653))
- Greatly reduced complexity of `Page > Header` ([#1653](https://github.com/Shopify/polaris-react/pull/1653))
- Long `Page > Header` breadcrumb labels will now truncate instead of breaking layout ([#1653](https://github.com/Shopify/polaris-react/pull/1653))
- Improves performance of `TabMeasure` component ([#1544](https://github.com/Shopify/polaris-react/pull/1544))
- Added `secondaryFooterActions` prop to `Card` which adds an action list of secondary actions to the footer [#1625](https://github.com/Shopify/polaris-react/pull/1625)

### Bug fixes

### Documentation

### Development workflow

- Updated Storybook to `v5.1.3` ([#1666](https://github.com/Shopify/polaris-react/pull/1666))

### Dependency upgrades

### Code quality

### Deprecations

- `Card` `secondaryFooterAction` is now deprecated. Set an array of secondary actions on the `secondaryFooterActions` prop instead [#1625](https://github.com/Shopify/polaris-react/pull/1625)
