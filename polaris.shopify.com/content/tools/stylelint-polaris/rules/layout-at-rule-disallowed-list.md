---
title: layout/at-rule-disallowed-list
description: Disallows use of legacy Sass mixins
keywords:
  - stylelint
  - layout
  - layout rules
---

Use Polaris [layout components](/components) instead of custom styles so that layout is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that layout is in sync with updates from the design system.

```diff
// Do
+ @media print {
+   display: none;
+ }
// Don't
- @include print-hidden;
```

## Contribute

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition

## Ignore failure

In the scenerio where styles are intentionally designed to diverge and it isn't viable to contribute back to Polaris, you can [ignore the failing rule](https://stylelint.io/user-guide/ignore-code/#within-files). Make sure to provide context as to why you are writing custom styles with a disable description.

```
// stylelint-disable-next-line -- why custom styles are being used instead of Polaris
```
