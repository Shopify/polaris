---
title: colors/color-no-hex
description: Disallows hex colors.
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
- color: #202223;
- fill: #5c5f62;
```
