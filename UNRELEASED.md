# Unreleased changes

### Breaking changes

### Enhancements

- Added `hideTags` prop to `Filters` ([#2573](https://github.com/Shopify/polaris-react/pull/2573))
- Added `searchResultsOverlayVisible` prop to `TopBar` which adds a translucent background to the search dismissal overlay when results are displayed ([#2440](https://github.com/Shopify/polaris-react/pull/2440))
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
- Migrated `Dropzone` to a functional component and reduce complexity ([#2360](https://github.com/Shopify/polaris-react/pull/2360))
- Added `fluidContent` prop to `Popover` ([#2494](https://github.com/Shopify/polaris-react/pull/2494))
- Add `external` prop to `ResourceList` [#2408](https://github.com/Shopify/polaris-react/pull/2408)
- Add `onMouseEnter` and `onTouchStart` props to `Button` ([#2409](https://github.com/Shopify/polaris-react/pull/2409))
- Added a split variant to `Button` ([#2329](https://github.com/Shopify/polaris-react/pull/2329))

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Converted `/tests/build.test.js` to TypeScript ([#2617](https://github.com/Shopify/polaris-react/pull/2617))
- Use `export *` to rexport component content in component indexs and subcomponent listings ([#2625](https://github.com/Shopify/polaris-react/pull/2625))

### Deprecations
