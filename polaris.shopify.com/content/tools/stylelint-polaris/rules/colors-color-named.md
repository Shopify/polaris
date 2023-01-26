---
title: colors/color-named
description: Disallows named colors.
keywords:
  - stylelint
  - colors
  - colors rules
---

```diff
// Do
+ color: var(--p-text);
+ fill: var(--p-icon)
// Don't
- color: black;
- fill: dimgray;
```
