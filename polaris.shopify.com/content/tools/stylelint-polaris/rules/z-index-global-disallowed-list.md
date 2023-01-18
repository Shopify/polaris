---
title: z-index/global-disallowed-list
description: Disallows the use of legacy z-index custom properties and Sass mixin data.
keywords:
  - stylelint
  - z-index
  - z-index rules
---

```diff
// Do
+ z-index: var(--p-z-1);
// Don't
- z-index(toast, $fixed-element-stacking-order);
```
