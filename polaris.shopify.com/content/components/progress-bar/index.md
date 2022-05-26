---
name: Progress bar
category: Feedback indicators
releasedIn: 1.8.0
keywords:
  - ProgressBar
  - progress indicator
  - progress bar
  - loading
examples:
  - fileName: default.tsx
    title: Default
    description: >-
      Use this component to visually represent the completion of a task or
      operation.
  - fileName: small-progress-bar.tsx
    title: Small progress bar
    description: >-
      Use the size option when you need to increase or decrease the visual
      weight of the progress bar.
  - fileName: colored-progress-bars.tsx
    title: Colored progress bars
    description: >-
      Use the color option when you need to blend the progress bar in a context
      that calls for it, such as a progress toward success or where it’s the
      primary focus.
  - fileName: non-animated-progress-bar.tsx
    title: Non-animated progress bar
    description: Use the animated prop when you want to show a static progress bar.
---

# Progress bar

The progress bar component is used to visually represent the completion of a task or operation. It shows how much of the task has been completed and how much is still left.

---

## Best practices

Progress bar components should:

- Give merchants an indication of how much of the task has completed and how much is left.
- Not be used for entire page loads. In this case, use the [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) component.

---

## Related components

- For tasks with a short load time, use the [Spinner](https://polaris.shopify.com/components/feedback-indicators/spinner) component
- For full page loads, use the [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) component
