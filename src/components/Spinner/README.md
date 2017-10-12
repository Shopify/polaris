---
name: Spinner
keywords:
  - spinner
  - loader
  - loading
category: Feedback indicators
---

# Spinner

Spinners are used to notify merchants that their action is being processed. For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

When a merchant completes an action on a page like clicking a button, it’s unclear if the app is working to complete the action.

### Solution

Spinner notifies the merchant that the request has been received and is being processed.

| Prop  | Type   | Description | Default |
| ---   | ---    | ---     | ---     |
| color | enum['teal', 'inkLightest', 'white'] | Color of spinner | teal
| size  | enum['small', 'large'] | Size of spinner | large
| accessibilityLabel | string | Accessible label for the spinner |

## Examples

### Default spinner

Use to notify merchants that their requested action is being processed.

```jsx
<Spinner size="large" color="teal" />
```

---

## Best practices

The spinner component should:

* Notify the merchant that their request has been received and the action will soon complete.
* Be used in conjunction with skeleton loading to represent non-typographic content. For example, line graphs on the Merchant analytics dashboard.
* Not be used to give feedback for an entire page load.
* White can only be used with small spinners on actionable components like buttons.

---

## Content guidelines

### Accessibility label

Spinner accessibility label should:

* Accurately explain the state of the requested action. For example, “Loading”, “Submitting”, “Processing.”
* Use as few words to describe the state as possible.

---

## Related components

To better represent loading content, use [Skeleton page](/components/feedback-indicators/skeleton-page) along with [Skeleton body text](/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](/components/feedback-indicators/skeleton-display-text) components.
