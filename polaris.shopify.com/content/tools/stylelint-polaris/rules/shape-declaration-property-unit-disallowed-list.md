---
title: shape/declaration-property-unit-disallowed-list
description: Disallows hard-coded `px`, `em`, and `rem` units in border property values
keywords:
  - stylelint
  - shape
  - shape rules
---

Try to use Polaris [shape tokens](https://polaris.shopify.com/tokens/shape) instead of custom styles so that shape is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that shape are in sync with updates from the design system.

```diff
// Do
+ border-width: var(--p-border-width-2);
+ border-radius: var(--p-border-radius-2);
// Don't
- border-width: 2px;
- border-radius: 0.5rem;
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
