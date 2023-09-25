---
title: space/function-disallowed-list
description: Disallows use of legacy Sass space functions.
keywords:
  - stylelint
  - space
  - space rules
---

import RulePreamble from '../_preamble.md';
import RulePostamble from '../_postamble.md';

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<RulePreamble category="space" />

```diff
// Do
+ padding: var(--p-space-1);
// Don't
- padding: rem(4px);
```

<RulePostamble />
