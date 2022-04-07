# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Increased token coverage by creating `@keyframes` tokens and replacing hardcoded instances ([5427](https://github.com/Shopify/polaris/pull/5427/))
- Change types for DataTable `totalsName` prop to allow for ReactNode ([#5454](https://github.com/Shopify/polaris/pull/5365/))

### Bug fixes

- Added a `suggestion` prop on `TextField` to support inline autocomplete ([5303](https://github.com/Shopify/polaris/pull/5303))
- Added support for setting `ariaAutocomplete` to `both` on `Combobox.TextField` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Added a `willLoadMoreOptions` prop to `Combobox` that's passed to `Listbox` through context so that `onKeyToBottom` is only called if `willLoadMoreOptions` is `true` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Improved `Autocomplete` performance when options are lazy loaded by passing `willLoadMoreResults` to the `Combobox` `willLoadMoreOptions` prop when present ([5303](https://github.com/Shopify/polaris/pull/5303))
- Updated `Listbox` scroll UX to behave natively when navigating options with keyboard instead of scrolling the active option to the top of the visible list ([5303](https://github.com/Shopify/polaris/pull/5303))

### Bug fixes

- Fixed automatic selection of first navigable `Listbox.Option` not resetting in `Listbox` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Fixed subdued styles not applying to `Listbox.TextOption` when `disabled` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Fixed active `Listbox.Option` flashing when scrolled into view ([5303](https://github.com/Shopify/polaris/pull/5303))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
