---
title: depth/declaration-property-unit-disallowed-list
description: Disallows box-shadow declarations with hard coded px, rem, or em units.
keywords:
  - stylelint
  - depth
  - depth rules
---

```diff
// Do
+ box-shadow: var(--p-shadow-card);
// Don't
- box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
```
