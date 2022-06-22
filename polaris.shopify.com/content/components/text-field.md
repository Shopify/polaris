---
name: Text field
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - TextField
  - input
  - textarea
  - type
  - add info
  - form field
  - input forms
  - form input
  - field
  - active state
  - input active state
  - input state
  - input focus
  - focus
  - textbar
  - text bar
  - forms
  - form inputs
  - form text input
  - placeholder text
  - field placeholder text
  - optional fields
  - field help text
  - validation error messages
  - field labels
  - number fields
  - email fields
  - multiline
  - hidden label
  - label action
  - placeholder text
  - help text
  - prefix or suffix
  - connected fields
  - label actions
  - hidden labels
  - separate error message
  - icon action
  - ios
  - android
examples:
  - fileName: text-field-default.tsx
    title: Default text field
    description: >-
      Use to allow merchants to provide text input when the expected input is
      short. For longer input, use the auto grow or multiline
      options.
  - fileName: text-field-number-field.tsx
    title: Number field
    description: >-
      Use when input text should be a number.This will display the right
      keyboard on mobile devices. This will display the right keyboard
      on mobile devices.
  - fileName: text-field-email-field.tsx
    title: Email field
    description: >-
      Use when the text input should be an email address.This will display the
      right keyboard on mobile devices. This will display the right
      keyboard on mobile devices.
  - fileName: text-field-multiline.tsx
    title: Multiline text field
    description: >-
      Use when the expected input could be more than one line. The field will
      automatically grow to accommodate additional text.
  - fileName: text-field-with-hidden-label.tsx
    title: Text field with hidden label
    description: >-
      Use to visually hide the label when the text field’s purpose is clear from
      context. The label will remain available to screen readers. Use this
      option with care. In almost all cases, show the label.
  - fileName: text-field-with-label-action.tsx
    title: Text field with label action
    description: >-
      Use when an optional, secondary action is closely associated with a text
      field. For example, on a field for entering a customs tariff code, a label
      action might be to look up the appropriate code from a table.
  - fileName: text-field-with-right-aligned-text.tsx
    title: TextField with right aligned text
    description: Use when input text should be aligned right.
  - fileName: text-field-with-placeholder-text.tsx
    title: Text field with placeholder text
    description: >-
      Use to provide a short, non-essential hint about the expected input.
      Placeholder text is low-contrast, so don’t rely on it for important
      information.
  - fileName: text-field-with-help-text.tsx
    title: Text field with help text
    description: >-
      Use to show short instructional content below the text field. Help text
      works to help merchants understand how to fix errors that result from
      incorrect formatting (such as dates or passwords with specific character
      requirements). If more explanation is needed, link to the Shopify Help
      Center.
  - fileName: text-field-with-prefix-or-suffix.tsx
    title: Text field with prefix or suffix
    description: >-
      Use as a special form of help text that works best inline.Use a prefix for
      things like currency symbols (“$”, “¥”, “£”).Use suffix for things like
      units of measure (“in”, “cm”).
  - fileName: text-field-with-vertical-content.tsx
    title: Text field with vertical content
    description: >-
      Use to include custom vertical content above the input value, like
      selected tags.
  - fileName: text-field-with-connected-fields.tsx
    title: Text field with connected fields
    description: >-
      Use when a text field and several related fields make up a logical unit.If
      inputting weight as a number and a separate unit of measurement, use a
      text field with a selector (like “kg” or “lb”) as a connected
      field. If inputting weight as a number and a separate unit of
      measurement, use a text field with a selector (like “kg” or “lb”) as a
      connected field.
  # - fileName: text-field-with-icon-action.tsx
  #   title: Text field with icon action
  #   description: >-
  #     Use to let merchants take an action within the text field.For example, tap
  #     on a barcode icon to launch the camera and scan barcode for the barcode
  #     field. This helps merchants simplify their input.
  - fileName: text-field-with-validation-error.tsx
    title: Text field with validation error
    description: >-
      Use to let merchants know if their input is valid or if there’s an error.
      Whenever possible, validate input as soon as merchants have finished
      interacting with a field (but not before). If a field already has an
      error, validate and remove errors as merchants type so they can
      immediately see when an error has been fixed.
  - fileName: text-field-with-separate-validation-error.tsx
    title: Text field with separate validation error
    description: >-
      Use to let merchants know when their text field input is invalid in the
      context of a group of form inputs that the text field depends on.To render
      an invalid text field and its validation error separately:
  - fileName: text-field-disabled.tsx
    title: Disabled text field
    description: >-
      Use to show that a textfield is not available for interaction. Most often
      used in forms when information is required only in a particular state. For
      example, the text field next to Other in a choice list when Other is not
      selected.
  - fileName: text-field-with-character-count.tsx
    title: Text field with character count
    description: >-
      Use to display the current number of characters in a text field. Use in
      conjunction with max length to display the current remaining number of
      characters in the text field.
  - fileName: text-field-with-clear-button.tsx
    title: Text field with clear button
    description: Use to allow merchants to clear the content from a text field.
  - fileName: text-field-with-monospaced-font.tsx
    title: Text field with monospaced font
    description: Use to apply a monospaced font to the TextField
  - fileName: text-field-with-value-selected-on-focus.tsx
    title: Text field with value selected on focus
    description: Use to select all text inside TextField on focus.
  - fileName: text-field-with-inline-suggestion.tsx
    title: Text field with inline suggestion
    description: >-
      Use to provide an autocomplete suggestion inline with the input value. See
      the combobox component's tag multi-select example for full implementation
      of the inline autocomplete pattern.
