---
name: Progress bar
category: Feedback indicators
releasedIn: 1.8.0
keywords:
  - ProgressBar
  - progress indicator
  - progress bar
  - loading
---

# Progress bar

The progress bar component is used to visually represent the completion of a task or operation. It shows how much of the task has been completed and how much is still left.

---

## Best practices

Progress bar components should:

- Give merchants an indication of how much of the task has completed and how much is left.
- Not be used for entire page loads. In this case, use the [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) component.

---

## Examples

### Default

Use this component to visually represent the completion of a task or operation.

```jsx
<ProgressBar progress={75} />
```

### Small progress bar

Use the size option when you need to increase or decrease the visual weight of the progress bar.

```jsx
<ProgressBar progress={40} size="small" />
```

---

## Related components

- For tasks with a short load time, use the [Spinner](https://polaris.shopify.com/components/feedback-indicators/spinner) component
- For full page loads, use the [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) component
