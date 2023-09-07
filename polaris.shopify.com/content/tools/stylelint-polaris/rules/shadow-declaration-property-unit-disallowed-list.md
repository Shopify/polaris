---
title: shadow/declaration-property-unit-disallowed-list
description: Disallows box-shadow declarations with hard coded px, rem, or em units.
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
- box-shadow: 0px 2px 4px rgba(31, 33, 36, 0.1), 0px 1px 6px rgba(31, 33, 36, 0.05);
```

<RulePostamble />
