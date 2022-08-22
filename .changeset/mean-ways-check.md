---
'@shopify/polaris-tokens': major
---

See the following table for the updated token group names:

| Previous       | Updated  |
| -------------- | -------- |
| `colorScheme`  | `colors` |
| `legacyTokens` | `legacy` |
| `typography`   | `font`   |

```diff
import {tokens} from '@shopify/polaris-tokens';

const tokens = {
  breakpoints,
- colorSchemes,
+ colors
  depth,
- legacyTokens,
+ legacy
  motion,
  shape,
  spacing,
- typography,
+ font,
  typography,
  zIndex,
}
```
