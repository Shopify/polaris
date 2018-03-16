---
name: Form
category: Forms
keywords:
  - form
  - forms
  - input
  - checkbox
  - check box
  - textfield
  - text field
  - post
  - get
---

# Form

A wrapper component that handles the submission of Forms.

---

## Best Practices

The form component should:

* Be used to wrap around all form input elements
* Be used too emulate the native HTML `form` element behaviour with a custom `onSubmit` callback

---

## Examples

### Custom onSubmit

Use onSubmit as a callback for when your form is submitted.

```jsx
class FormExample extends React.Component {
  state = {
    newsletter: false,
    email: '',
  };

  render() {
    const {newsletter, email} = this.state;

    return (
      <FormLayout>
        <Form onSubmit={this.handleSubmit}>
          <Checkbox
            label="Sign up for the Polaris newsletter"
            checked={newsletter}
            onChange={this.handleChange('newsletter')}
          />

          <TextField
            value={email}
            onChange={this.handleChange('email')}
            label="Email"
            type="email"
            helpText={
              <span>Please enter your email.</span>
            }
          />

          <Button submit>
            Submit
          </Button>
        </Form>
      </FormLayout>
    );
  }

  handleSubmit = (event) => {
    this.setState({newsletter: false, email: ''});
  }

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  }
}
```

### Form without native validation

Use in forms to toggle native form validation.

```jsx
class FormExample extends React.Component {
  state = {
    url: '',
  };

  render() {
    const {url} = this.state;

    return (
      <FormLayout>
        <Form
          noValidate
          onSubmit={this.handleSubmit}
        >
          <TextField
            value={url}
            onChange={this.handleChange('url')}
            label="Url"
            type="url"
            helpText={
              <span>Please enter website url.</span>
            }
          />

          <Button submit>
            Submit
          </Button>
        </Form>
      </FormLayout>
    );
  }

  handleSubmit = () => {
    this.setState({url: ''});
  }

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  }
}
```

---

## Related components

* For a layout component, [use form layout](/components/forms/form-layout)
* To see form elements, [visit the form section](/components/forms/checkbox#navigation)
