# Changelog

## 6.0.1

### Patch Changes

- Updated dependencies [[`7a9977b4d`](https://github.com/Shopify/polaris/commit/7a9977b4dfe29217279d4988a60cf056d8404419)]:
  - @shopify/polaris-tokens@6.5.1

## 6.0.0

### Major Changes

- [#8360](https://github.com/Shopify/polaris/pull/8360) [`fd28b3a7a`](https://github.com/Shopify/polaris/commit/fd28b3a7ae0b81bb33f0497c65c348e5b04f7040) Thanks [@alex-page](https://github.com/alex-page)! - Disallows percentage and other CSS values as a unit

## 5.2.1

### Patch Changes

- Updated dependencies [[`60ef0dffc`](https://github.com/Shopify/polaris/commit/60ef0dffc9f6064d1d42793f5d2bd96f35b14489), [`4bff95206`](https://github.com/Shopify/polaris/commit/4bff95206877cc24c261f1103589464314ca8cb7)]:
  - @shopify/polaris-tokens@6.5.0

## 5.2.0

### Minor Changes

- [#8244](https://github.com/Shopify/polaris/pull/8244) [`0ee432500`](https://github.com/Shopify/polaris/commit/0ee43250031ddaa03ffab06ae24197c91c2328d9) Thanks [@samrose3](https://github.com/samrose3)! - Disallow text-transform property in Stylelint Polaris

### Patch Changes

- Updated dependencies [[`1b1394d32`](https://github.com/Shopify/polaris/commit/1b1394d32ecb122bcb77b6cb38b6106631ff8afd)]:
  - @shopify/polaris-tokens@6.4.0

## 5.1.3

### Patch Changes

- [#8208](https://github.com/Shopify/polaris/pull/8208) [`69d27dbf6`](https://github.com/Shopify/polaris/commit/69d27dbf63d360a7cb3722fa8cd16e605288b3b9) Thanks [@qt314](https://github.com/qt314)! - Re-enable non layout component related layout rules

## 5.1.2

### Patch Changes

- [#8167](https://github.com/Shopify/polaris/pull/8167) [`07669075a`](https://github.com/Shopify/polaris/commit/07669075a3ea9c0aeac3bf9ff645df1a6f2938b5) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Temporarily disable layout category

* [#8162](https://github.com/Shopify/polaris/pull/8162) [`74a75a473`](https://github.com/Shopify/polaris/commit/74a75a4731b3f67d408ccb985708d6056819d4f8) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Allow SCSS namespaces with Polaris breakpoints

- [#8168](https://github.com/Shopify/polaris/pull/8168) [`f8f9eecd5`](https://github.com/Shopify/polaris/commit/f8f9eecd5abe900581efa5032d5f4ee80228e4d4) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Ignored needless disables for layout category and added meta URL to error message

## 5.1.1

### Patch Changes

- [#8097](https://github.com/Shopify/polaris/pull/8097) [`cd150396b`](https://github.com/Shopify/polaris/commit/cd150396b11f1a0abf6d4419c5c594dfdae3185d) Thanks [@qt314](https://github.com/qt314)! - Fix incorrect unit function categorization

## 5.1.0

### Minor Changes

- [#7993](https://github.com/Shopify/polaris/pull/7993) [`128f147d1`](https://github.com/Shopify/polaris/commit/128f147d19354adbb24c48443e7c47ff6dd06c74) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Created `polaris/declaration-property-value-disallowed-list` rule to ignore failures in `@font-face` at-rules

### Patch Changes

- [#8006](https://github.com/Shopify/polaris/pull/8006) [`6404b1638`](https://github.com/Shopify/polaris/commit/6404b163897fecfcdef853c5ed0f4e25a1334df0) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Temporarily disabled `border-radius-base` error

## 5.0.2

### Patch Changes

- [#7954](https://github.com/Shopify/polaris/pull/7954) [`af0ceb8c6`](https://github.com/Shopify/polaris/commit/af0ceb8c6fae30c6aaa45bf89eef660ea45fd78e) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Use RegExp pattern to exclude reporting invalid scope disables and address memory issues

* [#7919](https://github.com/Shopify/polaris/pull/7919) [`e7712e7a5`](https://github.com/Shopify/polaris/commit/e7712e7a57fddac939e65510fb257ac82442faa4) Thanks [@qt314](https://github.com/qt314)! - Deduped converage rules that were in multiple categories

## 5.0.1

### Patch Changes

- [#7866](https://github.com/Shopify/polaris/pull/7866) [`4b96147b3`](https://github.com/Shopify/polaris/commit/4b96147b32a89a393e8b6c5f7df1442f875248a0) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Updated `stylelint-polaris` to allow disabling specific coverage rules instead of entire categories

* [#7906](https://github.com/Shopify/polaris/pull/7906) [`c8a294f51`](https://github.com/Shopify/polaris/commit/c8a294f51baae53b131a5f9014f6223fdf3ef5ee) Thanks [@qt314](https://github.com/qt314)! - Fixed config atRule and function regex to match whole word

- [#7868](https://github.com/Shopify/polaris/pull/7868) [`6cd75fd9a`](https://github.com/Shopify/polaris/commit/6cd75fd9a089791a79fe8aa7e43f6b54add47a45) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Update `package.json` to define a single entry point

* [#7696](https://github.com/Shopify/polaris/pull/7696) [`bdf04a289`](https://github.com/Shopify/polaris/commit/bdf04a289e7a5b4c1e4717f5e162d00ea87c807b) Thanks [@chloerice](https://github.com/chloerice)! - Implemented custom message configuration support for polaris/coverage plugin

- [#7898](https://github.com/Shopify/polaris/pull/7898) [`9206b7b13`](https://github.com/Shopify/polaris/commit/9206b7b130cb4d5b0a6ec110693d8b45248f8dcf) Thanks [@qt314](https://github.com/qt314)! - Bug fix to wrap z-index 'declaration-property-value-allowed-list' token value with "var"

## 5.0.0

### Major Changes

- [#7691](https://github.com/Shopify/polaris/pull/7691) [`38b2a00a6`](https://github.com/Shopify/polaris/commit/38b2a00a6aa0c95d5df777c7d51023a8193f8090) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Stylelint Polaris v5 release

## 4.4.0

### Minor Changes

- [#7551](https://github.com/Shopify/polaris/pull/7551) [`d7dc4436f`](https://github.com/Shopify/polaris/commit/d7dc4436f624989a60ad933c8f2a8ebf82e54f69) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Add `stylelint-polaris/coverage` rule

### Patch Changes

- [#7589](https://github.com/Shopify/polaris/pull/7589) [`b7b0ef5a9`](https://github.com/Shopify/polaris/commit/b7b0ef5a913397259cac5f25e420d078088161fd) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Add constraints to `stylelint-polaris/coverage` disable comments

- Updated dependencies [[`6e9edd3b5`](https://github.com/Shopify/polaris/commit/6e9edd3b58875ced12d0f27772b825034d83bf6a)]:
  - @shopify/polaris-tokens@6.3.0

## 4.3.2

### Patch Changes

- Updated dependencies [[`c3f427c17`](https://github.com/Shopify/polaris/commit/c3f427c17d268f406618aaddb684ba12c3fa15d1)]:
  - @shopify/polaris-tokens@6.2.1

## 4.3.1

### Patch Changes

- Updated dependencies [[`0be40aa94`](https://github.com/Shopify/polaris/commit/0be40aa94be8c95f96f0835b4df7f91f6da0b5c2)]:
  - @shopify/polaris-tokens@6.2.0

## 4.3.0

### Minor Changes

- [#7306](https://github.com/Shopify/polaris/pull/7306) [`c4bf017aa`](https://github.com/Shopify/polaris/commit/c4bf017aa3b08033311ac4be778a9f845e3ce44a) Thanks [@samrose3](https://github.com/samrose3)! - Update stylelint coverage to include legacy Sass with namespace

## 4.2.2

### Patch Changes

- Updated dependencies [[`3fd9f6415`](https://github.com/Shopify/polaris/commit/3fd9f6415c0d7e3721eb7462c6777d4816437345), [`8626d6a1b`](https://github.com/Shopify/polaris/commit/8626d6a1b8a2ab50e6aa6074037144d11819734b)]:
  - @shopify/polaris-tokens@6.1.0

## 4.2.1

### Patch Changes

- Updated dependencies [[`a55193a8a`](https://github.com/Shopify/polaris/commit/a55193a8ad0de90a40de25b5d4909c1692861bc9)]:
  - @shopify/polaris-tokens@6.0.1

## 4.2.0

### Minor Changes

- [#6890](https://github.com/Shopify/polaris/pull/6890) [`267e1a9bd`](https://github.com/Shopify/polaris/commit/267e1a9bd8a920fde542ac8e9f1f9118749532ff) Thanks [@alex-page](https://github.com/alex-page)! - Add deprecated scss API to stylelint-polaris and use regex tests in the config

## 4.1.2

### Patch Changes

- Updated dependencies [[`2b14c0b60`](https://github.com/Shopify/polaris/commit/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7), [`7d7ae1e87`](https://github.com/Shopify/polaris/commit/7d7ae1e8797ce18820b96b16e360334e38671a5a), [`84ceaa3fc`](https://github.com/Shopify/polaris/commit/84ceaa3fc332d686c7efda312357854555d5e0e6)]:
  - @shopify/polaris-tokens@6.0.0

## 4.1.1

### Patch Changes

- Updated dependencies [[`e5eb70032`](https://github.com/Shopify/polaris/commit/e5eb700321c7ddf4fd3bd8679dfcebbc1514e3d4)]:
  - @shopify/polaris-tokens@5.5.2

## 4.1.0

### Minor Changes

- [#6877](https://github.com/Shopify/polaris/pull/6877) [`dadad0e0e`](https://github.com/Shopify/polaris/commit/dadad0e0e7a65de735a34d7b8b8e7310f0fbaa43) Thanks [@alex-page](https://github.com/alex-page)! - Move polaris-tokens to dependencies

### Patch Changes

- Updated dependencies [[`655bd4828`](https://github.com/Shopify/polaris/commit/655bd48288f87ba6196d932a7696ab0c6e6c9024)]:
  - @shopify/polaris-tokens@5.5.1

## 4.0.0

### Minor Changes

- [#6438](https://github.com/Shopify/polaris/pull/6438) [`3c313704a`](https://github.com/Shopify/polaris/commit/3c313704a0ca86ba9e37d985c3cc20eed3b17f1a) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Added `stylelint-polaris/media-queries-allowed-list` plugin

### Patch Changes

- Updated dependencies [[`b506363cb`](https://github.com/Shopify/polaris/commit/b506363cb42248ecb463c85a2ec8bcd6f9556624)]:
  - @shopify/polaris-tokens@5.5.0

## 3.0.0

### Patch Changes

- Updated dependencies [[`78285533c`](https://github.com/Shopify/polaris/commit/78285533c921c8b438d4e8881d794716d8316690)]:
  - @shopify/polaris-tokens@5.4.0

## 2.0.0

### Patch Changes

- Updated dependencies [[`8bf288c8f`](https://github.com/Shopify/polaris/commit/8bf288c8f866d56021f23d76a5e43de78cc295b4), [`738e31e13`](https://github.com/Shopify/polaris/commit/738e31e1320b289fbf68a2468bcb208b9a629edf), [`a19fe4f9f`](https://github.com/Shopify/polaris/commit/a19fe4f9f2982ff74d5c34a597dea34ef6519b4a), [`b7160b861`](https://github.com/Shopify/polaris/commit/b7160b86107f8466bb275122cf08aad0bed8bbd2)]:
  - @shopify/polaris-tokens@5.3.0

## 1.0.0

### Patch Changes

- Updated dependencies [[`f63177602`](https://github.com/Shopify/polaris/commit/f63177602b2bdd447dabd930dcb3187344f9a5e6), [`27a0fba87`](https://github.com/Shopify/polaris/commit/27a0fba877789a3becb10c6e60d78921d71e6887), [`1d2f51ee9`](https://github.com/Shopify/polaris/commit/1d2f51ee98a3ce8fc7948a50953900ae29aa0b2f)]:
  - @shopify/polaris-tokens@5.2.0

## 0.0.0

### Patch Changes

- Updated dependencies [[`07702ad51`](https://github.com/Shopify/polaris/commit/07702ad513bab12be071e30e121997ef2f7ae7d7)]:
  - @shopify/polaris-tokens@5.1.0

## 0.0.0

Initial release
