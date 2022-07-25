---
name: Choice list
category: Forms
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

A choice list lets you create a list of grouped radio buttons or checkboxes. Use this component if you need to group together a related list of interactive choices.

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

- Help merchants understand how the items in the list are grouped together, or should explain what kind of choice merchants are making

<!-- dodont -->

#### Do

Pick a shipping method

#### Don’t

Pick one

<!-- end -->

### Be concise and scannable

- Use simple, clear language that can be read at a glance
- Keep list titles to a single sentence
- It the title introduces the list, it should end with a colon
- Should be written in sentence case

<!-- dodont -->

#### Do

Shipping options

#### Don’t

Shipping Options

<!-- end -->

### Not use colons

<!-- dodont -->

#### Do

If the customer abandons their checkout, send them an email reminder to complete their order:

- Option a
- Option b

#### Don’t

If the customer abandons their checkout, send them an email reminder to complete their order

- Option a
- Option b

<!-- end -->

### List choices

Every item in a choice list should:

- Start with a capital letter
- Not use commas or semicolons at the end of each line
- Be written in sentence case (the first word capitalized, the rest lowercase)

<!-- dodont -->

#### Do

- Option 1
- Yellow
- Item three

#### Don’t

- option 1
- Yellow;
- Item Three

<!-- end -->

### Helper text and descriptions

If your list contains helper text, only the description below the list item should contain punctuation.

---

## Examples

### Default

Allows merchants to select one option from a list. Make sure all options are an either/or choice.

```jsx
function SingleChoiceListExample() {
  const [selected, setSelected] = useState(['hidden']);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <ChoiceList
      title="Company name"
      choices={[
        {label: 'Hidden', value: 'hidden'},
        {label: 'Optional', value: 'optional'},
        {label: 'Required', value: 'required'},
      ]}
      selected={selected}
      onChange={handleChange}
    />
  );
}
```

### With error

Allows for accessible error handling by connecting the error message to the field with the error.

```jsx
function ChoiceListWithErrorExample() {
  const [selected, setSelected] = useState('hidden');

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <ChoiceList
      title="Company name"
      choices={[
        {label: 'Hidden', value: 'hidden', describedByError: true},
        {label: 'Optional', value: 'optional'},
        {label: 'Required', value: 'required'},
      ]}
      selected={selected}
      onChange={handleChange}
      error="Company name cannot be hidden at this time"
    />
  );
}
```

### With multi-choice

Allows merchants to select multiple options from a list. Avoid options that are an either/or choice.

```jsx
function MultiChoiceListExample() {
  const [selected, setSelected] = useState(['hidden']);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <ChoiceList
      allowMultiple
      title="While the customer is checking out"
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
      onChange={handleChange}
    />
  );
}
```

### With children content

Use when you need merchants to view and/or interact with additional content under a choice. The content will always be rendered.

```jsx
function SingleOrMultiChoiceListWithChildrenContextExample() {
  const [selected, setSelected] = useState(['none']);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChoiceListChange = useCallback((value) => setSelected(value), []);

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const renderChildren = useCallback(
    () => (
      <TextField
        label="Minimum Quantity"
        labelHidden
        onChange={handleTextFieldChange}
        value={textFieldValue}
        autoComplete="off"
      />
    ),
    [handleTextFieldChange, textFieldValue],
  );

  return (
    <ChoiceList
      title="Discount minimum requirements"
      choices={[
        {label: 'None', value: 'none'},
        {label: 'Minimum purchase', value: 'minimum_purchase'},
        {
          label: 'Minimum quantity',
          value: 'minimum_quantity',
          renderChildren,
        },
      ]}
      selected={selected}
      onChange={handleChoiceListChange}
    />
  );
}
```

### With dynamic children content

Use when you need merchants to view and/or interact with additional content under a choice. The content is only rendered when the choice is selected. Works for both single-choice and multi-choice list.

```jsx
function SingleOrMultuChoiceListWithChildrenContextWhenSelectedExample() {
  const [selected, setSelected] = useState(['none']);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChoiceListChange = useCallback((value) => setSelected(value), []);

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const renderChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <TextField
          label="Minimum Quantity"
          labelHidden
          onChange={handleTextFieldChange}
          value={textFieldValue}
          autoComplete="off"
        />
      ),
    [handleTextFieldChange, textFieldValue],
  );

  return (
    <div style={{height: '150px'}}>
      <ChoiceList
        title="Discount minimum requirements"
        choices={[
          {label: 'None', value: 'none'},
          {label: 'Minimum purchase', value: 'minimum_purchase'},
          {
            label: 'Minimum quantity',
            value: 'minimum_quantity',
            renderChildren,
          },
        ]}
        selected={selected}
        onChange={handleChoiceListChange}
      />
    </div>
  );
}
```

---

## Related components

- To present a long list of radio buttons or when space is constrained, [use the select component](https://polaris.shopify.com/components/select)
- To build a group of radio buttons or checkboxes with a custom layout, use the [radio button component](https://polaris.shopify.com/components/radio-button) or [checkbox component](https://polaris.shopify.com/components/checkbox)
- To display a simple, non-interactive list of related content, [use the list component](https://polaris.shopify.com/components/list)

---

## Accessibility

The choice list component uses the accessibility features of the [checkbox](https://polaris.shopify.com/components/checkbox) and [radio button](https://polaris.shopify.com/components/radio-button) components.
