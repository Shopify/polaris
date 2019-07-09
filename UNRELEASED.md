# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### New components

- `Filters`: Use to filter the items of a list or table ([#1718](https://github.com/Shopify/polaris-react/pull/1718))

### Enhancements

- Added the rollover and Windows high contrast mode to `Disclosure` button on `Tabs`. ([#1755](https://github.com/Shopify/polaris-react/pull/1755))

- Added support for disabling all choices in `ChoiceList` ([#1758](https://github.com/Shopify/polaris-react/pull/1758))

### Bug fixes

- Fixed a regression introduced in #1247, where icons inside of `Link` would always be recolored to match the text color ([#1729](https://github.com/Shopify/polaris-react/pull/1729))

### Documentation

- Added links to App Bridge React component documentation in deprecation notices for embedded components ([#1765](https://github.com/Shopify/polaris-react/pull/1765))
- Improved link text for App Bridge deprecation notices. [#1802](https://github.com/Shopify/polaris-react/pull/1802)

### Development workflow

- Renamed `yarn run ts` to `yarn run type-check` to match most other Shopify projects
- Fixed deprecation notice in build ([#1754](https://github.com/Shopify/polaris-react/pull/1754))
- Simplified our rollup plugin for sass compilation while retaining identical behaviour ([#1753](https://github.com/Shopify/polaris-react/pull/1753))

### Dependency upgrades

### Code quality

### Deprecations
