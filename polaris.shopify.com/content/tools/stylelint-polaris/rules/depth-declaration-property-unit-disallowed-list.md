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
  - depth
  - shadows
  - linter
  - linting
  - css
---

Use a [Polaris depth token](https://polaris.shopify.com/tokens/depth) instead of a custom box-shadow.

```diff
// Do
+ box-shadow: var(--p-shadow-card);

// Don't
- box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
```

Have you found that merchants benefit from an additional layer of visual hierarchy that's not in the depth tokens? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
