---
title: space/function-disallowed-list
description: Disallows use of legacy Sass space functions.
keywords:
  - stylelint
  - space
  - space rules
---

```diff
// Do
+ padding: var(--p-space-1);
// Don't
- padding: rem(4px);
```
