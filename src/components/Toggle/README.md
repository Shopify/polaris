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

Use to present a single choice to enable or disable a setting. Toggle is best used when multiple settings can be enabled or disabled and then saved all at once.

---

## Best practices

Toggle should:

- Be used when there are only two options available (enabled or disabled) and not a range of selections (zero, one, or multiple).
- Be used to switch a single setting on and off.
- Always be used with an associated label component.

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
    visaChecked: true,
    masterCardChecked: false,
  };

  toggleVisaToggle = (value) => {
    this.setState({visaChecked: value});
  };

  toggleMasterCardToggle = (value) => {
    this.setState({masterCardChecked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Stack vertical>
        <Card title="Payment methods">
          <Card.Section>
            <Stack distribution="fillEvenly">
              <Stack.Item>Visa</Stack.Item>
              <Stack.Item>Credit card</Stack.Item>
              <Stack.Item>2.99% + $0.30</Stack.Item>
              <Toggle
                label=""
                labelHidden
                checked={this.state.visaChecked}
                onChange={this.toggleVisaToggle}
              />
            </Stack>
          </Card.Section>
          <Card.Section>
            <Stack distribution="fillEvenly">
              <Stack.Item>MasterCard</Stack.Item>
              <Stack.Item>Credit card</Stack.Item>
              <Stack.Item>2.99% + $0.30</Stack.Item>
              <Toggle
                label=""
                labelHidden
                checked={this.state.masterCardChecked}
                onChange={this.toggleMasterCardToggle}
              />
            </Stack>
          </Card.Section>
        </Card>
      </Stack>
    );
  }
}
```

### Prefix and suffix elements

<!-- example-for: web -->

Use to provide more clarity to merchants about which setting they are choosing.

```jsx
class ToggleExample extends React.Component {
  state = {
    visaChecked: true,
    masterCardChecked: false,
  };

  toggleVisaToggle = (value) => {
    this.setState({visaChecked: value});
  };

  toggleMasterCardToggle = (value) => {
    this.setState({masterCardChecked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Stack vertical>
        <Card title="Payment methods">
          <Card.Section>
            <Stack distribution="fillEvenly">
              <Stack.Item>Visa</Stack.Item>
              <Stack.Item>Credit card</Stack.Item>
              <Stack.Item>2.99% + $0.30</Stack.Item>
              <Toggle
                label=""
                labelHidden
                prefix="Disable"
                suffix="Enable"
                checked={this.state.visaChecked}
                onChange={this.toggleVisaToggle}
              />
            </Stack>
          </Card.Section>
          <Card.Section>
            <Stack distribution="fillEvenly">
              <Stack.Item>MasterCard</Stack.Item>
              <Stack.Item>Credit card</Stack.Item>
              <Stack.Item>2.99% + $0.30</Stack.Item>
              <Toggle
                label=""
                labelHidden
                prefix="Disable"
                suffix="Enable"
                checked={this.state.masterCardChecked}
                onChange={this.toggleMasterCardToggle}
              />
            </Stack>
          </Card.Section>
        </Card>
      </Stack>
    );
  }
}
```

### Disabled toggle

<!-- example-for: web -->

Use for settings that aren’t currently able to change.

```jsx
class ToggleExample extends React.Component {
  state = {
    visaChecked: true,
    masterCardChecked: false,
  };

  toggleVisaToggle = (value) => {
    this.setState({visaChecked: value});
  };

  toggleMasterCardToggle = (value) => {
    this.setState({masterCardChecked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Stack vertical>
        <Card title="Payment methods">
          <Card.Section>
            <Stack distribution="fillEvenly">
              <Stack.Item>Visa</Stack.Item>
              <Stack.Item>Credit card</Stack.Item>
              <Stack.Item>2.99% + $0.30</Stack.Item>
              <Toggle
                label=""
                labelHidden
                checked={this.state.visaChecked}
                onChange={this.toggleVisaToggle}
              />
            </Stack>
          </Card.Section>
          <Card.Section>
            <Stack distribution="fillEvenly">
              <Stack.Item>MasterCard</Stack.Item>
              <Stack.Item>Credit card</Stack.Item>
              <Stack.Item>2.99% + $0.30</Stack.Item>
              <Toggle
                label=""
                labelHidden
                disable
                checked={this.state.masterCardChecked}
                onChange={this.toggleMasterCardToggle}
              />
            </Stack>
          </Card.Section>
        </Card>
      </Stack>
    );
  }
}
```

---

## Related components

- To give merchants control over a feature or option that can be turned on or off, [use the setting toggle component](/components/actions/setting-toggle). Setting toggle is best used when the setting is saved immediately on change.
- To present a list of options where merchants must make a single selection, [use the radio button component](/components/forms/radio-button)
- To give merchants a way to make a range of selections (zero, one, or multiple) [use the checkbox component](/components/forms/checkbox)
- To present merchants with a list of checkboxes, [use the choice list component](/components/forms/choice-list) with the “allow multiple” option
