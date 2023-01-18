---
title: shape/global-disallowed-list
description: Disallows use of legacy Polaris shape tokens and mixin map data.
keywords:
  - stylelint
  - shape
  - shape rules
---

```diff
// Do
+ border-radius: var(--p-border-radius-2);
// Don't
- border-radius: var(--p-border-radius-wide);
```
