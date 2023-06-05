---
title: Visually hidden
description: Use when an element needs to be available to assistive technology (for example, a screen reader) but otherwise hidden.
category: Deprecated
keywords:
  - VisuallyHidden
  - screen readers
  - hidden but available for screen readers
  - visually hidden headings
  - hide
  - hidden headings
  - hidden text
  - visually hidden table headers
  - visually hidden headers
  - hidden table headers
  - hidden table headings
  - accessibility
  - a11y
  - assistive technology
status:
  value: Deprecated
  message: This component is no longer supported. Please use the Text component instead.
---

## Mapping to the Text component

```diff
- <VisuallyHidden>
-   <Heading>Title and description</Heading>
- </VisuallyHidden>
+ <Text visuallyHidden variant="headingMd" as="h2">Title and description</Text>
```

---
