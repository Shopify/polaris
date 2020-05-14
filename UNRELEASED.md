# Unreleased changes

### Breaking changes

### New components

### Enhancements

- Truncated long sort options in `ResourceList` ([#2957](https://github.com/Shopify/polaris-react/pull/2957)
- Updated type restrictions for `Pagination` to allow its `label` prop to accept `React.ReactNode` instead of `string` ([#2972](https://github.com/Shopify/polaris-react/pull/2972))

### Bug fixes

- Added an outline on `Banner` for Windows high contrast mode ([#2878](https://github.com/Shopify/polaris-react/pull/2878))
- Fixed Autocomplete / ComboBox focus ([#1089](https://github.com/Shopify/polaris-react/issues/1089))
- Fixed typing for EmptyState action ([#2977](https://github.com/Shopify/polaris-react/pull/2977))
- Fixed incorrect `icon` color of `Button` when `destructive` and `plain`   ([#2958](https://github.com/Shopify/polaris-react/issues/2958))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Converted `ComboBox` to a functional component ([#2918](https://github.com/Shopify/polaris-react/pull/2918))

### Deprecations

- Deprecated `styles/foundation.scss` and `styles/shared.scss` as entry points to the Polaris Sass public API. They have been replaced with a single file `styles/_public-api.scss`. By having a single entry point we make it a little easier for consuming applications to use our public API - you only need to import one file instead of two. Any references to these two files should be replaced with a reference to `_public-api.scss` which lives in the same folder. Consuming applications using sewing-kit should replace references to `esnext/styles/foundation.scss` and `esnext/styles/shared.scss` with a single reference to `esnext/styles/_public-api_.scss`. Note the API itself has not changed - only the mechanism by which you access it. ([#2974](https://github.com/Shopify/polaris-react/pull/2974))
