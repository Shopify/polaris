---
title: typography/declaration-property-value-disallowed-list
description: Disallows hard-coded alphanumeric font-weight values.
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
+ <Text fontWeight='bold' />
// Do
+ font-weight: var(--p-font-weight-bold);
// Don't
- font-weight: 700;
```

<RulePostamble />
