---
title: Setting toggle
description: Use to give merchants control over a feature or option that can be turned on or off.
category: Actions
keywords:
  - SettingToggle
  - settings buttons
  - setting buttons
  - enable buttons
  - disable buttons
  - setting switches
  - turn on button
  - turn off button
  - option button
  - on off
  - switch
  - adjuster
examples:
  - fileName: setting-toggle-default.tsx
    title: Default
    description: Use on settings pages to allow merchants to toggle a setting that has an activated or a deactivated state.
---

## Best practices

Settings toggles should:

- Include different body content for the activated and deactivated states.
- Clearly indicate whether the setting is activated or deactivated and explain the implications of the state of the setting to merchants. (“Automatic messages are deactivated. Your customers won’t receive automatic shipping updates.”)
- Clearly state when a setting or feature is not available and why. Provide actionable steps for merchants to unlock the functionality.

---

## Content guidelines

### Toggle description

Toggle descriptions should:

- Clearly indicate whether the setting is activated or deactivated
- Explain the implications of the state of the setting to merchants (“Automatic messages are deactivated. Your customers won’t receive automatic shipping updates.”)

### Primary button

The primary buttons for the setting toggle should always say either “Activate” or “Deactivate” depending on whether the setting can be turned on or off.

For example, if the setting toggle is on, the button should say “Deactivate” to allow merchants to turn it off. If the setting toggle is off, the button should say “Activate” to allow merchants to turn it on.

<!-- dodont -->

#### Do

- Activate
- Deactivate

#### Don’t

- Enable
- Disable
- Turn on
- Turn off

<!-- end -->

---

## Related components

- To let merchants connect or disconnect third-party services and apps, [use the account connection component](https://polaris.shopify.com/components/account-connection)

---

## Accessibility

The setting toggle component is implemented as an HTML `<button>` with the `switch` [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role).
The components passed as children will automatically be wrapped in a label element describing the `<button>`. Enabling and disabling the SettingToggle with update the `aria-checked` attribute to `"true"` or `"false"`.

To learn more about button accessibility, see the [button component](https://polaris.shopify.com/components/actions/button).
