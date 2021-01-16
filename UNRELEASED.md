# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

### Enhancements

- Changed `Label` and `Labelled`’s `label` prop type to `React.ReactNode` instead of `string` ([#3787](https://github.com/Shopify/polaris-react/pull/3787))

### Bug fixes

- Updated examples for `DropZone` so they accept all image types ([ #3700 ](https://github.com/Shopify/polaris-react/issues/3700))
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
- Fixed an incorrect translation key for `accessibilityLabel` in `Tooltip`([#3843](https://github.com/Shopify/polaris-react/pull/3843))
- Fix shadows on filled `Button`s not touching the bottom edge ([#3841](https://github.com/Shopify/polaris-react/pull/3841))
- Adjust `Thumbnail` icon color to be subdued ([#3846](https://github.com/Shopify/polaris-react/pull/3846))
- Updated ToastManager to use aria-live 'assertive' for accessibility ([#3837](https://github.com/Shopify/polaris-react/pull/3837))
- Fixed responsiveness of empty search state in `ResourceList` to support user text zoom settings ([#2983](https://github.com/Shopify/polaris-react/pull/2983))

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
