---
title: colors/global-disallowed-list
description: Disallows use of legacy color custom properties and mixin map data
keywords:
  - stylelint
  - colors
  - colors rules
---

Try to use Polaris [color tokens](/tokens/colors) instead of custom styles so that colors are consistent across the Admin. This helps merchants have a coherent user experience and also ensures that colors are in sync with updates from the design system.

Disallows use of legacy custom properties.

```diff
// Do
+ border: transparent;
// Don't
- border: var(--p-override-transparent);
```

Disallows use of legacy mixin map data.

```diff
// Don't
- @type map $filter-palette-data: $polaris-color-filters;
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
