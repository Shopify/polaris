---
name: Keyboard accessories
category: Forms
platforms:
  - android
  - ios
keywords:
  - keyboard
  - soft
  - virtual
  - ios
  - android
---

# Keyboard accessories

On iOS and Android, software keyboards appear on the screen when typing. Keyboard accessories allows additional content and actions based on what merchants are doing. For example, when merchants are updating a description and need controls for bolding, italicizing, and underlining.

---

## Best practices

Keyboard accessories should:

- Have a maximum height of:
  - 44pt on iOS
  - 48dp on Android
- Include a horizontally swipeable interaction if there is a lot of content or a large number of actions you need to make available to merchants
  - Provide an easy hint or introduction to make merchants aware of the swipe interaction
- Make actions grouped and expandable if possible, in order to reduce visual noise and complexity for merchants

---

## Examples

### Keyboard accessories with actions

<!-- example-for: ios, android -->

Use the action accessories to add actions that are relevant to what merchants are entering on the screen.

<!-- content-for: android -->

![Keyboard accessory with actions](/public_images/components/KeyboardAccessories/android/toolbar@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Keyboard accessory with actions](/public_images/components/KeyboardAccessories/ios/toolbar@2x.png)

<!-- /content-for -->

### Keyboard accessories with text field

<!-- example-for: ios, android -->

Use to make message entry easier in messaging and chat-based products.

<!-- content-for: android -->

![Keyboard accessory with text field](/public_images/components/KeyboardAccessories/android/text-field@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Keyboard accessory with text field](/public_images/components/KeyboardAccessories/ios/text-field@2x.png)

<!-- /content-for -->

---

## Related components

- To make more actions visible in keyboard accessories, use [the icon component](https://polaris.shopify.com/components/images-and-icons/icon) for action labels
- To group actions within keyboard accessories, use [the button group component](https://polaris.shopify.com/components/actions/button-group)
- For chat-based interfaces, use [the text field component](https://polaris.shopify.com/components/forms/text-field) in keyboard accessories
