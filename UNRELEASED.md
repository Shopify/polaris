# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

- `TextField` no longer uses `componentWillReceiveProps`([#628](https://github.com/Shopify/polaris-react/pull/628))
- EventListener`no longer uses`componentWillUpdate` ([#628](https://github.com/Shopify/polaris-react/pull/628))
- Allowed `Icon` to accept a React Node as a source ([#635](https://github.com/Shopify/polaris-react/pull/635)) (thanks to [@mbriggs](https://github.com/mbriggs) for the [original issue](https://github.com/Shopify/polaris-react/issues/449))

### Bug fixes

- Removed min-width from `FormLayout` `Items` and applying it only to `Items` used inside a `FormLayout.Group` ([#650](https://github.com/Shopify/polaris-react/pull/650))
- Removed added space in `ChoiceList` when choice has children on selection but is not selected ([#665](https://github.com/Shopify/polaris-react/issues/665))
- Prevented default on the `ComboBox`/`AutoComplete` component when the enter key was pressed to avoid accidental form submissions ([#680](https://github.com/Shopify/polaris-react/pull/680))

### Documentation

### Development workflow

- `yarn run tophat` has been removed and its functionality has been moved into the `yarn run dev` server. Example editing now supports hot-reloading so you don't need restart the server anymore.
