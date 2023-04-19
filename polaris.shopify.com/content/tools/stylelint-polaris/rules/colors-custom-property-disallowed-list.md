---
title: colors/custom-property-disallowed-list
description: Disallows use of legacy color custom properties.
keywords:
  - stylelint
  - colors
  - colors rules
---

```diff
// Do
+ color: var(--p-color-text-caution);
// Don't
- color: var(--p-text-warning);
```