---

# Text field

A text field is an input field that merchants can type into. It has a range of options and supports several text formats including numbers.

---

## Best practices

Text fields should:

- Be clearly labeled so it’s obvious to merchants what they should enter into the field
- Be labeled as “Optional” when you need to request input that’s not required
- Only ask for information that’s really needed
- Validate input as soon as merchants have finished interacting with a field (but not before)

### Autocomplete

The autocomplete attribute in an `input` field controls two types of browser behavior:

1. **Browser autofill**: a feature that automatically populates form fields with previously-saved information, such as passwords, addresses, and credit card data.

- Autofill is an important feature for our users. Google has found that ["users complete forms up to 30% faster"](https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill?hl=en) when using autofill.
- The WHATWG has a list of supported autofill values for the `autocomplete` attribute. [Review the section "4.10.18.7 Autofill"](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for all the input types and their corresponding autocomplete attribute values.

2. **Browser autocomplete** - a feature that displays previously submitted values for that field.

- When this is on for a field, a user is presented a list with previously submitted values for the input

**Recommendation**

> Always add an autocomplete attribute and value to inputs if the type is: color, date, datetime-local, email, month, number, password, range, search, tel, text, time, url, or week.

#### Turning autofill/autocomplete off

Even if you do not want the browser to autofill a user's information, it is recommended you still have an autocomplete attribute with the value off or nope.

Unfortunately, [not all browsers support](https://caniuse.com/input-autocomplete-onoff) or respect autocomplete="off". This makes things challenging. Chrome, for example, [has a long outstanding bug](https://bugs.chromium.org/p/chromium/issues/detail?id=468153) and won't add support for off for now.

| Browser | Support for `autocomplete="off"` | Details                                                                                                                                                             |
| ------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chrome  | Partial                          | Intentionally ignores `off` value when the user uses the browser's autofill functionality. [See bug](https://bugs.chromium.org/p/chromium/issues/detail?id=468153). |
| Safari  | Partial                          | Ignores `off` value for `username`, `email` and `password` fields.                                                                                                  |
| Firefox | Partial                          | Ignores `off` value for login forms. [See bug](https://bugzilla.mozilla.org/show_bug.cgi?id=956906).                                                                |
| Edge    | Partial                          | Intentionally ignores `off` value when the user uses the browser's autofill functionality.                                                                          |

Chrome does seem to turn autocomplete off when using the value nope (or any non valid string). However, we have seen some inconsistencies even with that support.

**Recommendation (Chrome only)**

- Turning off both **autofill** and **browser autocomplete** (previously submitted values) in Chrome
  - Use `autocomplete=nope` and also **must have a `name` attribute**.
- Turning off **browser autocomplete** (previously submitted values) in Chrome
  - If you don't have `name` attribute and the field is not a typical autofill input (address, email, etc), use `autocomplete=off`.

---

## Content guidelines

For text field content guidelines, reference the [text fields experience](https://polaris.shopify.com/patterns/text-fields) page.

---

## Related components

- To lay out the elements in a responsive form, [use the form layout component](https://polaris.shopify.com/components/forms/form-layout)
- To describe an invalid form input with a separate validation error, [use the inline error component](https://polaris.shopify.com/components/forms/inline-error)
- It’s common to [use a select component](https://polaris.shopify.com/components/forms/select) connected to the left or right of a text field.

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

Screen readers convey information about text fields automatically through native HTML.

- Use the `disabled` prop to add the HTML `disabled` attribute to the text field.
- Use the `readOnly` prop to add the HTML `readonly` attribute to the text field.
- If you use the `type` prop, then some assistive technologies adapt the software keyboard to the current task. This helps merchants with mobility, vision, and cognitive issues to enter information more easily.

Use the `id` prop to provide a unique `id` attribute value for the text field. If you don't provide an `id`, then the component generates one automatically. All text fields need to have unique `id` values.

### Labeling

The `label` prop is required to convey the purpose of the checkbox to all merchants.

If there are separate visual cues that convey the purpose of the text field to sighted merchants, then the label can be visually hidden with the `labelHidden` prop.

When you provide help text via the `helpText` prop or an inline error message via the `error` prop, the help or error content is conveyed to screen reader users with the `aria-describedby` attribute. This attribute causes the content to be read along with the label, either immediately or after a short delay.

Use the `placeholder` prop to provide additional instructions. However, don’t rely on placeholders alone since the content isn’t always conveyed to all merchants.

<!-- usageblock -->

#### Do

- Use the label to provide instructions critical to using the text field
- Use help text and placeholder text to provide additional, non-critical instructions

#### Don’t

Use the placeholder to provide information that’s required to use the text field.

<!-- end -->

### Keyboard support

Text fields have standard keyboard support.

- Merchants who rely on the keyboard expect to move focus to each text field using the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- If the `type` is set to `number`, then merchants can use the up and down arrow keys to adjust the value typed into the field
- Using the `disabled` prop will prevent the text field from receive keyboard focus or inputs
- The `readOnly` prop allows focus on the text field but prevents input or editing
- The `inputMode` prop can be used to bring up a relevant keyboard for merchants on mobile; it’s passed down to the input as an [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)

#### Automatically focusing

Although you can use the `autoFocus` prop to automatically move focus to the text field, it’s generally best to avoid focusing on fields automatically. The `autoFocus` prop is set to `false` by default and should only be used in cases where it won’t force focus to skip other controls or content of equal or greater importance.

<!-- /content-for -->
