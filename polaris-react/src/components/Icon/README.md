---
name: Icon
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
---

# Icon

Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.

---

## Examples

### Default

Use to visually communicate core parts of the product and available actions.

```jsx
<Icon source={CirclePlusMinor} />
```

### Colored

Apply a color to the icon.

```jsx
<div>
  <Icon source={CirclePlusMinor} color="base" />
  <Icon source={CirclePlusMinor} color="subdued" />
  <Icon source={CirclePlusMinor} color="primary" />
  <Icon source={CirclePlusMinor} color="highlight" />
  <Icon source={CirclePlusMinor} color="success" />
  <Icon source={CirclePlusMinor} color="warning" />
  <Icon source={CirclePlusMinor} color="critical" />
</div>
```

### With backdrop

Apply a backdrop to the icon.

```jsx
<div>
  <Icon source={CirclePlusMinor} color="base" backdrop />
  <Icon source={CirclePlusMinor} color="highlight" backdrop />
  <Icon source={CirclePlusMinor} color="success" backdrop />
  <Icon source={CirclePlusMinor} color="warning" backdrop />
  <Icon source={CirclePlusMinor} color="critical" backdrop />
</div>
```

### With custom SVG

Specify an SVG as a string to render it in an image tag, instead of an inline SVG to prevent script injection.

```jsx
<Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
```

### With custom SVG and color

When using changing color of an svg and it uses currentColor, the white color is applied.

```jsx
function IconWithReactChild() {
  const iconContent = () => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return <Icon source={iconContent} color="warning" />;
}
```

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
- To learn how to name icons, see the [icon naming guidelines](https://polaris.shopify.com/content/naming#section-icons)
