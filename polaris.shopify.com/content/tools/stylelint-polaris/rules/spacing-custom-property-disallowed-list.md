---
title: spacing/custom-property-disallowed-list
description: Disallows use of legacy spacing custom properties.
keywords:
  - stylelint
  - spacing
  - spacing rules
---

```diff
// Do
+ margin-bottom: var(--p-space-025);
// Don't
- margin-bottom: var(--p-choice-margin);
```
