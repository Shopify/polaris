# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Added `icon` prop to the `Badge` component ([#5292](https://github.com/Shopify/polaris/pull/5292))
- Improved styling for the `DataTable` component when the `increaseTableDensity` prop is set to `true` ([#5480]https://github.com/Shopify/polaris/pull/5480)
- Added support for setting a `ReactNode` on the `PageActions` `secondaryActions` prop ([#5495](https://github.com/Shopify/polaris/pull/5495))
- Added support for NodeJS v14 ([#5551](https://github.com/Shopify/polaris/pull/5551))
- Add `video` as DropZoneFileType option on the `DropZone` component ([#5349](https://github.com/Shopify/polaris/pull/5349))
- Removed whitespace from CustomProperties output ([#5570](https://github.com/Shopify/polaris/pull/5570))
- Added a `height` prop to `Combobox` and `Popover.Pane` to support setting a fixed `height` and `man-height` on the `Scrollable` ([#5571](https://github.com/Shopify/polaris/pull/5571))
- Added support for `maxHeight` prop on `Combobox` and `Popover` ([#5571](https://github.com/Shopify/polaris/pull/5571))
- Add sticky header to `DataTable` ([#5454](https://github.com/Shopify/polaris/pull/5494))
- Made `Pip` a sub-component of `Badge` and exposed it to outside ([#5520](https://github.com/Shopify/polaris/pull/5520))
- Replaced hardcoded `padding` or `margin` values with spacing tokens ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Added `border-width-4` and `border-width-5` tokens and replaced hardcoded values ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Replaced any hardcoded `outline-width` with `border-width` ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Added the ability to disable specific dates in the `DatePicker`, to go along with date ranges ([#5356](https://github.com/Shopify/polaris/pull/5356))

### Bug fixes

- Fixed focus and hover style on `Tag` for removable tag with link ([#5567](https://github.com/Shopify/polaris/pull/5567))
- Fixed border size on vertical content on `TextField` ([#5571](https://github.com/Shopify/polaris/pull/5571))
- Fixed `aria-activedescendent` being unset in `Combobox` on option select when `allowMultiple` is `true` ([#5584](https://github.com/Shopify/polaris/pull/5584))

### Documentation

- Fixed `Combobox` multi-select examples not resetting the input value and list on option select ([#5584](https://github.com/Shopify/polaris/pull/5584))

### Development workflow

### Dependency upgrades

- Removed `lodash` ([#5544](https://github.com/Shopify/polaris/pull/5544))
- Uses more permissive dependency for `@types/react` and `@types/react-dom` ([#5575](https://github.com/Shopify/polaris/pull/5575))

### Code quality

### Deprecations
