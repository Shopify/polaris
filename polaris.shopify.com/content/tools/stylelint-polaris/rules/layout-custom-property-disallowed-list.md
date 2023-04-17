---
title: layout/custom-property-disallowed-list
description: Disallows use of legacy layout custom properties.
keywords:
  - stylelint
  - layout
  - layout rules
---

```diff
// Do
+ <Checkbox />
// Don't
- height: var(--p-choice-size);
```
