# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Enhancements

- Removed the need for z-indexes in `Icon` ([#2207](https://github.com/Shopify/polaris-react/pull/2207))
- Added `features` prop to `AppProvider` ([#2204](https://github.com/Shopify/polaris-react/pull/2204))

### Bug fixes

- Fixed `type` for clearButton ([#2060](https://github.com/Shopify/polaris-react/pull/2060))
- Prevented the `onSelect` prop of `Tabs` from changing scroll position ([#2196](https://github.com/Shopify/polaris-react/pull/2196))
- Fixed 200ms visual delay when activating `Popover` ([#2209](https://github.com/Shopify/polaris-react/pull/2209))
- Fixed `ResourceList` `Item` deselect ([#1952](https://github.com/Shopify/polaris-react/pull/1952))

### Documentation

- Converted `SettingToggle`, `Sheet`, and `Tabs` examples to functional components ([#2134](https://github.com/Shopify/polaris-react/pull/2134))
- Converted `Form`, `Frame`, and `Loading` examples to functional components ([#2130](https://github.com/Shopify/polaris-react/pull/2130))
- Replaced Latin abbreviations with English words in Text field content guidelines ([#2192](https://github.com/Shopify/polaris-react/pull/2192))
- Converted `SettingToggle`, `Sheet`, and `Tabs` examples to functional components ([#2134](https://github.com/Shopify/polaris-react/pull/2134))
- Converted `DatePicker`, `DropZone`, and `Filters` examples to functional components ([#2129](https://github.com/Shopify/polaris-react/pull/2129))

### Development workflow

### Dependency upgrades

### Code quality

- Added `MediaQueryProvider` to ease the use of media queries and reduce duplication ([#2117](https://github.com/Shopify/polaris-react/pull/2117))
- Migrated `Tab` to use hooks instead of `withAppProvider` ([#2096](https://github.com/Shopify/polaris-react/pull/2096))

### Deprecations

### Development workflow

- Added a GitHub action, [discoverability-action](https://github.com/Shopify/discoverability-action), that runs `yarn splash` on PR diffs and leaves a comment with the output ([#2208](https://github.com/Shopify/polaris-react/pull/2208))
