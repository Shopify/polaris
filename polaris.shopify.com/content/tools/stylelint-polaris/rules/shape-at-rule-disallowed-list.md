---
title: shape/at-rule-disallowed-list
description: Disallows use of legacy Sass border mixins
keywords:
  - stylelint
  - shape
  - shape rules
---

Try to use Polaris [shape tokens](/tokens/shape) instead of custom styles so that shape is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that shape is in sync with updates from the design system.

```diff
// Do
+ outline: var(--p-border-width-1) solid transparent;
// Don't
- @include high-contrast-outline()
```

NOTE: The `focus-ring` at rule does not currently have an equivalent token or component. If you need to use it, feel free to add a stylelint ignore comment until a solution from Polaris is ready.

```diff
// Do
+ &:focus {
  + outline: var(--p-border-width-2) solid var(--p-focused);
  + outline-offset: var(--p-space-05);
+ }
// Don't
- @include focus-ring
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
