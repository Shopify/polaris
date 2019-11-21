# Unreleased changes

### Breaking changes

### Enhancements

- Added a split variant to `Button` ([#2329](https://github.com/Shopify/polaris-react/pull/2329))
- Allow DataTable headers to be React Elements ([#2635](https://github.com/Shopify/polaris-react/pull/2635))
- Added support for explicit order of items in `ActionMenu` ([2057](https://github.com/Shopify/polaris-react/pull/2057))
- Made the `DataTable` horizontal `Navigation` optional ([#2647](https://github.com/Shopify/polaris-react/pull/2647))
- Added `hideTags` prop to `Filters` ([#2573](https://github.com/Shopify/polaris-react/pull/2573))
- Added `searchResultsOverlayVisible` prop to `TopBar` which adds a translucent background to the search dismissal overlay when results are displayed ([#2440](https://github.com/Shopify/polaris-react/pull/2440))
- Replaced customer avatar images with a single gray version ([#2453](https://github.com/Shopify/polaris-react/pull/2453))
- Added `external` prop to `ResourceList` ([#2408](https://github.com/Shopify/polaris-react/pull/2408))
- Added `onMouseEnter` and `onTouchStart` props to `Button` ([#2409](https://github.com/Shopify/polaris-react/pull/2409))
- Added `ariaHaspopup` prop to `Popover` ([#2248](https://github.com/Shopify/polaris-react/pull/2248))
- Fixed an accessibility issue where the `Form` implicit submit was still accessible via keyboard ([#2447](https://github.com/Shopify/polaris-react/pull/2447))

### Bug fixes

- Fixed `ReferenceError: React is not defined` in `Button` for the `esnext` build ([#2657](https://github.com/Shopify/polaris-react/pull/2657))
- Fixed scrolling with scrollbar not working in Popover when content changes on scroll ([#2627](https://github.com/Shopify/polaris-react/pull/2627))
- Fixed side-effects from being create during `Modal`s render ([#2644](https://github.com/Shopify/polaris-react/pull/2644))
- Work around a build crash when using create-react-app due to a bug in css parsing in `postcss-custom-properties` ([#2643](https://github.com/Shopify/polaris-react/pull/2643))
- Removed the `visited` CSS styling for tabs using the `url` prop ([#2639](https://github.com/Shopify/polaris-react/pull/2639))

### Documentation

### Development workflow

- Reworked the yarn splash Github comment and added average splash zone information ([#2649](https://github.com/Shopify/polaris-react/pull/2649))
- Re-enabled the web unit tests in the consumer build test ([#2663](https://github.com/Shopify/polaris-react/pull/2663))

### Dependency upgrades

### Code quality

- Converted `/tests/build.test.js` to TypeScript ([#2617](https://github.com/Shopify/polaris-react/pull/2617))
- Use `export *` to rexport component content in component indexs and subcomponent listings ([#2625](https://github.com/Shopify/polaris-react/pull/2625))
- Use `export *` to rexport utility content ([#2636](https://github.com/Shopify/polaris-react/pull/2636))

### Deprecations
