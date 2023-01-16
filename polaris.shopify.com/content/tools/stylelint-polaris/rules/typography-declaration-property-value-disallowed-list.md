---
title: typography/declaration-property-value-disallowed-list
description: Disallows hard-coded alphanumeric font-weight values
keywords:
  - stylelint
  - typography
  - typography rules
---

Try to use the [text component](/components/text) or [font tokens](/tokens/font) instead of custom styles so that typography is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that typography is in sync with updates from the design system.

```diff
// Do
+ <Text fontWeight='bold' />
// Do
+ font-weight: var(--p-font-weight-bold);
// Don't
- font-weight: 700;
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
