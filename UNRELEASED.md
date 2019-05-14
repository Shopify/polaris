# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Deprecations

### New components

### Enhancements

- Enhanced `NavigationItem`'s color accessibility for `active`, `focus`, `hover` and `Selected` states ([1304](https://github.com/Shopify/polaris-react/pull/1304))
- Added `align` prop to `TextField` ([#1428](https://github.com/Shopify/polaris-react/pull/1428))
- Added `clearButton` prop to `TextField` ([#1226](https://github.com/Shopify/polaris-react/pull/1226))

### Bug fixes

- Fixed `Checkbox` from improperly toggling when disabled ([#1467](https://github.com/Shopify/polaris-react/pull/1467))
- Fixed `Popover` fade-in flutter on iOS by switching Transition component for CSSTransition [#1400](https://github.com/Shopify/polaris-react/pull/1400)
- Improved the visibility of focus styles for the `Link` component. [#1425](https://github.com/Shopify/polaris-react/pull/1425)

### Documentation

- Updated accessibility testing documentation ([#1449](https://github.com/Shopify/polaris-react/pull/1449))
- Added guidelines for tertiary actions in modals to `Modal` component documentation ([#1336](https://github.com/Shopify/polaris-react/pull/1336))

### Development workflow

- Updated the a11y shitlist and re-enabled the pa11y job in CI. The job always passes for now, as a way for us to judge whether it is stable and can be made a required check. ([#1456](https://github.com/Shopify/polaris-react/pull/1456))

### Dependency upgrades

### Code quality

- Simplified logic in Checkbox component ([#1453](https://github.com/Shopify/polaris-react/pull/1453))

### Deprecations
