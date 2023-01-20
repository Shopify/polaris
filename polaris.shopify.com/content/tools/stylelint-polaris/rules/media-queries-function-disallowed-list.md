---
title: media-queries/function-disallowed-list
description: Disallows use of legacy breakpoint sass functions.
keywords:
  - stylelint
  - media queries
  - media queries rules
---

```diff
// Do
+ @media (min-width: var(--p-breakpoints-md)) {}
// Don't
- @include breakpoint-after(layout-width(page-with-nav)) {}
```
