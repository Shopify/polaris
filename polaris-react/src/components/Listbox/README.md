---
name: Listbox
category: Lists and tables
keywords:
  - list
  - listbox
  - list box
  - interactive list
---

# Listbox

A Listbox is a vertical list of interactive options, with room for icons, descriptions, and other elements.

---

## Anatomy

![A diagram of the Listbox component showing the smaller primitive components it can be composed of.](/images/components/listbox/listbox-anatomy.png)

A listbox can be composed of:

1. **Options:** The individual options inside the Listbox that merchants can select or deselect.
2. **Dividers:** Placed between items and are useful in complex lists when there’s a lot of information for the merchant to parse.
3. **Section headers:** Used at the begining of a section when it’s necessary to call out the content being displayed. In most cases, the surrounding context should be enough for the merchant to understand the information in the list.

---

## Best practices

Listboxes should:

- Be clearly labeled so it’s noticeable to the merchant what type of options will be available
- Limit the number of options displayed at once
- Indicate a loading state to the merchant while option data is being populated

---

## Content guidelines

### Option lists

Each item in a `Listbox` should be clear and descriptive.

<!-- dodont -->

#### Do

- Traffic referrer source

#### Don’t

- Source

<!-- end -->

## Patterns that use `Listbox`

Location picker

---

## Examples

### Default

Basic implementation of a control element used to let merchants select options

```jsx
function BaseListboxExample() {
  return (
    <Listbox accessibilityLabel="Basic Listbox example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
    </Listbox>
  );
}
```

### With Loading

Implementation of a control element showing a loading indicator to let merchants know more options are being loaded

```jsx
function ListboxWithLoadingExample() {
  return (
    <Listbox accessibilityLabel="Listbox with loading example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
      <Listbox.Loading />
    </Listbox>
  );
}
```

### With Action

Implementation of a control element used to let merchants take an action

```jsx
function ListboxWithActionExample() {
  return (
    <Listbox accessibilityLabel="Listbox with Action example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2" divider>
        Item 2
      </Listbox.Option>
      <Listbox.Action value="ActionValue">
        <Stack spacing="tight">
          <Icon source={CirclePlusMinor} color="base" />
          <div>Add item</div>
        </Stack>
      </Listbox.Action>
    </Listbox>
  );
}
```

### With custom element

Implementation of a control with custom rendering of options

```jsx
function ListboxWithCustomElementExample() {
  return (
    <Listbox accessibilityLabel="Listbox with custom element example">
      <Listbox.Action value="ActionValue" divider>
        Add item
      </Listbox.Action>
      <Listbox.Option value="UniqueValue-1">
        <div>Item 1</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-2">
        <div>Item 2</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-3">
        <div>Item 3</div>
      </Listbox.Option>
      <Listbox.Loading accessibilityLabel="items are loading" />
    </Listbox>
  );
}
```

---

## Related components

- For a text field and popover container, [use the combobox component](https://polaris.shopify.com/components/combobox)
- [Autocomplete](https://polaris.shopify.com/components/autocomplete) can be used as a convenience wrapper in lieu of Combobox and Listbox.

---

## Accessibility

### Structure

The `Listbox` component is based on the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).

It is important to not present interactive elements inside of list box options as they can interfere with navigation for assistive technology users.

<!-- dodont -->

#### Do

- Use labels

#### Don’t

- Use interactive elements inside the list

<!-- end -->

### Keyboard support

- Access the list of options with the up and down arrow keys
- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key
