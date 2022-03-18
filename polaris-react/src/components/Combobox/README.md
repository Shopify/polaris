---
name: Combobox
category: Forms
keywords:
  - autocomplete
  - searchable
  - typeahead
  - combobox
  - combo box
  - listbox
  - list box
---

# Combobox

Combobox uses an enahnced text field that allows merchants to filter through a list of options to pick one or more values. The list of options is displayed when a merchant focuses on the field.

---

## Anatomy

![A diagram of the Combobox component showing the smaller primitive components it is composed of.](/public_images/components/Combobox/combobox-anatomy.png)

A combobox is made up of the following:

1. **Text field**: The field people click in to activate the popover and filter through the options they can choose from. Once selected, the option will be shown in the text input.
2. **Popover**: Renders to contain the Listbox.
3. **Listbox**: Contains the list of all selectable items.
4. **Listbox** options: The individual options that merchants can select. For context on ways the Listbox can be composed with various content, check out the [listbox documentation](https://polaris.shopify.com/components/forms/listbox).

---

## Best practices

The `Combobox` component should:

- Be clearly labeled so the merchant knows what type of options will be available
- Not be used within a popover
- Indicate a loading state to the merchant while option data is being populated
- Order items in an intentional way so it’s easy for the merchant to find a specific value

---

## Content guidelines

The input field for `Combobox` should follow the [content guidelines](https://polaris.shopify.com/components/forms/text-field) for text fields.

---

## Sorting and filtering

### Sorting

Item order should be intentional. Order them so it’s easy for the merchant to find a specific value. Some ways you can do this:

- Sort options in alphabetical order
- Display options based on how frequently the merchant selects an option

If multiple options can be selected, move selected items to the top of the list. If this doesn’t work for your context, you can override this behavior.

### Filtering

- By default, menu items are filtered based on whether or not they match the value of the textfield.
- Filters are **not** case-sensitive by default.
- You can apply custom filtering logic if the default behavior doesn’t make sense for your use case.

---

## Patterns

### Tags autocomplete

The tag multiselect allows merchants to select, create and browse from a long list of options.

---

## Examples

### Single select autocomplete

Allows merchants to select from a predefined list of options. It’s typically used when there are a large number of options to choose from.

```jsx
function ComboboxExample() {
  const deselectedOptions = useMemo(
    () => [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [],
  );

  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || '');
    },
    [options],
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <div style={{height: '225px'}}>
      <Combobox
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            onChange={updateText}
            label="Search customers"
            labelHidden
            value={inputValue}
            placeholder="Search customers"
          />
        }
      >
        {options.length > 0 ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </div>
  );
}
```

### Multi-select autocomplete

Allows the merchant to select multiple options from a pre-defined list of options.

```jsx
function MultiComboboxExample() {
  const deselectedOptions = useMemo(
    () => [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [],
  );

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected),
        );
      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }

      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });
      setInputValue((matchedOption && matchedOption.label) || '');
    },
    [options, selectedOptions],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const tagsMarkup = selectedOptions.map((option) => {
    let tagLabel = '';
    tagLabel = option.replace('_', ' ');
    tagLabel = titleCase(tagLabel);
    return (
      <Tag key={`option${option}`} onRemove={removeTag(option)}>
        {tagLabel}
      </Tag>
    );
  });

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOptions.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <div style={{height: '225px'}}>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            onChange={updateText}
            label="Search customers"
            labelHidden
            value={inputValue}
            placeholder="Search customers"
          />
        }
      >
        {optionsMarkup ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
      <TextContainer>
        <Stack>{tagsMarkup}</Stack>
      </TextContainer>
    </div>
  );

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');
  }
}
```

### Autocomplete with loading

Use to indicate loading state to merchants while option data is processing.

```jsx
function LoadingAutocompleteExample() {
  const deselectedOptions = useMemo(
    () => [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [],
  );

  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);
  const [loading, setLoading] = useState(false);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (!loading) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === '') {
          setOptions(deselectedOptions);
          setLoading(false);
          return;
        }
        const filterRegex = new RegExp(value, 'i');
        const resultOptions = options.filter((option) =>
          option.label.match(filterRegex),
        );
        setOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [deselectedOptions, loading, options],
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || '');
    },
    [options],
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const loadingMarkup = loading ? <Listbox.Loading /> : null;

  const listboxMarkup =
    optionsMarkup || loadingMarkup ? (
      <Listbox onSelect={updateSelection}>
        {optionsMarkup && !loading ? optionsMarkup : null}
        {loadingMarkup}
      </Listbox>
    ) : null;

  return (
    <Combobox
      activator={
        <Combobox.TextField
          prefix={<Icon source={SearchMinor} color="inkLighter" />}
          onChange={updateText}
          label="Search customers"
          labelHidden
          value={inputValue}
          placeholder="Search customers"
        />
      }
    >
      {listboxMarkup}
    </Combobox>
  );
}
```

---

## Related components

- For an input field without suggested options, [use the text field component](https://polaris.shopify.com/components/forms/text-field)
- For a list of selectable options not linked to an input field, [use the list box component](https://polaris.shopify.com/components/lists-and-tables/listbox)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

### Structure

The `Combobox` component is based on the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox). It is a combination of a single-line `TextField` and a `Popover`. The current implementation expects a [`Listbox`](https://polaris.shopify.com/components/lists-and-tables/listbox) component to be used.

The `Combobox` popover displays below the text field or other control by default so it is easy for merchants to discover and use. However, you can change the position with the `preferredPosition` prop.

`Combobox` features can be challenging for merchants with visual, motor, and cognitive disabilities. Even when they’re built using best practices, these features can be difficult to use with some assistive technologies. Merchants should always be able to search, enter data, or perform other activities without relying on the combobox.

<!-- usageblock -->

#### Do

- Use combobox as progressive enhancement to make the interface easier to use for most merchants.

#### Don’t

- Require that merchants make a selection from the combobox to complete a task.

<!-- end -->

### Keyboard support

- Give the combobox's text input keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)

<!-- /content-for -->
