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
- Strong for input fields, or for a row total in a price table
- Paired with symbols, like an arrow or dollar sign, when using positive or negative styles

---

## Examples

### Subdued text style

Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.

```jsx
<TextStyle variation="subdued">No supplier listed</TextStyle>
```

<!-- content-for: android -->

![Subdued textstyle](/public_images/components/TextStyle/android/subdued@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Subdued text style](/public_images/components/TextStyle/ios/subdued@2x.png)

<!-- /content-for -->

### Strong text style

Use to mark text representing user input, or to emphasize the totals row in a price table.

```jsx
<TextStyle variation="strong">Total</TextStyle>
```

<!-- content-for: android -->

![Strong text style](/public_images/components/TextStyle/android/strong@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Strong text style](/public_images/components/TextStyle/ios/strong@2x.png)

<!-- /content-for -->

### Positive text style

Use in combination with a symbol showing an increasing value to indicate an upward trend.

```jsx
<TextStyle variation="positive">Orders increased</TextStyle>
```

<!-- content-for: android -->

![Positive text style](/public_images/components/TextStyle/android/positive@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Positive text style](/public_images/components/TextStyle/ios/positive@2x.png)

<!-- /content-for -->

### Negative text style

Use in combination with a symbol showing a decreasing value to indicate a downward trend.

```jsx
<TextStyle variation="negative">Orders decreased</TextStyle>
```

<!-- content-for: android -->

![Negative text style](/public_images/components/TextStyle/android/negative@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Negative text style](/public_images/components/TextStyle/ios/negative@2x.png)

<!-- /content-for -->

### Code text style

Use to display inline snippets of code or code-like text.

```jsx
<p>
  New URL that visitors should be forwarded to. If you want your store’s
  homepage, enter <TextStyle variation="code"> / </TextStyle> (a forward slash).
</p>
```

<!-- content-for: android -->

![Code text style](/public_images/components/TextStyle/android/code@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Code text style](/public_images/components/TextStyle/ios/code@2x.png)

<!-- /content-for -->
