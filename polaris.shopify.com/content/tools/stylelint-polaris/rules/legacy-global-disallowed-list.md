---
title: legacy/global-disallowed-list
description: Disallows use of legacy custom properties and Sass mixin map data.
keywords:
  - stylelint
  - legacy
  - legacy rules
---

Use [Polaris tokens](https://polaris.shopify.com/tokens) when possible. Otherwise use hard coded pixel or rem values instead of legacy mixins/variables.

```diff
// Do
+ left: calc(-1 * var(--p-space-1));
// Don't
- left: -1 * $timeline-border-width;
```

#
