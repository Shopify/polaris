---
title: Alpha card
description: Cards are used to group similar concepts and tasks together for merchants to scan, read, and get things done. It displays content in a familiar and recognizable style.
category: Layout and structure
keywords:
  - layout
  - card
  - responsive
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
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: alpha-card-default.tsx
    title: Default
    description: >-
      By default, cards have an 8px border radius and uses `--p-surface` as the background and `--p-shadow-md` as the shadow. There is padding of `space-5` (20px) around children and `space-4` (16px) for small screens.
  - fileName: alpha-card-with-subdued-background.tsx
    title: With subdued background
    description: >-
      Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.
  - fileName: alpha-card-with-varying-padding.tsx
    title: With varying padding
    description: >-
      Use the `padding` property to adjust the spacing of content within a card. The `padding` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: alpha-card-with-rounded-corners.tsx
    title: Rounded corners
    description: >-
      Cards can have a border radius applied responsively with the `roundedAbove` prop.
---

## Best practices

Cards should:

- Group related information
- Display information in a way that prioritizes what the merchant needs to know most first
- Use headings that set clear expectations about the card’s purpose
- Stick to single user flows or break more complicated flows into multiple sections
- Avoid too many call-to-action buttons or links and only one primary call to action per card
- Use calls to action on the bottom of the card for next steps and use the space in the upper right corner of the card for persistent, optional actions (such as Edit)

---

## Related components

- For more flexibility on styling, [use the Box component](https://polaris.shopify.com/components/layout-and-structure/box)
