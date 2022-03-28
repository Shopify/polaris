# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Added visual density updates to `Tag` component and bumped `@shopify/polaris-icons` package ([#5312](https://github.com/Shopify/polaris/pull/5312))
- Added `ReactNode` as an accepted prop type to `secondaryActions` on the `Page` component ([#5258](https://github.com/Shopify/polaris-react/pull/5258))
- Added `useCapture` and `options` props in `KeypressListener` to allow passing through those options to the underlying `addEventListener` call ([#5221](https://github.com/Shopify/polaris-react/pull/5221))
- Add option to make `Thumbnail` component transparent ([#5109](https://github.com/Shopify/polaris-react/pull/5109))
- Replaced hard coded `transition` values with tokens ([5340](https://github.com/Shopify/polaris/pull/5340/))
- Replaced hard coded `font-size` and `line-height` values with tokens ([5355](https://github.com/Shopify/polaris/pull/5355/))

### Bug fixes

- Fixed accessibility issues on focus and option create in `Combobox` and `Listbox` ([#5298](https://github.com/Shopify/polaris-react/pull/5298))
- Fixed accessibility issues and logic to set active descendant in `Listbox` ([#5297](https://github.com/Shopify/polaris-react/pull/5297))

### Documentation

### Development workflow

### Dependency upgrades

- Bumped marked from 0.7.0 to 4.0.10 ([#4898](https://github.com/Shopify/polaris/pull/4898))

### Code quality

- Replace `calc()` with space token equivalent ([#5295](https://github.com/Shopify/polaris-react/pull/5295))

### Deprecations
