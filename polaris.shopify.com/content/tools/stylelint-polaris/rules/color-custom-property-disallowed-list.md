---
title: color/custom-property-disallowed-list
description: Disallows use of legacy color custom properties.
keywords:
  - stylelint
  - color
  - color rules
---

```diff
// Do
+ color: var(--p-color-text-caution);
// Don't
- color: var(--p-text-warning);
```
