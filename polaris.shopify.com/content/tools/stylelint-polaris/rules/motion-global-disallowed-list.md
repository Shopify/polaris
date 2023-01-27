---
title: motion/global-disallowed-list
description: Disallows use of legacy Polaris motion tokens.
keywords:
  - stylelint
  - motion
  - motion rules
---

```diff
// Do
+ transition: var(--p-duration-100) var(--p-ease);
// Don't
- transition: var(--p-duration-1-0-0) var(--p-ease);
```
