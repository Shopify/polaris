---
title: Bleed
description: Applies negative margin to allow content to bleed out into the surrounding layout.
category: Layout and structure
keywords:
  - layout
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: bleed-horizontal.tsx
    title: Horizontal
    description: >-
      Content will bleed horizontally into the surrounding layout using the `marginInline` prop.
  - fileName: bleed-vertical.tsx
    title: Vertical
    description: >-
      Content will bleed vertically into the surrounding layout using the `marginBlock` prop.
  - fileName: bleed-specific-direction.tsx
    title: Specific direction
    description: >-
      Negative margins can be added in a specific direction using the [Spacing tokens](https://polaris.shopify.com/tokens/spacing).
---

## Bleed values

Content should never go beyond the edges of the parent container. Choose a bleed value that works within the containing layout.

## Related resources

- Bleed props are named following the convention of CSS logical properties, such as 'margin-inline-start' and 'margin-block-start'. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).
