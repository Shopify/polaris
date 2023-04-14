---
title: typography/global-disallowed-list
description: Disallows use of legacy typography Sass mixin and map data.
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
