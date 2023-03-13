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
+ color: var(--p-color-text);
+ fill: var(--p-color-icon)
// Don't
- color: black;
- fill: dimgray;
```
