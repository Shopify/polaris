---
title: color/function-disallowed-list
description: Disallows allows use of built in and legacy color functions.
keywords:
  - stylelint
  - color
  - color rules
---

```diff
// Do
+ color: var(--p-color-text-disabled);
+ background: var(--p-color-bg-inverse-hover);
// Don't
- color: rgb(140, 145, 150);
- background: color('hover');
```
