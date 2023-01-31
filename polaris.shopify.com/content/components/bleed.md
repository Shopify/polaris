---
title: Bleed
description: Applies negative margin to allow content to bleed out into the surrounding layout.
category: Structure
keywords:
  - layout
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycle](/getting-started/components-lifecycle).
examples:
  - fileName: bleed-vertical.tsx
    title: Vertical
    description: >-
      Content will bleed vertically into the surrounding layout using the vertical prop.
  - fileName: bleed-horizontal.tsx
    title: Horizontal
    description: >-
      Content will bleed horizontally into the surrounding layout using the horizontal prop.
  - fileName: bleed-specific-direction.tsx
    title: Specific direction
    description: >-
      Content will bleed into the surrounding layout in a specific direction using the top, bottom, left, or right prop.
  - fileName: bleed-all-directions.tsx
    title: All directions
    description: >-
      Content will bleed into the surrounding layout in all directions using the spacing prop.
---

## Bleed values

Content should never go beyond the edges of the parent container. Choose a bleed value that works within the containing layout.
