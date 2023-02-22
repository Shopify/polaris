---
title: Inline
description: Use to display children horizontally in a row. Based on css flexbox.
category: Layout and structure
keywords:
  - layout
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: inline-default.tsx
    title: Default
    description: >-
      By default, children are displayed with `space-0` (0px) in between. Children are vertically centered and will wrap onto multiple lines when needed.
  - fileName: inline-with-non-wrapping.tsx
    title: Non-wrapping
    description: >-
      The default wrapping behavior of children can be overridden using the `wrap` prop.
  - fileName: inline-with-gap.tsx
    title: Gap
    description: >-
      Control the horizontal space between children using the `gap` prop. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: inline-with-block-align.tsx
    title: Block align
    description: >-
      Control the vertical alignment of children using the `blockAlign` prop.
  - fileName: inline-with-align.tsx
    title: Align
    description: >-
      Control the horizontal alignment of children using the `align` prop.
---

## Related components

- To create the large-scale structure of pages, [use the Columns component](https://polaris.shopify.com/components/layout-and-structure/columns)
- To display elements vertically, [use the AlphaStack component](https://polaris.shopify.com/components/alphastack)
