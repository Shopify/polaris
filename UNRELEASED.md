# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### New components

- `SkeletonThumbnail` for representing thumbnails in loading state

### Enhancements

- Updates `TopBar.UserMenu` interaction states styling ([#1006](https://github.com/Shopify/polaris-react/pull/1006))
- Added `download` prop to `Button` and `UnstyledLink` components that enables setting the download attribute ([#1027](https://github.com/Shopify/polaris-react/pull/1027))
- Added support for internationalization of month and week names to `DatePicker` ([#1005](https://github.com/Shopify/polaris-react/pull/1005))
- Added `untrusted` prop to `Icon` to render SVG strings in an img tag ([#926](https://github.com/Shopify/polaris-react/pull/926))

### Bug fixes

- Fixed `type="number"` `TextField` to prevent conditions where press-and-hold could increment or decrement infinitely ([#1029](https://github.com/Shopify/polaris-react/pull/1029))
- Fixed the top border of `DataTable` overlapping its container’s border ([#975](https://github.com/Shopify/polaris-react/pull/975))
- Fixed the `DataTable` sort direction not reversing on second sort of the initially sorted column ([#918](https://github.com/Shopify/polaris-react/pull/918)) (thanks [@tabrez96](https://github.com/tabrez96) for the [issue report](https://github.com/Shopify/polaris-react/issues/873))
- Changed the offset from 5px to 4px in `Tooltip` between activator and message to be consistent with `Popover` ([#1019](https://github.com/Shopify/polaris-react/pull/1019))
- Fixed `Card` header not showing when `title` empty or not set ([#1031](https://github.com/Shopify/polaris-react/pull/1032))
- Fixed an issue on Chrome when you use a `TextField` inside `Collapsible` which is inside a scrollable element, the text disappeared if you focused a fully hidden `TextField` ([#1047](https://github.com/Shopify/polaris-react/pull/1047))

### Documentation

- Added accessibility documentation for the button and link components ([#924](https://github.com/Shopify/polaris-react/pull/924))
- Added accessibility recommendations for the text field and autocomplete components ([#968](https://github.com/Shopify/polaris-react/pull/968))

### Development workflow

- Added a test that builds Polaris for web and polaris-styleguide. This test takes ~20 minutes to run so it’s only configured to run for master ([931](https://github.com/Shopify/polaris-react/pull/931))
- Enabled `no-vague-titles eslint` rule ([#1051](https://github.com/Shopify/polaris-react/pull/1051))

### Dependency upgrades

### Code quality

### Deprecations
