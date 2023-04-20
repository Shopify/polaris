---
title: shape/custom-property-disallowed-list
description: Disallows use of legacy shape custom properties.
keywords:
  - stylelint
  - shape
  - shape rules
---

```diff
// Do
+ border-radius: var(--p-border-radius-2);
// Don't
- border-radius: var(--p-border-radius-large);
```
