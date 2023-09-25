---
title: shadow/custom-property-disallowed-list
description: Disallows use of legacy shadow custom properties.
keywords:
  - stylelint
  - shadow
  - shadow rules
---

import RulePreamble from '../_preamble.md';
import RulePostamble from '../_postamble.md';

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<RulePreamble category="shadow" />

```diff
// Do
+ box-shadow: var(--p-shadow-md);
// Don't
- box-shadow: var(--p-shadow-deep)
```

<RulePostamble />
