# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### New components

### Enhancements

- Set `Collapsible` to use `overflow: visible;` once fully open ([#951](https://github.com/Shopify/polaris-react/pull/951))
- Removes `TopBar` logo background ([#957](https://github.com/Shopify/polaris-react/pull/957))

- Fixed vertical misalignment in `Banner.Header`([#870](https://github.com/Shopify/polaris-react/pull/870))
- Removed a duplicate `activatorWrapper` in `Popover` when destructuring props ([#916](https://github.com/Shopify/polaris-react/pull/916))
- Fixed `Banner` secondaryAction content wrapping in Firefox ([#719](https://github.com/Shopify/polaris-react/pull/719))
- Added `onKeyPress`, `onKeyDown`, and `onKeyUp` to `Button` ([#860](https://github.com/Shopify/polaris-react/pull/860))
- Added `monochrome` prop to `Button` and `Link` component ([#821](https://github.com/Shopify/polaris-react/pull/821))
- Updated `Frame` layout and made `TopBar.UserMenu` visible on mobile ([#852](https://github.com/Shopify/polaris-react/pull/852))
- Added a `forceRender` prop to `Page` to not delegate to the app bridge TitleBar action ([#695](https://github.com/Shopify/polaris-react/pull/695))
- Changed `Tabs` example to contain children so the `Panel` renders for accessibility ([#893](https://github.com/Shopify/polaris-react/pull/893))
- Fixed timezone not being accounted for in `ResourceList` date filter control ([#710](https://github.com/Shopify/polaris-react/pull/710))
- Removed unnecessary tooltip text in the `TopBar` component ([#859](https://github.com/Shopify/polaris-react/pull/859))
- Update `Card.Section` to accept `React.ReactNode` as `title` ([#781](https://github.com/Shopify/polaris-react/pull/781))

### Bug fixes

### Documentation

- Added accessibility documentation for the account connection and setting toggle components ([#970](https://github.com/Shopify/polaris-react/pull/970))
- Added accessibility documentation for the avatar component ([#973](https://github.com/Shopify/polaris-react/pull/973))
- Updated docs about App Bridge usage in AppProvider ([#945](https://github.com/Shopify/polaris-react/pull/945))

### Development workflow

- Fixed links to Polaris component pages in story descriptions ([#933](https://github.com/Shopify/polaris-react/pull/933))

### Dependency upgrades

- Upgrade to `@shopify/polaris-icons` v2.0.0 ([#982](https://github.com/Shopify/polaris-react/pull/982))

### Code quality

- Now using `import styles from './foo.scss';` instead of non-standard `import * as styles from './foo.scss';` when importing scss files ([#929](https://github.com/Shopify/polaris-react/pull/929))
- Removed internal ellipsis icon as it is deprecated, and horizontalDots should be used instead ([#974](https://github.com/Shopify/polaris-react/pull/974))

### Deprecations
