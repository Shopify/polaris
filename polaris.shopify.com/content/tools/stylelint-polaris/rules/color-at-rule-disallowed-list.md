---
title: color/at-rule-disallowed-list
description: Disallows use of legacy color mixins.
keywords:
  - stylelint
  - color
  - color rules
---

```diff
// Do
+ svg {
+   fill: var(--p-color-icon-subdued);
+}

// Don't
- @include recolor-icon(--p-text-subdued);
```
