---
name: Spinner
category: Feedback indicators
releasedIn: 1.7.0
platforms:
  - android
  - ios
  - web
keywords:
  - spinner
  - loader
  - loading
  - progress indicator
  - android
  - ios
---

# Spinner

Spinners are used to notify merchants that their action is being processed. For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.

---

## Examples

### Default spinner

Use to notify merchants that their requested action is being processed.

```jsx
<Spinner size="large" color="teal" />
```

<!-- content-for: android -->

![Material design spinner for Android](/public_images/components/Spinner/android/default@2x.gif)

<!-- /content-for -->

<!-- content-for: ios -->

![Apple’s spinner for iOS](/public_images/components/Spinner/ios/default@2x.gif)

<!-- /content-for -->

---

## Best practices

The spinner component should:

- Notify merchants that their request has been received and the action will soon complete.
- Not be used to give feedback for an entire page load.
- White can only be used with small spinners on actionable components like buttons.
- On web, be used in conjunction with skeleton loading to represent non-typographic content. For example, line graphs on the Merchant analytics dashboard.

---

## Content guidelines

### Accessibility label

Spinner accessibility label should:

- Accurately explain the state of the requested action. For example, “Loading”, “Submitting”, “Processing.”
- Use as few words to describe the state as possible.

---

## Related components

- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](/components/feedback-indicators/progress-bar) component.
- To better represent loading content, use [Skeleton page](/components/feedback-indicators/skeleton-page) along with [Skeleton body text](/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](/components/feedback-indicators/skeleton-display-text) components.
