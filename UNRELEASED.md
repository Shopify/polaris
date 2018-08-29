# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Bug fixes

- Reverted a change that caused the built embeded.js bundle to be way larger than it should be due to broad imports ([#2102](https://github.com/Shopify/polaris-react/pull/2102))

### Enhancements

- Changed `Form` to default the `method` to `post` in order to prevent accidental leaking of form details ([#2066](https://github.com/Shopify/polaris-react/pull/2066))
- Added support for boolean type on Choice error prop ([#2085](https://github.com/shopify/polaris-react/pull/2085))

### Documentation

- Updated banner guidelines to make it clearer when success banners should be used vs success toasts. ([#2046](https://github.com/Shopify/polaris-react/pull/2046))
