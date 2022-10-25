---
title: Icon
description: Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.
category: Images and icons
keywords:
  - iconography
  - visual indicator
  - svg
  - icon background
  - icon backdrop
  - accessible icons
  - icon alternative text
  - alt text
  - alternative text
  - wayfinding
  - alert
examples:
  - fileName: icon-default.tsx
    title: Default
    description: Use to visually communicate core parts of the product and available actions.
  - fileName: icon-colored.tsx
    title: Colored
    description: Apply a color to the icon.
  - fileName: icon-with-backdrop.tsx
    title: With backdrop
    description: Apply a backdrop to the icon.
  - fileName: icon-with-custom-svg.tsx
    title: With custom SVG
    description: Specify an SVG as a string to render it in an image tag, instead of an inline SVG to prevent script injection.
  - fileName: icon-with-custom-svg-and-color.tsx
    title: With custom SVG and color
    description: When using changing color of an svg and it uses currentColor, the white color is applied.
---

## Accessibility

Using icons can be a great help to merchants who have difficulties with reading, language, attention, and low vision.

If the icon appears without text, then use the `accessibilityLabel` prop to give the icon a text alternative. This adds an `aria-label` that’s conveyed to screen reader users.

<!-- dodont -->

#### Do

- Pair text and icons for clarity
- Give the icon a text equivalent if its purpose isn’t conveyed in another way
- Review our [alternative text](https://polaris.shopify.com/content/alternative-text) guidelines to make sure your use of icon works for all merchants

```jsx
<Icon source={OrdersMajor} />
<p>No orders yet</p>
```

```jsx
<Button icon={CirclePlusMinor}>Add a product</Button>
```

#### Don’t

- Describe what the icon looks like
- Include “icon” in the text equivalent
- Duplicate adjacent text in the alternative text
- Duplicate information provided programmatically

```jsx
<Icon source={CirclePlusMinor} accessibilityLabel="Circle plus icon" />
```

<!-- end -->

---

## Related guidelines

- To learn about implementing Polaris icons with [Polaris React](https://github.com/Shopify/polaris-react) in your projects, see the [`@shopify/polaris-icons` documentation](https://www.npmjs.com/package/@shopify/polaris-icons)
- To learn about the best practices for designing and using icons in your projects, see the [icon design guidelines](https://polaris.shopify.com/design/icons)
- To learn how to name icons, see the [icon naming guidelines](https://polaris.shopify.com/content/naming#icons)
