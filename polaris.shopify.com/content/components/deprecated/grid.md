---
title: Grid
description: Create complex layouts based on [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid).
category: Layout and structure
keywords:
  - one column
  - two column
  - three column
  - column
  - row
  - column layouts
  - grid layouts
  - containers
  - full width containers
  - css grid
status:
  value: Deprecated
  message: >-
    Grid was built prior to layout primitives like columns, inline, and alpha stack. Comparatively, grid is difficult to learn, document, and understand its usage in a codebase.
    The new layout primitives should be used in combination to achieve similar results to grid.
examples:
  - fileName: grid-two-column.tsx
    title: Two column
    description: Use to create a two column layout that wraps at a breakpoint and aligns to a twelve column grid.
  - fileName: grid-two-thirds-and-one-third-column.tsx
    title: Two-thirds and one-third column
    description: Use to create a two-thirds, one-third column layout that wraps at a breakpoint and aligns to a twelve column grid.
  - fileName: grid-three-one-third-column.tsx
    title: Three one-third column
    description: Use to create a three column layout that wrap at a breakpoint and aligns to a twelve column grid.
  - fileName: grid-custom-layout.tsx
    title: Custom layout
    description: Use to create a layout that can be customized at specific breakpoints.
---

## Related components

- To lay out a set of smaller components in a row, [use the stack component](https://polaris.shopify.com/components/layout-and-structure/alpha-stack)
- To lay out form fields, [use the form layout component](https://polaris.shopify.com/components/form-layout)
