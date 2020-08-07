# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### Enhancements

- Added optional `videoProgress` and `showVideoProgress` props to `VideoThumbnail` for video progress indicator ([#3057](https://github.com/Shopify/polaris-react/pull/3057))
- Enabled much easier tree-shaking in consuming apps by having a multi-file build instead of a single-file build ([#3137](https://github.com/Shopify/polaris-react/pull/3137))

### Bug fixes

### Documentation

### Development workflow

- Fixed `build-consumer` script to handle excludes in package.json's `files` array ([#3136](https://github.com/Shopify/polaris-react/pull/3136))

### Dependency upgrades

### Code quality

- Removed the `new-top-bar-height` sass function and replaced its usage with the `--p-top-bar-height` custom property (#3158)[https://github.com/Shopify/polaris-react/pull/3158]

### Deprecations
