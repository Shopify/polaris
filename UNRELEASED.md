# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### New components

### Enhancements

- Added a `verticalAlign` prop to `DataTable` ([#1790](https://github.com/Shopify/polaris-react/pull/1790))

### Bug fixes

- Fixed a bug preventing the display of `Tooltip` when cursor enters from a disabled element ([#1783](https://github.com/Shopify/polaris-react/pull/1783)).
- Fixed React imports in the `Filters` component to use `import * as React` for projects that don't use `esModuleInterop` ([#1820](https://github.com/Shopify/polaris-react/pull/1820))
- Fixed `tabIndex` on `main` element causing event delegation issues ([#1821](https://github.com/Shopify/polaris-react/pull/1821))

### Documentation

- Added links to App Bridge React component documentation in deprecation notices for embedded components ([#1765](https://github.com/Shopify/polaris-react/pull/1765))
- Improved link text for App Bridge deprecation notices. [#1802](https://github.com/Shopify/polaris-react/pull/1802)

### Development workflow

- Use explicit imports for our base sass mixins instead of having them implictly defined at build-time. This simplifes our build config and other tooling that wants to build us from source [[#1680](https://github.com/Shopify/polaris-react/pull/1680)]

### Dependency upgrades

### Code quality

### Deprecations
