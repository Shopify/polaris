---
title: depth/property-disallowed-list
description: Disallows text shadow property
keywords:
  - stylelint
  - depth
  - depth rules
---

Try to use Polaris [depth tokens](/tokens/depth) instead of custom styles so that depth is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that depth is in sync with updates from the design system.

Instead of using properties like `text-shadow`, make sure the text has proper contrast with the background so that it is readable without a shadow.

```diff
// Don't
- text-shadow: 2px 2px #ff0000;
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
