# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### Enhancements

- Allow `Thumbnail` `source` property to support `icons` ([#3328](https://github.com/Shopify/polaris-react/pull/3328))
- **`Button`:** New `role` prop for `<button />` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Added `preventFocusOnClose` to `Popover` ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Added color fallback values to `focus-ring` mixin ([#3626](https://github.com/Shopify/polaris-react/pull/3626))
- Added `roundNumberToDecimalPlaces` to accurately round numbers to a number of decimal places (https://github.com/Shopify/polaris-react/pull/3640)

### Bug fixes

- Removed extra bottom border on the `DataTable` and added curved edges to footers ([#3571](https://github.com/Shopify/polaris-react/pull/3571))
- **`Button`:** `loading` no longer sets the invalid `role="alert"` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Removed `tabIndex=-1` from `Popover` when `preventAutoFocus` is true ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Fixed `Modal` header border color ([#3616](https://github.com/Shopify/polaris-react/pull/3616))
- Fixed `Banner` `secondaryAction` only rendering if `action` is set ([#2949](https://github.com/Shopify/polaris-react/pull/2949))
- Increased precision of hue, saturation, lightness, and alpha in HSBLA `color-transformers` (https://github.com/Shopify/polaris-react/pull/3640)

### Documentation

- Fixed `preventAutoFocus` prop description for `Popover` ([#3595](https://github.com/Shopify/polaris-react/pull/3595))

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
