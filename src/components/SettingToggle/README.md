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

- Include different body content for the enabled and disabled states
- Clearly indicate whether the setting is enabled or disabled and explain the
  implications of the state of the setting to merchants (“Automatic messages
  are disabled. Your customers won’t receive automatic shipping updates.”)
- Clearly state when a setting or feature is not available and why. Provide
  actionable steps for merchants to unlock the functionality.

---

## Content guidelines

### Toggle description

Toggle descriptions should:

- Clearly indicate whether the setting is enabled or disabled
- Explain the implications of the state of the setting to merchants
  (“Automatic messages are disabled. Your customers won’t receive automatic
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

---

## Examples

### Default setting toggle

Use on settings pages to allow merchants to toggle a setting that has an enabled or a disabled state.

```jsx
function SettingToggleExample() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Disable' : 'Enable';
  const textStatus = active ? 'enabled' : 'disabled';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={active}
    >
      This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
    </SettingToggle>
  );
}
```

---

## Related components

- To let merchants to connect or disconnect their store to third-party services and apps, [use the account connection component](https://polaris.shopify.com/components/actions/account-connection)

---

## Accessibility

<!-- content-for: web -->

The setting toggle component is implemented as an HTML `<button>`. The current label should convey what happens when the button is pressed.

To learn more about button accessibility, see the [button component](https://polaris.shopify.com/components/actions/button).

<!-- /content-for-->
