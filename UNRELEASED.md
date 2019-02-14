# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### New components

- `SkeletonThumbnail` for representing thumbnails in loading state

### Enhancements

- Updates `TopBar.UserMenu` interaction states styling ([#1006](https://github.com/Shopify/polaris-react/pull/1006))
- Added `download` prop to `Button` and `UnstyledLink` components that enables setting the download attribute ([#1027](https://github.com/Shopify/polaris-react/pull/1027))
- Extract months and week names into translation files ([#1005](https://github.com/Shopify/polaris-react/pull/1005))

### Bug fixes

- Fixed the top border of `DataTable` overlapping its container's border ([#975](https://github.com/Shopify/polaris-react/pull/975))
- Fixed the `DataTable` sort direction not reversing on second sort of the initially sorted column ([#918](https://github.com/Shopify/polaris-react/pull/918)) (thanks [@tabrez96](https://github.com/tabrez96) for the [issue report](https://github.com/Shopify/polaris-react/issues/873))
- Changed the offset from 5px to 4px in `Tooltip` between activator and message to be consistent with `Popover` ([#1019](https://github.com/Shopify/polaris-react/pull/1019))
- Fixed `Card` header not showing when `title` empty or not set ([#1031](https://github.com/Shopify/polaris-react/pull/1032))

### Documentation

- Added all props example to `Card` in the [style guide](https://polaris.shopify.com) ([#939](https://github.com/Shopify/polaris-react/pull/939))

### Development workflow

- Added a test that builds polaris for web and polaris-styleguide. This test takes ~20 minutes to run so it's only configured to run for master ([931](https://github.com/Shopify/polaris-react/pull/931))

### Dependency upgrades

### Code quality

### Deprecations
