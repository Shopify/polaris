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

The `Listbox` component is a list component that implements part of the [Aria 1.2 Listbox specs](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox). It presents a list of options and allows users to select one or more of them. If you need more structure than the standard component offers, use composition to customize the presentation of these lists by using headers or custom elements.

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

<!-- usagelist -->

#### Do

- Traffic referrer source

#### Don’t

- Source

<!-- end -->

---

## Examples

### Basic Listbox

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

### Listbox with Loading

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

### Listbox with Action

Implementation of a control element used to let merchants take an action

```jsx
function ListboxWithActionExample() {
  return (
    <Listbox accessibilityLabel="Listbox with Action example">
      <Listbox.Action value="ActionValue" divider>
        <div>Add item</div>
      </Listbox.Action>
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
    </Listbox>
  );
}
```

### Listbox with custom element

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

- For a text field and popover container, [use the combobox component](https://polaris.shopify.com/components/forms/combobox)
- [Autocomplete](https://polaris.shopify.com/components/forms/autocomplete) can be used as a convenience wrapper in lieu of Combobox and Listbox.

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

The `Listbox` component is based on the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).

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
