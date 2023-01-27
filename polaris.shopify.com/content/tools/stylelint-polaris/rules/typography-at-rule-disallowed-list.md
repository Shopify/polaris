---
title: typography/at-rule-disallowed-list
description: Disallows use of legacy Sass typography mixins.
keywords:
  - stylelint
  - typography
  - typography rules
---

```diff
// Do
+ <Text breakWord truncate />
// Don't
- @include text-breakword;
- @include truncate;
```
