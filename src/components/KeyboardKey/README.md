---
name: Keyboard key
category: Images and icons
keywords:
  - KeyboardKey
  - shortcuts
  - hotkey
  - hot key
  - keyboard shortcuts
  - keyboard letter
  - hotkey combinations
---

# Keyboard key

Keyboard key is used to educate merchants about keyboard shortcuts.

---

## Best practices

The keyboard key component should:

- Include a heading to introduce and explain the shortcuts being described when more than one shortcut is listed
- Include an action label to describe what will happen if merchants use the key combination

---

## Content guidelines

### Heading

Headings above the keyboard key should be:

- Informative and descriptive
  - They should label the type of keyboard shortcuts being presented
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep headings to single sentence and avoid using punctuation such as periods, commas, or semicolons
  - Avoid articles (the, a, an) to keep content short and actionable
  - Be written in sentence case (first word capitalized, the rest is lowercase)

### Shortcut description

The shortcut description should describe what action will be taken if merchants tap certain keys. When a hotkey combination takes merchants to a location in the interface, the format should be:

---

## Examples

### List of keyboard shortcuts

Use to list a related set of keyboard shortcuts.

```jsx
<KeyboardKey>Ctrl</KeyboardKey>
```

---

## Related components

- To add a tooltip for a button with an associated keyboard shortcut, [use the tooltip component](https://polaris.shopify.com/components/tooltip)

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

The text of the keyboard key component is read by screen readers, but the visual formatting isn’t conveyed. Ensure that merchants are able to understand information about keyboard shortcuts without relying on the visual style of the component.

<!-- usageblock -->

#### Do

- Pair lists of keyboard shortcut information with a heading that describes the section (“Keyboard shortcuts”).
- Provide inline keyboard instructions with context.

```JSX
Press the <KeyboardKey>Ctrl</KeyboardKey> key.
```

#### Don't

- Use the keyboard key component alone to convey keyboard instructions.

```JSX
Use <KeyboardKey>Ctrl</KeyboardKey>
```

<!-- end -->

<!-- /content-for -->
