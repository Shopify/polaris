---
title: Inline stack
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
examples:
  - fileName: inline-stack-with-non-wrapping.tsx
    title: Non-wrapping
    description: >-
      The default wrapping behavior of children can be overridden using the `wrap` prop.
  - fileName: inline-stack-with-gap.tsx
    title: Gap
    description: >-
      Control the horizontal and vertical space between children using the `gap` prop. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: inline-stack-with-block-align.tsx
    title: Block align
    description: >-
      Control the vertical alignment of children using the `blockAlign` prop.
  - fileName: inline-stack-with-align.tsx
    title: Align
    description: >-
      Control the horizontal alignment of children using the `align` prop.
previewImg: /images/components/layout-and-structure/inline-stack.png
---

# {frontmatter.title}

<Lede>

Use to display children horizontally in a row. Based on CSS Flexbox.

</Lede>

<Examples />

<Props componentName={frontmatter.title} />

## Related components

- To create the large-scale structure of pages, [use the InlineGrid component](https://polaris.shopify.com/components/layout-and-structure/inline-grid)
- To display elements vertically, [use the BlockStack component](https://polaris.shopify.com/components/layout-and-structure/block-stack)

## Related resources

- InlineStack props are named following the convention of CSS logical properties, such as `align="start"` vs. `align="left"` and `blockAlign="end"` vs. `verticalAlign="bottom"`. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).
