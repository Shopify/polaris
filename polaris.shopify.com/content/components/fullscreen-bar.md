---
name: Fullscreen bar
category: Navigation
keywords:
  - topbar
  - top bar
  - header
  - bar
  - app
examples:
  - fileName: fullscreen-bar-with-children.tsx
    title: Fullscreen bar with children
    description: >-
      Use to provide structure for the top of an application while in fullscreen
      mode.
  - fileName: fullscreen-bar-no-children.tsx
    title: Fullscreen bar no children
    description: Use this default to show ONLY the Back button.
---

# Fullscreen bar

The Fullscreen bar is a header component that should be presented at the top of an app when it is in fullscreen mode. This is designed to ensure
a uniform placement for a button to exit that mode. The Fullscreen bar can be customized by adding `children`.

---

## Best practices

The Fullscreen bar component should:

- Be presented when an App is in fullscreen mode as a means of exiting that mode.
- Fire an action to exit fullscreen mode.

---

## Related components

- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.
- To indicate to merchants that a page is loading or an upload is processing, use the [loading](https://polaris.shopify.com/components/feedback-indicators/loading) component.
