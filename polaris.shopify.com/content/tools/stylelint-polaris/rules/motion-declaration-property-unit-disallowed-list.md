---
title: motion/declaration-property-unit-disallowed-list
description: Disallows use of hard-coded millisecond `ms` and second `s` values on transition and animation properties.
keywords:
  - stylelint
  - motion
  - motion rules
---

```diff
// Do
+ transition-duration: var(--p-duration-200);
// Don't
- transition-duration: 200ms;
```
