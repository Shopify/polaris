---
title: typography/function-disallowed-list
description: Disallows use of legacy Sass typography functions.
keywords:
  - stylelint
  - typography
  - typography rules
---

```diff
// Do
+ <Text variant="headingXs" as="p" />
// Do
+ font-size: var(--p-font-size-75);
// Don't
- font-size: font-size('caption');
```
