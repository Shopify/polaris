# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Deprecations

### New components

### Enhancements

- Improved the performance of `ResourceList` ([#1313](https://github.com/Shopify/polaris-react/pull/1313))

### Bug fixes

- Fixed `ResourceList.Item` interaction states from being incorrectly applied ([#1312](https://github.com/Shopify/polaris-react/pull/1312)
- Fixed selected state for date picker in windows high contrast mode ([#1342](https://github.com/Shopify/polaris-react/pull/1342))
- Added background into media query for Microsoft high contrast to fix skeleton accessibility. ([#1341](https://github.com/Shopify/polaris-react/pull/1341))

### Documentation

- Updated `Link` accessibility documentation for the `external` prop to reflect new behavior. ([#1347](https://github.com/Shopify/polaris-react/pull/1347))
- Added accessibility documentation for `VisuallyHidden`. ([#1348](https://github.com/Shopify/polaris-react/pull/1348))
- Added accessibility documentation for `TextStyle`. ([#1350](https://github.com/Shopify/polaris-react/pull/1350))
- Added accessibility guidance for `Heading` and `Subheading`. ([#1351](https://github.com/Shopify/polaris-react/pull/1351))
- Added accessibility documentation for `List` and `Stack`. ([#1353](https://github.com/Shopify/polaris-react/pull/1353))
- Added accessibility guidance for `DisplayText`. ([#1354](https://github.com/Shopify/polaris-react/pull/1354))
- Added guidance for updating component documentation and tophatting style guide changes. ([#1362](https://github.com/Shopify/polaris-react/pull/1362))
- Added accessibility documentation and guidance for `ActionList` and `OptionList`. ([#1365](https://github.com/Shopify/polaris-react/pull/1365))
- Added accessibility documentation for `Card` and `CalloutCard`. ([#1366](https://github.com/Shopify/polaris-react/pull/1366))
- Added accessibility documentation for `Badge`. ([#1364](https://github.com/Shopify/polaris-react/pull/1364))

### Development workflow

### Dependency upgrades

- Bump react-utilites to remove a transitive dependency on core-js. ([#1343](https://github.com/Shopify/polaris-react/pull/1343))

- Updated App Bridge to version 1.3.0 ([#1349](https://github.com/Shopify/polaris-react/pull/1349))

### Code quality

- Removed a `window.open` implementation error in `ResourceList.Item` ([#1294](<(https://github.com/Shopify/polaris-react/pull/1294)>))

### Deprecations
