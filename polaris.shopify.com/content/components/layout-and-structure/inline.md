---
title: Inline
description: Use to display children horizontally in a row. Based on CSS Flexbox.
category: Layout and structure
keywords:
  - layout
  - inline
  - flexbox
  - flex
  - responsive
  - flexible items
  - row of components
  - rows
  - vertical centering
  - horizontal row of components
  - stack
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: inline-with-non-wrapping.tsx
    title: Non-wrapping
    description: >-
      The default wrapping behavior of children can be overridden using the `wrap` prop.
  - fileName: inline-with-gap.tsx
    title: Gap
    description: >-
      Control the horizontal and vertical space between children using the `gap` prop. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
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

## Related resources

- Inline props are named following the convention of CSS logical properties, such as 'padding-inline-start' and 'padding-block-start'. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).
