# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Add `variableHeight` prop to `DropZone` so children control its height ([#4136](https://github.com/Shopify/polaris-react/pull/4136))
- Add print styles to `Card`, `Heading`, `Layout`, `Layout.Section`, `Subheading`, `TextStyle` components ([#4142](https://github.com/Shopify/polaris-react/pull/4142))
- Add `fullWidth` prop to `ColorPicker` so the color picker can take the full width ([#4152](https://github.com/Shopify/polaris-react/pull/4152))
- Add `noScroll` prop to `Modal` which prevents modal contents from scrolling ([#4153](https://github.com/Shopify/polaris-react/pull/4153))
- Added new `color` prop to ProgressBar ([#3415](https://github.com/Shopify/polaris-react/pull/3415))
- Added `requiredIndicator` prop to `Label`, `Labelled`, `Select` and `TextField` ([#4119](https://github.com/Shopify/polaris-react/pull/4119))
- Add `small` prop to `Modal` so that width can be decreased to 380px ([#4177](https://github.com/Shopify/polaris-react/pull/4177))
- Add `status` prop to `IndexTable.Row` to allow table rows to specify background colors([#4146](https://github.com/Shopify/polaris-react/pull/4146))
- Disabled `pointer-events` on the prefix and suffix elements of the `TextField` component ([#4207](https://github.com/Shopify/polaris-react/pull/4207))

### Bug fixes

- Fixed a bug where the inner nested drop zone was not available during a dragging event. ([#4123](https://github.com/Shopify/polaris-react/pull/4123))
- Fixed border misalignment and updated color of `DropZone` to match current design. ([#4123](https://github.com/Shopify/polaris-react/pull/4123))
- Fixed heading overflow issue on dismissible CalloutCard ([#4135](https://github.com/Shopify/polaris-react/pull/4135))
- Fixed `Loading` setting state after it has unmounted ([#4158](https://github.com/Shopify/polaris-react/pull/4158))
- Prevent extra right margin being added to the `Filter` component when used without filters. ([#4134](https://github.com/Shopify/polaris-react/pull/4134))
- Fixed offset in `DualThumb` when used with a min value different from 0 [#4172](https://github.com/Shopify/polaris-react/pull/4172)

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations

- Deprecate `Sheet` component [#4210](https://github.com/Shopify/polaris-react/pull/4210)
