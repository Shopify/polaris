# Unreleased changes

### Breaking changes

### New components

### Enhancements

- Removed padding from the details container in `EmptyState` to account for new illustration size ([#3069](https://github.com/Shopify/polaris-react/pull/3069))
- Added `blueDark` to the list of possible `color` values for an `Icon` with a backdrop ([#3076](https://github.com/Shopify/polaris-react/pull/3076))
- Improved responsive layout for secondary actions in `Banner` ([#3093](https://github.com/Shopify/polaris-react/pull/3093))

### Bug fixes

- Added `flex: 1 1 auto` to `Banner` `.ContentWrapper` CSS selector ([#3062](https://github.com/Shopify/polaris-react/pull/3062))
- Fixed mis-alignment on `Page` action rollup ([#3064](https://github.com/Shopify/polaris-react/pull/3064))
- Ensured Sass mixins can compile in Dart Sass ([#3064](https://github.com/Shopify/polaris-react/pull/3063))
- Added a border to `TextField` when focus is lost after autofill is implemented([#3075](https://github.com/Shopify/polaris-react/pull/3075))
- Fixed alignment of `ResourceItem` when there is no media ([#3080](https://github.com/Shopify/polaris-react/pull/3080))
- Fixed stacking order of `CloseButton` on `Modal` without a title ([#3077](https://github.com/Shopify/polaris-react/pull/3077))

### Documentation

### Development workflow

- Updated sewing-kit to v0.132.2 and storybook to v5.3.19 ((#3072)[https://github.com/Shopify/polaris-react/pull/3072])

### Dependency upgrades

### Code quality

- Migrated tests using document.activeElement to use react-testing ([#3070](https://github.com/Shopify/polaris-react/pull/3070))

### Deprecations
