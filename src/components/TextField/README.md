---
name: Text field
category: Forms
keywords:
  - TextField
  - input
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
---

# Text field

A text field is an input field that a merchant can type into. It has a range of
options and supports several text formats including numbers.

---

## Best practices

Text fields should:

- Be clearly labeled so it’s obvious to the merchant what they should enter into the field
- Be labeled as “Optional” when you need to request input that’s not required
- Only ask for information that’s really needed
- Validate input as soon as merchant has finished interacting with a field (but not before)

---

## Content guidelines

### Field label

A label is a short description of the requested input. Labels are not instructional text but they should be meaningful and clearly indicate what is expected. Labels should be:

- Placed above or beside the form field
- Short and succinct (1–3 words)
- Written in sentence case (the first word capitalized, the rest lowercase)

<!-- usagelist -->

#### Do

- Email address
- Phone number

#### Don’t

- What is your email address?
- My phone number is:

<!-- end -->

### Field placeholder text

Placeholder text is shown inside the form field to teach the merchant what to
input. Field placeholder text should:

- Be used only for supplementary information because the text has low contrast and is not visible when text is entered
- Be written as examples instead of instructions
- Include “e.g.” before an example

<!-- usagelist -->

#### Do

- e.g. FALLSALE

#### Don’t

- Name your discount code

<!-- end -->

### Designating optional fields

Try to only ask for information that’s required. If you need to ask merchants
to provide optional information, mark the field optional by placing the text “(optional)” at the end of the field’s label. Don’t mark required fields with asterisks.

<!-- usagelist -->

#### Do

Phone number (optional)

#### Don’t

First name\*

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

