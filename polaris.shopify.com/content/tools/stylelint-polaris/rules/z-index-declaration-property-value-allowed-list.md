---
title: z-index/declaration-property-value-allowed-list
description: Disallows declaration of `z-index` values that are not Polaris z-index tokens.
keywords:
  - stylelint
  - z-index
  - z-index rules
---

```diff
// Do
+ z-index: var(--p-z-index-1);
// Don't
- z-index: 1;
```
