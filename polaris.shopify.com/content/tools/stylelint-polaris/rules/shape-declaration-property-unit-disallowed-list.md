---
title: shape/declaration-property-unit-disallowed-list
description: Disallows hard-coded `px`, `em`, and `rem` units in border property values
keywords:
  - stylelint
  - shape
  - shape rules
---

Use Polaris [shape tokens](/tokens/shape) instead of custom styles so that shape is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that shape is in sync with updates from the design system.

```diff
// Do
+ border-width: var(--p-border-width-2);
+ border-radius: var(--p-border-radius-2);
// Don't
- border-width: 2px;
- border-radius: 0.5rem;
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
