# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Update `OptionList` selected styles ([#3633](https://github.com/Shopify/polaris-react/pull/3633))
- Added the ability to hide the clear filter button on the filter component ([#3049](https://github.com/Shopify/polaris-react/pull/3049))
- **`OptionList`:** Export `OptionListOptionDescriptor` and `OptionListSectionDescriptor` ([#3741](https://github.com/Shopify/polaris-react/pull/3741))
- **`Popover`:** New `autofocusTarget` prop to enhance autofocus options ([#3600](https://github.com/Shopify/polaris-react/pull/3600))
- Added ability to hide query text field in `Filters` component using `hideQueryField` prop ([#3674](https://github.com/Shopify/polaris-react/pull/3674))
- Added `tabIndex` to `Scrollable` for keyboard focus ([#3744](https://github.com/Shopify/polaris-react/pull/3744))

### Bug fixes

- Fixed `FocusManager` from tracking inactive items that prevented trap focusing([#3630](https://github.com/Shopify/polaris-react/pull/3630))
- Added escape keybind to `Tooltip` ([#3627](https://github.com/Shopify/polaris-react/pull/3627))
- Removed extra bottom border on the `DataTable` and added curved edges to footers ([#3571](https://github.com/Shopify/polaris-react/pull/3571))
- **`Button`:** `loading` no longer sets the invalid `role="alert"` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Added semantic headers to `Filters` ([#3629](https://github.com/Shopify/polaris-react/pull/3629))
- Fixed `Filters` not announcing applied filters ([#3632](https://github.com/Shopify/polaris-react/pull/3632))
- Removed `tabIndex=-1` from `Popover` when `preventAutoFocus` is true ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Fixed `Modal` header border color ([#3616](https://github.com/Shopify/polaris-react/pull/3616))
- Added focus styles to `CloseButton` in `Modal` ([#3628](https://github.com/Shopify/polaris-react/pull/3628))
- Fixed `Filters` duplicated `ConnectedFilter` ids ([#3651](https://github.com/Shopify/polaris-react/pull/3651))
- Fixed `Banner` `secondaryAction` only rendering if `action` is set ([#2949](https://github.com/Shopify/polaris-react/pull/2949))
- Added a `alwaysRenderCustomProperties` to `ThemeProvider` for elements that render outside of the DOM tree to their parent context ([#3652](https://github.com/Shopify/polaris-react/pull/3652))
- Fixed keyboard interactions for the `Tab` component ([#3650](https://github.com/Shopify/polaris-react/pull/3650))
- Fixed keyboard interaction when selected Tab was focused and rendering the wrong `::before` colour ([#3669](https://github.com/Shopify/polaris-react/pull/3669))
- Added focus ring to disclosure tab when tabbing with keyboard([#3675](https://github.com/Shopify/polaris-react/pull/3675))
- Fixed windows high contrast mode on hover within disclosure menu and displaying active state upon click for `::before` ([#3675](https://github.com/Shopify/polaris-react/pull/3675))
- Removed `aria-selected` from `ActionList` as it is not a selectable list ([#3725](https://github.com/Shopify/polaris-react/pull/3725))
- Moved `aria-role="combobox"` in `Autocomplete` from the `div` to the `input` ([#3727](https://github.com/Shopify/polaris-react/pull/3727))
- Removed `aria-multiline` in `Input` when false or undefined ([#3727](https://github.com/Shopify/polaris-react/pull/3727))
- Removed `aria-multiselectable` from OptionList ([#3729](https://github.com/Shopify/polaris-react/pull/3729))
- Replaced `button` with `div` in `RangeSlider` for correct semantics when using `role="slider"` ([#3730](https://github.com/Shopify/polaris-react/pull/3730))
- Replaced `React.Fragment` with `li` in `ResourceList` spinner for valid markup ([#3732](https://github.com/Shopify/polaris-react/pull/3732))
- Fixed clear button in `TextField` unintentionally closing `Popover` when clicked ([#3688](https://github.com/Shopify/polaris-react/pull/3688))
- Added focus styles to the clear button in `TextField` ([#3688](https://github.com/Shopify/polaris-react/pull/3688))
- Increase contrast of navigation text color ([#3742](https://github.com/Shopify/polaris-react/pull/3742))

### Documentation

### Development workflow

- Replace travis with GitHub actions ([#3739](https://github.com/Shopify/polaris-react/pull/3739))

### Dependency upgrades

### Code quality

- Removed skipped accessibility tests and fixes component accessibility issues ([#3721](https://github.com/Shopify/polaris-react/pull/3721))
- Extracted `TagsWrapper` from `Filters` for testability ([#3688](https://github.com/Shopify/polaris-react/pull/3688))

### Deprecations

- Deprecated `Popover`'s prop `preventAutofocus`. Use `autofocusTarget` instead ([#3602](https://github.com/Shopify/polaris-react/issues/3602))
