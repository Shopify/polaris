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
examples:
  - fileName: form-custom-on-submit.tsx
    title: Custom onSubmit
    description: Use onSubmit as a callback for when your form is submitted.
  - fileName: form-without-native-validation.tsx
    title: Form without native validation
    description: Use in forms to toggle native form validation.
---

# Form

A wrapper component that handles the submission of forms.

---

## Best practices

The form component should be used to:

- Wrap around all form input elements
- Emulate the native HTML `form` element behavior with a custom `onSubmit` callback

---

## Related components

- To arrange fields within a form using standard spacing, [use the form layout component](https://polaris.shopify.com/components/forms/form-layout)
- To see all of the components that make up a form, [visit the form section](https://polaris.shopify.com/components/forms/checkbox#navigation) of the component library

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

The form component wraps content in an HTML `<form>` element. This helps to support assistive technologies that use different interaction and browse modes.

Forms can have only one submit button and it must be at the end of the form. By default, buttons added to the form are given a `type` attribute set to `button` to avoid conflicts. To make a button the submit button instead (`type="submit"`), set the `submit` prop on the button.

### Keyboard support

By default, the `implicitSubmit` prop is set to `true`. This allows merchants to submit the form with the <kbd>enter</kbd>/<kbd>return</kbd> key when focus is in any text field inside the form. This provides a shortcut for keyboard users. If this behavior doesn’t fit the form, then set the prop to `false`.

<!-- /content-for -->
