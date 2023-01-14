---
title: media-queries/media-queries-allowed-list
description: Allows declaration of `print` and `screen` `@media` queries, allows `@media` queries for `forced-colors` and `ms-high-contrast` features, allows `@media` queries using Polaris breakpoints
keywords:
  - stylelint
  - media queries
  - media queries rules
---

Try to use Polaris [breakpoint sass variables](https://polaris.shopify.com/tokens/breakpoints#sass-variables) instead of custom styles so that media queries are consistent across the Admin. This helps merchants have a coherent user experience and also ensures that media queries are in sync with updates from the design system.

```diff
// Do
+ @include @media #{$p-breakpoints-sm-up} {}
// Don't
- @include @media #{$my-var} {}
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
