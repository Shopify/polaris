---
title: Fullscreen bar
description: The Fullscreen bar is a header component that should be presented at the top of an app when it is in fullscreen mode. This is designed to ensure a uniform placement for a button to exit that mode. The Fullscreen bar can be customized by adding `children`.
category: Navigation
keywords:
  - topbar
  - top bar
  - header
  - bar
  - app
examples:
  - fileName: fullscreen-bar-with-children.tsx
    title: With children
    description: Use to provide structure for the top of an application while in fullscreen mode.
  - fileName: fullscreen-bar-no-children.tsx
    title: No children
    description: Use this default to show ONLY the Back button.
---

## Best practices

The Fullscreen bar component should:

- Be presented when an App is in fullscreen mode as a means of exiting that mode.
- Fire an action to exit fullscreen mode.

---

## Related components

- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/toast) component.
- To indicate to merchants that a page is loading or an upload is processing, use the [loading](https://polaris.shopify.com/components/loading) component.
