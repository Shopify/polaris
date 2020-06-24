# Unreleased changes

### Breaking changes

### New components

### Enhancements

- Removed padding from the details container in `EmptyState` to account for new illustration size ([#3069](https://github.com/Shopify/polaris-react/pull/3069))

### Bug fixes

- Fixed right padding styling issue with the `Tag` component and remove right padding on a removable `Tag` ([#2860](https://github.com/Shopify/polaris-react/pull/2860)).
- Fixed secondary navigation spacing when no icon is present ([#2874](https://github.com/Shopify/polaris-react/pull/2874)).
- Added functionality that hides the `ResourceList` when `showHeader` is set to `false` explicitly ([#2885](https://github.com/Shopify/polaris-react/pull/2885)).
- Fixed `Tag` submitting forms when `onClick` is set ([#2895](https://github.com/Shopify/polaris-react/pull/2895))
- Fixed `DescriptionList` content overflowing when `term` or `description` have long unbroken words ([#2880](https://github.com/Shopify/polaris-react/pull/2880))
- Added `flex: 1 1 auto` to `Banner` `.ContentWrapper` CSS selector ([#3062](https://github.com/Shopify/polaris-react/pull/3062))
- Fixed mis-alignment on `Page` action rollup ([#3064](https://github.com/Shopify/polaris-react/pull/3064))
- Ensured Sass mixins can compile in Dart Sass ([#3064](https://github.com/Shopify/polaris-react/pull/3063))

### Documentation

### Development workflow

- Updated sewing-kit to v0.132.2 and storybook to v5.3.19 ((#3072)[https://github.com/Shopify/polaris-react/pull/3072])

### Dependency upgrades

### Code quality

- Migrated tests using document.activeElement to use react-testing ([#3070](https://github.com/Shopify/polaris-react/pull/3070))

### Deprecations
