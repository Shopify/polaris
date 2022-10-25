---
title: Text style
description: Text style enhances text with additional visual meaning. For example, using subdued text to de-emphasize it from its surrounding text.
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
examples:
  - fileName: text-style-subdued.tsx
    title: Subdued
    description: Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.
  - fileName: text-style-strong.tsx
    title: Strong
    description: Use to mark text representing user input, or to emphasize the totals row in a price table.
  - fileName: text-style-positive.tsx
    title: Positive
    description: Use in combination with a symbol showing an increasing value to indicate an upward trend.
  - fileName: text-style-negative.tsx
    title: Negative
    description: Use in combination with a symbol showing a decreasing value to indicate a downward trend.
  - fileName: text-style-warning.tsx
    title: Warning
    description: Use to denote something that needs attention, or that merchants need to take action on.
  - fileName: text-style-code.tsx
    title: Code
    description: Use to display inline snippets of code or code-like text.
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
