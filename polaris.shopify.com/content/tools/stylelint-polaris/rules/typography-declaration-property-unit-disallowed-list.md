---
title: typography/declaration-property-unit-disallowed-list
description: Disallows hard-coded `px`, `em`, and `rem` values for font-size and line-height properties.
keywords:
  - stylelint
  - typography
  - typography rules
---

import RulePreamble from '../_preamble.md';
import RulePostamble from '../_postamble.md';

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<RulePreamble category="typography" />

```diff
// Do
+ font-size: var(--p-font-size-75);
+ line-height: var(--p-font-line-height-3);
// Don't
- font-size: 12px;
- line-height: 1.5rem
```

<RulePostamble />
