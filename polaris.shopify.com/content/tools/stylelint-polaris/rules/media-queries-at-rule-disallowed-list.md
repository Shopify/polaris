---
title: media-queries/at-rule-disallowed-list
description: Disallows use of legacy breakpoint Sass mixins.
keywords:
  - stylelint
  - media queries
  - media queries rules
---

```diff
// Do
+ @media (max-width: var(--p-breakpoints-md)) {}
// Don't
- @include breakpoint-before(layout-width(page-with-nav)) {}
```
