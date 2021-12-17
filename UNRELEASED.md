# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Removed animtion from `Skeleton` components ([#4697](https://github.com/Shopify/polaris-react/pull/4697))
- Remove duplicate duration(fast) usage. ([#4682](https://github.com/Shopify/polaris-react/pull/4682))
- Updated the accessability label for the rollup actions in the `Page` header ([#4080](https://github.com/Shopify/polaris-react/pull/4080))
- Delete `color()` function from sass API ([#4696](https://github.com/Shopify/polaris-react/pull/4696))
- Keyboard arrow navigation support added in `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Menu role attribute value support added in `ActionList/Section` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Updated the styling of `DropZone.FileUpload` ([#4813](https://github.com/Shopify/polaris-react/pull/4813))
- Added a minimum height to `Page` component `Header` ([#4770](https://github.com/Shopify/polaris-react/pull/4779))
- Added a `verticalAlign` prop to `OptionList`. ([#4800](https://github.com/Shopify/polaris-react/pull/4800))
- Added suppport for a `url` prop in the `Tag` component ([#4837](https://github.com/Shopify/polaris-react/pull/4837))
- Added support for `children` to take elements other than strings in the `Tag` component ([#4837](https://github.com/Shopify/polaris-react/pull/4837))

### Bug fixes

- Fixed a bug where remove button could shrink in the `Tag` component ([#4816](https://github.com/Shopify/polaris-react/issues/4816))
- Fixed incorrect `Popover` position in `Combobox` when an element is conditionally rendered before the `Combobox` ([#4825](https://github.com/Shopify/polaris-react/pull/4825))
- Reverted the deprecation of the "attention" `status` in `Badge` ([#4840](https://github.com/Shopify/polaris-react/pull/4840))

### Documentation

- Fixed a bug in the `Icon` component where examples did not show ([#4843](https://github.com/Shopify/polaris-react/pull/4843))
- Added arrow navigation instructions in keyboard support for `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Updated examples to properly support JAWS screen reader for `Popover` and `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))

### Development workflow

### Dependency upgrades

Bump polaris-icons to v4.11.0 ([#4837](https://github.com/Shopify/polaris-react/pull/4837))

### Code quality

- Removed `rem()` function from `tokens.ts` ([#4695](https://github.com/Shopify/polaris-react/pull/4695))
- Remove unnecessary import of `Tokens` in `Collapsible` test ([#4722](https://github.com/Shopify/polaris-react/pull/4722))
- Remove legacy tokens and use default theme for `.storybook/manager.js` ([#4729](https://github.com/Shopify/polaris-react/pull/4729))
- Changed `TextContainer.scss` custom properties to use `--pc-` prefix ([#4799](https://github.com/Shopify/polaris-react/pull/4799))

### Deprecations
