# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

- Added `disabled` prop to `Autocomplete` component.

### Bug fixes

<<<<<<< HEAD
- Added the ability to disable the `Autocomplete` by setting the `Autocomplete.TextField` disabled prop true ([#602](https://github.com/Shopify/polaris-react/pull/602))
=======
- Fixed `Navigation.Item` not calling `onClick` on small screens when `onNavigationDismiss` is undefined ([#603](https://github.com/Shopify/polaris-react/pull/603))
- Fixed `Autocomplete` empty state example Markdown not parsing correctly ([#592](https://github.com/Shopify/polaris-react/pull/592))
- Fixed `TopBar`’s `UserMenu` alignment so it is now right-aligned when `TopBar` isn't passed a `searchField` prop ([#597](https://github.com/Shopify/polaris-react/pull/597))
- Removed erroneous scss file import that rendered Polaris unable to be used in typescript projects without scss support ([#609](https://github.com/Shopify/polaris-react/pull/609))
- Fixed `Popover` inconsistent `border-radius` values ([#605](https://github.com/Shopify/polaris-react/pull/605))
- `TextStyle` "strong" variant now uses a `span` tag instead of `b` ([#606](https://github.com/Shopify/polaris-react/pull/606))
- Fixed non-blocking context errors when using `Toast` or `Loading` in an embedded app ([#613](https://github.com/Shopify/polaris-react/pull/613))
>>>>>>> parent of 9528b4a2... Stop outline when disabed

### Documentation

### Development workflow
