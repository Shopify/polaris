# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Added `totalItemsCount` prop to `ResourceList` component ([2233](https://github.com/Shopify/polaris-react/pull/2233))
- Prevents the `Header` primary action label on `Page` from wrapping when the title is too long ([2262](https://github.com/Shopify/polaris-react/pull/2262))

### Bug fixes

- Doesn't render `MenuActions` if no actions are passed to an `actionGroups` item inside `Page` ([2266](https://github.com/Shopify/polaris-react/pull/2266))
- Fixed issue with `Stack` where a `Stack.Item` was not getting a minimum width ([2273](https://github.com/Shopify/polaris-react/pull/2273))
- Fixed issue with `Filters` applying inconsistent border styles to sibling filters and when
  there is only one filter in the filter list ([2284](https://github.com/Shopify/polaris-react/pull/2284))

### Documentation

- Added accessibility documentation for the drop zone component ([#2243](https://github.com/Shopify/polaris-react/pull/2243))
- Improved accessibility documentation for the `Spinner` component ([#2258](https://github.com/Shopify/polaris-react/pull/2258))

### Development workflow

### Dependency upgrades

### Code quality

- Migrated `DateSelector` to use hooks instead of withAppProvider ([#2193](https://github.com/Shopify/polaris-react/pull/2193))
- Migrated `Toast` to use hooks ([#2222](https://github.com/Shopify/polaris-react/pull/2222))
- Removed `link`, `theme` and `scrollLockManager` from the object returned by withAppProvider as nothing consumes them any more ([#2277](https://github.com/Shopify/polaris-react/pull/2277))

### Deprecations

### Development workflow
