---
title: Caption
description: Caption text size is smaller than the recommended size for general reading. On web, it should be used only in a graph or as a timestamp for a list item. On Android and iOS, it can also be used as help text or as other kinds of secondary text for list items.
category: Titles and text
keywords:
  - labels
  - text
  - microcopy
  - typographic
  - graph
  - timestamp
  - smaller text
  - smallest text
  - smaller than reading size text
  - time text
  - compact text
  - small text
status:
  value: Deprecated
  message: This component is no longer supported. Please use the Text component instead.
---

## Mapping to the Text component

```diff
- <Caption>Received April 21, 2017</Caption>
+ <Text variant="bodySm" as="p">Received April 21, 2017</Text>
```

---
