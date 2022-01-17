# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Keyboard arrow navigation support added in `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Menu role attribute value support added in `ActionList/Section` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Updated the styling of `DropZone.FileUpload` ([#4813](https://github.com/Shopify/polaris-react/pull/4813))
- Added a minimum height to `Page` component `Header` ([#4770](https://github.com/Shopify/polaris-react/pull/4779))
- Added a `verticalAlign` prop to `OptionList`. ([#4800](https://github.com/Shopify/polaris-react/pull/4800))
- Added suppport for a `url` prop in the `Tag` component ([#4837](https://github.com/Shopify/polaris-react/pull/4837))
- Added support for `children` to take elements other than strings in the `Tag` component ([#4837](https://github.com/Shopify/polaris-react/pull/4837))
- Bumped the `@shopify/storybook-a11y-test` package to the latest version `0.3.0` ([#4870](https://github.com/Shopify/polaris-react/pull/4870))
- Added a `warning` variation to `TextStyle` ([#4880](https://github.com/Shopify/polaris-react/pull/4880))
- Added a class to hide the clear button in the `TextField` component instead of removing it from the DOM ([#4897](https://github.com/Shopify/polaris-react/pull/4897))

### Bug fixes

- Fixed a bug where remove button could shrink in the `Tag` component ([#4816](https://github.com/Shopify/polaris-react/issues/4816))
- Fixed incorrect `Popover` position in `Combobox` when an element is conditionally rendered before the `Combobox` ([#4825](https://github.com/Shopify/polaris-react/pull/4825))
- Reverted the deprecation of the "attention" `status` in `Badge` ([#4840](https://github.com/Shopify/polaris-react/pull/4840))
- Fixed an issue where the `MutationObserver` of the `PositionedOverlay` was calling setState on an unmounted component ([#4869](https://github.com/Shopify/polaris-react/pull/4869));
- Fixed a color contrast issue in `FileUpload` ([#4875](https://github.com/Shopify/polaris-react/pull/4875))
- Fixed a bug where a checkbox showed on an `Autocomplete` action when `allowMultiple` is true ([#4886](https://github.com/Shopify/polaris-react/pull/4886))
- Fixed a bug where the `Listbox.Action` was not treated like an action when used outside `Autocomplete` ([#4893](https://github.com/Shopify/polaris-react/pull/4893))
- Fixed a bug where the `Checkbox` in a `Combobox` with `allowMultiple` would steal focus and close the `Popover` when clicked ([#4895](https://github.com/Shopify/polaris-react/pull/4895))

### Documentation

- Fixed a bug in the `Icon` component where examples did not show ([#4843](https://github.com/Shopify/polaris-react/pull/4843))
- Added arrow navigation instructions in keyboard support for `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Updated examples to properly support JAWS screen reader for `Popover` and `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))

### Development workflow

- Removed `dev start` command ([#4876](https://github.com/Shopify/polaris-react/pull/4876))

### Dependency upgrades

- Bumped `@shopify/polaris-icons` to v4.11.0 ([#4837](https://github.com/Shopify/polaris-react/pull/4837))
- Bumped `@storybook/react` to 6.4.10 ([#4796](https://github.com/Shopify/polaris-react/pull/4796))
- Bumped `@shopify/storybook-a11y-test` to 0.4.3 ([#4796](https://github.com/Shopify/polaris-react/pull/4796))
- Removed dependency `serve` ([#4876](https://github.com/Shopify/polaris-react/pull/4876))

### Code quality

### Deprecations
