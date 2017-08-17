---
name: Text field
tags:
  - input
  - type
  - add info
  - form field
category: Forms
---

# Text field

A text field is an input field that a merchant can type into. It has a range of
options and supports several text formats including numbers.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

Merchants need to add information to Shopify.

### Solution

Text fields are input fields that merchants can type into.

---

## Best practices

Text fields should:

* Be clearly labeled so it’s obvious to the merchant what they should enter into the field
* Be labeled as “Optional” when you need to request input that’s not required
* Only ask for information that’s really needed
* Validate input as soon as merchant has finished interacting with a field (but not before)

---

## Content guidelines

### Field label

A label is a short description of the requested input. Labels are not instructional text but they should be meaningful and clearly indicate what is expected. Labels should be:

* Placed above or beside the form field
* Short and succinct (1–3 words)
* Written in sentence case (the first word capitalized, the rest lowercase)

<!-- usagelist -->
#### Do
* Email address
* Phone number

#### Don’t
* What is your email address?
* My phone number is:
<!-- end -->

### Field placeholder text

Placeholder text is shown inside the form field to teach the merchant what to
input. Field placeholder text should:

* Be used only for supplementary information because the text has low contrast and is not visible when text is entered
* Be written as examples instead of instructions
* Include “e.g.” before an example

<!-- usagelist -->
#### Do
e.g. FALLSALE

#### Don’t
Name your discount code
<!-- end -->

### Designating optional fields

Try to only ask for information that’s required. If you need to ask merchants
to provide optional information, mark the field optional by placing the text “(optional)” at the end of the field’s label. Don’t mark required fields with asterisks.

<!-- usagelist -->
#### Do
Phone number (optional)

#### Don’t
First name*
<!-- end -->

### Help text

Help text provides extra guidance or instruction to people filling out a form field. It can also be used to clarify how the information will be used. As with all form content, help text should be succinct and easy to read.

<!-- usagelist -->
#### Do
9-digit number

#### Don’t
Example: 123-456-789
<!-- end -->

### Validation error messages

Error messages should:

* Clearly explain what went wrong and how to fix it
* Be short and concise, no more than a single sentence
* Use [passive voice](/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed them for the error

<!-- usagelist -->
#### Do
Store name is required

#### Don’t
You didn’t enter a store name.
<!-- end -->

| Prop | Type | Description |
| ---- | ---- | ----------- |
| prefix | React.ReactNode | Text to display before value |
| suffix | React.ReactNode | Text to display after value |
| placeholder | string | Hint text to display |
| value | string | Initial value for the input |
| helpText | React.ReactNode | Additional hint text to display |
| label | string | Label for the input |
| labelAction | Action | Adds an action to the label |
| labelHidden | boolean | Visually hide the label |
| disabled | boolean | Disable the input |
| readOnly | boolean | Disable editing of the input |
| autoFocus | boolean | Automatically focus the input |
| multiline | boolean or number | Allow for multiple lines of input |
| error | boolean or string | Error to display beneath the label |
| connectedRight | React.ReactNode | An element connected to the right of the input |
| connectedLeft | React.ReactNode | An element connected to the left of the input |
| type | enum['text', 'email', 'number', 'password', 'search', 'tel', 'url', 'date', 'datetime-local', 'month', 'time', 'week'] | Determine type of input |
| name | string | Name of the input |
| id | string | ID for the input |
| step | number | Limit increment value for numeric and date-time inputs |
| autoComplete | boolean | Enable automatic completion by the browser |
| max | number | Maximum value for a numeric or date-time input |
| maxLength | number | Maximum character length for an input |
| min | number | Minimum value for a numeric or date-time input |
| minLength | number | Minimum character length for an input|
| pattern | string | A regular expression to check the value against |
| spellCheck | boolean | Indicate whether value should have spelling checked |
| onChange | function(value: string, id: string) | Callback when value is changed |
| onFocus | function() | Callback when input is focused |
| onBlur | function() | Callback when focus is removed |

## Examples

### Default text field

Use to allow merchants to provide text input when the expected input is short. For longer input, use the auto grow or multiline options.

```jsx
<TextField label="Store name" />
```

### Number field

Use when input text should be a number.

```jsx
<TextField label="Quantity" type="number" value="1" />
```

### Email field

Use when the text input should be an email address.

```jsx
<TextField label="Email" type="email" />
```

### Multiline text field

Use when the expected input could be more than one line. The field will automatically grow to accommodate additional text.

```jsx
<TextField label="Shipping address" multiline />
```

### Text field with hidden label

Use to visually hide the label when the text field’s purpose is clear from context. The label will remain available to screen readers. Use this option with care. In almost all cases, show the label.

```jsx
<FormLayout>
  <ChoiceList
    title="Gift card auto-expiration"
    choices={[
      {label: 'Gift cards never expire', value: 'no'},
      {label: 'Gift cards expire', value: 'yes'},
    ]}
    selected={['yes']}
  />
  <TextField
    label="Gift cards expire after"
    labelHidden
    value="12"
    connectedRight={
      <Select
        label="Unit of time"
        labelHidden
        options={['months after purchase']} />
    } />
</FormLayout>
```

### Text field with label action

Use when an optional, secondary action is closely associated with a text field. For example, on a field for entering a customs tariff code, a label action might be to look up the appropriate code from a table.

```jsx
<TextField label="Tariff code" labelAction={{content: 'Look up codes'}} />
```

### Text field with placeholder text

Use to provide a short, non-essential hint about the expected input. Placeholder text is low-contrast, so don’t rely on it for important information.

```jsx
<TextField label="Zone name" placeholder="e.g. North America, Europe" />
```

### Text field with help text

Use to show short instructional content below the text field. Use especially when incorrect formatting will result in an error and the merchant doesn’t know what format is required (e.g. to explain the correct format for dates, or requirements for a password). If more explanation is needed, link to the Shopify Help Center.

```jsx
<TextField label="Account email" type="email" helpText="We’ll use this address if we need to contact you about your account." />
```

### Text field with prefix or suffix

Use as a special form of help text that works best inline. Use a prefix for things like currency symbols (e.g. “$”, “¥”, “£”). Use suffix for things like units of measure (e.g. “in”, “cm”).

```jsx
<TextField label="Price" type="number" prefix="$" />
```

### Text field with connected fields

Use when a text field and several related fields make up a logical unit. If inputting weight as a number and a separate unit of measurement, use a text field with a <select dropdown menu> (e.g. “kg”, “lb”) as a connected field.

```jsx
<TextField
  label="Weight"
  type="number"
  connectedRight={
    <Select label="Weight unit" labelHidden options={['kg', 'lb']} />
  }
  />
```

### Text field with validation errors

Use to let merchants know if their input is valid or if there’s an error. Whenever possible, validate input as soon as a merchant has finished interacting with a field (but not before). If a field already has an error, validate and remove errors as the merchant types so they can immediately see when an error has been fixed.

```jsx
<TextField label="Store name" error="Store name is required" />
```

---

## Related components

* To lay out the elements in a responsive form, [use the form layout component](/components/forms/form-layout)
