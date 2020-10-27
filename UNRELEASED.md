# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### Enhancements

- Updated `MediaCard` to accept ReactNode as title and make `primaryAction` optional ([#3552](https://github.com/Shopify/polaris-react/pull/3552))
- **`UnstyledButton`:** Added `loading` prop to apply `role` and `aria-busy` attributes ([#3494](https://github.com/Shopify/polaris-react/pull/3494))
- Optimized `ThemeProvider` to only output its custom properties in nested `ThemeProvider`s when they differ from the parent context ([#3550](https://github.com/Shopify/polaris-react/pull/3550))
- Generalized Tooltip's `content` prop's type to not only accept string, but any `React.Node`. ([#3559](https://github.com/Shopify/polaris-react/pull/3559))
- Updated `TopBar` to show the logo when there is no navigation or search fields ([#3523](https://github.com/Shopify/polaris-react/pull/3523))
- Updated critical `Banner` icon to be a diamond ([#3567](https://github.com/Shopify/polaris-react/pull/3567))

### Bug fixes

- Removed `Navigation.Item` color change when focused ([#3562](https://github.com/Shopify/polaris-react/pull/3562))

### Documentation

### Development workflow

- Updated our CI accessibility checks to use the axe runnner provided by Storybook's a11y addon. Now now errors match between CI and local runs in Storybook ([#3284](https://github.com/Shopify/polaris-react/pull/3284))
- Updated sewing-kit to 0.140.0 and TypeScript to 4.0.0 ([#3566](https://github.com/Shopify/polaris-react/pull/3566))

### Dependency upgrades

### Code quality

- **`Button`:** Reduced redundant code repeated within `UnstyledButton` ([#3494](https://github.com/Shopify/polaris-react/pull/3494))

### Deprecations
