# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Added `hideOnPrint` prop to `Card` and `CardSection` ([#4071](https://github.com/Shopify/polaris-react/pull/4071))
- `DropZone` now has plural sentences when `allowMultiple` is true [#4037](https://github.com/Shopify/polaris-react/pull/4037)

### Bug fixes

- Hide `IndexTable` header after scrolling past table body ([#4063](https://github.com/Shopify/polaris-react/issues/4063))
- Update `IndexTable` to select row when clicked ([#4062](https://github.com/Shopify/polaris-react/issues/4062))
- Fixed `Filters` focus state when tabbing into the component from a popover ([#4073](https://github.com/Shopify/polaris-react/issues/4073))
- Removed the `isMounted` check from `Portal` to only rely on the useEffect for calling `onPortalCreated` ([#4066](https://github.com/Shopify/polaris-react/pull/4066))
- Removed transition from `BulkActions` to eliminate flicker ([#4080](https://github.com/Shopify/polaris-react/pulls/4080))
- update error background color in `Select` ([#4089](https://github.com/Shopify/polaris-react/pull/4089))
- Fixed `Trapfocus` issue that was preventing tabbing with react forms ([#4100](https://github.com/Shopify/polaris-react/pull/4100))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
