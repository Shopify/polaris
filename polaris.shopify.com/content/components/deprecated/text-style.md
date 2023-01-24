---
title: Text style
description: Text style enhances text with additional visual meaning. For example, using subdued text to de-emphasize it from its surrounding text.
category: Deprecated
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
status:
  value: Deprecated
  message: This component is no longer supported. Please use the Text component instead.
---

## Mapping to the Text component

### Subdued

```diff
- <TextStyle variation="subdued">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="subdued">No supplier listed</Text>
```

### Strong

```diff
- <TextStyle variation="strong">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" fontWeight="semibold">No supplier listed</Text>
```

### Positive

```diff
- <TextStyle variation="positive">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="success">No supplier listed</Text>
```

### Negative

```diff
- <TextStyle variation="negative">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="critical">No supplier listed</Text>
```

### Warning

```diff
- <TextStyle variation="warning">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="warning">No supplier listed</Text>
```

### Code

```diff
- <TextStyle variation="code">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span"><InlineCode>No supplier listed</InlineCode></Text>
```

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
