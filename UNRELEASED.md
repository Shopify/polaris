# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

### Bug fixes

- Fixed `DataTable` fixed column in production enviroments by using a data-attribute target instead of class based targeting ([#615](https://github.com/Shopify/polaris-react/pull/615))
- Fixed `Navigation.Item` not calling `onClick` on small screens when `onNavigationDismiss` is undefined ([#603](https://github.com/Shopify/polaris-react/pull/603))
- Fixed `Autocomplete` empty state example Markdown not parsing correctly ([#592](https://github.com/Shopify/polaris-react/pull/592))
- Fixed `TopBar`’s `UserMenu` alignment so it is now right-aligned when `TopBar` isn't passed a `searchField` prop ([#597](https://github.com/Shopify/polaris-react/pull/597))
- Removed erroneous scss file import that rendered Polaris unable to be used in typescript projects without scss support ([#609](https://github.com/Shopify/polaris-react/pull/609))
- Fixed `Popover` inconsistent `border-radius` values ([#605](https://github.com/Shopify/polaris-react/pull/605))
- `TextStyle` "strong" variant now uses a `span` tag instead of `b` ([#606](https://github.com/Shopify/polaris-react/pull/606))
- Fixed non-blocking context errors when using `Toast` or `Loading` in an embedded app ([#613](https://github.com/Shopify/polaris-react/pull/613))

### Documentation

### Development workflow
