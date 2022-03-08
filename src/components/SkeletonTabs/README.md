---
name: Skeleton tabs
category: Feedback indicators
releasedIn: 9.0
keywords:
  - SkeletonTabs
  - skeleton
  - loading
  - page
---

# Skeleton tabs

Skeleton tabs are used to provide a low fidelity representation of content before it appears on the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.

---

## Best practices

Skeleton tabs component should:

- Give merchants an indication of what the page content will be once loaded

---

## Examples

### Simple skeleton tabs

```jsx
<Card>
  <SkeletonTabs />
</Card>
```

### Skeleton tabs with a custom count

```jsx
<Card>
  <SkeletonTabs count={4} />
</Card>
```

## Related components

- Use this component with [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) and [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) to represent the content of a page before it’s loaded.
