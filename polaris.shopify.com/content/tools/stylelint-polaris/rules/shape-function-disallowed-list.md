---
title: shape/function-disallowed-list
description: Disallows use of legacy Sass border functions.
keywords:
  - stylelint
  - shape
  - shape rules
---

```diff
// Do
+ border-radius: var(--p-border-radius-1);
// Don't
- border-radius: border-radius();
```
