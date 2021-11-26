# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Removed animtion from `Skeleton` components ([#](https://github.com/Shopify/polaris-react/pull/))
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
- Fixed an issue with `Popover` where the transform property interfered with descendants positioning ([#4685](https://github.com/Shopify/polaris-react/pull/4685))
- Fixed screen reader accessibility issue of the `Checkbox` component ([#4631](https://github.com/Shopify/polaris-react/pull/4631))

### Documentation

- Added an example for the `small` `size` variant of `Badge` ([#4658](https://github.com/Shopify/polaris-react/pull/4658))
- Updated top bar description and keywords to include `header`, changed category to `Navigation` ([#4672](https://github.com/Shopify/polaris-react/pull/4672))

### Development workflow

- Tightened up what absolute imports are allowed. Removed `baseUrl` from `tsconfig.json`. Attempting to do an absolute import from `src/X` or `components/X` now results in a error when type-checking. ([#4643](https://github.com/Shopify/polaris-react/pull/4643))
- Remove analyze custom properties check. ([#4718](https://github.com/Shopify/polaris-react/pull/4718))
- Removed support for importing from `components` as it slows tests down ([#4735](https://github.com/Shopify/polaris-react/pull/4735), [#4739](https://github.com/Shopify/polaris-react/pull/4739))

### Dependency upgrades

- Bumped `postcss` to `v8.3.1` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))
- Bumped `@shopify/postcss-plugin` to `v5.0.1` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))
- Bumped `postcss-loader` to `v4.2.0` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))
- Bumped `postcss-modules` to `v4.2.2` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))

### Code quality

- Clean up Button styling and $button-filled mixin([#4635](https://github.com/Shopify/polaris-react/pull/4635))
- Remove filter functions ([#4650](https://github.com/Shopify/polaris-react/pull/4650))
- Remove all color() invocations ([#4636](https://github.com/Shopify/polaris-react/pull/4636))
- Cleaned up Button styling and $button-filled mixin([#4635](https://github.com/Shopify/polaris-react/pull/4635))
- Removed `rem()` function from `tokens.ts` ([#4695](https://github.com/Shopify/polaris-react/pull/4695))
- Remove unnecessary import of `Tokens` in `Collapsible` test ([#4722](https://github.com/Shopify/polaris-react/pull/4722))
- Remove legacy tokens and use default theme for `.storybook/manager.js` ([#4729](https://github.com/Shopify/polaris-react/pull/4729))

### Deprecations

- Deprecated passing `attention` to the `status` prop on `Badge` in favor of `warning` ([#4658](https://github.com/Shopify/polaris-react/pull/4658))
