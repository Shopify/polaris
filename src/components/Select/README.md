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

---

## Related components

- To let merchants make a single selection from a list with four or fewer
  options, [use the choice list component](/components/forms/choice-list)
- To present merchants with a list of choices where they can make multiple
  selections, [use the choice list component](/components/forms/choice-list) with
  the `allow multiple` option
