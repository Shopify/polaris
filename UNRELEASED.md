# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

- Moved icons to a separate npm package ([#686](https://github.com/Shopify/polaris-react/pull/686))

### Bug fixes

- Fixed `ResourceList` not rendering `BulkActions` on initial load when items were selected ([#746](https://github.com/Shopify/polaris-react/pull/746))
- Fixed the new variant of the `Badge` component so that it is simpler and easier to read ([#751](https://github.com/Shopify/polaris-react/pull/751))
- Reverted a change that set the `autocomplete` property on `TextField` to `nope` when it was `false` ([#761](https://github.com/Shopify/polaris-react/pull/761))

### Documentation

- Modified image paths to fit the [style guide](https://polaris.shopify.com)’s new Markdown parsing rules ([#753](https://github.com/Shopify/polaris-react/pull/753))

### Development workflow

- Added a slight delay to the Percy screenshot script to give time for components to render fully ([#704](https://github.com/Shopify/polaris-react/pull/704))
- Refactors to remove cyclical type imports ([#759](https://github.com/Shopify/polaris-react/pull/759), [#754](https://github.com/Shopify/polaris-react/pull/754), and [#767](https://github.com/Shopify/polaris-react/pull/767))

### Dependency upgrades

### Code quality
