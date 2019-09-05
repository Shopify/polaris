# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

### Bug fixes

- Fixed animation for Modal when being rendered asynchronously ([#2076](https://github.com/Shopify/polaris-react/pull/2076))

### Documentation

### Development workflow

### Dependency upgrades

- Updated Prettier to v1.18.2 ([#2070](https://github.com/Shopify/polaris-react/pull/2070))

### Code quality

- Migrated `ActionMenu.RollupAction`, `Autocomplete`, `Card`, `EmptySearchResult`, `Form`, `SkeletonPage` and `TopBar` to use hooks instead of withAppProvider ([#2065](https://github.com/Shopify/polaris-react/pull/2065))
- Added `useUniqueId` hook that can be used to get a unique id that remains consistent between rerenders and updated components to use it where appropriate ([#2079](https://github.com/Shopify/polaris-react/pull/2079))

### Deprecations
