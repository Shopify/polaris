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
- Made `Pip` a sub-component of `Badge` and exposed it to outside ([#5520](https://github.com/Shopify/polaris/pull/5520))
- Replaced hardcoded `padding` or `margin` values with spacing tokens ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Added `border-width-4` and `border-width-5` tokens and replaced hardcoded values ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Replaced any hardcoded `outline-width` with `border-width` ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Added the ability to disable specific dates in the `DatePicker`, to go along with date ranges ([#5356](https://github.com/Shopify/polaris/pull/5356))

- Added breakpoint CSS custom properties and SCSS media conditions ([#5558](https://github.com/Shopify/polaris/pull/5558))
- Added breakpoint CSS custom properties and SCSS media conditions ([#5558](https://github.com/Shopify/polaris/pull/5558))
- Replaced `768px` breakpoint mixins and variables with custom media conditions ([#5629](https://github.com/Shopify/polaris/pull/5629))
- Added `customListId` prop to `Listbox` ([5627](https://github.com/Shopify/polaris/pull/5627))
- Pass `domId` as an argument to `onActiveOptionChange` prop on `Listbox` ([5627](https://github.com/Shopify/polaris/pull/5627))
- Adding min-height to `Popover.Pane` when the `Popover` contains a `height` prop ([#5685](https://github.com/Shopify/polaris/pull/5685))
- Adjusted a hardcoded `padding` value for `FileUpload` and replaced it with a spacing token ([#5675](https://github.com/Shopify/polaris/pull/5675))
- Added `disable` prop to the action groups title of the Page header ([#5702](https://github.com/Shopify/polaris/pull/5702))
- Added `onClick` prop to the action groups title of the Page header ([#5751](https://github.com/Shopify/polaris/pull/5751))

### Bug fixes

- Used prop-provided `selectable` value in `IndexTable` ([#5661](https://github.com/Shopify/polaris/pull/5661))
- Fixed passing inline styles to the root element of the `CustomProperties` component ([#5661](https://github.com/Shopify/polaris/pull/5661))
- Replaced incorrect usage of `aria-expanded` on `Collapsible` with `aria-hidden` ([#5661](https://github.com/Shopify/polaris/pull/5661))
- Removed usage of deprecated and removed in v18 React types ([#5704](https://github.com/Shopify/polaris/pull/5704))
- Fixed `plain-button-backdrop` background color on colored backgrounds ([#5687](https://github.com/Shopify/polaris/pull/5687))

### Documentation

- Added wrapper with height on `Combobox` example for autocomplete with loading ([#5624](https://github.com/Shopify/polaris/pull/5624))

### Development workflow

### Dependency upgrades

- Removed `lodash` ([#5544](https://github.com/Shopify/polaris/pull/5544))
- Uses more permissive dependency for `@types/react` and `@types/react-dom` ([#5575](https://github.com/Shopify/polaris/pull/5575))

### Code quality

- Replaced `skeleton-content` and `thumbnail-size` mixins with css values ([#5630](https://github.com/Shopify/polaris/pull/5630))

### Deprecations
