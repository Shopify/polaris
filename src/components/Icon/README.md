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

### Default icon

Use to visually communicate core parts of the product and available actions.

```jsx
<Icon source={CirclePlusMinor} />
```

### User provided icon

Specify an SVG as a string to render it in an image tag, instead of an inline SVG to prevent script injection.

```jsx
<Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
```

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

Using icons can be a great help to merchants who have difficulties with reading, language, attention, and low vision.

If the icon appears without text, then use the `accessibilityLabel` prop to give the icon a text alternative. This adds an `aria-label` that’s conveyed to screen reader users.

<!-- usageblock -->

#### Do

- Pair text and icons for clarity
- Give the icon a text equivalent if its purpose isn’t conveyed in another way
- Review our [alternative text](https://polaris.shopify.com/content/alternative-text) guidelines to make sure your use of icon works for all merchants

```jsx
<Icon source={OrdersMajorTwotone} />
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

<!-- /content-for -->

---

## Related guidelines

- To learn about implementing Polaris icons with [Polaris React](https://github.com/Shopify/polaris-react) in your projects, see the [`@shopify/polaris-icons` documentation](https://www.npmjs.com/package/@shopify/polaris-icons)
- To learn about the best practices for designing and using icons in your projects, see the [icon design guidelines](https://polaris.shopify.com/design/icons)
- To learn how to name icons, see the [icon naming guidelines](https://polaris.shopify.com/content/naming#section-icons)
