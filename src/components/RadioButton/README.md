---
name: Radio button
tags:
  - selection
  - choices
  - options
  - pick
category: Forms
---

# Radio button
Use radio buttons to present each item in a list of options where merchants must
make a single selection.

**Problem**

Sometimes only one choice or option is available to merchants. There are only a few choices to display, and the [choice list component](/components/forms/choice-list) can’t be used.

**Solution**

Radio buttons present multiple items and require merchants to pick only one thing from a list.

>**Not what you’re looking for?**
>* To make simple lists of radio buttons easier to build, [use the choice list component](/components/forms/choice-list).
>* For long lists of options, [consider the select component](/components/forms/select) to avoid overwhelming merchants.
>* To present merchants with a list of checkboxes, [use the choice list component](/components/forms/choice-list) with the “allow multiple” option.
>* To display non-interactive list of related content, [use the content list component](/components/tables-and-lists/list).

---

## Best practices

Radio buttons should:

* Always be used with an associated label component.
* Be part of a list of radio buttons that:
  * Include at least two or more choices.
  * Are used to have merchants select only one option.
  * Include mutually exclusive options—this means that each option must be
  independent from every other option in the list. For example: Red, blue, and
  yellow are mutually exclusive. Red, blue, yellow, red/blue are not mutually
  exclusive.
  * List options in a rational order that makes logical sense.

---

## Content guidelines

### Radio button labels

Radio button labels should:

* Be introduced with a colon or a heading
* Start with a capital letter

<!-- usagelist -->
#### Do
- Option 1

#### Don't
- option 1
<!-- end -->

* Not end in punctuation if it’s a single sentence, word, or a fragment

<!-- usagelist -->
#### Do
- Red

#### Don't
- Red;
<!-- end -->

| Prop | Type | Description |
| ---- | ---- | ----------- |
| label | string | Label for the radio button |
| labelHidden | boolean | Visually hide the label |
| checked | boolean | Radio button is selected |
| helpText | string or React.ReactNode | Additional text to aid in use |
| id | string | ID for form input |
| name | string | Name for form input |
| value | string | Value for form input |
| onChange | function(newValue: boolean) | Callback when selection is changed |
| onFocus | function() | Callback when radio button is focussed |
| onBlur | function() | Callback when focus is removed |

## Examples

### Default radio buttons

Use radio buttons where merchants must make a single selection.

```jsx
<Card sectioned>
  <RadioButton
    label="Accounts are disabled"
    helpText="Customers will only be able to check out as guests."
  />
  <RadioButton
    checked
    label="Accounts are optional"
    helpText="Customers will have the option to create an account at the end of the checkout process."
  />
  <RadioButton
    disabled
    label="Accounts are required"
    helpText="Customers will only be able to check out if they have a customer account."
  />
</Card>
```
