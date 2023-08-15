---
title: z-index/custom-property-disallowed-list
description: Disallows use of legacy z-index custom properties.
keywords:
  - stylelint
  - z-index
  - z-index rules
---

```diff
// Do
+ z-index: var(--p-z-index-1);
// Don't
- z-index: var(--p-z-1);
```
