---
title: motion/custom-property-disallowed-list
description: Disallows use of legacy motion custom properties.
keywords:
  - stylelint
  - motion
  - motion rules
---

```diff
// Do
+ transition: var(--p-motion-duration-500) var(--p-motion-ease);
// Don't
- transition: var(--p-duration-500) var(--p-ease);
```
