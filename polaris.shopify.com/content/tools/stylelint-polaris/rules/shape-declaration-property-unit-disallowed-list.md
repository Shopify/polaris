---
title: shape/declaration-property-unit-disallowed-list
description: Disallows hard-coded `px`, `em`, and `rem` units in border property values.
keywords:
  - stylelint
  - shape
  - shape rules
---

```diff
// Do
+ border-width: var(--p-border-width-2);
+ border-radius: var(--p-border-radius-2);
// Don't
- border-width: 2px;
- border-radius: 0.5rem;
```
