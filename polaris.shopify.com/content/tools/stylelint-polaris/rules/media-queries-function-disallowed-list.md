---
title: media-queries/function-disallowed-list
description: 
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
  - media queries
---

Please use Polaris [breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints) instead of custom styles so that media queries are consistent across the Admin. This helps merchants have a coherent user experience and also ensures that media queries are in sync with updates from the design system.


Use the [Polaris breakpoint sass variables](https://polaris.shopify.com/tokens/breakpoints#sass-variables) instead of legacy mixins/variables.

```diff
// Don't
- @include breakpoint-after(layout-width(page-with-nav)) {}
// Do
+ @media (min-width: var(--p-breakpoints-md)) {}
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
