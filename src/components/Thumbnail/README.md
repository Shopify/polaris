---
name: Thumbnail
category: Images and icons
keywords:
  - photo
  - picture
  - image
  - small thumbnail
  - medium thumbnail
  - large thumbnail
  - image preview
---

# Thumbnail

Use thumbnails as a visual anchor and identifier for an object. They should be used along with text to provide context.

---

## Best practices

Thumbnails should:

* Be one of 3 sizes:
  * Small (40 × 40 px): Use when the medium size is too large for the layout, or when the thumbnail has less importance
  * Medium (60 × 60 px): Use as the default size
  * Large (80 × 80 px): Use when an thumbnail is a major focal point. Avoid this size in lists of like items.

---

## Content guidelines

Any time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](/content/alternative-text). Doing this is important for [accessibility](/guides/accessibility) because it allows screen readers to describe what’s in the image to people who may not be able to see it.

For thumbnails, we recommend using a format that describes what will show in the image:

* `alt="Photo of {product}"`, e.g. "Photo of black t-shirt with cartoon tiger"
* An empty `alt=""` attribute ignores the image in assistive technologies such as screen readers, and may be used on decorative thumbnails

## Examples

### Default thumbnail

Use as the default size (medium).

```jsx
<Thumbnail
  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
  alt="Black choker necklace"
/>
```

### Small thumbnail

Use when the default size is too large for the layout, or when the thumbnail has less importance.

```jsx
<Thumbnail
  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
  size="small"
  alt="Black choker necklace"
/>
```

### Large thumbnail

Use when a thumbnail is a major focal point. Avoid this size in lists of like items.

```jsx
<Thumbnail
  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
  size="large"
  alt="Black choker necklace"
/>
```

---

## Related components

* To present a thumbnail representation of an individual or business in the interface, [use the avatar component](/components/images-and-icons/avatar)
