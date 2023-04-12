---
title: Horizontal stack
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
  value: Beta
  message: This component is ready for wider adoption, usage is encouraged for most cases. Breaking changes are possible in minor version updates. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: horizontal-stack-with-non-wrapping.tsx
    title: Non-wrapping
    description: >-
      The default wrapping behavior of children can be overridden using the `wrap` prop.
  - fileName: horizontal-stack-with-gap.tsx
    title: Gap
    description: >-
      Control the horizontal and vertical space between children using the `gap` prop. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: horizontal-stack-with-block-align.tsx
    title: Block align
    description: >-
      Control the vertical alignment of children using the `blockAlign` prop.
  - fileName: horizontal-stack-with-align.tsx
    title: Align
    description: >-
      Control the horizontal alignment of children using the `align` prop.
---

## Related components

- To create the large-scale structure of pages, [use the HorizontalGrid component](https://polaris.shopify.com/components/layout-and-structure/horizontal-grid)
- To display elements vertically, [use the VerticalStack component](https://polaris.shopify.com/components/vertical-stack)

## Related resources

- HorizontalStack props are named following the convention of CSS logical properties, such as 'padding-inline-start' and 'padding-block-start'. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).
