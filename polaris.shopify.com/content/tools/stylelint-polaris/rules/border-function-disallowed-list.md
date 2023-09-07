---
title: border/function-disallowed-list
description: Disallows use of legacy Sass border functions.
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
+ border-radius: var(--p-border-radius-1);
// Don't
- border-radius: border-radius();
```

<RulePostamble />
