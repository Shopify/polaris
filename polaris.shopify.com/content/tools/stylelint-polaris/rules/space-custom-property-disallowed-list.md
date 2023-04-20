---
title: space/custom-property-disallowed-list
description: Disallows use of legacy space custom properties.
keywords:
  - stylelint
  - space
  - space rules
---

```diff
// Do
+ margin-bottom: var(--p-space-025);
// Don't
- margin-bottom: var(--p-choice-margin);
```
