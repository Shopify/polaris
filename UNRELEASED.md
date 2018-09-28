# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Development workflow

- Added `d.ts` files to test coverage ignore ([#2018](https://github.com/Shopify/polaris-react/pull/2018))

### Enhancments

- Update example description in `ExceptionList` documentation ([#2277](https://github.com/Shopify/polaris-react/pull/2277))
- Move Modal CloseButton into its own subcomponent, instead of being part of the Header subcomponent. This is an internal implementation detail if you are using the React component. If you are using (s)css and are defining class names manually you will need to update references to `Polaris-Modal-Header__CloseButton` and `Polaris-Modal-Header--withoutTitle` to `Polaris-Modal-CloseButton` and `Polaris-Modal-CloseButton--withoutTitle` respectively. ([#2289](https://github.com/Shopify/polaris-react/pull/2289))

### Bug fixes

- Fixed console error and used new ref syntax in `DataTable` ([#2196](https://github.com/Shopify/polaris-react/pull/2196)) (thanks to ([@duythien0912](https://github.com/duythien0912)) for the ([original issue](https://github.com/Shopify/polaris/issues/403)))
- Fixed margin of `InlineError` text to align with the `ChoiceList` labels ([#2275](https://github.com/Shopify/polaris-react/pull/2275))
- Replaced hardcoded `rem` values with globally scalable ones on `DataTable`’s collapsed shadow, and `TextStyle` code blocks ([#2293](https://github.com/Shopify/polaris-react/pull/2293))
- Fixed spacing of numbered `List` for double digits ([#121](https://github.com/Shopify/polaris-ux/issues/121))
- Fixed `ProgressBar` not showing up in Windows high contrast mode ([#1708](https://github.com/Shopify/polaris-react/issues/1708))
- Top aligned all cells in `DataTable` ([#2278](https://github.com/Shopify/polaris-react/pull/2278))
- Fixed stacking order of loading overlay in `ResourceList` ([#2258](https://github.com/Shopify/polaris-react/pull/2258))
- Fixed form inputs in `Popover` that were disappearing instead of top aligning ([#2326](https://github.com/Shopify/polaris-react/pull/2326)) thanks to [@mbaumbach](https://github.com/mbaumbach) for the [original issue](https://github.com/Shopify/polaris/issues/435)

### Documentation

- Made `Modal` examples show the modal dialog by default ([#2303](https://github.com/Shopify/polaris-react/pull/2303))
- Changed fitted `Tabs` to have equal width when enough space is present ([#2314](https://github.com/Shopify/polaris-react/issues/2314))
