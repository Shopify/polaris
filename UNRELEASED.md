# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Updated `DatePicker` component to use semantic HTML table structure ([#3303](https://github.com/Shopify/polaris-react/pull/3303))

### Bug fixes
- Added `ariaExpanded` prop to `TextField` ([#3589](https://github.com/Shopify/polaris-react/pull/3589))
- Updated `MediaCard` to accept ReactNode as title and make `primaryAction` optional ([#3552](https://github.com/Shopify/polaris-react/pull/3552))
- **`UnstyledButton`:** Added `loading` prop to apply `role` and `aria-busy` attributes ([#3494](https://github.com/Shopify/polaris-react/pull/3494))
- Optimized `ThemeProvider` to only output its custom properties in nested `ThemeProvider`s when they differ from the parent context ([#3550](https://github.com/Shopify/polaris-react/pull/3550))
- Generalized Tooltip's `content` prop's type to not only accept string, but any `React.Node`. ([#3559](https://github.com/Shopify/polaris-react/pull/3559))
- Updated `TopBar` to show the logo when there is no navigation or search fields ([#3523](https://github.com/Shopify/polaris-react/pull/3523))
- Updated critical `Banner` icon to be a diamond ([#3567](https://github.com/Shopify/polaris-react/pull/3567))

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
