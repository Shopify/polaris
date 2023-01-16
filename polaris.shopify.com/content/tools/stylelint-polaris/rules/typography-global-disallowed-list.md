---
title: typography/global-disallowed-list
description: Disallows use of legacy Polaris typography tokens and mixin map data
keywords:
  - stylelint
  - typography
  - typography rules
---

Try to use the [text component](/components/text) or [font tokens](/tokens/font) instead of custom styles so that typography is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that typography is in sync with updates from the design system.

```diff
// Do
+ font-size: var(--p-font-size-200);
// Don't
- font-size: $base-font-size;
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
