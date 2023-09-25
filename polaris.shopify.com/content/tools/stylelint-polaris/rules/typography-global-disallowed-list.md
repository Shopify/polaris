---
title: typography/global-disallowed-list
description: Disallows use of legacy typography Sass APIs.
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
+ font-size: var(--p-font-size-200);
// Don't
- font-size: $base-font-size;
```

<RulePostamble />
