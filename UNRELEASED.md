# Unreleased changes

### Breaking changes

### Enhancements

### Bug fixes

- Prevented scrolling to `Popover` content in development ([#2403](https://github.com/Shopify/polaris-react/pull/2403))
- Fixed an issue which caused HSL colors to not display in Edge ([#2418](https://github.com/Shopify/polaris-react/pull/2418))
- Fixed an issue where the dropzone component jumped from an extra-large layout to a layout based on the width of its container ([#2412](https://github.com/Shopify/polaris-react/pull/2412))
- Fixed an issue which caused HSL colors to not display in Edge ([#2418](https://github.com/Shopify/polaris-react/pull/2418))
- Changed Button's `disclosure` prop to be `boolean | "up" | "down"`, allowing greater control over the direction the disclosure caret faces ([#2431](https://github.com/Shopify/polaris-react/pull/2431))
- Added the top bar height to the `Topbar` in `Frame` to ensure the `Sticky` components get the correct top position ([#2415](https://github.com/Shopify/polaris-react/pull/2415))
- Fixed `merge` mutating its arguments ([#2317](https://github.com/Shopify/polaris-react/pull/2317))
- Updated `Card` footer actions to be right aligned by default again ([#2407](https://github.com/Shopify/polaris-react/pull/2407))
- Fixed the `EmptyState` styles conditional on the `imageContained` prop not being applied ([#2477](https://github.com/Shopify/polaris-react/pull/2477))
- Fixed `TrapFocus` to keep focus within the container when tabbing past the last element ([#2397](https://github.com/Shopify/polaris-react/pull/2397))
- Doesn't render `MenuActions` if no actions are passed to an `actionGroups` item inside `Page` ([2266](https://github.com/Shopify/polaris-react/pull/2266))
- Fixed `PositionedOverlay` incorrectly calculating `Topbar.UserMenu` `Popover` width ([#1692](https://github.com/Shopify/polaris-react/pull/1692))
- Fixed `recolor-icon` Sass mixin to properly scope `$secondary-color` to the child `svg` ([#2298](https://github.com/Shopify/polaris-react/pull/2298))
- Fixed a regression with the positioning of the `Popover` component ([#2305](https://github.com/Shopify/polaris-react/pull/2305))
- Fixed issue with `Filters` component displaying an undesired margin top and bottom
  on the button element on Safari ([2292](https://github.com/Shopify/polaris-react/pull/2292))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
