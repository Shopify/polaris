---
name: Button group
category: Actions
platforms:
  - android
  - ios
  - web
keywords:
  - ButtonGroup
  - choices
  - decision
  - call-to-action
  - CTA
  - segmented buttons
  - divided buttons
  - grouped actions
  - multiple horizontal buttons
  - multiple buttons
  - set of buttons
  - set of actions
  - horizontal arrangement of buttons
  - stacked
  - segmented control
  - ios
  - android
---

# Button group

Button group displays multiple related actions stacked or in a horizontal row to help with arrangement and spacing.

---

## Best practices

Button groups should:

- Only use buttons that follow the
  [best practices outlined in the button component](https://polaris.shopify.com/components/actions/button#best-practices)
- Group together calls to action that have a relationship
- Be used with consideration that too many calls to action can cause merchants
  to be unsure of what to do next
- Be thoughtful about how multiple buttons will look and work on small screens
- Only be used in groups of up to six buttons if the buttons contain an icon
  with no text

---

## Content guidelines

Button groups should follow the [content guidelines](https://polaris.shopify.com/content/actionable-language#section-buttons) for buttons.

---

## Examples

### Default button group

Use when you have multiple buttons to space them out evenly.

```jsx
<ButtonGroup>
  <Button>Cancel</Button>
  <Button primary>Save</Button>
</ButtonGroup>
```

<!-- content-for: android -->

![Alt text](/public_images/components/ButtonGroup/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Alt text](/public_images/components/ButtonGroup/ios/default@2x.png)

<!-- /content-for -->

### Button group with segmented buttons

Use to emphasize several buttons as a thematically-related set among other controls.

```jsx
<ButtonGroup segmented>
  <Button>Bold</Button>
  <Button>Italic</Button>
  <Button>Underline</Button>
</ButtonGroup>
```

<!-- content-for: android -->

![Alt text](/public_images/components/ButtonGroup/android/segmented-button@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Alt text](/public_images/components/ButtonGroup/ios/segmented-button@2x.png)

<!-- /content-for -->

---

## Related components

- To learn how to use individual buttons, [use the button component](https://polaris.shopify.com/components/actions/button)
- To embed an action or navigation into a line of text, [use the link component](https://polaris.shopify.com/components/navigation/link)
