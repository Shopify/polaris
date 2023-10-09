---
title: typography/at-rule-disallowed-list
description: Disallows use of legacy Sass typography mixins.
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
+ <Text breakWord truncate />
// Don't
- @include text-breakword;
- @include truncate;
```

<RulePostamble />
