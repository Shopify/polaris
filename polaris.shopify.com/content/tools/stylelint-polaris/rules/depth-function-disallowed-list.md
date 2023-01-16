---
title: depth/function-disallowed-list
description: Disallows use of built-in and legacy shadow functions
keywords:
  - stylelint
  - depth
  - depth rules
---

Try to use Polaris [depth tokens](/tokens/depth) instead of custom styles so that depth is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that depth is in sync with updates from the design system.

```diff
// Do
+ box-shadow: var(--p-shadow-base);
// Don't
- filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
