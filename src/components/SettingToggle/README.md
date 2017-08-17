---
name: Setting toggle
tags:
  - on/off
  - switch
  - adjuster
category: Actions
---

# Setting toggle
Use to give the merchant control over a feature or option that can be turned
on or off.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

Merchants need to be able to turn settings on or off based on their preferences.

### Solution

Settings toggle is a visual indicator and control that lets merchants
enable or disable something.

---

## Best Practices
Settings toggles should:

* Include different body content for the enabled and disabled states
* Clearly indicate whether the setting is enabled or disabled and explain the
implications of the state of the setting to merchants (e.g. “Automatic messages
are disabled. Your customers won’t receive automatic shipping updates.”)
* Clearly state when a setting or feature is not available and why. Provide
actionable steps for merchants to unlock the functionality.

---

## Content guidelines

### Toggle description
Toggle descriptions should:

* Clearly indicate whether the setting is enabled or disabled
* Explain the implications of the state of the setting to merchants
(e.g. “Automatic messages are disabled. Your customers won’t receive automatic
shipping updates.”)

### Primary button
The primary buttons for the setting toggle should always say either “Enable” or
“Disable” depending on whether the setting can be turned on or off.

For example, if the setting toggle is on, the button should say “Disable” to
allow merchants to turn it off. If the setting toggle is off, the button should
say “Enable” to allow merchants to turn it on.

<!-- usagelist -->
#### Do
- Enable
- Disable

#### Don’t
- Turn on
- Turn off
<!-- end -->

| Prop | Type | Description |
| ---- | ---- | ----------- |
| children | React.ReactNode | Inner content of the card |
| action | Action[] | Card header actions |
| enabled | boolean | Sets toggle state to enabled or disabled |

## Examples

### Default setting toggle

Use on settings pages to allow merchants to toggle a setting that has an enabled or a disabled state.

```jsx
<SettingToggle
  action={{
    content: 'Enable',
  }}
>
  This setting is <TextStyle variation="strong">disabled</TextStyle>.
</SettingToggle>
```

---

## Related components

* To let merchants to connect or disconnect their store to third-party services and apps, [use the account connection component](/components/actions/account-connection)
