---
title: legacy/global-disallowed-list
description: Disallows use of legacy custom properties and Sass mixin map data
keywords:
  - stylelint
  - legacy
  - legacy rules
---

Try to use Polaris [components](/components) or [tokens](/tokens) instead of custom styles so that legacy is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that legacy is in sync with updates from the design system.

Use [Polaris tokens](https://polaris.shopify.com/tokens) when possible. Otherwise use hard coded pixel or rem values instead of legacy mixins/variables.

```diff
// Do
+ left: calc(-1 * var(--p-space-1));
// Don't
- left: -1 * $timeline-border-width;
```

#
Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
