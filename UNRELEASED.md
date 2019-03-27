# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### New components

### Enhancements

- Added a public `focus` method on `Banner` ([#1219](https://github.com/Shopify/polaris-react/pull/1219))

### Bug fixes

- Fixed unnecessary height on `TextField` due to unhandled carriage returns ([#901](https://github.com/Shopify/polaris-react/pull/901))
- Fixed onClick from firing three times when using the enter key on a `ResourceList` item ([#1179](https://github.com/Shopify/polaris-react/pull/1179))
- Ensured server side rendering matches client side rendering for [embedded app components](https://github.com/Shopify/polaris-react/blob/master/documentation/Embedded%20apps.md#components-which-wrap-shopify-app-bridge) ([#976](https://github.com/Shopify/polaris-react/pull/976))
- Fixed disabled states while loading for `ResourceList` ([#1237](https://github.com/Shopify/polaris-react/pull/1237))
- Fixed `Checkbox` from losing focus and not receiving some modified events([#1112](https://github.com/Shopify/polaris-react/pull/1112))
- Added translation for the cancel button on the `ResourceList` `BulkActions` ([#1243](https://github.com/Shopify/polaris-react/pull/1243))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
