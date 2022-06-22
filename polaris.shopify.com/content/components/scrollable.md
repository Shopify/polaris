---
name: Scrollable
category: Behavior
keywords:
  - long form
  - text container
  - terms of service
  - long form container
  - scrolling
  - independently scrollable
  - modal scrolling
  - pane scrolling
  - scrolling in panes
  - below the fold
  - above the fold
examples:
  - fileName: scrollable-default-container.tsx
    title: Default scrollable container
    description: >-
      Use when you need to make a region within the page independently
      scrollable. It’s often used in modals and other panes where it’s helpful
      to provide an extra visual cue that content exists below or above the
      fold.
  - fileName: scrollable-scroll-to-child-component.tsx
    title: Scroll to child component
    description: >-
      Use when you need to programmatically scroll a child component into view
      in the scrollable container.
---

# Scrollable

The scrollable component is a container for long form content, such as terms of service, that allows for scrolling so merchants can expose more text as they read.

---

## Best practices

Scrollable containers should:

- Be used when it’s helpful to provide an extra visual cue to let merchants
  know that content exists below or above the fold
- Only be used for length text such as terms of service or other legal
  disclaimers and never for instructional or action-oriented text

---

## Content guidelines

Scrollable containers are cards with scrolling functionality, and should follow the [content guidelines](https://polaris.shopify.com/components/structure/card#section-content-guidelines) for cards.

---

## Related components

- To put long sections of information under a block that merchants can expand or collapse, [use the collapsible component](https://polaris.shopify.com/components/behavior/collapsible)
