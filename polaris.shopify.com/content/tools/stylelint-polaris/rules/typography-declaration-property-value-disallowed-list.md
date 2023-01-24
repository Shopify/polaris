---
title: typography/declaration-property-value-disallowed-list
description: Disallows hard-coded alphanumeric font-weight values.
keywords:
  - stylelint
  - typography
  - typography rules
---

```diff
// Do
+ <Text fontWeight='bold' />
// Do
+ font-weight: var(--p-font-weight-bold);
// Don't
- font-weight: 700;
```
