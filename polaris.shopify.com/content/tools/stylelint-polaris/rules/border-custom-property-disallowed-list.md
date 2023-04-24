---
title: border/custom-property-disallowed-list
description: Disallows use of legacy border custom properties.
keywords:
  - stylelint
  - border
  - border rules
---

```diff
// Do
+ border-radius: var(--p-border-radius-2);
// Don't
- border-radius: var(--p-border-radius-large);
```
