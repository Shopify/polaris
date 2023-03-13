---
title: colors/at-rule-disallowed-list
description: Disallows use of legacy color mixins.
keywords:
  - stylelint
  - colors
  - colors rules
---

```diff
// Do
+ fill: var(--p-color-icon-subdued);
// Don't
- fill: recolor-icon(--p-color-text-subdued);
```
