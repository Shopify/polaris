---
name: Autocomplete
category: Forms
keywords:
  - autocomplete
  - searchable
  - typeahead
  - combobox
  - listbox
examples:
  - fileName: autocomplete-basic.tsx
    title: Basic autocomplete
    description: Use to help merchants complete text input quickly from a list of options.
  - fileName: autocomplete-multiple-tags.tsx
    title: Multiple tags autocomplete
    description: >-
      Use to help merchants select multiple options from a list curated by the
      text input.
  - fileName: autocomplete-multiple-sections.tsx
    title: Multiple sections autocomplete
    description: >-
      Use to help merchants complete text input quickly from a multiple sections
      list of options.
  - fileName: autocomplete-with-loading.tsx
    title: Autocomplete with loading
    description: >-
      Use to indicate loading state to merchants while option data is
      processing.
  - fileName: autocomplete-with-lazy-loading.tsx
    title: Autocomplete with lazy loading
  - fileName: autocomplete-with-empty-state.tsx
    title: Autocomplete with empty state
    description: Use to indicate there are no search results.
  - fileName: autocomplete-with-action.tsx
    title: Autocomplete with action
    description: Use to indicate there are no search results.
  - fileName: autocomplete-with-wrapping-action.tsx
    title: Autocomplete with wrapping action
    description: Use to indicate there are no search results.
  - fileName: autocomplete-with-destructive-action.tsx
    title: Autocomplete with destructive action
    description: Use to indicate there are no search results.
---

# Autocomplete

The autocomplete component is an input field that provides selectable suggestions as a merchant types into it. It allows merchants to quickly search through and select from large collections of options. It's a convenience wrapper around the `Combobox` and `Listbox` components with minor UI differences.

---

## Best practices

The autocomplete component should:

- Be clearly labeled so it’s obvious to the merchant what type of options will be available
- Limit the number of options displayed at once
- Not be used within a popover
- Indicate a loading state to the merchant while option data is being populated

---

## Content guidelines

The input field for autocomplete should follow the [content guidelines](https://polaris.shopify.com/components/forms/text-field) for text fields.

---

## Related components

- For an input field without suggested options, [use the text field component](https://polaris.shopify.com/components/forms/text-field)
- For a list of selectable options not linked to an input field, [use the option list component](https://polaris.shopify.com/components/lists-and-tables/option-list)
- For a text field that triggers a popover, [use the combo box component](https://polaris.shopify.com/components/forms/combobox)

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

The autocomplete component is based on the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox) and the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).

The autocomplete list displays below the text field or other control by default so it is easy for merchants to discover and use. However, you can change the position with the `preferredPosition` prop.

Autocomplete features can be challenging for merchants with visual, motor, and cognitive disabilities. Even when they’re built using best practices, these features can be difficult to use with some assistive technologies. Merchants should always be able to search, enter data, or perform other activities without relying on the autocomplete.

<!-- usageblock -->

#### Do

Use autocomplete as progressive enhancement to make the interface easier to use for most merchants.

#### Don’t

Require that merchants make a selection from the autocomplete to complete a task.

<!-- end -->

### Keyboard support

- Give the autocomplete text input keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Access the list of options with the up and down arrow keys
- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key

<!-- /content-for -->
