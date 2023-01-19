---
title: colors/global-disallowed-list
description: Disallows use of legacy color custom properties and mixin map data.
keywords:
  - stylelint
  - colors
  - colors rules
---

Disallows use of legacy custom properties.

```diff
// Do
+ border: transparent;
// Don't
- border: var(--p-override-transparent);
```

Disallows use of legacy mixin map data.

```diff
// Don't
- @type map $filter-palette-data: $polaris-color-filters;
```
