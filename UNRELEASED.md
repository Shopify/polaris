# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### New components

### Enhancements

- Track Polaris version information in App Bridge actions
- Re-added the navigation’s border-right ([#1096](https://github.com/Shopify/polaris-react/pull/1096))
- Added `onScrolledToBottom` prop to `Modal` ([#1117](https://github.com/Shopify/polaris-react/pull/1117))
- Updated `Navigation.Item` to use `Icon` when `iconBody` prop is passed in. Renders these icons in an `img` tag now. ([#1094](https://github.com/Shopify/polaris-react/pull/1094))

### Bug fixes

- Fixed missing rounded corners on `Tag` button states ([#1078](https://github.com/Shopify/polaris-react/pull/1078))
- Removed reference to `window.Polaris`, which in some cases could be undefined ([#1104](https://github.com/Shopify/polaris-react/issues/1104))
- Added padding and margin to `subdued` sections for proper spacing between the header and footer ([#1082](https://github.com/Shopify/polaris-react/pull/1082))
- Removed left margin from vertical `Stack` to prevent overflow ([#1024](https://github.com/Shopify/polaris-react/pull/1024))

### Documentation

- Updated related component documentation for `Page`, `Page actions`, and `Pagination` ([#1103](https://github.com/Shopify/polaris-react/pull/1103))
- Made documentation for properties only available in a stand-alone context more explicit for `Modal` ([#1065](https://github.com/Shopify/polaris-react/pull/1065))
- Added accessibility documentation about `Banner` ([#1071](https://github.com/Shopify/polaris-react/pull/1071))
- Added accessibility documentation for `InlineError` ([#1073](https://github.com/Shopify/polaris-react/pull/1073))
- Added accessibility documentation for `Loading`([#1075](https://github.com/Shopify/polaris-react/pull/1075))
- Fixed documentation about the `ariaPressed` prop for `Button` ([#1097](https://github.com/Shopify/polaris-react/pull/1097))
- Fixed examples using the `selected` prop for `Autocomplete` ([#1053](https://github.com/Shopify/polaris-react/pull/1053))

### Development workflow

- Added viewport meta tag to Storybook frame ([#1026](https://github.com/Shopify/polaris-react/pull/1026))

### Dependency upgrades

### Code quality

- Removed lodash decorators and replace all occurrences of `_.throttle` with `debounce` ([#1009](https://github.com/Shopify/polaris-react/pull/1009))
- Removed all occurrences of `_.replace` ([#1012](https://github.com/Shopify/polaris-react/pull/1012))
- Add lodash to `create-react-app` example ([#1010](https://github.com/Shopify/polaris-react/pull/1010))
- Update `create-react-app` example dependencies ([#1010](https://github.com/Shopify/polaris-react/pull/1010))
- Replace all occurrences of `_.capitalize` with a custom `capitalize` function ([#1015](https://github.com/Shopify/polaris-react/pull/1015))
- Replace all occurrences of `_.isObject` with a custom `isObject` function ([#1011](https://github.com/Shopify/polaris-react/pull/1011))
- Replace all occurrences of `_.get` with a custom `get` function ([#1013](https://github.com/Shopify/polaris-react/pull/1013))

### Deprecations
