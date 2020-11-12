# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### Enhancements

Updated `Textfield` with a `type` of `number` to not render a spinner if step is set to `0` ([#3477](https://github.com/Shopify/polaris-react/pull/3477))

### Bug fixes

- Fixed alignment of `Page` and `TopBar` so the search aligns to the page. ([#3610](https://github.com/Shopify/polaris-react/pull/3610))
- Removed extra bottom border on the `DataTable` and added curved edges to footers ([#3571](https://github.com/Shopify/polaris-react/pull/3571))
- **`Button`:** `loading` no longer sets the invalid `role="alert"` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Removed `tabIndex=-1` from `Popover` when `preventAutoFocus` is true ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Fixed `Modal` header border color ([#3616](https://github.com/Shopify/polaris-react/pull/3616))
- Fixed `TopBar` search clear button alignment on iOS ([#3618](https://github.com/Shopify/polaris-react/pull/3618))
- Fixed HSB brightness conversion by increasing precision from 2 decimals to 4

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
