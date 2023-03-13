---
title: Alpha stack
description: Use to display children vertically with full width by default. Based on CSS Flexbox.
category: Layout and structure
keywords:
  - layout
  - stack spacing
  - vertical centering
  - fill available space
  - fill space
  - equal width
  - right-aligned stack
  - stack layout
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: alpha-stack-with-gap.tsx
    title: Gap
    description: >-
      Control the vertical space between children using the `gap` prop.
  - fileName: alpha-stack-with-align.tsx
    title: Align
    description: >-
      Control the horizontal alignment of children using the `align` prop.
  - fileName: alpha-stack-with-divider.tsx
    title: With divider
    description: >-
      Automatically insert a `<Divider />` between children using the
      `withDivider` prop.
---

## Best practices

Stacks should:

- Not be used for complex or unique arrangements of components
- Not be used for large-scale page layout

---

## Related components

- To display elements horizontally, [use the Inline component](https://polaris.shopify.com/components/inline)
