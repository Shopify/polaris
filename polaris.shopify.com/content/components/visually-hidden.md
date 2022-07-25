---
name: Visually hidden
category: Titles and text
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
examples:
  - fileName: visually-hidden-default.tsx
    title: Default
    description: Always provide a heading for a major page section such as a card. In rare cases the heading is visually redundant and the meaning is conveyed by context. Rather than omit the heading, wrap the heading in the visually hidden component.
  - fileName: visually-hidden-table-headers.tsx
    title: Table headers
    description: Whenever one or more table columns has no need for a visible header, hide the header content rather than omitting it. Note that due to browser quirks the visually hidden component must go inside each `<th>`.
---

# Visually hidden

Use when an element needs to be available to assistive technology (for example, a screen reader) but otherwise hidden.

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
