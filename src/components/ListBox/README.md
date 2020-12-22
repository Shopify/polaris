---
name: ListBox
category: Lists and tables
keywords:
  - list
  - listbox
  - interactive list
---

# ListBox

The `ListBox` component is a list component that implements part of the [Aria 1.2 ListBox specs](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox). It presents a list of options and allows users to select one or more of them. If you need more structure than the standard component offers, use composition to customize the presentation of these lists by using sections, headers, or custom elements.

---

## Best practices

Listboxes should:

- Be clearly labeled so it’s noticeable to the merchant what type of options will be available
- Limit the number of options displayed at once
- Indicate a loading state to the merchant while option data is being populated

---

## Content guidelines

### Option lists

Each item in a `ListBox` should be clear and descriptive.

<!-- usagelist -->

#### Do

- Traffic referrer source

#### Don’t

- Source

<!-- end -->

---

## Examples

### Basic ListBox

Basic implementation of a control element used to let merchants select options

```jsx
function BaseListBoxExample() {
  return (
    <ListBox>
      <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
      <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
      <ListBox.Option value="UniqueValue-3">Item 3</ListBox.Option>
    </ListBox>
  );
}
```

### ListBox with Section

Implementation of a control element used to let merchants select options that are grouped into named sections

```jsx
function ListBoxWithSectionExample() {
  return (
    <ListBox>
      <ListBox.Section title={<ListBox.Header>Section Header</ListBox.Header>}>
        <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
        <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
        <ListBox.Option value="UniqueValue-3">Item 3</ListBox.Option>
      </ListBox.Section>
    </ListBox>
  );
}
```

### ListBox with Loading

Implementation of a control element showing a loading indicator to let merchants know more options are being loaded

```jsx
function ListBoxWithLoadingExample() {
  return (
    <ListBox>
      <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
      <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
      <ListBox.Option value="UniqueValue-3">Item 3</ListBox.Option>
      <ListBox.Loading />
    </ListBox>
  );
}
```

### ListBox with Action

Implementation of a control element used to let merchants take an action

```jsx
function ListBoxWithActionExample() {
  return (
    <ListBox>
      <ListBox.Action value="ActionValue" divider>
        <div>Add item</div>
      </ListBox.Action>
      <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
      <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
    </ListBox>
  );
}
```

### ListBox with custom element

Implementation of a control with custom rendering of options

```jsx
function ListBoxWithCustomElementExample() {
  return (
    <ListBox>
      <ListBox.Action value="ActionValue" divider>
        Add item
      </ListBox.Action>
      <ListBox.Section title={<div>Section Header</div>}>
        <ListBox.Option value="UniqueValue-1">
          <div>Item 1</div>
        </ListBox.Option>
        <ListBox.Option value="UniqueValue-2">
          <div>Item 2</div>
        </ListBox.Option>
        <ListBox.Option value="UniqueValue-3">
          <div>Item 3</div>
        </ListBox.Option>
      </ListBox.Section>
      <ListBox.Loading accessibilityLabel="items are loading" />
    </ListBox>
  );
}
```

---

## Related components

- For a text field and popover container, [use the combobox component](https://polaris.shopify.com/components/forms/combobox)
- [Autocomplete](https://polaris.shopify.com/components/forms/autocomplete) can be used as a convenience wrapper in lieu of ComboBox and ListBox.

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

The `ListBox` component is based on the [Aria 1.2 ListBox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).

It is important to not present interactive elements inside of list box options as they can interfere with navigation
for assistive technology users.

<!-- usagelist -->

#### Do

- Use labels

#### Don’t

- Use interactive elements inside the list

<!-- end -->

### Keyboard support

- Access the list of options with the up and down arrow keys
- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key

<!-- /content-for -->
