# Unreleased changes

### Breaking changes

### Enhancements

- Added `external` prop to `ResourceList` ([#2408](https://github.com/Shopify/polaris-react/pull/2408))
- Added `onMouseEnter` and `onTouchStart` props to `Button` ([#2409](https://github.com/Shopify/polaris-react/pull/2409))
- Added `ariaHaspopup` prop to `Popover` ([#2248](https://github.com/Shopify/polaris-react/pull/2248))
- Fixed an accessibility issue where the `Form` implicit submit was still accessible via keyboard ([#2447](https://github.com/Shopify/polaris-react/pull/2447))
- Moved `Button` styles from the `Buttongroup` CSS file to the `Button` CSS file ([#2441](https://github.com/Shopify/polaris-react/pull/2441))
- Added `footerActionAlignment` prop to control `<Card>` footer action alignment, defaults to `'right'`
- Improved contrast of `MessageIndicator` with a border ([#2428](https://github.com/Shopify/polaris-react/pull/2428))
- Removed the need for z-indexes in `Icon` ([#2207](https://github.com/Shopify/polaris-react/pull/2207))
- Added `features` prop to `AppProvider` ([#2204](https://github.com/Shopify/polaris-react/pull/2204))
- Added support for using `EmptyState` in a content context ([#1570](https://github.com/Shopify/polaris-react/pull/1570))
- `Page` no longer renders navigation or actions in print mode ([#2469](https://github.com/Shopify/polaris-react/pull/2469))
- Added an `emptyState` prop to `ResourceList` ([#2160](https://github.com/Shopify/polaris-react/pull/2160))
- Migrated `Dropzone` to a functional component and reduce complexity ([#2360](https://github.com/Shopify/polaris-react/pull/2360))

### Bug fixes

- Prevented scrolling to `Popover` content in development ([#2403](https://github.com/Shopify/polaris-react/pull/2403))
- Fixed an issue which caused HSL colors to not display in Edge ([#2418](https://github.com/Shopify/polaris-react/pull/2418))
- Fixed an issue where the dropzone component jumped from an extra-large layout to a layout based on the width of its container ([#2412](https://github.com/Shopify/polaris-react/pull/2412))
- Fixed an issue which caused HSL colors to not display in Edge ([#2418](https://github.com/Shopify/polaris-react/pull/2418))
- Changed Button's `disclosure` prop to be `boolean | "up" | "down"`, allowing greater control over the direction the disclosure caret faces ([#2431](https://github.com/Shopify/polaris-react/pull/2431))
- Fixed a race condition in DatePicker ([#2373](https://github.com/Shopify/polaris-react/pull/2373))
- Added the top bar height to the `Topbar` in `Frame` to ensure the `Sticky` components get the correct top position ([#2415](https://github.com/Shopify/polaris-react/pull/2415))
- Fixed `merge` mutating its arguments ([#2317](https://github.com/Shopify/polaris-react/pull/2317))
- Updated `Card` footer actions to be right aligned by default again ([#2407](https://github.com/Shopify/polaris-react/pull/2407))
- Fixed the `EmptyState` styles conditional on the `imageContained` prop not being applied ([#2477](https://github.com/Shopify/polaris-react/pull/2477))
- Fixed `TrapFocus` to keep focus within the container ([#2397](https://github.com/Shopify/polaris-react/pull/2397))

### Documentation

- Added a details page and kitchen sink example to Storybook ([#2402](https://github.com/Shopify/polaris-react/pull/2402))
- Combined the interface used by `Page` so the types can be parsed ([#2358](https://github.com/Shopify/polaris-react/pull/2358))
- Updated the `PageActions` example ([#2471](https://github.com/Shopify/polaris-react/pull/2471))
- Fixed spacing of the `Filters` data table example ([#2477](https://github.com/Shopify/polaris-react/pull/2477))
- Fixed duplicate and unclear prop descriptions of `EmptyState` ([#2477](https://github.com/Shopify/polaris-react/pull/2477))

### Development workflow

### Dependency upgrades

- Upgraded to `@shopify/react-testing`v1.8.0` ([#2465](https://github.com/Shopify/polaris-react/pull/2465))
- Upgraded to TypeScript `v3.7.2` ([#2237](https://github.com/Shopify/polaris-react/pull/2237))
- Upgraded to Prettier to `v1.19.1` ([#2443](https://github.com/Shopify/polaris-react/pull/2443))

### Code quality

- Changed `TextField` to use a custom hook ([#2464](https://github.com/Shopify/polaris-react/pull/2464))
- Changed `aria-labelledby` to always exist on `TextField` ([#2401](https://github.com/Shopify/polaris-react/pull/2401))
- Converted `ButtonGroup > Item` into a functional component ([#2441](https://github.com/Shopify/polaris-react/pull/2441))
- Refactored BulkActions to make use of `ButtonGroup` ([#2441](https://github.com/Shopify/polaris-react/pull/2441))

### Deprecations
