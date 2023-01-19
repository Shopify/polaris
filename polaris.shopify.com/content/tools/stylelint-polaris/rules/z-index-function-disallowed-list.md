---
title: z-index/function-disallowed-list
description: Disallows use of the legacy z-index Sass function.
keywords:
  - stylelint
  - z-index
  - z-index rules
---

```diff
// Do
+ z-index: var(--p-z-1);
// Don't
- z-index: z-index(content);
```
