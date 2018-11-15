---
name: Toggle
category: Forms
platforms:
  - web
keywords:
  - toggle
  - switch
  - setting
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
    americanExpressChecked: false,
  };

  toggleVisaToggle = (value) => {
    this.setState({visaChecked: value});
  };

  toggleAmericanExpressToggle = (value) => {
    this.setState({americanExpressChecked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Card title="Payment methods">
        <Card.Section>
          <div
            style={{
              display: 'grid',
              gridColumnGap: '15px',
            }}
          >
            <div
              style={{
                gridColumnStart: '1',
                gridColumnEnd: '2',
              }}
            >
              <Image
                source="https://cdn.shopify.com/s/files/1/0048/7889/3112/files/visa.png?12829487775437184457"
                alt="Visa"
              />
            </div>
            <div style={{gridColumnStart: '2', gridColumnEnd: '3'}}>Visa</div>
            <div
              style={{
                gridColumnStart: '3',
                gridColumnEnd: '5',
                justifySelf: 'right',
              }}
            >
              Credit card
            </div>
            <div
              style={{
                gridColumnStart: '5',
                gridColumnEnd: '7',
                justifySelf: 'right',
              }}
            >
              2.99% + $0.30
            </div>
            <div
              style={{
                gridColumnStart: '7',
                gridColumnEnd: '9',
                justifySelf: 'right',
              }}
            >
              <Toggle
                label=""
                labelHidden
                checked={this.state.visaChecked}
                onChange={this.toggleVisaToggle}
              />
            </div>
          </div>
        </Card.Section>
        <Card.Section>
          <div
            style={{
              display: 'grid',
              gridColumnGap: '15px',
            }}
          >
            <div style={{gridColumnStart: '1', gridColumnEnd: '2'}}>
              <Image
                source="https://cdn.shopify.com/s/files/1/0048/7889/3112/files/amex.png?12829487775437184457"
                alt="American Express"
              />
            </div>
            <div style={{gridColumnStart: '2', gridColumnEnd: '3'}}>AMEX</div>
            <div
              style={{
                gridColumnStart: '3',
                gridColumnEnd: '5',
                justifySelf: 'right',
              }}
            >
              Credit card
            </div>
            <div
              style={{
                gridColumnStart: '5',
                gridColumnEnd: '7',
                justifySelf: 'right',
              }}
            >
              2.99% + $0.30
            </div>
            <div
              style={{
                gridColumnStart: '7',
                gridColumnEnd: '9',
                justifySelf: 'right',
              }}
            >
              <Toggle
                label=""
                labelHidden
                checked={this.state.americanExpressChecked}
                onChange={this.toggleAmericanExpressToggle}
              />
            </div>
          </div>
        </Card.Section>
      </Card>
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
    americanExpressChecked: false,
  };

  toggleVisaToggle = (value) => {
    this.setState({visaChecked: value});
  };

  toggleAmericanExpressToggle = (value) => {
    this.setState({americanExpressChecked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Card title="Payment methods">
        <Card.Section>
          <div
            style={{
              display: 'grid',
              gridColumnGap: '15px',
            }}
          >
            <div
              style={{
                gridColumnStart: '1',
                gridColumnEnd: '2',
              }}
            >
              <Image
                source="https://cdn.shopify.com/s/files/1/0048/7889/3112/files/visa.png?12829487775437184457"
                alt="Visa"
              />
            </div>
            <div style={{gridColumnStart: '2', gridColumnEnd: '3'}}>Visa</div>
            <div
              style={{
                gridColumnStart: '3',
                gridColumnEnd: '5',
                justifySelf: 'right',
              }}
            >
              Credit card
            </div>
            <div
              style={{
                gridColumnStart: '5',
                gridColumnEnd: '7',
                justifySelf: 'right',
              }}
            >
              2.99% + $0.30
            </div>
            <div
              style={{
                gridColumnStart: '7',
                gridColumnEnd: '9',
                justifySelf: 'right',
              }}
            >
              <Toggle
                label=""
                labelHidden
                checked={this.state.visaChecked}
                onChange={this.toggleVisaToggle}
                prefix="Disabled"
                suffix="Enabled"
              />
            </div>
          </div>
        </Card.Section>
        <Card.Section>
          <div
            style={{
              display: 'grid',
              gridColumnGap: '15px',
            }}
          >
            <div style={{gridColumnStart: '1', gridColumnEnd: '2'}}>
              <Image
                source="https://cdn.shopify.com/s/files/1/0048/7889/3112/files/amex.png?12829487775437184457"
                alt="American Express"
              />
            </div>
            <div style={{gridColumnStart: '2', gridColumnEnd: '3'}}>AMEX</div>
            <div
              style={{
                gridColumnStart: '3',
                gridColumnEnd: '5',
                justifySelf: 'right',
              }}
            >
              Credit card
            </div>
            <div
              style={{
                gridColumnStart: '5',
                gridColumnEnd: '7',
                justifySelf: 'right',
              }}
            >
              2.99% + $0.30
            </div>
            <div
              style={{
                gridColumnStart: '7',
                gridColumnEnd: '9',
                justifySelf: 'right',
              }}
            >
              <Toggle
                label=""
                labelHidden
                checked={this.state.americanExpressChecked}
                onChange={this.toggleAmericanExpressToggle}
                prefix="Disabled"
                suffix="Enabled"
              />
            </div>
          </div>
        </Card.Section>
      </Card>
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
    americanExpressChecked: false,
  };

  toggleVisaToggle = (value) => {
    this.setState({visaChecked: value});
  };

  toggleAmericanExpressToggle = (value) => {
    this.setState({americanExpressChecked: value});
  };

  render() {
    const {value} = this.state;
    return (
      <Card title="Payment methods">
        <Card.Section>
          <div
            style={{
              display: 'grid',
              gridColumnGap: '15px',
            }}
          >
            <div
              style={{
                gridColumnStart: '1',
                gridColumnEnd: '2',
              }}
            >
              <Image
                source="https://cdn.shopify.com/s/files/1/0048/7889/3112/files/visa.png?12829487775437184457"
                alt="Visa"
              />
            </div>
            <div style={{gridColumnStart: '2', gridColumnEnd: '3'}}>Visa</div>
            <div
              style={{
                gridColumnStart: '3',
                gridColumnEnd: '5',
                justifySelf: 'right',
              }}
            >
              Credit card
            </div>
            <div
              style={{
                gridColumnStart: '5',
                gridColumnEnd: '7',
                justifySelf: 'right',
              }}
            >
              2.99% + $0.30
            </div>
            <div
              style={{
                gridColumnStart: '7',
                gridColumnEnd: '9',
                justifySelf: 'right',
              }}
            >
              <Toggle
                label=""
                labelHidden
                checked={this.state.visaChecked}
                onChange={this.toggleVisaToggle}
              />
            </div>
          </div>
        </Card.Section>
        <Card.Section>
          <div
            style={{
              display: 'grid',
              gridColumnGap: '15px',
            }}
          >
            <div style={{gridColumnStart: '1', gridColumnEnd: '2'}}>
              <Image
                source="https://cdn.shopify.com/s/files/1/0048/7889/3112/files/amex.png?12829487775437184457"
                alt="American Express"
              />
            </div>
            <div style={{gridColumnStart: '2', gridColumnEnd: '3'}}>AMEX</div>
            <div
              style={{
                gridColumnStart: '3',
                gridColumnEnd: '5',
                justifySelf: 'right',
              }}
            >
              Credit card
            </div>
            <div
              style={{
                gridColumnStart: '5',
                gridColumnEnd: '7',
                justifySelf: 'right',
              }}
            >
              2.99% + $0.30
            </div>
            <div
              style={{
                gridColumnStart: '7',
                gridColumnEnd: '9',
                justifySelf: 'right',
              }}
            >
              <Toggle
                label=""
                labelHidden
                checked={this.state.americanExpressChecked}
                onChange={this.toggleAmericanExpressToggle}
                disabled
              />
            </div>
          </div>
        </Card.Section>
      </Card>
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
