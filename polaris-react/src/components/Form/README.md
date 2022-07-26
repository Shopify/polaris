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
function FormOnSubmitExample() {
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((_event) => {
    setEmail('');
    setNewsletter(false);
  }, []);

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    [],
  );

  const handleEmailChange = useCallback((value) => setEmail(value), []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={newsletter}
          onChange={handleNewsLetterChange}
        />

        <TextField
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          autoComplete="email"
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
```

### Without native validation

Use in forms to toggle native form validation.

```jsx
function FormWithoutNativeValidationExample() {
  const [url, setUrl] = useState('');

  const handleSubmit = useCallback((_event) => setUrl(''), []);

  const handleUrlChange = useCallback((value) => setUrl(value), []);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={url}
          onChange={handleUrlChange}
          label="App URL"
          type="url"
          autoComplete="off"
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}
```

---

## Related components

- To arrange fields within a form using standard spacing, [use the form layout component](https://polaris.shopify.com/components/form-layout)
- To see all of the components that make up a form, [visit the form section](https://polaris.shopify.com/components/checkbox#navigation) of the component library

---

## Accessibility

The form component wraps content in an HTML `<form>` element. This helps to support assistive technologies that use different interaction and browse modes.

Forms can have only one submit button and it must be at the end of the form. By default, buttons added to the form are given a `type` attribute set to `button` to avoid conflicts. To make a button the submit button instead (`type="submit"`), set the `submit` prop on the button.

### Keyboard support

By default, the `implicitSubmit` prop is set to `true`. This allows merchants to submit the form with the <kbd>enter</kbd>/<kbd>return</kbd> key when focus is in any text field inside the form. This provides a shortcut for keyboard users. If this behavior doesn’t fit the form, then set the prop to `false`.
