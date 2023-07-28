---
title: Horizontal grid
description: Use to lay out children horizontally with equal gap between columns. Based on [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid).
category: Layout and structure
keywords:
  - layout
  - columns
  - grid
  - responsive
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: horizontal-grid-with-varying-gap.tsx
    title: Gap
    description: >-
      Use the `gap` prop to set the amount of space between columns. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: horizontal-grid-with-fixed-widths.tsx
    title: Column width
    description: >-
      The `columns` property accepts CSS column shorthand syntax, or an array of strings mapping to common widths in the admin such as `oneThird`, `oneHalf`, and `twoThirds`. For responsive columns, use the same syntax passed into an object with the breakpoints.
  - fileName: horizontal-grid-with-set-number.tsx
    title: Number of columns
    description: >-
      Control the number of columns using the `columns` prop. Column numbers can be responsively set using the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
---

## Related components

- For more control over padding and widths, [use the Box component](https://polaris.shopify.com/components/box)
- To lay out a set of smaller components horizontally, [use the HorizontalStack component](https://polaris.shopify.com/components/layout-and-structure/horizontal-stack)
