---
title: Depth rules
description:
  <p>{Insert why depth consistency impacts merchant [wayfinding, etc]}</p>

  <p>If you've found that merchants benefit from an additional layer of visual hierarchy not represented in the current depth tokens, we'd love to learn more.</p>

  <p>Contribute a <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md">feature proposal issue</a> or pull request in <a href="https://github.com/Shopify/polaris">GitHub</a> to share context and implement a proposed improvement or addition to Polaris. Start a GitHub <a href="https://github.com/Shopify/polaris/discussions/6750">discussion</a> if community collaboration is needed to find a solution.</p>
keywords:
  - stylelint
  - dev tools
  - developer tools
  - tools
  - tooling
  - development
  - plugin
  - rules
  - depth
  - shadows
  - linter
  - linting
  - css
---

## declaration-property-unit-disallowed-list

Use the [Polaris depth tokens](https://polaris.shopify.com/tokens/depth) before custom shadows.

```diff
// Do
+ box-shadow: var(--p-shadow-card);

// Don't
- box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
```

## function-disallowed-list

Use [Polaris depth tokens](https://polaris.shopify.com/tokens/depth) instead of custom shadows.

```diff
// Do
+ box-shadow: var(--p-shadow-base);

// Don't
- filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
```

## global-disallowed-list

Use the [Polaris depth tokens](https://polaris.shopify.com/tokens/depth) instead of legacy mixins/variables.

```diff
// Do
+ box-shadow: var(--p-shadow-card);

// Don't
- box-shadow: var(--p-card-shadow);
```

## property-disallowed-list

Instead of using properties like `text-shadow`, make sure the text has proper contrast with the background so that it is readable without a shadow.

```diff
// Don't
- text-shadow: 2px 2px #ff0000;
```
