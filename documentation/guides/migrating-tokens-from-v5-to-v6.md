## Migrating from Polaris Tokens v5 to v6

Polaris Tokens v6.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/tokens-v6.0.0)) features an overhaul of the package and the APIs for accessing tokens.

## Updated token group names

Some of the token groups have been renamed. See the following table for the updated token group names:

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

## Split metadata and token values

The token metadata has been split from the token values. The new default token structure is now a key-value pair. The token name is the key and token value is the value.

```diff
import {motion} from '@shopify/polaris-tokens';

- const {ease} = motion.value;  // cubic-bezier(0.25, 0.1, 0.25, 1)
+ const {ease} = motion;        // cubic-bezier(0.25, 0.1, 0.25, 1)
```

The full metadata for each token group can be accessed using the `metadata` export.

```js
import {metadata} from '@shopify/polaris-tokens';

const {value, description} = metadata.colors.background;

console.log(value);
// "rgba(246, 246, 247, 1)"

console.log(description);
// "For use as a background color, in components such as Page and Frame backgrounds."
```

## Tree shaking support

This new token structure also supports tree shaking for each token group to help reduce bundle size.

```js
// bundle all tokens
import {tokens} from '@shopify/polaris-tokens';

// bundle only imported token groups
import {colors, motion} from '@shopify/polaris-tokens';
```
