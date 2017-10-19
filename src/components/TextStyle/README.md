---
name: TextStyle
category: Titles and text
keywords:
  - typographic
---

# TextStyle

TextStyle enhances text with additional visual meaning. For example, de-emphasizing text that is less important than surrounding text.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Text alone does not provide enough meaning.

### Solution

TextStyle enhances text with additional visual meaning.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| variation | enum['subdued', 'strong', 'positive', 'negative'] | Give text additional visual meaning |
| children | string or React.ReactNode | The content that should get the intended styling |

## Examples

### Subdued textstyle

Use to de-emphasize a piece of text that is less important to the merchant than other nearby text. May also be used to indicate when normal content is absent, e.g. “No supplier listed”. Don’t use only for aesthetic effect.

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
