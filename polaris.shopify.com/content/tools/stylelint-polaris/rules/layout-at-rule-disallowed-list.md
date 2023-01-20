---
title: layout/at-rule-disallowed-list
description: Disallows use of legacy Sass mixins.
keywords:
  - stylelint
  - layout
  - layout rules
---

```diff
// Do
+ @media print {
+   display: none;
+ }
// Don't
- @include print-hidden;
```
