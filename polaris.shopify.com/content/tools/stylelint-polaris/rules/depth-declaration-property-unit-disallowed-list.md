---
title: depth/declaration-property-unit-disallowed-list
description: Disallows box-shadow declarations with hard coded px, rem, or em units
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
  - depth
---

Please use Polaris [depth tokens](https://polaris.shopify.com/tokens/depth) instead of custom styles so that depth is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that depth are in sync with updates from the design system.

_{Insert why depth consistency impacts merchant [wayfinding, etc]}_

Have you found that merchants benefit from {an additional layer of visual hierarchy that's not in the depth tokens? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition


Use the [Polaris depth tokens](https://polaris.shopify.com/tokens/z-index) instead of custom shadows.

```diff
// Don't
- box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
// Do
+ box-shadow: var(--p-shadow-card);
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
