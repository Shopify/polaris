# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

- Fixes keyboard interactions for the `Tab` component ([#3650](https://github.com/Shopify/polaris-react/pull/3650))

### Breaking changes

### Enhancements

- Allow `Thumbnail` `source` property to support `icons` ([#3328](https://github.com/Shopify/polaris-react/pull/3328))
- **`Button`:** New `role` prop for `<button />` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Added `preventFocusOnClose` to `Popover` ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Added color fallback values to `focus-ring` mixin ([#3626](https://github.com/Shopify/polaris-react/pull/3626))

### Bug fixes

- Added escape keybind to `Tooltip` ([#3627](https://github.com/Shopify/polaris-react/pull/3627))
- Removed extra bottom border on the `DataTable` and added curved edges to footers ([#3571](https://github.com/Shopify/polaris-react/pull/3571))
- **`Button`:** `loading` no longer sets the invalid `role="alert"` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Fixed `Filters` not announcing applied filters ([#3632](https://github.com/Shopify/polaris-react/pull/3632))
- Removed `tabIndex=-1` from `Popover` when `preventAutoFocus` is true ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Fixed `Modal` header border color ([#3616](https://github.com/Shopify/polaris-react/pull/3616))
- Added focus styles to `CloseButton` in `Modal` ([#3628](https://github.com/Shopify/polaris-react/pull/3628))
- Fixed `Banner` `secondaryAction` only rendering if `action` is set ([#2949](https://github.com/Shopify/polaris-react/pull/2949))

### Documentation

- Fixed `preventAutoFocus` prop description for `Popover` ([#3595](https://github.com/Shopify/polaris-react/pull/3595))

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
