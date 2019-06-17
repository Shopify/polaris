# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Moved `ResourceItem` to its own component ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Updated `ResourceList` sort to show an inline label ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Removed the `tap-highlight-color` for `Buttons` ([#1545](https://github.com/Shopify/polaris-react/pull/1545))

### Bug fixes

- Removed `Tooltip` on disabled `Pagination` buttons ([#1963](https://github.com/Shopify/polaris-react/pull/1963))
- Fixed accessibility labels on `ResourceList.Item` persistent action disclosure icon ([#1973](https://github.com/Shopify/polaris-react/pull/1973))
- Fixed accessibility issue with `Autocomplete` where keyboard navigation of options was laggy and skipped options([#1887](https://github.com/Shopify/polaris-react/pull/1887))
- Fixed bug where `Autocomplete` was bubbling up the `Enter` key event unexpectedly ([#1887](https://github.com/Shopify/polaris-react/pull/1887))
- Fixed `ContextualSaveBar` actions overflowing on small screens ([#1967](https://github.com/Shopify/polaris-react/pull/1967))
- Fixes PositionOverlay incorrectly calculating the left value for right aligned components with scroll bars ([#1692](https://github.com/Shopify/polaris-react/pull/1692))

### Documentation

- Updated example section to include new examples and remove old ones ([#1979](https://github.com/Shopify/polaris-react/pull/1979))
- Updated example for the `ResourceList.Item` persistent actions accessibility labels ([#1973](https://github.com/Shopify/polaris-react/pull/1973))
- Removed `FilterControl` documentation and case studies from `ResourceList` documentation ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Updated `ResourceList` examples to use `Filters` ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Added an example to `Filters` showing the use of `children` ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Added guidance for making animated gifs in PRs and issues more accessibility-friendly [#1998](https://github.com/Shopify/polaris-react/pull/1998)
- Added `RadioButton` guidance to make one option selected by default [#2005](https://github.com/Shopify/polaris-react/pull/2005)

### Development workflow

### Dependency upgrades

### Code quality

- Removed mocks in various tests suites that are now redundant ([#1978](https://github.com/Shopify/polaris-react/pull/1978))

### Deprecations

- Deprecated `FilterControl`. Use `Filters` instead ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
