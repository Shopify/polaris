---
title: legacy/at-rule-disallowed-list
description: Disallows use of legacy Sass mixins.
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
// Do
+ <UnstyledButton />
// Don't
- @include unstyled-button;
```

<RulePostamble />
