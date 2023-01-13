---
title: layout/at-rule-disallowed-list
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

Instead of using a legacy mixin, try and use [Polaris components](https://polaris.shopify.com/components) to compose desired layouts. If what you need isn't possible, either use the mixin's contents or consider contributing to an existing Polaris component.

```diff
// Don't
- @include print-hidden;
// Do
+ @media print {
+   display: none;
+ }
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
