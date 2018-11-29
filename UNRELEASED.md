# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

- `TextField` no longer uses `componentWillReceiveProps`([#628](https://github.com/Shopify/polaris-react/pull/628))
- EventListener`no longer uses`componentWillUpdate` ([#628](https://github.com/Shopify/polaris-react/pull/628))
- Allowed `Icon` to accept a React Node as a source ([#635](https://github.com/Shopify/polaris-react/pull/635)) (thanks to [@mbriggs](https://github.com/mbriggs) for the [original issue](https://github.com/Shopify/polaris-react/issues/449))
- Added `alignContentFlush` prop to ContextualSaveBar ([#654](https://github.com/Shopify/polaris-react/pull/654))

### Bug fixes

- Removed min-width from `FormLayout` `Items` and applying it only to `Items` used inside a `FormLayout.Group` ([#650](https://github.com/Shopify/polaris-react/pull/650))
- Removed added space in `ChoiceList` when choice has children on selection but is not selected ([#665](https://github.com/Shopify/polaris-react/issues/665))

- Updated the `InlineError` text color, the error border-color on form fields and the error Icon color to be the same red. ([#676](https://github.com/Shopify/polaris-react/pull/676))

### Documentation

- Updated documentation links to match the new style guide link structure ([#478](https://github.com/Shopify/polaris-react/pull/478))

### Development workflow

- `yarn run tophat` has been removed and its functionality has been moved into the `yarn run dev` server. Example editing now supports hot-reloading so you don’t need restart the server anymore.

### Dependency upgrades

- Bumped `@shopify/polaris-tokens` to v2.0.0. This is a **breaking change** for consumers of color design tokens in languages such as JavaScript and Sass ([full release notes](https://github.com/Shopify/polaris-tokens/blob/master/CHANGELOG.md#200---2018-10-23))
