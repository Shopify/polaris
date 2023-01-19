---
title: layout/global-disallowed-list
description: Disallows use of legacy custom properties and Sass mixin map data.
keywords:
  - stylelint
  - layout
  - layout rules
---

```diff
// Do
+ <Checkbox />
// Don't
- height: var(--p-choice-size);
```
