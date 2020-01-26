---
name: Thumbnail
category: Images and icons
platforms:
  - android
  - ios
  - web
keywords:
  - photo
  - picture
  - image
  - small thumbnail
  - medium thumbnail
  - large thumbnail
  - image preview
  - android
  - ios
---

# Thumbnail

Use thumbnails as a visual anchor and identifier for an object. They should be used along with text to provide context.

---

## Best practices

On web, thumbnails should:

- Be one of 3 sizes:
  - Small (40 × 40 px): use when the medium size is too large for the layout, or when the thumbnail has less importance.
  - Medium (60 × 60 px): use as the default size.
  - Large (80 × 80 px): use when an thumbnail is a major focal point. Avoid this size in lists of like items.

On Android and iOS, thumbnails should:

- Be one of 2 sizes:
  - Default (40 × 40): use as the default size.
  - Large (72 × 72): use when an thumbnail is a major focal point. Avoid this size in lists of like items.

---

## Content guidelines

Any time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](https://polaris.shopify.com/content/alternative-text). Doing this is important for [accessibility](https://polaris.shopify.com/foundations/internationalization) because it allows screen readers to describe what’s in the image to people who may not be able to see it.

For thumbnails, we recommend using a format that describes what will show in the image:

- On web, `alt="Photo of {product}"`. For example, “Photo of black t-shirt with cartoon tiger”.
- On web, an empty `alt=""` attribute ignores the image in assistive technologies such as screen readers, and may be used on decorative thumbnails.
- On iOS, `imageView.accessibilityLabel = "Photo of {product}"`. For example, “Photo of black t-shirt with cartoon tiger”.
- On Android, `android:contentDescription="Photo of {product}"`. For example, “Photo of black t-shirt with cartoon tiger”.

---

## Examples

### Default thumbnail

Use as the default size.

```jsx
<Thumbnail
  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
  alt="Black choker necklace"
/>
```

<!-- content-for: android -->

![Default thumbnail](/public_images/components/Thumbnail/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default thumbnail](/public_images/components/Thumbnail/ios/default@2x.png)

<!-- /content-for -->

### Small thumbnail

<!-- example-for: web -->

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

<!-- content-for: android -->

![Large thumbnail](/public_images/components/Thumbnail/android/large@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Large thumbnail](/public_images/components/Thumbnail/ios/large@2x.png)

<!-- /content-for -->

---

## Related components

- To present a thumbnail representation of an individual or business in the interface, [use the avatar component](https://polaris.shopify.com/components/images-and-icons/avatar)
