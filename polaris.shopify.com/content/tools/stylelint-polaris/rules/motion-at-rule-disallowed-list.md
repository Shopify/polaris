---
title: motion/at-rule-disallowed-list
description: Disallows use of CSS @keyframes.
keywords:
  - stylelint
  - motion
  - motion rules
---

```diff
// Do
+ animation: var(--p-keyframes-spin) var(--p-duration-500) linear infinite;
// Don't
- @keyframes spin {
-  from {
-    transform: rotate(0deg);
-  }

-  to {
-    transform: rotate(360deg);
-  }
-}
```
