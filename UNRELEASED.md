# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

- `Link` is underlined by default, added `removeUnderline` prop to remove underline ([#3705](https://github.com/Shopify/polaris-react/pull/3705))
- Remove `light` property from `Tooltip` as it now defaults to a light background ([#3846](https://github.com/Shopify/polaris-react/pull/3846))
- Made `title` property required in `Modal` ([#3803](https://github.com/Shopify/polaris-react/pull/3803))
- Made `accessibilityLabel` required on `Sheet` ([#3852](https://github.com/Shopify/polaris-react/pull/3852))
- Removed `NewDesignLanguage`, `Color`, `AnimationProps` exported types ([#3868](https://github.com/Shopify/polaris-react/pull/3868))
- Replaced `BaseAction` with `Action` type ([#3868](https://github.com/Shopify/polaris-react/pull/3868))
- Changed the `frameOffset` prop to accept a string in `ThemeProvider` ([#3883](https://github.com/Shopify/polaris-react/pull/3883))
- Removed `Button` and `UnstyledButton`'s `ariaPressed` prop. Consumers should use the `pressed` prop instead ([#3884](https://github.com/Shopify/polaris-react/pull/3884))
- Removed `Button`'s `stretchContent` prop. Consumers should combine the `fullWidth` and `textAlign="left"` props instead ([#3884](https://github.com/Shopify/polaris-react/pull/3884))
- Removed `Popover`/`PopoverOverlay`'s `preventAutoFocus` prop. Consumers should use `autofocusTarget="none"` instead ([#3884](https://github.com/Shopify/polaris-react/pull/3884))
- Removed `button-filled-disabled` and `plain-button-background` SASS mixins ([#3817](https://github.com/Shopify/polaris-react/pull/3817))
- Removed `text-emphasis-placeholder` SASS mixin ([#3889](https://github.com/Shopify/polaris-react/pull/3889))
- Removed `plain` property in `Pagination` as it no longer has any effect. ([#3833](https://github.com/Shopify/polaris-react/pull/3833))

### Enhancements

### Bug fixes

- Fixed an accessibility issue where high contrast styles wouldn’t be applied to the `Tag` component ([#3810](https://github.com/Shopify/polaris-react/pull/3810))
- Fixed `ColorPicker` checker background to remain visible on a white background ([#3812](https://github.com/Shopify/polaris-react/pull/3812))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
