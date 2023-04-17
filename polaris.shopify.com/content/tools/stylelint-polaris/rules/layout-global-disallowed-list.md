---
title: layout/global-disallowed-list
description: Disallows use of legacy layout Sass APIs.
keywords:
  - stylelint
  - layout
  - layout rules
---

```diff
// Do
+ width: 240px !default;
// Don't
- width: $navigation-width;
```
