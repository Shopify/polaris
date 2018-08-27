---
name: Select
category: Forms
keywords:
  - on off
  - switch
  - adjuster
  - dropdown menu
  - drop-down menu
  - menu
  - form
  - combobox
  - combo box
  - choice list
  - choicelist
  - list
  - disabled select
  - field label
  - long list of options
  - long option list
  - separate error message
---

# Select

Select lets merchants choose one option from a list in a dropdown menu. It
works well for lists of more than four choices when displaying them could
clutter up the interface.

---

## Best Practices

The select component should:

- Be used for lists of four or more items
- List items within the menu alphabetically or some other logical order so
  merchants can easily find the selection they need
- Provide a label to clearly identify the content being presented in the drop
  down menu
- Have a default option selected, where possible
- Have a placeholder option with the text “Select” if there is no logical
  default option

---

## Content guidelines

### Field label

A label is a short description of the requested input. Labels are not help
text, and they don’t provide instruction, but they should be meaningful and
clearly indicate what is expected. Labels should be:

- Placed above or beside the form field
- Short and succinct (1–3 words)
- Written in sentence case (the first word capitalized, the rest lowercase)

<!-- usagelist -->

#### Do

- Email address

#### Don’t

- What is your email address?

<!-- end -->

<!-- usagelist -->

#### Do

- Phone number

#### Don’t

- My phone number is:

<!-- end -->

### Menu options

The list of options in a menu should:

- Be concise but still give the merchant enough information so they can easily
  make a selection
- Be arranged alphabetically or in some other clear logical order

### Placeholder option

The placeholder option should be the text “Select”.

---

## Examples

### Default select

Use when a merchant needs to choose one option from a list of four or more.

```jsx
class SelectExample extends React.Component {
  state = {
    selected: 'today',
  };

  handleChange = (newValue) => {
    this.setState({selected: newValue});
  };

  render() {
    const options = [
      {label: 'Today', value: 'today'},
      {label: 'Yesterday', value: 'yesterday'},
      {label: 'Last 7 days', value: 'lastWeek'},
    ];

    return (
      <Select
        label="Date range"
        options={options}
        onChange={this.handleChange}
        value={this.state.selected}
      />
    );
  }
}
```

### Select with inline label

Use only for cases where the select must fit on a single line, such as in a toolbar.

```jsx
class InlineLabelExample extends React.Component {
  state = {
    selected: 'newestUpdate',
  };

  handleChange = (newValue) => {
    this.setState({selected: newValue});
  };

  render() {
    const options = [
      {label: 'Newest update', value: 'newestUpdate'},
      {label: 'Oldest update', value: 'oldestUpdate'},
      {label: 'Most spent', value: 'mostSpent'},
      {label: 'Most orders', value: 'mostOrders'},
      {label: 'Last name A–Z', value: 'lastNameAlpha'},
      {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
    ];

    return (
      <Select
        label="Sort by"
        labelInline
        options={options}
        onChange={this.handleChange}
        value={this.state.selected}
      />
    );
  }
}
```

### Disabled select

Use for selections that aren’t currently available. The surrounding interface should make it clear why the select box is disabled and how to activate it.

```jsx
<Select
  label="Date range"
  disabled
  options={[
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ]}
/>
```

<!-- /content-for -->

### Select with validation error

<!-- example-for: web -->

Use to let merchants know if their input is valid or if there’s an error. Whenever possible, validate input as soon as a merchant has finished interacting with a field (but not before). If a field already has an error, validate and remove errors as the merchant types so they can immediately see when an error has been fixed.

```jsx
class ValidationErrorExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <Select
        label="Province"
        options={['Alberta']}
        value={this.state.value}
        onChange={this.handleChange}
        error="Province is required"
      />
    );
  }
}
```

### Select with separate validation error

Use to let merchants know when their select input is invalid in the context of a group of form inputs that the select depends on.

When the `error` prop has a boolean value of `true`, the select component indicates to merchants that their input is invalid without rendering an error message directly below it. It anticipates that an inline error component exists separately within the form.

To render an invalid select and its validation error separately:

- Set a unique identifier to the select component `id` prop
- Set a boolean to the select component `error` prop
- Use an [inline error component](/components/forms/inline-error) to describe the invalid select input and set its `fieldID` prop to the same unique identifier used for the text field `id`

```jsx
class SeparateValidationErrorExample extends React.Component {
  state = {
    weight: '12',
    unit: '',
  };

  render() {
    const {weight, unit} = this.state;
    const unitSelectID = 'unit';
    const errorMessage = this.generateErrorMessage();
    const formGroupMarkup = (
      <Stack vertical spacing="extraTight">
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField
              label="Product weight"
              type="number"
              value={weight}
              onChange={this.handleChange('weight')}
              error={Boolean(!weight && unit)}
            />
            <Select
              id={unitSelectID}
              label="Unit of measure"
              placeholder="Select"
              options={['oz', 'g', 'kg', 'lb']}
              value={unit}
              onChange={this.handleChange('unit')}
              error={Boolean(!unit && weight)}
            />
          </FormLayout.Group>
        </FormLayout>
        <InlineError message={errorMessage} fieldID={unitSelectID} />
      </Stack>
    );

    return <Card sectioned>{formGroupMarkup}</Card>;
  }

  handleChange = (field) => (value) => {
    this.setState({[field]: value});
  };

  generateErrorMessage = () => {
    const {weight, unit} = this.state;
    const weightError =
      !weight && unit ? 'The numeric weight of the product ' : '';
    const unitError =
      !unit && weight ? 'The unit of measure for the product weight' : '';

    if (!weightError && !unitError) {
      return '';
    }

    return (
      <span>
        <TextStyle variation="negative">
          <p>
            {`${weightError}${unitError} is required when weight based shipping rates are enabled. `}
            <Link>Manage shipping</Link>
          </p>
        </TextStyle>
      </span>
    );
  };
}
```

---

## Related components

- To let merchants make a single selection from a list with four or fewer
  options, [use the choice list component](/components/forms/choice-list)
- To present merchants with a list of choices where they can make multiple
  selections, [use the choice list component](/components/forms/choice-list) with
  the `allow multiple` option
