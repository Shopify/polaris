# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Add an inset box-shadow to `ColorPicker` to make it easier to see the draggers ([#4948](https://github.com/Shopify/polaris-react/pull/4948))
- Tightened up the Navigation component UI density. ([#4874](https://github.com/Shopify/polaris-react/pull/4874))
- Updated mobile behaviour of Navigation to only show one sub-section at a time ([#4902](https://github.com/Shopify/polaris-react/pull/4902))
- Remove the info icon and external link guidance from FooterHelp ([#4982](https://github.com/Shopify/polaris-react/pull/4982))
- Normalise spacing around the `Header` within the `Page` ([#4911](https://github.com/Shopify/polaris-react/pull/4911))

### Bug fixes

- Fixed `segmented` `ButtonGroup` misaligning icon only buttons when grouped with text only buttons ([#4079](https://github.com/Shopify/polaris-react/issues/4079))
- Added missing styles for `destructive` `Page` `secondaryActions` ([#4647](https://github.com/Shopify/polaris-react/pull/4647))
- Removed `min-height` from `Page` `additionalNavigation` ([#4952](https://github.com/Shopify/polaris-react/pull/4952))
- Fixed overly dark `bottom-border` on `DataTable` header cell and total cell ([#4975](https://github.com/Shopify/polaris-react/pull/4975))
- Removed `min-height` on `Autocomplete` `action` ([#4977](https://github.com/Shopify/polaris-react/pull/4977))
- Fixed `focus-ring` on `Banner` `secondaryAction` ([#4997](https://github.com/Shopify/polaris-react/pull/4997))
- Fixed a bug where remove button could shrink in the `Tag` component ([#4816](https://github.com/Shopify/polaris-react/issues/4816))
- Fixed incorrect `Popover` position in `Combobox` when an element is conditionally rendered before the `Combobox` ([#4825](https://github.com/Shopify/polaris-react/pull/4825))
- Reverted the deprecation of the "attention" `status` in `Badge` ([#4840](https://github.com/Shopify/polaris-react/pull/4840))
- Fixed an issue where the `MutationObserver` of the `PositionedOverlay` was calling setState on an unmounted component ([#4869](https://github.com/Shopify/polaris-react/pull/4869));
- Fixed a color contrast issue in `FileUpload` ([#4875](https://github.com/Shopify/polaris-react/pull/4875))
- Fixed a bug where a checkbox showed on an `Autocomplete` action when `allowMultiple` is true ([#4886](https://github.com/Shopify/polaris-react/pull/4886))
- Fixed a bug where the `Listbox.Action` was not treated like an action when used outside `Autocomplete` ([#4893](https://github.com/Shopify/polaris-react/pull/4893))
- Fixed a bug where the `Checkbox` in a `Combobox` with `allowMultiple` would steal focus and close the `Popover` when clicked ([#4895](https://github.com/Shopify/polaris-react/pull/4895))
- Fixed an issue where `TextField` was the wrong height on initial render ([#4903](https://github.com/Shopify/polaris-react/pull/4903))

### Documentation

### Development workflow

- Improve error logging in the event of sass errors ([#4954](https://github.com/Shopify/polaris-react/pull/4954))

### Dependency upgrades

### Code quality

### Deprecations
