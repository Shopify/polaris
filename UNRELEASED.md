# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### New components

### Enhancements

- Added a public `focus` method on `Banner` ([#1219](https://github.com/Shopify/polaris-react/pull/1219))
- Added an `onScrollToBottom` prop to `Popover.Pane` ([#1248](https://github.com/Shopify/polaris-react/pull/1248))

- Added a `placeholder` prop to `FilterControl` ([#1257](https://github.com/Shopify/polaris-react/pull/1257))

### Bug fixes

- Fixed disabled states while loading for `ResourceList` ([#1237](https://github.com/Shopify/polaris-react/pull/1237))
- Fixed `Checkbox` from losing focus and not receiving some modified events([#1112](https://github.com/Shopify/polaris-react/pull/1112))
- Added translation for the cancel button on the `ResourceList` `BulkActions` ([#1243](https://github.com/Shopify/polaris-react/pull/1243))
- TextField autoComplete prop can now also accept string values and set the html input element's autocomplete to that string. The behavior for null, true and false values remains as it was.
- Fixed the `Autocomplete` `onLoadMoreResults` prop not being called on scrolling to the end of the option list ([#1249](https://github.com/Shopify/polaris-react/pull/1249))

### Documentation

- Removed `button group joined to the bottom of a component` example ([#38](https://github.com/Shopify/polaris-react/pull/1267))

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
