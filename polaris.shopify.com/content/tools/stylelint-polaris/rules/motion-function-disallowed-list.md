---
title: motion/function-disallowed-list
description: Disallows use of legacy Sass motion functions.
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
