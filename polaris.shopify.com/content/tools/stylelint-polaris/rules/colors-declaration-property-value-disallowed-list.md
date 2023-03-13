---
title: colors/declaration-property-value-disallowed-list
description: Disallows custom decimal opacity values.
keywords:
  - stylelint
  - colors
  - colors rules
---

```diff
// Do
+ background: var(--p-hint-from-direct-lightX);
// Don't
- background: black;
- opacity: 0.15;
```
