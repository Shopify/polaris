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
