---
name: Range slider
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - RangeSlider
  - input
  - range
  - slider
  - percent
  - number
  - range form
---

# Range slider

A range slider is an input field that merchants can use to select a numeric value within a given range (minimum and maximum values).

---

## Best practices

Range sliders should:

- Always be used with a label, even if that label is `hidden`.
- When a label is visible, it should clearly communicate the purpose of the range input and its values (min, max, step, value)
- Be labeled as “Optional” when you need to request input that’s not required
- Validate input as soon as merchants have finished interacting with a field (but not before)
- Always be used with `accessibilityInputs` when range slider has dual thumbs, to provide accessible alternatives to sliding the thumbs

---

## Content guidelines

### Range label

A label is a short description of the requested input. Labels are not instructional text but they should be meaningful and clearly indicate what is expected. Labels should be:

- Placed above the form field
- Short and succinct (1–3 words)
- Written in sentence case (the first word capitalized, the rest lowercase)

<!-- usagelist -->

#### Do

- Saturation percentage
- Banner width

#### Don’t

- What is the saturation value?
- The banner width is:

<!-- end -->

### Designating optional fields

Try to only ask for information that’s required. If you need to ask merchants
to provide optional information, mark the field optional by placing the text “(optional)” at the end of the field’s label. Don’t mark required fields with asterisks.

<!-- usagelist -->

#### Do

- Banner width (optional)

#### Don’t

- Banner width

<!-- end -->

### Help text

Help text provides extra guidance or instruction to people filling out a form field. It can also be used to clarify how the information will be used. As with all form content, help text should be succinct and easy to read.

<!-- usagelist -->

#### Do

- Video duration is calculated in seconds

#### Don’t

- Example: 134 seconds

<!-- end -->

### Validation error messages

Error messages should:

- Clearly explain what went wrong and how to fix it
- Be short and concise, no more than a single sentence
- Use [passive voice](/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed for the error

<!-- usagelist -->

#### Do

- Video duration is required

#### Don’t

- You didn’t enter a duration

<!-- end -->

---

## Examples

### Default range slider

Use range sliders where merchants may need to select a percentage between `0 — 100`.

```jsx
class RangeSliderExample extends React.Component {
  state = {
    value: 32,
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <Card sectioned>
        <RangeSlider
          label="Opacity percentage"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Card>
    );
  }
}
```

<!-- content-for: android -->

![Range slider for Android](/public_images/components/RangeSlider/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Range slider for iOS](/public_images/components/RangeSlider/ios/default@2x.png)

<!-- /content-for -->

### More precise range control

<!-- example-for: web -->

For a more precise value, you can define a `min` and `max` range, as well as the amount with which the slider will be incremented.

```jsx
class RangeSliderExample extends React.Component {
  state = {
    value: 5,
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <Card sectioned>
        <RangeSlider
          label="Logo offset"
          min={-10}
          max={10}
          step={5}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Card>
    );
  }
}
```

### Prefix and suffix elements

<!-- example-for: web -->

Because a range slider can also output a `label` and `helpText`, the height of the overall component can vary. `prefix` and `suffix` props allow you to pass in a React element to be placed before or after the rendered `input`, allowing for perfect vertical alignment and easier stylistic control.

```jsx
class RangeSliderExample extends React.Component {
  state = {
    value: 100,
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    const suffixStyles = {
      minWidth: '24px',
      textAlign: 'right',
    };

    return (
      <Card sectioned>
        <RangeSlider
          label="Hue color mix"
          min={0}
          max={360}
          value={this.state.value}
          onChange={this.handleChange}
          prefix={<p>Hue</p>}
          suffix={<p style={suffixStyles}>{this.state.value}</p>}
        />
      </Card>
    );
  }
}
```

### Dual thumb range slider

Use a dual thumb range slider when merchants need to select a range of values.

```jsx
class RangeSliderExample extends React.Component {
  handleChange = (value) => {
    console.log({value});
  };

  render() {
    return (
      <Card sectioned>
        <RangeSlider
          label=""
          value={[35, 60]}
          onChange={this.handleChange}
          accessibilityInputs
          step={5}
        />
      </Card>
    );
  }
}
```

---

## Related components

- To collect a number value as a text input, [use the text field component](/components/forms/text-field)
