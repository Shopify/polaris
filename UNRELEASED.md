# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- **`Popover`:** New `autofocusTarget` prop to enhance autofocus options ([#3600](https://github.com/Shopify/polaris-react/pull/3600))

### Bug fixes

- Fixed alignment of `Page` and `TopBar` so the search aligns to the page. ([#3610](https://github.com/Shopify/polaris-react/pull/3610))
- Removed extra bottom border on the `DataTable` and added curved edges to footers ([#3571](https://github.com/Shopify/polaris-react/pull/3571))
- **`Button`:** `loading` no longer sets the invalid `role="alert"` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Removed `tabIndex=-1` from `Popover` when `preventAutoFocus` is true ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Fix `Filters` janky animation when opening and closing ([#3606](https://github.com/Shopify/polaris-react/pull/3606))
- Fixed `Modal` header border color ([#3616](https://github.com/Shopify/polaris-react/pull/3616))
- Fixed `TopBar` search clear button alignment on iOS ([#3618](https://github.com/Shopify/polaris-react/pull/3618))
- Added dependency list to useImperativeHandle in `Banner` ([#3478](https://github.com/Shopify/polaris-react/pull/3478))
- Internationalize `Badge` labels ([#3655](https://github.com/Shopify/polaris-react/pull/3655))
- Aligned the `::before` 'indicator' to edge of container for `ActionList` ([#3619](https://github.com/Shopify/polaris-react/pull/3619))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations

- Deprecated `Popover`'s prop `preventAutofocus`. Use `autofocusTarget` instead ([#3602](https://github.com/Shopify/polaris-react/issues/3602))
