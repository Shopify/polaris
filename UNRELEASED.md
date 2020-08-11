# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### Enhancements

- Added optional `videoProgress` and `showVideoProgress` props to `VideoThumbnail` for video progress indicator ([#3057](https://github.com/Shopify/polaris-react/pull/3057))
- Enabled much easier tree-shaking in consuming apps by having a multi-file build instead of a single-file build ([#3137](https://github.com/Shopify/polaris-react/pull/3137))
- Labelled component now breaks on long lines of text, regardless of presence of naturally breaking characters (hyphens, whitespace, etc.) ([#3156](https://github.com/Shopify/polaris-react/pull/3156))
- Added optional `isFiltered` prop to `ResourceList` to conditionally render more informative select all button label ([#3153](https://github.com/Shopify/polaris-react/pull/3153))
- Exported `PositionedOverlay` component for use in consuming applications ([#3161](https://github.com/Shopify/polaris-react/pull/3161))
- Update to use `esnext` as a custom mainField instead of `sewing-kit:esnext` to match updated sewing-kit behaviour ([#3169](https://github.com/Shopify/polaris-react/pull/3169))

### Bug fixes

### Documentation

### Development workflow

- Fixed `build-consumer` script to handle excludes in package.json's `files` array ([#3136](https://github.com/Shopify/polaris-react/pull/3136))

### Dependency upgrades

### Code quality

- Removed the `new-top-bar-height` sass function and replaced its usage with the `--p-top-bar-height` custom property (#3158)[https://github.com/Shopify/polaris-react/pull/3158]

### Deprecations
