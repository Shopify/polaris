---
name: Text style
category: Titles and text
keywords:
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

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Using regular text alone isn’t always enough to guide merchants eyes when presented with a lot of information.

### Solution

Text styles help merchants interpret meaning by providing visual cues.

---

## Best practices

Text style should be:

* Used when enhancing the text will help the merchant undertand its meaning
* Subdued if the text is less important than its surrounding text
* Strong for input fields, or for a row total in a price table
* Paired with symbols, like an arrow or dollar sign, when using positive or negative styles

| Prop | Type | Description |
| ---- | ---- | ----------- |
| variation | enum['subdued', 'strong', 'positive', 'negative'] | Give text additional visual meaning |
| children | string or React.ReactNode | The content that should get the intended styling |

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
