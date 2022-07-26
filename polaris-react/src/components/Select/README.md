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

Select lets merchants choose one option from an options menu. Consider select when you have 4 or more options, to avoid cluttering the interface.

---

## Best practices

The select component should:

- Be used for selecting between 4 or more pre-defined options
- Have a default option selected whenever possible
- Use “Select” as a placeholder option only if there’s no logical default option

---

## Content guidelines

### Select label

Labels should:

- Give a short description (1–3 words) of the requested input.
- Be written in sentence case (the first word capitalized, the rest lowercase).
- Avoid punctuation and articles (“the”, “an”, “a”).
- Be independent sentences. To support [internationalization](https://polaris.shopify.com/foundations/internationalization), they should not act as the first part of a sentence that is finished by the component’s options.
- Be descriptive, not instructional. If the selection needs more explanation, use help text below the field.

<!-- dodont -->

#### Do

- Email address

#### Don’t

- What is your email address?

<!-- end -->

<!-- dodont -->

#### Do

- Phone number

#### Don’t

- My phone number is:

<!-- end -->

### Select options

Options should:

- Start with “Select” as a placeholder if there isn’t a default option
- Be listed alphabetically or in another logical order so merchants can easily find the option they need
- Be written in sentence case (the first word capitalized, the rest lowercase) and avoid using commas or semicolons at the end of each option
- Be clearly labelled based on what the option will do

---

## Examples

### Default

Presents a classic dropdown menu or equivalent picker as determined by merchants’ browsers.

```jsx
function SelectExample() {
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  return (
    <Select
      label="Date range"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
```

### With inline label

Use only for cases where the select must fit on a single line, such as in a toolbar.

```jsx
function InlineLabelExample() {
  const [selected, setSelected] = useState('newestUpdate');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

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
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
```

### Disabled

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

### With prefix

Renders any React element to the left of individual select options. Does not show in the dropdown.

```jsx
function PrefixExample() {
  const [selected, setSelected] = useState('enabled');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={CaretUpMinor} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={CaretDownMinor} />,
    },
  ];

  return (
    <Select
      label="Permission"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
```

### With validation error

Use to let merchants know if there’s a problem with their selection. For selects, a selection is typically invalid only when using a placeholder option (“Select”) and no other selection has been made.

```jsx
function ValidationErrorExample() {
  const [selected, setSelected] = useState('');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  return (
    <Select
      label="Province"
      options={['Alberta']}
      value={selected}
      onChange={handleSelectChange}
      error="Province is required"
    />
  );
}
```

### With separate validation error

Use to let merchants know when their select input is invalid in the context of a group of form inputs that the select depends on.

```jsx
function SeparateValidationErrorExample() {
  const [weight, setWeight] = useState('12');
  const [unit, setUnit] = useState('');

  const handleWeightChange = useCallback((value) => setWeight(value), []);
  const handleUnitChange = useCallback((value) => setUnit(value), []);

  const unitSelectID = 'unit';
  const errorMessage = generateErrorMessage();
  const formGroupMarkup = (
    <Stack vertical spacing="extraTight">
      <FormLayout>
        <FormLayout.Group condensed>
          <TextField
            label="Product weight"
            type="number"
            value={weight}
            onChange={handleWeightChange}
            error={Boolean(!weight && unit)}
            autoComplete="off"
          />
          <Select
            id={unitSelectID}
            label="Unit of measure"
            placeholder="Select"
            options={['oz', 'g', 'kg', 'lb']}
            value={unit}
            onChange={handleUnitChange}
            error={Boolean(!unit && weight)}
          />
        </FormLayout.Group>
      </FormLayout>
      <InlineError message={errorMessage} fieldID={unitSelectID} />
    </Stack>
  );

  return <Card sectioned>{formGroupMarkup}</Card>;

  function generateErrorMessage() {
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
  }
}
```

---

## Related components

- To let merchants select one option from a list with less than 4 options, use [the choice list component](https://polaris.shopify.com/components/choice-list)
- To create a select where merchants can make multiple selections, or to allow advanced formatting of option text, use an [option list](https://polaris.shopify.com/components/option-list) inside a [popover](https://polaris.shopify.com/components/popover)
