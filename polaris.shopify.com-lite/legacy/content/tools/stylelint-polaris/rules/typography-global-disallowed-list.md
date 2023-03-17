---
title: typography/global-disallowed-list
description: Disallows use of legacy Polaris typography tokens and mixin map data.
keywords:
  - stylelint
  - typography
  - typography rules
---

```diff
// Do
+ font-size: var(--p-font-size-200);
// Don't
- font-size: $base-font-size;
```
