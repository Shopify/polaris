# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### New components

### Enhancements

- Updated `Navigation` badge prop to accept a react node ([#1142](https://github.com/Shopify/polaris-react/pull/1142))
- Changed max width on `Search` to 694px so that it is perfectly centered in the top bar ([#1107](https://github.com/Shopify/polaris-react/issues/1107))
- Added `action` prop to `Toast` ([#919](https://github.com/Shopify/polaris-react/pull/919))
- Remove all usage of `@shopify/javascript-utilities/decorators`, namely `autobind`, `debounce`, and `memoize` ([#1148](https://github.com/Shopify/polaris-react/issues/1148))
- Added `Empty State` footerContent prop ([#1200](https://github.com/Shopify/polaris-react/pull/1200))
- Added viewport condition to `TopBar` to enlarge the `contextControl` wrapper on wider screens ([#1231](https://github.com/Shopify/polaris-react/pull/1231))

### Bug fixes

- Fixed selectMode on `ResourceList` not toggling when items are selected programmatically ([#1224](https://github.com/Shopify/polaris-react/pull/1224))
- Fixed unnecessary height on `TextField` due to unhandled carriage returns ([#901](https://github.com/Shopify/polaris-react/pull/901))
- Ensured server side rendering matches client side rendering for [embedded app components](https://github.com/Shopify/polaris-react/blob/master/documentation/Embedded%20apps.md#components-which-wrap-shopify-app-bridge) ([#976](https://github.com/Shopify/polaris-react/pull/976))
- Fixed rendering of the spinner on `TextField` when setting to readOnly ([#1118](https://github.com/Shopify/polaris-react/pull/1199))
- Fixed webpack example that does not compile ([#1189](https://github.com/Shopify/polaris-react/issues/1189))

### Documentation

- Added accessibility documentation for `Checkbox`, `RadioButton`, and `ChoiceList` ([#1145](https://github.com/Shopify/polaris-react/pull/1145))

### Development workflow

### Dependency upgrades

- Regenerated the yarn.lock file in the browserify example to resolve security vulnerabilities ([#1202](https://github.com/Shopify/polaris-react/issues/1202))
- Updated browserify example dependencies and dev dependencies ([#1191](https://github.com/Shopify/polaris-react/issues/1191))
- Updated webpack example dependencies and dev dependencies ([#1189](https://github.com/Shopify/polaris-react/issues/1189))

### Code quality

- Replaced all occurrences of `_.merge` with a custom `merge` function ([#1018](https://github.com/Shopify/polaris-react/pull/1018))
- Replaced all occurrences of `_.pick` with a custom pick function ([#1020](https://github.com/Shopify/polaris-react/pull/1020))
- Deleted the icons index file that would re-export icons, and replaced it with direct imports ([#1195](https://github.com/Shopify/polaris-react/pull/1195))
- Replaces all instances where we pass a string representing a bundled icon into `Icon`. Prefer passing in the React Component from `@shopify/polaris-icons` ([#1196](https://github.com/Shopify/polaris-react/pull/1196))

### Deprecations
