# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

- `ResourceList.Item` opens url in new tab if command or control keys are pressed during click ([#690](https://github.com/Shopify/polaris-react/pull/690))
- Added `primaryAction` prop to `SkeletonPage` ([#488](https://github.com/Shopify/polaris-react/pull/488))
- Added support for press-and-hold to increment and decrement value in a type="number" `TextField` ([#573](https://github.com/Shopify/polaris-react/pull/573)) (thanks to [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris-react/issues/420))
- Forced `Avatar` to fall back to `initials` when the image fails to load ([#712](https://github.com/Shopify/polaris-react/pull/712))

### Bug fixes

- Fixed Popover not opening in a small Scrollable container ([#658](https://github.com/Shopify/polaris-react/pull/658))
- Fixed `Page` header component to only render actions wrapper when actions are present ([#732](https://github.com/Shopify/polaris-react/pull/732))
- Fixed `ContextualSaveBarProps` type not being exported ([#734](https://github.com/Shopify/polaris-react/pull/734))
- Fixed `Avatar` proportions when image is not square ([#740](https://github.com/Shopify/polaris-react/pull/740))

### Documentation

### Development workflow

- Upgrade to TypeScript 3.1.6 ([#700](https://github.com/Shopify/polaris-react/pull/700))
- Moved some inconsistent prop types around for compatibility with the styleguide's Props Explorer ([#727](https://github.com/Shopify/polaris-react/pull/727))

### Dependency upgrades
