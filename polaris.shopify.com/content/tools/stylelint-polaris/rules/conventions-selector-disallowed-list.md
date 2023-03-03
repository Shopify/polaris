---
title: conventions/selector-disallowed-list
description: Disallows overrides of Polaris component styles.
keywords:
  - stylelint
  - conventions
  - conventions rules
  - selectors
---

Avoid overriding the styles of Polaris components in your SCSS. Consider contributing an extension or enhancement to the component's API instead. Overrides of component classnames are liable to break, as Polaris styles are private and may change at any time without notice.

```diff
// Do
+ <Textfield monospaced />
// Don't
- [class*='Polaris-TextField--Input'] {
-   font-family: var(--p-font-family-mono);
- };
```
