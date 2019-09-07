# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Added `pressed` state to `Button` ([#2148](https://github.com/Shopify/polaris-react/pull/2148))

### Bug fixes

- Doesn't render `MenuActions` if no actions are passed to an `actionGroups` item inside `Page` ([2266](https://github.com/Shopify/polaris-react/pull/2266))
- Fixed `PositionedOverlay` incorrectly calculating `Topbar.UserMenu` `Popover` width ([#1692](https://github.com/Shopify/polaris-react/pull/1692))
- Fixed `recolor-icon` Sass mixin to properly scope `$secondary-color` to the child `svg` ([#2298](https://github.com/Shopify/polaris-react/pull/2298))
- Fixed a regression with the positioning of the `Popover` component ([#2305](https://github.com/Shopify/polaris-react/pull/2305))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Migrated `Frame` to use hooks instead of `withAppProvider` ([#2096](https://github.com/Shopify/polaris-react/pull/2096))

### Deprecations

### Development workflow
