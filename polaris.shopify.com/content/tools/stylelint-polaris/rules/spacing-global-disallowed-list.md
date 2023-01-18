---
title: spacing/global-disallowed-list
description: Disallows use of legacy spacing custom properties and Sass mixin data.
keywords:
  - stylelint
  - spacing
  - spacing rules
---

```diff
// Do
+ margin-bottom: var(--p-space-1);
// Don't
- margin-bottom: var(--p-text-field-spinner-offset);
```
