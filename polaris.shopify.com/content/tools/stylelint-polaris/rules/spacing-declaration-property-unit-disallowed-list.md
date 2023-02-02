---
title: spacing/declaration-property-unit-disallowed-list
description: Disallows use of hard-coded px, em, and rem values on gap, margin, and padding properties.
keywords:
  - stylelint
  - spacing
  - spacing rules
---

```diff
// Do
+ gap: var(--p-space-05);
+ margin: var(--p-space-3) 0;
// Don't
- gap: 2px;
- margin: 12px  0;
```
