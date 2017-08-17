---
name: Thumbnail
tags:
  - photo
  - picture
  - image
category: Images and icons
---

# Thumbnail

Use thumbnails as a visual anchor and identifier for an object. They should be used along with text to provide context.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

Merchants are scanning the page, orienting themselves or searching visually for a particular item.

### Solution

Thumbnails provide a visual anchor and help structure the page. Because they are a visual representation, thumbnails make individual items identifiable at a glance.

---

## Best practices

Thumbnails should:

* Be one of 3 sizes:
  * Small (40 x 40px): Use when the Medium size is too large for the layout, or when the thumbnail has less importance
  * Medium (60 x 60px): Use as the default size
  * Large (80 x 80px): Use when an thumbnail is a major focal point. Avoid this size in lists of like items.

---

## Content guidelines

Any time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](/content/alternative-text). Doing this is important for [accessibility](/principles/accessibility) because it allows screen readers to describe what’s in the image to people who may not be able to see it.

For thumbnails, we recommend using a format that describes what will show in the image:

* alt="photo of {product}", e.g. "photo of black t-shirt with cartoon tiger"
* alt="" to ignore the image


| Prop | Type | Description |
| ---- | ---- | ----------- |
| size | enum['small', 'medium', 'large'] | Size of thumbnail |
| source* | string | URL for the avatar image |
| alt* | string | Alt text for the thumbnail image |


## Examples

### Medium thumbnail

Use as the default size.

```jsx
<Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" />
```

### Small thumbnail

Use when the Medium size is too large for the layout, or when the thumbnail has less importance.

```jsx
<Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" size="small" alt="Black choker necklace" />
```

### Large thumbnail

Use when a thumbnail is a major focal point. Avoid this size in lists of like items.

```jsx
<Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" size="large" alt="Black choker necklace" />
```

---

## Related components

* To present a thumbnail representation of an individual or business in the interface, [use the avatar component](/components/images-and-icons/avatar)
