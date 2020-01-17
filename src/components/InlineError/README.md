---
name: Inline error
category: Forms
platforms:
  - web
  - android
  - ios
keywords:
  - InlineError
  - error message
  - form error
  - invalid input
  - form group
---

# Inline error

Inline errors are brief, in-context messages that tell merchants something went wrong with a single or group of inputs in a form. Use inline errors to help merchants understand why a form input may be invalid and how to fix it.

---

## Best practices

Inline errors should:

- Be brief
- Be written in sentence case
- Be visible immediately upon the invalid form input
- Be removed as soon as the input is valid so merchants can immediately tell they fixed the issue
- Describe specific solutions so merchants can successfully complete their task in the form
- Not be placed out of context of the input or group of inputs they describe

[Learn more about error message patterns](https://polaris.shopify.com/experiences/error-messages#section-form-validation)

---

## Content guidelines

### Inline error messages

Since the error message is directly below the source of the problem, the copy only needs to explain why the error happened. Optionally, the message can clarify what to do next or offer a one-click fix.

Inline error messages should:

- Clearly explain what went wrong, give a next step, or offer a one-click fix
- Be short and concise, no more than a single sentence
- Use [passive voice](https://polaris.shopify.com/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed for the error

<!-- usagelist -->

#### Do

- Store name is required

#### Don’t

- You didn’t enter a store name.

<!-- end -->

---

## Examples

### Basic inline error

Use when the merchant has entered invalid information into multiple fields inside of a form, or needs to be displayed in a non-standard position in the form layout.

```jsx
<InlineError message="Store name is required" fieldID="myFieldID" />
```

<!-- content-for: android -->

![Inline error for Android](/public_images/components/InlineError/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Inline error for iOS](/public_images/components/InlineError/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To create a list of exceptions that describe a resource, [use the exception list component](https://polaris.shopify.com/components/lists-and-tables/exception-list)

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

- Use the required `fieldID` prop to give the inline error a unique `id`. This ties the error to a form field using `aria-describedby` so that it's conveyed to screen reader users.
- Use the required `message` prop to provide the text that describes the error.
- The inline error [icon](https://polaris.shopify.com/design/icons) helps visually identify the error message for merchants who have difficulty seeing [colors](https://polaris.shopify.com/design/colors) or who use settings that remove color from the page.

<!-- /content-for -->
