---
title: z-index/global-disallowed-list
description: Disallows the use of legacy z-index custom properties and Sass mixin data
keywords:
  - stylelint
  - z-index
  - z-index rules
---

Try to use Polaris [z-index tokens](/tokens/z-index) instead of custom styles so that z-index is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that z-index is in sync with updates from the design system.

```diff
// Do
+ z-index: var(--p-z-1);
// Don't
- z-index(toast, $fixed-element-stacking-order);
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
