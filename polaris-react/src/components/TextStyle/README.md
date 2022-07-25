---
name: Text style
category: Titles and text
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

## Examples

### Subdued

Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.

```jsx
<TextStyle variation="subdued">No supplier listed</TextStyle>
```

### Strong

Use to mark text representing user input, or to emphasize the totals row in a price table.

```jsx
<TextStyle variation="strong">Total</TextStyle>
```

### Positive

Use in combination with a symbol showing an increasing value to indicate an upward trend.

```jsx
<TextStyle variation="positive">Orders increased</TextStyle>
```

### Negative

Use in combination with a symbol showing a decreasing value to indicate a downward trend.

```jsx
<TextStyle variation="negative">Orders decreased</TextStyle>
```

### Warning

Use to denote something that needs attention, or that merchants need to take action on.

```jsx
<TextStyle variation="warning">Scheduled maintenance</TextStyle>
```

### Code

Use to display inline snippets of code or code-like text.

```jsx
<p>
  New URL that visitors should be forwarded to. If you want your store’s
  homepage, enter <TextStyle variation="code"> / </TextStyle> (a forward slash).
</p>
```

---

## Accessibility

Don’t rely on text style alone to convey information to merchants. Ensure that text styles are used to enhance the information provided in text.

<!-- dodont -->

#### Do

```
<TextStyle variation="positive">Orders increased</TextStyle>
```

#### Don’t

```
<TextStyle variation="positive">Orders</TextStyle>
```

<!-- end -->
