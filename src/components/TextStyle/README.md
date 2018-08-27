---
name: Text style
category: Titles and text
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
---

# Text style

Text style enhances text with additional visual meaning. For example, using subdued text to de-emphasize it from its surrounding text.

---

## Best practices

Text style should be:

- Used when enhancing the text will help the merchant undertand its meaning
- Subdued if the text is less important than its surrounding text
- Strong for input fields, or for a row total in a price table
- Paired with symbols, like an arrow or dollar sign, when using positive or negative styles

---

## Examples

### Subdued textstyle

Use to de-emphasize a piece of text that is less important to the merchant than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.

```jsx
<TextStyle variation="subdued">No supplier listed</TextStyle>
```

### Strong textstyle

Use to mark text representing user input, or to emphasize the totals row in a price table.

```jsx
<TextStyle variation="strong">Total</TextStyle>
```

### Positive textstyle

Use in combination with a symbol showing an increasing value to indicate an upward trend.

```jsx
<TextStyle variation="positive">Orders increased</TextStyle>
```

### Negative textstyle

Use in combination with a symbol showing a decreasing value to indicate a downward trend.

```jsx
<TextStyle variation="negative">Orders decreased</TextStyle>
```

### Code text style

Use to display inline snippets of code or code-like text.

```jsx
<p>
  New URL that visitors should be forwarded to. If you want your store's
  homepage, enter <TextStyle variation="code"> / </TextStyle> (a forward slash).
</p>
```
