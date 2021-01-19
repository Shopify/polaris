# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

- Remove `light` property from `Tooltip` as it now defaults to a light background ([#3846](https://github.com/Shopify/polaris-react/pull/3846))
- Made `title` property required in `Modal` for accessibility label, added `hideTitle` property ([#3803](https://github.com/Shopify/polaris-react/pull/3803))
- Added required `ariaLabel` property in `Sheet` ([#3852](https://github.com/Shopify/polaris-react/pull/3852))
- Removed `NewDesignLanguage`, `Color`, `AnimationProps` exported types ([#3868](https://github.com/Shopify/polaris-react/pull/3868))
- Replaced `BaseAction` with `Action` type ([#3868](https://github.com/Shopify/polaris-react/pull/3868))
- Changed the `frameOffset` prop to accept a string in `ThemeProvider` ([#3883](https://github.com/Shopify/polaris-react/pull/3883))
- Removed `Button` and `UnstyledButton`'s `ariaPressed` prop. Consumers should use the `pressed` prop instead ([#3884](https://github.com/Shopify/polaris-react/pull/3884))
- Removed `Button`'s `stretchContent` prop. Consumers should combine the `fullWidth` and `textAlign="left"` props instead ([#3884](https://github.com/Shopify/polaris-react/pull/3884))
- Removed `Popover`/`PopoverOverlay`'s `preventAutoFocus` prop. Consumers should use `autofocusTarget="none"` instead ([#3884](https://github.com/Shopify/polaris-react/pull/3884))

### Enhancements

- Changed `Label` and `Labelled`’s `label` prop type to `React.ReactNode` instead of `string` ([#3787](https://github.com/Shopify/polaris-react/pull/3787))

### Bug fixes

- Fixed an accessibility issue where high contrast styles wouldn’t be applied to the `Tag` component ([#3810](https://github.com/Shopify/polaris-react/pull/3810))
- `plain` variant `children` no longer remain visible while `loading` for `Button` ([#3709](https://github.com/Shopify/polaris-react/pull/3709))
- No longer spin `disclosure` 180deg when toggling between `up` and `down` on `Button` ([#3709](https://github.com/Shopify/polaris-react/pull/3709))
- Prevent layout shift when toggling “filled” variants on `Button` ([#3709](https://github.com/Shopify/polaris-react/pull/3709))
- Fixed `FocusManager` from tracking inactive items that prevented trap focusing([#3630](https://github.com/Shopify/polaris-react/pull/3630))
- Added escape keybind to `Tooltip` ([#3627](https://github.com/Shopify/polaris-react/pull/3627))
- Removed extra bottom border on the `DataTable` and added curved edges to footers ([#3571](https://github.com/Shopify/polaris-react/pull/3571))
- **`Button`:** `loading` no longer sets the invalid `role="alert"` ([#3590](https://github.com/Shopify/polaris-react/pull/3590))
- Added semantic headers to `Filters` ([#3629](https://github.com/Shopify/polaris-react/pull/3629))
- Fixed `Filters` not announcing applied filters ([#3632](https://github.com/Shopify/polaris-react/pull/3632))
- Removed `tabIndex=-1` from `Popover` when `preventAutoFocus` is true ([#3595](https://github.com/Shopify/polaris-react/pull/3595))
- Fixed Tooltip not being read properly by screen readers([#3631](https://github.com/Shopify/polaris-react/pull/3631))
- Fixed `Modal` header border color ([#3616](https://github.com/Shopify/polaris-react/pull/3616))
- Added focus styles to `CloseButton` in `Modal` ([#3628](https://github.com/Shopify/polaris-react/pull/3628))
- Fixed `Filters` duplicated `ConnectedFilter` ids ([#3651](https://github.com/Shopify/polaris-react/pull/3651))
- Fixed `Banner` `secondaryAction` only rendering if `action` is set ([#2949](https://github.com/Shopify/polaris-react/pull/2949))
- Added a `alwaysRenderCustomProperties` to `ThemeProvider` for elements that render outside of the DOM tree to their parent context ([#3652](https://github.com/Shopify/polaris-react/pull/3652))
- Fixed keyboard interactions for the `Tab` component ([#3650](https://github.com/Shopify/polaris-react/pull/3650))
- Fixed `TrapFocus` disallowing focus inside `Portal` ([#3790](https://github.com/Shopify/polaris-react/pull/3790))
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
- Increased contrast of navigation text color ([#3742](https://github.com/Shopify/polaris-react/pull/3742))
- Removed `-ms-high-contrast` media query from `ms-high-contrast-outline` as it is non-standard and updated the outline color from `windowText` to `transparent` ([#3775](https://github.com/Shopify/polaris-react/pull/3775)).
- Fixed `Collapsible` expand and collapse animation ([#3779](https://github.com/Shopify/polaris-react/pull/3779))
- Fixed a bug in `Page` where re-rendering of `secondaryActions` could cause layout jittering ([#3641](https://github.com/Shopify/polaris-react/pull/3641))
- Fixed `ColorPicker` checker background to remain visible on a white background ([#3812](https://github.com/Shopify/polaris-react/pull/3812))
- Fixed an incorrect translation key for `accessibilityLabel` in `Tooltip`([#3843](https://github.com/Shopify/polaris-react/pull/3843))
- Fix shadows on filled `Button`s not touching the bottom edge ([#3841](https://github.com/Shopify/polaris-react/pull/3841))
- Adjust `Thumbnail` icon color to be subdued ([#3846](https://github.com/Shopify/polaris-react/pull/3846))
- Updated ToastManager to use aria-live 'assertive' for accessibility ([#3837](https://github.com/Shopify/polaris-react/pull/3837))
- Fixed responsiveness of empty search state in `ResourceList` to support user text zoom settings ([#2983](https://github.com/Shopify/polaris-react/pull/2983))
- Fixed `ActionList` not rendering `.active` indicator ([#3854](https://github.com/Shopify/polaris-react/pull/3854))
- Prevent loss of focus when clicking clear all filters in `Filters` ([#3754](https://github.com/Shopify/polaris-react/pull/3754))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
