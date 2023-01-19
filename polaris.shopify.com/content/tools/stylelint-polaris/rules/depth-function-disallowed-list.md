---
title: depth/function-disallowed-list
description: Disallows use of built-in and legacy shadow functions.
keywords:
  - stylelint
  - depth
  - depth rules
---

```diff
// Do
+ box-shadow: var(--p-shadow-base);
// Don't
- filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
```
