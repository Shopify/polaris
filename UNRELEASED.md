# Unreleased changes

### Breaking changes

### New components

### Enhancements

- Added spacing to `EmptyState` when within content to account for new illustration styles ([#3047](https://github.com/Shopify/polaris-react/pull/3047))
- Changed Resource List to a generic functional component ([#2843](https://github.com/Shopify/polaris-react/pull/2843))
- Made the `renderItem` function infer the type of the items prop ([#2843](https://github.com/Shopify/polaris-react/pull/2843))
- Added a `fullWidth` prop to `EmptyState` to support full width layout within a content context ([#2992](https://github.com/Shopify/polaris-react/pull/2992))
- Added an `emptyState` prop to `ResourceList` to support in context empty states in list views ([#2569](https://github.com/Shopify/polaris-react/pull/2569))
- Set `active` prop of `Popover` to true on keyDown in `ComboBox` to fix `Autocomplete` suggestions not showing when searching and selecting via keyboard ([#3028](https://github.com/Shopify/polaris-react/pull/3028))

### Bug fixes

### Documentation

### Development workflow

- Updated how global animations are referenced, in order to publish a single entrypoint for the public Sass API (`styles/_public-api.scss`), instead of two (`styles/_public-api.scss` for “vanilla” SCSS and `styles/esnext/_public-api.scss` for CSS Modules) ([#3032](https://github.com/Shopify/polaris-react/pull/3032))

### Dependency upgrades

### Code quality

- Deleted an unused prop and its types in `Navigation` ([#3043](https://github.com/Shopify/polaris-react/pull/3043))

### Deprecations
