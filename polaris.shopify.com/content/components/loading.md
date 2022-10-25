---
title: Loading
description: The loading component is used to indicate to merchants that a page is loading or an upload is processing.
category: Feedback indicators
keywords:
  - spinner
  - loader
  - loading
  - loading bar
examples:
  - fileName: loading-default.tsx
    title: Default
    description: Use to indicate that the page is loading.
---

## Required components

The loading component must be wrapped in the [frame](https://polaris.shopify.com/components/frame) component.

---

## Best practices

The loading component should:

- Indicate that the page requested is loading.
- Indicate that an upload has started and the action will soon complete.
- Be used to give feedback for an entire page load or a page mutation like saving a product.
- Be used alongside a component or page element that contains `aria-busy` to represent what is loading.

---

## Related components

- To indicate that an action has been received, use the [Spinner](https://polaris.shopify.com/components/spinner)
- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](https://polaris.shopify.com/components/progress-bar) component.
- To better represent loading content, use [Skeleton page](https://polaris.shopify.com/components/skeleton-page) along with [Skeleton body text](https://polaris.shopify.com/components/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/skeleton-display-text) components.

---

## Accessibility

The loading component is implemented using the [ARIA 1.1 progressbar pattern](https://www.w3.org/TR/wai-aria-1.1/#progressbar). It outputs an ARIA `role="progressbar"` and uses `aria-valuemin`, `aria-value-max`, and `aria-valuenow` to convey the loaded percentage to screen reader users.
