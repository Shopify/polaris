---
title: shadow/custom-property-disallowed-list
description: Disallows use of legacy shadow custom properties.
keywords:
  - stylelint
  - shadow
  - shadow rules
---

```diff
// Do
+ box-shadow: var(--p-shadow-md);
// Don't
- box-shadow: var(--p-shadow-deep)
```
