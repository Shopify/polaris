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
+ svg {
+ fill: var(--p-icon-subdued);
+}

// Don't
- svg {
-  @include recolor-icon(--p-text-subdued);
-}
```
