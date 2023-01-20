---
title: depth/global-disallowed-list
description: Disallows use of legacy shadow custom properties and Sass mixin data.
keywords:
  - stylelint
  - depth
  - depth rules
---

```diff
// Do
+ box-shadow: var(--p-shadow-card);
// Don't
- box-shadow: var(--p-card-shadow);
```
