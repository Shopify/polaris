---
title: z-index/declaration-property-value-allowed-list
description: TODO
keywords:
  - stylelint
  - dev tools
  - developer tools
  - tools
  - tooling
  - development
  - plugin
  - rules
  - linter
  - linting
  - css
  - z-index
---

Please use Polaris [z-index tokens](https://polaris.shopify.com/tokens/z-index) instead of custom styles so that z-index is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that z-index are in sync with updates from the design system.


Try to use the [Polaris z-index tokens](https://polaris.shopify.com/tokens/z-index) before creating your own custom styles.

```diff
// Don't
- z-index: 1;
// Do
+ z-index: var(--p-z-1);
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
