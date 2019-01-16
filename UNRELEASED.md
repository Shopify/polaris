# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### New components

### Enhancements

- Update build toolchain to use Babel v7, PostCSS v7 and Rollup v1. Update our build targets match our [supported browsers](https://help.shopify.com/en/manual/intro-to-shopify/shopify-admin/supported-browsers), leading to a reduction in bundle size ([#837](https://github.com/Shopify/polaris-react/pull/837))

### Design updates

### Bug fixes

- Ensure disabled `Button` components with a `url` prop output valid HTML ([#773](https://github.com/Shopify/polaris-react/pull/773))
- Fixed `DropZone` which was unable to add a duplicate file back to back or add a file again once removed [#782](https://github.com/Shopify/polaris-react/pull/782). Thank you [@jzsplk](https://github.com/jzsplk) for the contribution [#425](https://github.com/Shopify/polaris-react/issues/425) and [@vladucu](https://github.com/vladucu) for the clear example.
- Added a fallback to the `safeAreaFor` sass mixin to handle browsers that don't support `env` and `constant` [#881](https://github.com/Shopify/polaris-react/pull/881)

### Documentation

- Added deprecation guidelines ([#853](https://github.com/Shopify/polaris-react/pull/853))

### Development workflow

- Replaced our home-grown playground with Storybook (still accessed through `yarn dev`) ([#768](https://github.com/Shopify/polaris-react/pull/768))
- Removed our usage of babel-node for build scripts - use plain node instead ([#836](https://github.com/Shopify/polaris-react/pull/836))
- Ensure CSS builds are reproducible ([#869](https://github.com/Shopify/polaris-react/pull/869))

### Dependency upgrades

### Code quality

### Deprecations
