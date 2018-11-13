---
name: Toggle
category: Forms
platforms:
  - web
keywords:
  - toggle
  - switch
  - selection
  - choices
  - options
  - pick
  - single selection form
  - choice form
  - option button
  - enable
  - disable
---

# Toggle

Use to present a single choice to enable or disable a setting.

---

## Best practices

Toggle should:

- Always be used with an associated label component.
- Be used to switch a single setting on and off.

---

## Content guidelines

### Toggle labels

Toggle labels should:

- Start with a capital letter

<!-- usagelist -->

#### Do

- Off

#### Don’t

- off

<!-- end -->

- Not end in punctuation if it’s a single sentence, word, or a fragment

<!-- usagelist -->

#### Do

- Off

#### Don’t

- Off;

<!-- end -->

---

## Examples

### Default toggle

Use toggle to let merchants enable or disable a setting.

```jsx
class ToggleExample extends React.Component {
  state = {
    checked: false,
  };

  toggleToggle = (value) => {
    this.setState({checked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Stack vertical>
        <Toggle
          label="Accept email marketing"
          checked={this.state.checked}
          onChange={this.toggleToggle}
        />
      </Stack>
    );
  }
}
```

### Prefix and suffix elements

<!-- example-for: web -->

Use to provide more clarity to merchants about which setting they are selecting.

```jsx
class ToggleExample extends React.Component {
  state = {
    checked: false,
  };

  toggleToggle = (value) => {
    this.setState({checked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Stack vertical>
        <Toggle
          label="Accept email marketing"
          prefix="Off"
          suffix="On"
          checked={this.state.checked}
          onChange={this.toggleToggle}
        />
      </Stack>
    );
  }
}
```

---

## Related components

- To present a list of options where merchants must make a single selection, [use the radio button component](/components/forms/radio-button)
- To give merchants a way to make a range of selections (zero, one, or multiple) [use the checkbox component](/components/forms/checkbox)
- To present merchants with a list of checkboxes, [use the choice list component](/components/forms/choice-list) with the “allow multiple” option
