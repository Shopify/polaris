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
