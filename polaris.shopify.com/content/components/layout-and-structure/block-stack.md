---
title: Block stack
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
status: Alpha
examples:
  - fileName: block-stack-with-gap.tsx
    title: Gap
    description: >-
      Control the vertical space between children using the `gap` prop.
  - fileName: block-stack-with-align.tsx
    title: Align
    description: >-
      Control the vertical alignment of children using the `align` prop.
  - fileName: block-stack-with-inline-align.tsx
    title: Inline align
    description: >-
      Control the horizontal alignment of children using the `inlineAlign` prop.
---

# {frontmatter.title}

<Lede>

Use to display children vertically and horizontally with full width by default. Based on CSS Flexbox.

</Lede>

<StatusBanner status={frontmatter.status}>
  This component is a work in progress and ready for exploratory usage, with
  breaking changes expected in minor version updates. Please use with caution.
  Learn more about our [component
  lifecycles](/getting-started/components-lifecycle).
</StatusBanner>

<Examples />

<Props componentName={frontmatter.title} />

## Best practices

Stacks should:

- Not be used for complex or unique arrangements of components
- Not be used for large-scale page layout

---

## Related components

- To display elements horizontally, [use the InlineStack component](https://polaris.shopify.com/components/layout-and-structure/inline-stack)

## Related resources

- VerticalStack props are named following the convention of CSS logical properties, such as 'padding-inline-start' and 'padding-block-start'. Learn more about [CSS logicial properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).
