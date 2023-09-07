---
title: color/at-rule-disallowed-list
description: Disallows use of legacy color mixins.
keywords:
  - stylelint
  - color
  - color rules
---

import RulePreamble from '../_preamble.md';
import RulePostamble from '../_postamble.md';

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<RulePreamble category="color" />

```diff
// Do
+ svg {
+   fill: var(--p-color-icon-subdued);
+}

// Don't
- @include recolor-icon(--p-text-subdued);
```

<RulePostamble />
