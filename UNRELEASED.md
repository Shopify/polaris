# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### New components

### Enhancements

- Set `Collapsible` to use `overflow: visible;` once fully open ([#951](https://github.com/Shopify/polaris-react/pull/951))
- Removes `TopBar` logo background ([#957](https://github.com/Shopify/polaris-react/pull/957))
- Adopt width of `TopBar` search results to search input and add a minimum width ([#969](https://github.com/Shopify/polaris-react/pull/969))
- Update `Card.Section` to accept `React.ReactNode` as `title` ([#781](https://github.com/Shopify/polaris-react/pull/781))
- Adds `contextControl` prop to `TopBar` and `Navigation` ([#966](https://github.com/Shopify/polaris-react/pull/966))

### Bug fixes

- Fixed the `DataTable` sort direction not reversing on second sort of the initially sorted column ([#918](https://github.com/Shopify/polaris-react/pull/918)) (thanks [@tabrez96](https://github.com/tabrez96) for the [issue report](https://github.com/Shopify/polaris-react/issues/873))
- Allow `null` being passed to `value` in `TextField` ([#964](https://github.com/Shopify/polaris-react/pull/964)) (thanks [@mbaumbach](https://github.com/mbaumbach) for the [original issue](https://github.com/Shopify/polaris-react/issues/959))

### Documentation

- Added accessibility documentation for the account connection and setting toggle components ([#970](https://github.com/Shopify/polaris-react/pull/970))
- Added accessibility documentation for the avatar component ([#973](https://github.com/Shopify/polaris-react/pull/973))
- Updated docs about App Bridge usage in AppProvider ([#945](https://github.com/Shopify/polaris-react/pull/945))
- Added all props example to `DataTable` in the [style guide](https://polaris.shopify.com) ([#1003](https://github.com/Shopify/polaris-react/pull/939))

### Development workflow

- Fixed links to Polaris component pages in story descriptions ([#933](https://github.com/Shopify/polaris-react/pull/933))

### Dependency upgrades

- Upgrade to `@shopify/polaris-icons` v2.0.0 ([#982](https://github.com/Shopify/polaris-react/pull/982))

### Code quality

- Now using `import styles from './foo.scss';` instead of non-standard `import * as styles from './foo.scss';` when importing scss files ([#929](https://github.com/Shopify/polaris-react/pull/929))
- Removed internal ellipsis icon as it is deprecated, and horizontalDots should be used instead ([#974](https://github.com/Shopify/polaris-react/pull/974))

### Deprecations
