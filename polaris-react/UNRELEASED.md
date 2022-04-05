# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Increased token coverage by creating `@keyframes` tokens and replacing hardcoded instances ([5427](https://github.com/Shopify/polaris/pull/5427/))
- Change types for DataTable `totalsName` prop to allow for ReactNode ([#5454](https://github.com/Shopify/polaris/pull/5365/))

### Bug fixes

- Updated `Listbox` to only scroll when active option outside of view ([#5401](https://github.com/Shopify/polaris/pull/5401/))
- Added visual density updates to `Tag` component for mobile view ([#5353](https://github.com/Shopify/polaris/pull/5353))
- Added visual density updates to `Tag` component ([#5312](https://github.com/Shopify/polaris/pull/5312))
- Added `ReactNode` as an accepted prop type to `secondaryActions` on the `Page` component ([#5258](https://github.com/Shopify/polaris-react/pull/5258))
- Added `useCapture` and `options` props in `KeypressListener` to allow passing through those options to the underlying `addEventListener` call ([#5221](https://github.com/Shopify/polaris-react/pull/5221))
- Add option to make `Thumbnail` component transparent ([#5109](https://github.com/Shopify/polaris-react/pull/5109))
- Replaced hard coded `transition` values with tokens ([5340](https://github.com/Shopify/polaris/pull/5340/))
- Replaced hard coded `font-size` and `line-height` values with tokens ([5355](https://github.com/Shopify/polaris/pull/5355/))
- Replaced hard coded spacing values with tokens ([5364](https://github.com/Shopify/polaris/pull/5364/))
- Simplified usage of color tokens ([5360](https://github.com/Shopify/polaris/pull/5360/))
- Increased token coverage by replacing hard coded `border-width` values with tokens, replaced sass var with css custom property, removed unused sass vars, and updated `Banner` Secondary action styles ([5389](https://github.com/Shopify/polaris/pull/5389))
- Created `icon-attention` and `surface-attention` color tokens ([5389](https://github.com/Shopify/polaris/pull/5389))
- Increased token coverage by removing unnecessary `transitions` and `animations` with hard coded duration values ([5405](https://github.com/Shopify/polaris/pull/5405/))
- Added a `suggestion` prop on `TextField` to support inline autocomplete ([5303](https://github.com/Shopify/polaris/pull/5303))
- Added support for setting `ariaAutocomplete` to `both` on `Combobox.TextField` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Added a `willLoadMoreOptions` prop to `Combobox` that's passed to `Listbox` through context so that `onKeyToBottom` is only called if `willLoadMoreOptions` is `true` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Improved `Autocomplete` performance when options are lazy loaded by passing `willLoadMoreResults` to the `Combobox` `willLoadMoreOptions` prop when present ([5303](https://github.com/Shopify/polaris/pull/5303))
- Updated `Listbox` scroll UX to behave natively when navigating options with keyboard instead of scrolling the active option to the top of the visible list ([5303](https://github.com/Shopify/polaris/pull/5303))

### Bug fixes

- Fixed accessibility issues on focus and option create in `Combobox` and `Listbox` ([#5298](https://github.com/Shopify/polaris-react/pull/5298))
- Fixed accessibility issues and logic to set active descendant in `Listbox` ([#5297](https://github.com/Shopify/polaris-react/pull/5297))
- Fixed alignment of right-hand side of `Header` in `Page` ([#5390](https://github.com/Shopify/polaris/pull/5390))
- Fixed automatic selection of first navigable `Listbox.Option` not resetting in `Listbox` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Fixed subdued styles not applying to `Listbox.TextOption` when `disabled` ([5303](https://github.com/Shopify/polaris/pull/5303))
- Fixed active `Listbox.Option` flashing when scrolled into view ([5303](https://github.com/Shopify/polaris/pull/5303))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
