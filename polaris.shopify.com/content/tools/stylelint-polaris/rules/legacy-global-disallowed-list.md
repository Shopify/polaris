---
title: legacy/global-disallowed-list
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
  - legacy
---

Use [Polaris tokens](https://polaris.shopify.com/tokens) when possible. Otherwise use hard coded pixel or rem values instead of legacy mixins/variables.

```diff
// Don't
- left: -1 * $timeline-border-width;
// Do
+ left: calc(-1 * var(--p-space-1));
```

#
Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
