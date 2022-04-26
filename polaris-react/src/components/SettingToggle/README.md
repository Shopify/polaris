---
name: Setting toggle
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
---

# Setting toggle

Use to give merchants control over a feature or option that can be turned
on or off.

---

## Best practices

Settings toggles should:

- Include different body content for the activated and deactivated states.
- Clearly indicate whether the setting is activated or deactivated and explain the
  implications of the state of the setting to merchants. (“Automatic messages
  are deactivated. Your customers won’t receive automatic shipping updates.”)
- Clearly state when a setting or feature is not available and why. Provide
  actionable steps for merchants to unlock the functionality.

---

## Content guidelines

### Toggle description

Toggle descriptions should:

- Clearly indicate whether the setting is activated or deactivated
- Explain the implications of the state of the setting to merchants
  (“Automatic messages are deactivated. Your customers won’t receive automatic
  shipping updates.”)

### Primary button

The primary buttons for the setting toggle should always say either “Activate” or
“Deactivate” depending on whether the setting can be turned on or off.

For example, if the setting toggle is on, the button should say “Deactivate” to
allow merchants to turn it off. If the setting toggle is off, the button should
say “Activate” to allow merchants to turn it on.

<!-- usagelist -->

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

- To let merchants connect or disconnect third-party services and apps, [use the account connection component](https://polaris.shopify.com/components/actions/account-connection)

---

## Accessibility

<!-- content-for: web -->

The setting toggle component is implemented as an HTML `<button>`. The current label should convey what happens when the button is pressed.

To learn more about button accessibility, see the [button component](https://polaris.shopify.com/components/actions/button).

<!-- /content-for-->
