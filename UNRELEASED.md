# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Updated `OptionList` section title to match `ActionList` section title ([#2300](https://github.com/Shopify/polaris-react/pull/2300))
- Added `pressed` state to `Button` ([#2148](https://github.com/Shopify/polaris-react/pull/2148))
- Added CSS custom properties to `Portal` container ([#2306](https://github.com/Shopify/polaris-react/pull/2306))

### Bug fixes

- Doesn't render `MenuActions` if no actions are passed to an `actionGroups` item inside `Page` ([#2266](https://github.com/Shopify/polaris-react/pull/2266))
- Fixed `PositionedOverlay` incorrectly calculating `Topbar.UserMenu` `Popover` width ([#1692](https://github.com/Shopify/polaris-react/pull/1692))
- Fixed `recolor-icon` Sass mixin to properly scope `$secondary-color` to the child `svg` ([#2298](https://github.com/Shopify/polaris-react/pull/2298))
- Fixed a regression with the positioning of the `Popover` component ([#2305](https://github.com/Shopify/polaris-react/pull/2305))
- Fixed an issue with the `ResourceList` component where the plural resource name was not used for `totalItemsCount` ([#2299](https://github.com/Shopify/polaris-react/issues/2299))
- Fixed Stack Item proportion when shrinking ([#2319](https://github.com/Shopify/polaris-react/pull/2319))
- Fixed animation of `Collapsible` with children having margins ([#1980](https://github.com/Shopify/polaris-react/pull/1980))

### Documentation

### Development workflow

### Dependency upgrades

- Updated sewing-kit to v0.111.0 and storybook to v5.2.4 ([#2326](https://github.com/Shopify/polaris-react/pull/2326))

### Code quality

### Deprecations

### Development workflow
