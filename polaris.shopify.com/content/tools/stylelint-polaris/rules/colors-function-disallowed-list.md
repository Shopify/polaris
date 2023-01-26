---
title: colors/function-disallowed-list
description: Disallows allows use of built in and legacy color functions.
keywords:
  - stylelint
  - colors
  - colors rules
---

```diff
// Do
+ color: var(--p-text-disabled);
+ background: var(--p-action-secondary-hovered-dark);
// Don't
- color: rgb(140, 145, 150);
- background: color('hover');
```
