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

A wrapper component that handles the submission of forms.

---

## Best practices

The form component should be used to:

- Wrap around all form input elements
- Emulate the native HTML `form` element behavior with a custom `onSubmit` callback

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
      <Form onSubmit={this.handleSubmit}>
        <FormLayout>
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
              <span>
                We’ll use this email address to inform you on future changes to
                Polaris.
              </span>
            }
          />

          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    );
  }

  handleSubmit = (event) => {
    this.setState({newsletter: false, email: ''});
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };
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
      <Form noValidate onSubmit={this.handleSubmit}>
        <FormLayout>
          <TextField
            value={url}
            onChange={this.handleChange('url')}
            label="App URL"
            type="url"
          />

          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    );
  }

  handleSubmit = (event) => {
    this.setState({url: ''});
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };
}
```

---

## Related components

- To arrange fields within a form using standard spacing, [use the form layout component](/components/forms/form-layout)
- To see all of the components that make up a form, [visit the form section](/components/forms/checkbox#navigation) of the component library
