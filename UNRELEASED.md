# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Deprecations

### New components

### Enhancements

- Added support for dual values to `RangeSlider` component ([#784](https://github.com/Shopify/polaris-react/pull/784))

- Updated type restrictions for `AnnotatedSection` to allow its `title` prop to accept `React.ReactNode` instead of `string` ([#1431](https://github.com/Shopify/polaris-react/pull/1431))

### Bug fixes

- Fixed an issue where the JavaScript breakpoints incorrectly set the navigation bar collapsed breakpoint ([#1475](https://github.com/Shopify/polaris-react/pull/1475))
- Added a border to `Toast` messages to make them more visible in Windows high contrast mode ([#1469](https://github.com/Shopify/polaris-react/pull/1469))

### Documentation

### Development workflow

- Updated Storybook to `v5.1.0-alpha.39`, improving component searchability in the sidebar [[#1488](https://github.com/Shopify/polaris-react/pull/1488)]

### Dependency upgrades

- Removed runtime dependency on `@shopify/images` as we never needed it at runtime ([#1474](https://github.com/Shopify/polaris-react/pull/1474))

- Remove `@shopify/react-utilities`. Replace some of the functionality with `@shopify/css-utilities` or by moving the utilities into polaris itself. ([#1473](https://github.com/Shopify/polaris-react/pull/1473))

### Code quality

### Deprecations