- Clearly explain what went wrong and how to fix it
- Be short and concise, no more than a single sentence
- Use [passive voice](/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed for the error

<!-- usagelist -->

#### Do

Store name is required

#### Don’t

You didn’t enter a store name.

<!-- end -->

---

## Examples

### Default text field

Use to allow merchants to provide text input when the expected input is short. For longer input, use the auto grow or multiline options.

```jsx
class TextFieldExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Store name"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
```

### Number field

Use when input text should be a number.

```jsx
class NumberFieldExample extends React.Component {
  state = {
    value: '1',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Quantity"
        type="number"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
```

### Email field

Use when the text input should be an email address.

```jsx
class EmailFieldExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Email"
        type="email"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
```

### Multiline text field

Use when the expected input could be more than one line. The field will automatically grow to accommodate additional text.

```jsx
class MultilineFieldExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Shipping address"
        value={this.state.value}
        onChange={this.handleChange}
        multiline
      />
    );
  }
}
```

### Text field with hidden label

Use to visually hide the label when the text field’s purpose is clear from context. The label will remain available to screen readers. Use this option with care. In almost all cases, show the label.

```jsx
class HiddenLabelExample extends React.Component {
  state = {
    value: '12',
    selected: 'yes',
  };

  handleValueChange = (value) => {
    this.setState({value});
  };

  handleSelectionChange = (selected) => {
    this.setState({selected: selected[0]});
  };

  render() {
    return (
      <FormLayout>
        <ChoiceList
          title="Gift card auto-expiration"
          choices={[
            {label: 'Gift cards never expire', value: 'no'},
            {label: 'Gift cards expire', value: 'yes'},
          ]}
          selected={[this.state.selected]}
          onChange={this.handleSelectionChange}
        />
        <TextField
          label="Gift cards expire after"
          type="number"
          labelHidden
          value={this.state.value}
          disabled={this.state.selected === 'no'}
          onChange={this.handleValueChange}
          connectedRight={
            <Select
              label="Unit of time"
              labelHidden
              options={['months after purchase']}
            />
          }
        />
      </FormLayout>
    );
  }
}
```

### Text field with label action

Use when an optional, secondary action is closely associated with a text field. For example, on a field for entering a customs tariff code, a label action might be to look up the appropriate code from a table.

```jsx
class LabelActionExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Tariff code"
        value={this.state.value}
        onChange={this.handleChange}
        labelAction={{content: 'Look up codes'}}
      />
    );
  }
}
```

### Text field with placeholder text

Use to provide a short, non-essential hint about the expected input. Placeholder text is low-contrast, so don’t rely on it for important information.

```jsx
class PlaceholderExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Shipping zone name"
        value={this.state.value}
        onChange={this.handleChange}
        placeholder="e.g. North America, Europe"
      />
    );
  }
}
```

### Text field with help text

Use to show short instructional content below the text field. Use especially when incorrect formatting will result in an error and the merchant doesn’t know what format is required (e.g. to explain the correct format for dates, or requirements for a password). If more explanation is needed, link to the Shopify Help Center.

```jsx
class HelpTextExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Account email"
        type="email"
        value={this.state.value}
        onChange={this.handleChange}
        helpText="We’ll use this address if we need to contact you about your account."
      />
    );
  }
}
```

### Text field with prefix or suffix

Use as a special form of help text that works best inline. Use a prefix for things like currency symbols (e.g. “$”, “¥”, “£”). Use suffix for things like units of measure (e.g. “in”, “cm”).

```jsx
class PrefixExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Price"
        type="number"
        value={this.state.value}
        onChange={this.handleChange}
        prefix="$"
      />
    );
  }
}
```

### Text field with connected fields

Use when a text field and several related fields make up a logical unit. If inputting weight as a number and a separate unit of measurement, use a text field with a <select dropdown menu> (e.g. “kg”, “lb”) as a connected field.

```jsx
class ConnectedFieldsExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Weight"
        type="number"
        value={this.state.value}
        onChange={this.handleChange}
        connectedRight={
          <Select label="Weight unit" labelHidden options={['kg', 'lb']} />
        }
      />
    );
  }
}
```

### Text field with validation error

Use to let merchants know if their input is valid or if there’s an error. Whenever possible, validate input as soon as a merchant has finished interacting with a field (but not before). If a field already has an error, validate and remove errors as the merchant types so they can immediately see when an error has been fixed.

```jsx
class ValidationErrorExample extends React.Component {
  state = {
    value: '',
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="Store name"
        value={this.state.value}
        onChange={this.handleChange}
        error="Store name is required"
      />
    );
  }
}
```

### Text field with separate validation error

Use to let merchants know when their text field input is invalid in the context of a group of form inputs that the text field depends on.

When the `error` prop has a boolean value of `true`, the text field component indicates to merchants that their input is invalid without rendering an error message directly below it. It anticipates that an inline error component exists separately within the form.

To render an invalid text field and its validation error separately:

- Set a unique identifier on the text field component `id` prop
- Set a boolean on the text field component `error` prop
- Use an [inline error component](/components/forms/inline-error) to describe the invalid text field input, and set its `fieldID` prop to be the same unique indentifier as the text field component's `id`

```jsx
class SeparateValidationErrorExample extends React.Component {
  state = {
    content: '',
  };

  render() {
    const {content} = this.state;
    const textFieldID = 'ruleContent';
    const isInvalid = this.isInvalid(content);
    const errorMessage = isInvalid
      ? 'Enter 3 or more characters for product type is equal to'
      : '';

    const formGroupMarkup = (
      <Stack wrap={false} alignment="leading" spacing="tight">
        <Stack.Item fill>
          <Stack distribution="fill" spacing="tight">
            <Select
              labelHidden
              label="Collection rule type"
              options={['Product type']}
            />
            <Select
              labelHidden
              label="Collection rule condition"
              options={['is equal to']}
            />
            <TextField
              labelHidden
              label="Collection rule content"
              error={isInvalid}
              id={textFieldID}
              value={content}
              onChange={this.handleChange}
            />
          </Stack>
          <div style={{marginTop: '4px'}}>
            <InlineError message={errorMessage} fieldID={textFieldID} />
          </div>
        </Stack.Item>
        <Button icon="delete" />
      </Stack>
    );

    return (
      <Card sectioned>
        <FormLayout>{formGroupMarkup}</FormLayout>
      </Card>
    );
  }

  handleChange = (content) => {
    this.setState({content});
  };

  isInvalid = (content) => {
    if (!content) {
      return true;
    }

    return content.length < 3;
  };
}
```

### Disabled text field

Use to show that a textfield is not available for interaction. Most often used in forms when information is required only in a particular state. For example, the text field next to Other in a choice list when Other is not selected.

```jsx
<TextField label="Store name" disabled />
```

---

## Related components

- To lay out the elements of a responsive form, [use the form layout component](/components/forms/form-layout)
- To describe an invalid form input with a separate validation error, [use the inline error component](/components/forms/inline-error)
