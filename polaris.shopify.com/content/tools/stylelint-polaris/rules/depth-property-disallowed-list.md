---
title: depth/property-disallowed-list
description: Disallows text shadow property.
keywords:
  - stylelint
  - depth
  - depth rules
---

Instead of using properties like `text-shadow`, make sure the text has proper contrast with the background so that it is readable without a shadow.

```diff
// Don't
- text-shadow: 2px 2px #ff0000;
```
