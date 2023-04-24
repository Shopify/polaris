---
title: border/function-disallowed-list
description: Disallows use of legacy Sass border functions.
keywords:
  - stylelint
  - border
  - border rules
---

```diff
// Do
+ border-radius: var(--p-border-radius-1);
// Don't
- border-radius: border-radius();
```
