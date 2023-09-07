---
title: z-index/custom-property-disallowed-list
description: Disallows use of legacy z-index custom properties.
keywords:
  - stylelint
  - z-index
  - z-index rules
---

import RulePreamble from '../_preamble.md';
import RulePostamble from '../_postamble.md';

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<RulePreamble category="z-" />

```diff
// Do
+ z-index: var(--p-z-index-1);
// Don't
- z-index: var(--p-z-1);
```

<RulePostamble />
