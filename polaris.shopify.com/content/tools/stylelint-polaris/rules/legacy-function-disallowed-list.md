---
title: legacy/function-disallowed-list
description: Disallows use off legacy Sass functions.
keywords:
  - stylelint
  - legacy
  - legacy rules
---

import RulePreamble from '../_preamble.md';
import RulePostamble from '../_postamble.md';

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<RulePreamble category="legacy" />

```diff
// Don't
- @include available-names
```

<RulePostamble />
