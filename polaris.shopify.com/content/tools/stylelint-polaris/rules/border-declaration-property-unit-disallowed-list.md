---
title: border/declaration-property-unit-disallowed-list
description: Disallows hard-coded `px`, `em`, and `rem` units in border property values.
keywords:
  - stylelint
  - border
  - border rules
---

import RulePreamble from '../_preamble.md';
import RulePostamble from '../_postamble.md';

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<RulePreamble category="border" />

```diff
// Do
+ border-width: var(--p-border-width-2);
+ border-radius: var(--p-border-radius-2);
// Don't
- border-width: 2px;
- border-radius: 0.5rem;
```

<RulePostamble />
