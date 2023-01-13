---
title: layout/global-disallowed-list
description: TODO
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
  - layout
---

Please use Polaris [layout components](https://polaris.shopify.com/components) instead of custom styles so that layout is consistent across the Admin. This helps merchants have a coherent user experience and also ensures that layout are in sync with updates from the design system.

If [Polaris components](https://polaris.shopify.com/components) cannot be composed to create the styles you need, consider contributing to an existing Polaris component before creating custom styles.

```diff
// Don't
- height: var(--p-choice-size);
// Do
+ <Checkbox />
```

Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:

- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution
- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion
- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition
