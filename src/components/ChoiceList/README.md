---
name: Choice list
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - ChoiceList
  - form
  - input
  - choices
  - select
  - group of radio buttons
  - radio button group
  - group of checkboxes
  - group of check boxes
  - list of choices
  - list of radio buttons
  - list of checkboxes
  - list of check boxes
  - multi-choice list
  - single-choice list
---

# Choice list

A choice list lets you create a list of grouped radio buttons or checkboxes.
Use this component if you need to group together a related list of interactive
choices.

---

## Best practices

Choice lists should:

- Include a title that tells merchants what to do or explains the available options
- Label options clearly based on what the option will do
- Avoid mutually exclusive options when allowing multiple selection

---

## Content guidelines

### List titles

List titles should:

- Help merchants understand how the items in the list are grouped together, or
  should explain what kind of choice merchants are making

<!-- usagelist -->

#### Do

Pick a shipping method

#### Don’t

Pick one

<!-- end -->

- Be concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep list titles to a single sentence
  - It the title introduces the list, it should end with a colon
  - Should be written in sentence case

<!-- usagelist -->

#### Do

Shipping options

#### Don’t

Shipping Options

<!-- end -->

- Not use colons

<!-- usageblock -->

#### Do

If the customer abandons their checkout, send them an email reminder to complete their order

<p>
  <label><input type="radio" name="foo"> Never</label><br />
  <label><input type="radio" name="foo"> 6 hours later</label><br />
  <label><input type="radio" name="foo"> 24 hours later</label>
</p>

#### Don’t

If the customer abandons their checkout, send them an email reminder to complete their order:

<p>
  <label><input type="radio" name="bar"> Never</label><br />
  <label><input type="radio" name="bar"> 6 hours later</label><br />
  <label><input type="radio" name="bar"> 24 hours later</label>
</p>
<!-- end -->

### List choices

Every item in a choice list should:

- Start with a capital letter

<!-- usageblock -->

#### Do

- Option 1
- Option 2
- Option 3

#### Don’t

- option 1
- option 2
- option 3

<!-- end -->

- Not use commas or semicolons at the end of each line

<!-- usageblock -->

#### Do

- Red
- Yellow
- Blue

#### Don’t

- Red;
- Yellow;
- Blue.

<!-- end -->

- Be written in sentence case (the first word capitalized, the rest lowercase)

<!-- usageblock -->

#### Do

- Item one
- Item two
- Item three

#### Don’t

- Item One
- Item Two
- Item Three

<!-- end -->

### Helper text and descriptions

If your list contains helper text, only the description below the list item should contain punctuation.

---

## Examples

### Single choice list

Allows merchants to select one option from a list.

- Make sure all options are an either/or choice.

```jsx
class ChoiceListExample extends React.Component {
  state = {
    selected: ['hidden'],
  };

  render() {
    const {selected} = this.state;

    return (
      <ChoiceList
        title={'Company name'}
        choices={[
          {label: 'Hidden', value: 'hidden'},
          {label: 'Optional', value: 'optional'},
          {label: 'Required', value: 'required'},
        ]}
        selected={selected}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (value) => {
    this.setState({selected: value});
  };
}
```

<!-- content-for: android -->

![Single choice list for Android](components/ChoiceList/android/single-choice.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Single choice list for iOS](components/ChoiceList/ios/single-choice.png)

<!-- /content-for -->

### Multi-choice list

Allows merchants to select multiple options from a list.

- Avoid options that are an either/or choice.

```jsx
class ChoiceListExample extends React.Component {
  state = {
    selected: ['hidden'],
  };

  render() {
    const {selected} = this.state;

    return (
      <ChoiceList
        allowMultiple
        title={'While the customer is checking out'}
        choices={[
          {
            label: 'Use the shipping address as the billing address by default',
            value: 'shipping',
            helpText:
              'Reduces the number of fields required to check out. The billing address can still be edited.',
          },
          {
            label: 'Require a confirmation step',
            value: 'confirmation',
            helpText:
              'Customers must review their order details before purchasing.',
          },
        ]}
        selected={selected}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (value) => {
    this.setState({selected: value});
  };
}
```

<!-- content-for: android -->

![Multi choice list for Android](components/ChoiceList/android/multi-choice.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Multi choice list for iOS](components/ChoiceList/ios/multi-choice.png)

<!-- /content-for -->

### Single-choice or multi-choice list with children content (always rendered)

<!-- example-for: web -->

Use when you need merchants to view and/or interact with additional content under a choice. The content will always be rendered. Works for both single-choice and multi-choice list.

```jsx
class ChoiceListExample extends React.Component {
  state = {
    selected: ['none'],
    textFieldValue: '',
  };

  render() {
    const {selected, textFieldValue} = this.state;

    return (
      <ChoiceList
        title={'Discount minimum requirements'}
        choices={[
          {label: 'None', value: 'none'},
          {label: 'Minimum purchase', value: 'minimum_purchase'},
          {
            label: 'Minimum quantity',
            value: 'minimum_quantity',
            renderChildren: () => {
              return (
                <TextField
                  label="Minimum Quantity"
                  labelHidden
                  onChange={this.handleTextFieldChange}
                  value={textFieldValue}
                />
              );
            },
          },
        ]}
        selected={selected}
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (value) => {
    this.setState({selected: value});
  };

  handleTextFieldChange = (value) => {
    this.setState({textFieldValue: value});
  };
}
```

### Single-choice or multi-choice list with children content (only rendered when choice is selected)

<!-- example-for: web -->

Use when you need merchants to view and/or interact with additional content under a choice. The content is only rendered when the choice is selected. Works for both single-choice and multi-choice list.

```jsx
class ChoiceListExample extends React.Component {
  state = {
    selected: ['none'],
    textFieldValue: '',
  };

  render() {
    const {selected, textFieldValue} = this.state;

    return (
      <div style={{height: '150px'}}>
        <ChoiceList
          title={'Discount minimum requirements'}
          choices={[
            {label: 'None', value: 'none'},
            {label: 'Minimum purchase', value: 'minimum_purchase'},
            {
              label: 'Minimum quantity',
              value: 'minimum_quantity',
              renderChildren: (isSelected) => {
                return (
                  isSelected && (
                    <TextField
                      label="Minimum Quantity"
                      labelHidden
                      onChange={this.handleTextFieldChange}
                      value={textFieldValue}
                    />
                  )
                );
              },
            },
          ]}
          selected={selected}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleChange = (value) => {
    this.setState({selected: value});
  };

  handleTextFieldChange = (value) => {
    this.setState({textFieldValue: value});
  };
}
```

---

## Related components

- To present a long list of radio buttons or when space is constrained, [use the select component](/components/forms/select)
- To build a group of radio buttons or checkboxes with a custom layout, use the [radio button component](/components/forms/radio-button) or [checkbox component](/components/forms/checkbox)
- To display a simple, non-interactive list of related content, [use the list component](/components/lists-and-tables/list)
