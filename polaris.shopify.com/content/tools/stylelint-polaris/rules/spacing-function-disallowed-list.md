---
title: spacing/function-disallowed-list
description: Disallows use of legacy Sass spacing functions.
keywords:
  - stylelint
  - spacing
  - spacing rules
---

```diff
// Do
+ padding: var(--p-space-1);
// Don't
- padding: rem(4px);
```
