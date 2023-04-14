---
title: motion/global-disallowed-list
description: Disallows use of legacy motion Sass mixin data.
keywords:
  - stylelint
  - motion
  - motion rules
---

```diff
// Do
+ transition: var(--p-duration-500) var(--p-ease);
// Don't
- duration: $skeleton-shimmer-duration var(--p-ease);
```
