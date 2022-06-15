---
name: Text style
category: Titles and text
platforms:
  - android
  - ios
  - web
keywords:
  - TextStyle
  - typographic
  - subdued
  - strong
  - negative
  - warning
  - positive
  - cues
  - enhancements
  - type
  - bold
  - dollar
  - increase
  - decrease
  - input
  - fields
  - android
  - ios
examples:
  - fileName: text-style-subdued.tsx
    title: Subdued text style
    description: >-
      Use to de-emphasize a piece of text that is less important to merchants
      than other nearby text. May also be used to indicate when normal content
      is absent, for example, “No supplier listed”. Don’t use only for aesthetic
      effect.
  - fileName: text-style-strong.tsx
    title: Strong text style
    description: >-
      Use to mark text representing user input, or to emphasize the totals row
      in a price table.
  - fileName: text-style-positive.tsx
    title: Positive text style
    description: >-
      Use in combination with a symbol showing an increasing value to indicate
      an upward trend.
  - fileName: text-style-negative.tsx
    title: Negative text style
    description: >-
      Use in combination with a symbol showing a decreasing value to indicate a
      downward trend.
  - fileName: text-style-warning.tsx
    title: Warning text style
    description: >-
      Use to denote something that needs attention, or that merchants need to
      take action on.
  - fileName: text-style-code.tsx
    title: Code text style
    description: >-
      Use to display inline snippets of code or code-like
      text.
---

# Text style

Text style enhances text with additional visual meaning. For example, using subdued text to de-emphasize it from its surrounding text.

---

## Best practices

Text style should be:

- Used when enhancing the text to help merchants understand its meaning
- Subdued if the text is less important than its surrounding text
- Warning if the text denotes something that needs attention, or that merchants need to take action on.
- Strong for input fields, or for a row total in a price table
- Paired with symbols, like an arrow or dollar sign, when using positive or negative styles

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

Don’t rely on text style alone to convey information to merchants. Ensure that text styles are used to enhance the information provided in text.

<!-- usageblock -->

#### Do

```
<TextStyle variation="positive">Orders increased</TextStyle>
```

#### Don’t

```
<TextStyle variation="positive">Orders</TextStyle>
```

<!-- end -->

<!-- /content-for -->
