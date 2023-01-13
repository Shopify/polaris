---
title: media-queries/media-queries-allowed-list
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
  - 
---

Try to use the [Polaris breakpoint sass variables](https://polaris.shopify.com/tokens/breakpoints#sass-variables) before creating your own custom styles.

```diff
// Don't
- @include @media #{$my-var} {}
// Do
+ @include @media #{$p-breakpoints-sm-up} {}
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
