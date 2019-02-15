---
name: Skeleton thumbnail
category: Feedback indicators
? releasedIn
keywords:
  - SkeletonThumbnail
  - skeleton
  - loading
  - page
---

# Skeleton image

Skeleton thumbnail is used to provide a low fidelity representation of an image before it appears on the page, and improves load times perceived by merchants. Use for thumbnails in or outside of a card.

---

## Best practices

Skeleton thumbnail component should:

- Try to match the size of the thumbnail to the content being loaded so it gives an accurate representation.

---

## Content guidelines

### Skeleton body text

<!-- usageblock -->

#### Do

#### Don’t

<!-- end -->

---

## Examples

### Medium thumbnail

Use this component to represent medium thumbnails.

```jsx
<SkeletonThumbnail size="medium" />
```

### Large thumbnail

Use this component to represent large thumbnails.

```jsx
<SkeletonThumbnail size="large" />
```

### Small thumbnail

Use this component to represent small thumbnails.

```jsx
<SkeletonThumbnail size="small" />
```

---

## Related components

- Use this component with [Skeleton display text](/components/feedback-indicators/skeleton-display-text) to represent the content of a card while it’s loading.
