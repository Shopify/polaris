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
- Not be used for entire page loads. In this case, use the [Skeleton page](https://polaris.shopify.com/components/skeleton-page) component.

---

## Examples

### Default

Use this component to visually represent the completion of a task or operation.

```jsx
<ProgressBar progress={75} />
```

### Small

Use the size option when you need to increase or decrease the visual weight of the progress bar.

```jsx
<ProgressBar progress={40} size="small" />
```

### Colored

Use the color option when you need to blend the progress bar in a context that calls for it, such as a progress toward success or where it’s the primary focus.

```jsx
<div>
  <ProgressBar progress={70} color="primary" />
  <br />
  <ProgressBar progress={30} color="success" />
</div>
```

### Non-animated

Use the animated prop when you want to show a static progress bar.

```jsx
<ProgressBar progress={80} animated={false} />
```

---

## Related components

- For tasks with a short load time, use the [Spinner](https://polaris.shopify.com/components/spinner) component
- For full page loads, use the [Skeleton page](https://polaris.shopify.com/components/skeleton-page) component
