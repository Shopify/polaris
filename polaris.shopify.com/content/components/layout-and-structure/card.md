---
title: Card
description: Cards are used to group similar concepts and tasks together for merchants to scan, read, and get things done. It displays content in a familiar and recognizable style.
category: Layout and structure
keywords:
  - layout
  - container
  - box
  - grid
  - panel
  - card with call to action in the footer
  - card with call to action in the heading
  - card with call to action in a section
  - card with button in the footer
  - card with button in the heading
  - card with multiple sections
  - card with subsections
  - sectioned card
  - card with a subdued section
  - subdued card for secondary content
  - callout
  - call out
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [Component lifecycle](/getting-started/components-lifecycle).
examples:
  - fileName: card-default.tsx
    title: Default
  - fileName: card-with-subdued-background.tsx
    title: With subdued background
    description: >-
      Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.
  - fileName: card-with-varying-padding.tsx
    title: With varying padding
    description: >-
      Use the `padding` property to adjust the spacing within a card. You can also specify spacing values at different breakpoints.
  - fileName: card-with-rounded-corners.tsx
    title: Rounded corners
    description: >-
      Cards have an 8px border radius by default. Rounding may also be applied responsively with the roundedAbove prop. This enables cards to be softened on larger screens, but squared off when they are full bleed on smaller devices.
---

## Best practices

Cards should:

- Group related information
- Display information in a way that prioritizes what the merchant needs to know most first
