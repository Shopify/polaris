---
name: Checkbox
category: Forms
keywords:
  - accept
  - decline
  - terms
  - input
  - multiple choice lists
  - terms and services
  - checkboxes
  - check boxes
  - multiple selections
  - form selections
  - multi-choice lists
---

# Checkbox

Checkboxes are most commonly used to give merchants a way to make a range of selections (zero, one, or multiple). They may also be used as a way to have a merchant indicate they agree to specific terms and services.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants may need to choose more than one item from a list of options.

### Solution

A checkbox lets merchants choose one or many things from a list.

---

## Best practices

Checkboxes should:

* Work independently from each other: selecting one checkbox shouldn’t change
the selection status of another checkbox in the list. The exception is when a
checkbox is used to make a bulk selection of multiple items.
* Be framed positively: for example, `Turn on notifications` instead of
`Turn off notifications`
* Always have a label when being used to toggling a setting on or off
* Be listed according to a logical order, whether it’s alphabetical, numerical,
time-based, or some other clear system.
* Link to more information or include a subtitle as required to provide more
explanation. Don’t rely on tooltips to explain a checkbox.

---

## Content guidelines

### Lists with checkboxes

Lists that use checkboxes should:

* Start with a capital letter

<!-- usageblock -->
#### Do
- Option 1
- Option 2
- Option 3

#### Don’t
- option 1
- option 2
- option 3
<!-- end -->

* Not use commas or semicolons at the end of each line

<!-- usageblock -->
#### Do
- Red
- Yellow
- Blue

#### Don’t
- Red;
- Yellow;
- Blue.
<!-- end -->

* In the rare case where the checkbox is asking the merchant to agree to terms
or service, use the first person

<!-- usageblock -->
#### Do
I agree to the Terms of Service.

#### Don’t
You agree to the Terms of Service
<!-- end -->

| Prop | Type | Description |
| ---- | ---- | ----------- |
| label | string or React.ReactNode | Label for the checkbox |
| labelHidden | boolean | Visually hide the label |
| checked | boolean or 'indeterminate' | Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox |
| helpText | string or React.ReactNode | Additional text to aide in use |
| disabled | boolean | Disable input |
| id | string | ID for form input |
| name | string | Name for form input |
| value | string | Value for form input |
| error | string | Display an error message |
| onChange | function(newValue: boolean, id: string) | Callback when checkbox is toggled |
| onFocus | function() | Callback when checkbox is focussed |
| onBlur | function() | Callback when focus is removed |

## Examples

### Default checkboxes

Use in forms to toggle the state of something on or off. Default checkboxes can appear in two states: selected and disabled, or unselected.

```jsx
<Checkbox label="Basic checkbox" />
```

---

## Related components

* To present a list of options where merchants can only make a single choice, [use the radio button component](/components/forms/radio-button)
* To display a list of related content, [use the choice list component](/components/forms/choice-list)
* To create an ungrouped list, [use the content list component](/components/tables-and-lists/list)
