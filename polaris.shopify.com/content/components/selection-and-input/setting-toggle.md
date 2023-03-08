---
title: Setting toggle
description: Use to give merchants control over a feature or option that can be turned on or off.
category: Selection and input
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
  - fileName: setting-toggle-with-child-content-only.tsx
    title: With child content only
    description: Setting toggles with child content only are supported for backward compatibility. Use the `title` and `description` props to name and describe the setting purpose instead of nesting these elements as `children`.
  - fileName: setting-toggle-with-title-status-and-description.tsx
    title: With title, status, and description
    description: Use to allow merchants to toggle a setting that has an on or off state. Set the setting name on the `title` prop and set the `description` prop with the context merchants need to decide whether or not to enable the setting.
  - fileName: setting-toggle-with-all-of-its-elements.tsx
    title: With all of its elements
    description: Use to provide merchants additonal information for the setting, such as requirements or conditions for enabling or disabling it.
---

## Best practices

The setting toggle component should be used when:

- The setting is stand alone, and
- There are only two binary options that are “On”/“Off”

If the setting is dependent on other settings, uses progressive disclosure, or has options that are not a simple “On”/“Off”, use a different UI element such as [Checkbox](https://polaris.shopify.com/components/selection-and-input/checkbox) or [Radio button](https://polaris.shopify.com/components/selection-and-input/radio-button).

Settings toggles should:

- Include body content describing the experience when the setting is turned on.
- Use a badge to clearly indicate whether the setting is turned on or off.
- Use a default button for both states. A primary button can be misinterpreted as the setting being turned on.

If more information is needed to explain setting details or functionality, include the [Info](https://polaris.shopify.com/icons?icon=InfoMinor&q=) icon and link to help content or related documentation.

---

## Content guidelines

### Card title

The setting toggle title should:

- Be the setting name, written as a noun or gerund (-ing) phrase (“Test mode” or “Automatic order archiving”)
- Represent the experience when the setting is turned on—even if the setting restricts, limits, removes, or hides functionality

<!-- dodont -->

#### Do

- Test mode
- Order archiving
- Self-serve returns

#### Don’t

- Simulate test payments
- Automatically archive the order
- Allow customers to manage returns

<!-- end -->

### Status badge

The status badge for the setting toggle should always say either “On” or “Off” to indicate the current status.

<!-- dodont -->

#### Do

- On
- Off

#### Don’t

- Active
- Inactive
- Visible
- Not visible

<!-- end -->

### On/Off button

The button for the setting toggle should always say either “Turn on” or “Turn off” depending on whether the setting can be turned on or off.

<!-- dodont -->

#### Do

- Turn on
- Turn off

#### Don’t

- Enable
- Disable
- Activate
- Deactivate

<!-- end -->

### Supporting content

In addition to the setting description, supporting content can dynamically display based on state. This should be used sparingly and included only if it adds significant clarity or value. For example, “Your customers won’t receive automatic shipping updates.”

---

## Related components

To let merchants connect or disconnect third-party services and apps, use the [account connection](https://polaris.shopify.com/components/account-connection) component.

---

## Accessibility

The `SettingToggle` component is implemented as an HTML `<button>` with the `switch` [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role).
The components passed as children will automatically be wrapped in a label element describing the `<button>`. Enabling and disabling `SettingToggle` will update the `aria-checked` attribute to `"true"` or `"false"`.

To learn more about button accessibility, check out the [button](https://polaris.shopify.com/components/actions/button) component documentation.
