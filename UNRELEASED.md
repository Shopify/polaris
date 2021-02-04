# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Added `focus-visible` polyfill and default styles ([#3695](https://github.com/Shopify/polaris-react/pull/3695))

### Bug fixes

- Fixed virtual cursor leaving dialog in `Modal`, `Navigation` and `Sheet` ([#3931](https://github.com/Shopify/polaris-react/pull/3931))
- Simplified output of `Badge`'s css ([#3950](https://github.com/Shopify/polaris-react/pull/3950))
- Fixed click propagation that was preventing the `Tooltip` to open when used as suffix on a `TextField` ([#3956](https://github.com/Shopify/polaris-react/issues/3956))
- Fixed layout `Tabs` layout issue on browser resize ([#3976](https://github.com/Shopify/polaris-react/issues/3976)) 

### Documentation

- Added an example for the `onRemove` prop to `Tag` and clarified that no remove button is rendered when `onClick` is set ([#2987](https://github.com/Shopify/polaris-react/pull/2987))

### Development workflow

- Convert `List`, `Tabs.List`, `Connected.Item` and `Filter.ConnectedFiltterControl.Item` to be functional components ([#3961](https://github.com/Shopify/polaris-react/pull/3961))

### Dependency upgrades

### Code quality

### Deprecations
