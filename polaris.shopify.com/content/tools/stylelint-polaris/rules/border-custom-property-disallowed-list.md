---
title: border/custom-property-disallowed-list
description: Disallows use of legacy border custom properties.
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
+ border-radius: var(--p-border-radius-2);
// Don't
- border-radius: var(--p-border-radius-large);
```

<RulePostamble />
