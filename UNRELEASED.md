# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Deprecations

- Deprecated passing a string representing a "bundled icon" into `<Icon source>` Pass in an svg component imported from `@shopify/polaris-icons` instead ([#1534](https://github.com/Shopify/polaris-react/pull/1534)).

### New components

### Enhancements

### Bug fixes

- Fixed text and other elements from being selected in Safari when dragging the color picker ([#1562](https://github.com/Shopify/polaris-react/pull/1562))
- Fixed `Banner` `title` overflowing when set to a single long word ([#1553](https://github.com/Shopify/polaris-react/pull/1553))

### Documentation

- Updated icon documentation to use imports from polaris-icons ([#1561](https://github.com/Shopify/polaris-react/pull/1561))

### Development workflow

- Made the a11y test that runs in CI fail if it finds any issues ([#1564](https://github.com/Shopify/polaris-react/pull/1564))

### Dependency upgrades

### Code quality

### Deprecations
