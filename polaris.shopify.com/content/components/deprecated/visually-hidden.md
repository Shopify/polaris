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

## Best practices

Visually hidden should:

- Not be used if semantic markup can make content understandable to people using assistive technology
- Be used to provide extra context when semantic markup isn’t enough
- Be used on any content that is normally present but is being omitted
- Make sense in context when used with a screen reader

---

## Accessibility

The visually hidden component styles text so that it’s not visible, but it is available to assistive technologies like screen readers and other text to speech programs.

The component shouldn’t be used to hide interactive content.
