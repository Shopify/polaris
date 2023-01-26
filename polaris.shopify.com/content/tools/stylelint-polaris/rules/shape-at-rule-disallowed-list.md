---
title: shape/at-rule-disallowed-list
description: Disallows use of legacy Sass border mixins.
keywords:
  - stylelint
  - shape
  - shape rules
---

```diff
// Do
+ outline: var(--p-border-width-1) solid transparent;
// Don't
- @include high-contrast-outline()
```

NOTE: The `focus-ring` at rule does not currently have an equivalent token or component. If you need to use it, feel free to add a stylelint ignore comment until a solution from Polaris is ready.

```diff
// Do
+ &:focus {
  + outline: var(--p-border-width-2) solid var(--p-focused);
  + outline-offset: var(--p-space-05);
+ }
// Don't
- @include focus-ring
```
