---
name: Listbox
category: Lists and tables
keywords:
  - list
  - listbox
  - list box
  - interactive list
examples:
  - fileName: listbox-basic.tsx
    title: Basic Listbox
    description: >-
      Basic implementation of a control element used to let merchants select
      options
  - fileName: listbox-with-loading.tsx
    title: Listbox with Loading
    description: >-
      Implementation of a control element showing a loading indicator to let
      merchants know more options are being loaded
  - fileName: listbox-with-action.tsx
    title: Listbox with Action
    description: Implementation of a control element used to let merchants take an action
  - fileName: listbox-with-custom-element.tsx
    title: Listbox with custom element
    description: Implementation of a control with custom rendering of options
---

# Listbox

A Listbox is a vertical list of interactive options, with room for icons, descriptions, and other elements.

---

## Anatomy

![A diagram of the Listbox component showing the smaller primitive components it can be composed of.](/public_images/components/Listbox/listbox-anatomy.png)

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

<!-- usagelist -->

#### Do

- Traffic referrer source

#### Don’t

- Source

<!-- end -->

## Patterns that use `Listbox`

Location picker

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
