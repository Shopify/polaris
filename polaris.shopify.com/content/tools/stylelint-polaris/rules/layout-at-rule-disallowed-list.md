---
title: layout/at-rule-disallowed-list
description: Disallows use of legacy Sass mixins
keywords:
  - stylelint
  - layout
  - layout rules
---

Try to use Polaris [layout components](https://polaris.shopify.com/components) instead of custom styles so that layout is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that layout are in sync with updates from the design system.

```diff
// Do
+ @media print {
+   display: none;
+ }
// Don't
- @include print-hidden;
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
