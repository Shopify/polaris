# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

- Removed filter sass function and color-icon() mixin ([#4676](https://github.com/Shopify/polaris-react/pull/4676))
- Renamed `--p-duration-1-0-0` and `--p-duration-1-5-0` to `--p-duration-100` and `--p-duration-150`.
- Removed custom and unnecessary font weight properties ([#4687](https://github.com/Shopify/polaris-react/pull/4687))
- Removed miscellaneous css custom properties ([#4686](https://github.com/Shopify/polaris-react/pull/4686))
- Removed `skeleton-shimmer` mixin ([#4462])(https://github.com/Shopify/polaris-react/pull/4462)

### Enhancements

- Removed motion from `Skeleton` components mixin ([#4462])(https://github.com/Shopify/polaris-react/pull/4462)
- Allow for `readonly` items in ActionList ([#4623](https://github.com/Shopify/polaris-react/pull/4623))
- Updated `VisuallyHidden` styles to not use `top` or `clip` ([#4641](https://github.com/Shopify/polaris-react/pull/4641))
- Added `PlainAction` type to `ComplexAction`. ([#4489](https://github.com/Shopify/polaris-react/pull/4489))
- Updated timeout of `Popover` exit to `durationFast`. ([#4651](https://github.com/Shopify/polaris-react/pull/4651))
- Reduced the size of the `progress` pip in `Badge` ([#4658](https://github.com/Shopify/polaris-react/pull/4658))
- Updated styling of `DropZone` border and overlay text. ([#4662](https://github.com/Shopify/polaris-react/pull/4662))
- Remove duplicate duration(fast) usage. ([#4682](https://github.com/Shopify/polaris-react/pull/4682))
- Updated the accessability label for the rollup actions in the `Page` header ([#4080](https://github.com/Shopify/polaris-react/pull/4080))

### Bug fixes

- Fixed try-catch syntax error in `Modal` ([#4553](https://github.com/Shopify/polaris-react/pull/4553))
- Fixed an issue with `TextField` where date and time were uneditable on click ([#4671](https://github.com/Shopify/polaris-react/pull/4671))

### Documentation

- Added an example for the `small` `size` variant of `Badge` ([#4658](https://github.com/Shopify/polaris-react/pull/4658))
- Updated top bar description and keywords to include `header`, changed category to `Navigation` ([#4672](https://github.com/Shopify/polaris-react/pull/4672))

### Development workflow

- Tightened up what absolute imports are allowed. Removed `baseUrl` from `tsconfig.json`. Attempting to do an absolute import from `src/X` or `components/X` now results in a error when type-checking. ([#4643](https://github.com/Shopify/polaris-react/pull/4643))

### Dependency upgrades

### Code quality

- Cleaned up Button styling and $button-filled mixin([#4635](https://github.com/Shopify/polaris-react/pull/4635))
- Removed filter functions ([#4650](https://github.com/Shopify/polaris-react/pull/4650))
- Removed all color() invocations ([#4636](https://github.com/Shopify/polaris-react/pull/4636))
- Replaced font-weight values with tokens ([#4599](https://github.com/Shopify/polaris-react/issues/4599))

### Deprecations

- Deprecated passing `attention` to the `status` prop on `Badge` in favor of `warning` ([#4658](https://github.com/Shopify/polaris-react/pull/4658))
