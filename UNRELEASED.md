# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Added showTotalsFooter prop to `DataTable` for control over placement of Totals row ([#2200](https://github.com/Shopify/polaris-react/pull/2200))
- Removed the need for z-indexes in `Icon` ([#2207](https://github.com/Shopify/polaris-react/pull/2207))
- Added `hasFocusableParent` to `Spinner` ([#2176](https://github.com/Shopify/polaris-react/pull/2176))

### Bug fixes

- Fixed tabs that don't wrap correctly on small screens in pre-iOS 13 Safari ([#2232](https://github.com/Shopify/polaris-react/pull/2232))
- Fixed `BulkActions` checkbox losing on selection focus ([#2138](https://github.com/Shopify/polaris-react/pull/2138))
- Moved rendering of the portal component’s node within the node created by the theme provider component to enable theming through CSS Custom Properties ([#2224](https://github.com/Shopify/polaris-react/pull/2224))
- Fixed bug which caused the `Popover` overlay to remain in the DOM if it was updated during exiting ([#2246](https://github.com/Shopify/polaris-react/pull/2246))

### Documentation

- Added accessibility documentation for the date picker component ([#2242](https://github.com/Shopify/polaris-react/pull/2242))
- Added accessibility documentation for the empty state component ([#2244](https://github.com/Shopify/polaris-react/pull/2244))

### Development workflow

### Dependency upgrades

### Code quality

- Improved code quality for the theme provider component ([#2225](https://github.com/Shopify/polaris-react/pull/2225)):

  - updated type for `theme` prop to `ThemeConfig` to distinguish from the type `Theme` which is shared over context. A `Theme` contains only the logo properties, while `ThemeConfig` can contain a `colors` property.
  - converted `ThemeProvider` to use hooks
  - created symmetry in context between app provider and test provider
  - added better tests for default topBar colors
  - fixed an issue where `colorToHsla` returned HSLA strings instead of HSLA objects when given HSL or HSLA strings
  - fixed an issue with `colorToHsla` where RGB colors with no saturation could result in a divide by zero error
  - fixed an issue where `colorToHsla` inconsistently returned an alpha value
  - fixed an issue where `lightenColor` and `darkenColor` would lighten or darken absolute lightness vales (0, 100)

### Deprecations

### Development workflow
