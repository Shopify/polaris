# Unreleased changes

### Breaking changes

- Remove unstable telemetry API for icons ([#]())

### Enhancements

- Added `hideTags` prop to `Filters` ([#2573](https://github.com/Shopify/polaris-react/pull/2573))

### Bug fixes

- Fixed a bug where `Navigation` calls `onNavigationDismiss` on large screens when focused and the escape key is pressed ([#2607](https://github.com/Shopify/polaris-react/pull/2607))
- Fixed issue with `Filters` component displaying an undesired margin top and bottom on the button element on Safari ([#2292](https://github.com/Shopify/polaris-react/pull/2292))
- Doesn't render `MenuActions` if no actions are passed to an `actionGroups` item inside `Page` ([#2266](https://github.com/Shopify/polaris-react/pull/2266))
- Fixed `PositionedOverlay` incorrectly calculating `Topbar.UserMenu` `Popover` width ([#1692](https://github.com/Shopify/polaris-react/pull/1692))
- Fixed `recolor-icon` Sass mixin to properly scope `$secondary-color` to the child `svg` ([#2298](https://github.com/Shopify/polaris-react/pull/2298))
- Fixed a regression with the positioning of the `Popover` component ([#2305](https://github.com/Shopify/polaris-react/pull/2305))
- Fixed Stack Item proportion when shrinking ([#2319](https://github.com/Shopify/polaris-react/pull/2319))
- Fixed `RangeSlider` focus state style issues ([#1926](https://github.com/Shopify/polaris-react/pull/1926))
- Ensure passing `{key: undefined}` into i18n will throw a runtime error in the same way as not passing in the key at all (this was ensured through type-checking at the TypeScript level but people could force through with casting to `any`) ([#2598](https://github.com/Shopify/polaris-react/pull/2598))
- Ensure the normalizedValue within `TextField` is a string (this was already ensured through type-checking at the TypeScript level, but people could force through with casting to `any`, which caused problems) ([#2598](https://github.com/Shopify/polaris-react/pull/2598))

- Fixed an issue with the `Filters` component where the `aria-expanded` attribute was `undefined` on mount ([#2589]https://github.com/Shopify/polaris-react/pull/2589)
- Fixed `TrapFocus` from tabbing out of the container ([#2555](https://github.com/Shopify/polaris-react/pull/2555))
- Fixed `PositionedOverlay` not correctly getting its position when aligned to the right of the activator ([#2587](https://github.com/Shopify/polaris-react/pull/2587))
- Fix colour not appearing in main `ColorPicker` panel when in Windows high contrast mode ([#2399](https://github.com/Shopify/polaris-react/pull/2399))

### Documentation

- Updated `Card` with custom footer actions example to be right-aligned ([#2603](https://github.com/Shopify/polaris-react/pull/2603))
- Updated styleguide links in the docs ([#2521](https://github.com/Shopify/polaris-react/pull/2521))
- Updated `Subheading` documentation to be more consistent and accurate ([#2591](https://github.com/Shopify/polaris-react/pull/2591/))

### Development workflow

- Updated Storybook to v5.3.2 ([#2618](https://github.com/Shopify/polaris-react/pull/2618))

### Dependency upgrades

- Updated `@shopify/polaris-icons` to v3.9.0 ([#2610](https://github.com/Shopify/polaris-react/pull/2610))

### Code quality

- Converted `MenuGroup` into a functional component ([#2536](https://github.com/Shopify/polaris-react/pull/2536))
- Converted `Layout` into a functional component ([#2538](https://github.com/Shopify/polaris-react/pull/2538))
- Converted `FormLayout` into a functional component ([#2539](https://github.com/Shopify/polaris-react/pull/2539))
- Converted `Stack` into a functional component ([#2534](https://github.com/Shopify/polaris-react/pull/2534))
- Converted `BulkActionButton` into a functional component ([#2542](https://github.com/Shopify/polaris-react/pull/2542))
- Converted `Focus` into a functional component ([#2540](https://github.com/Shopify/polaris-react/pull/2540))
- Converted `Tabmeasurer` into a functional component ([#2535](https://github.com/Shopify/polaris-react/pull/2535))
- Converted `Section` into a functional component ([#2537](https://github.com/Shopify/polaris-react/pull/2537))
- Converted `Tooltip` into a functional component ([#2543](https://github.com/Shopify/polaris-react/pull/2543))
- Converted `Option` into a functional component ([#2541](https://github.com/Shopify/polaris-react/pull/2541))
- Avoided unneeded work in `TextField` if character count is not rendered ([#2598](https://github.com/Shopify/polaris-react/pull/2598))

### Deprecations
