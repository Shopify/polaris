---
title: layout/function-disallowed-list
description: Disallows use of internal Sass layout functions.
keywords:
  - stylelint
  - layout
  - layout rules
---

Use hard coded pixel or rem values for `width` and `height` instead of legacy mixins/variables or spacing tokens.

```diff
// Do
+ height: 56px;
// Don't
- height: top-bar-height();
```
