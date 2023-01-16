---
title: spacing/declaration-property-unit-disallowed-list
description: Disallows use of hard-coded px, em, and rem values on gap, margin, and padding properties
keywords:
  - stylelint
  - spacing
  - spacing rules
---

Try to use Polaris [spacking tokens](/tokens/spacing) instead of custom styles so that spacing is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that spacing is in sync with updates from the design system.

```diff
// Do
+ gap: var(--p-space-05);
+ margin: var(--p-space-3) 0;
// Don't
- gap: 2px;
- margin: 12px  0;
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
