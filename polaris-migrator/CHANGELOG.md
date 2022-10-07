# @shopify/polaris-migrator

## 0.4.1

### Patch Changes

- [#7371](https://github.com/Shopify/polaris/pull/7371) [`57e5f95c1`](https://github.com/Shopify/polaris/commit/57e5f95c1e402fda3202babfdce25b131b0b9165) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Make Polaris migrator comment generic

## 0.4.0

### Minor Changes

- [#7216](https://github.com/Shopify/polaris/pull/7216) [`fbf2f8832`](https://github.com/Shopify/polaris/commit/fbf2f88320ad6c5767c37d18d76bfa82babf71cb) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Add migration to replace static mixins with declarations

### Patch Changes

- [#7328](https://github.com/Shopify/polaris/pull/7328) [`b31f51f25`](https://github.com/Shopify/polaris/commit/b31f51f259fefd8b119c5242e2ab1528c3a6cff8) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Add namespace support to the `replace-static-breakpoint-mixins` migration

## 0.3.0

### Minor Changes

- [#7264](https://github.com/Shopify/polaris/pull/7264) [`5a1f45f7a`](https://github.com/Shopify/polaris/commit/5a1f45f7a29cf6994394d7fab6f007f850d956ad) Thanks [@lgriffee](https://github.com/lgriffee)! - Add sass padding and margin migration

### Patch Changes

- [#7315](https://github.com/Shopify/polaris/pull/7315) [`c958899c7`](https://github.com/Shopify/polaris/commit/c958899c73829bf1c1fa512946ffa3db7f06a2d0) Thanks [@lgriffee](https://github.com/lgriffee)! - Remove `0` and `0px` length values from `replace-sass-lengths` migration

- Updated dependencies [[`0be40aa94`](https://github.com/Shopify/polaris/commit/0be40aa94be8c95f96f0835b4df7f91f6da0b5c2)]:
  - @shopify/polaris-tokens@6.2.0

## 0.2.1

### Patch Changes

- [#7269](https://github.com/Shopify/polaris/pull/7269) [`963581358`](https://github.com/Shopify/polaris/commit/9635813582030159f4c102242420fde3a6364808) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Update `renameProps` to avoid migrating nested component props

## 0.2.0

### Minor Changes

- [#7262](https://github.com/Shopify/polaris/pull/7262) [`a5fd48bf4`](https://github.com/Shopify/polaris/commit/a5fd48bf4ba52a9675154d386e6365ca728554b7) Thanks [@samrose3](https://github.com/samrose3)! - Added generic migration script for renaming a component prop

### Patch Changes

- [#7241](https://github.com/Shopify/polaris/pull/7241) [`4cbf8f466`](https://github.com/Shopify/polaris/commit/4cbf8f4660242a9bd2a2dd05dbeece212658a420) Thanks [@samrose3](https://github.com/samrose3)! - Enable namespace option for Sass spacing migration

## 0.1.2

### Patch Changes

- [#7223](https://github.com/Shopify/polaris/pull/7223) [`c7afbd498`](https://github.com/Shopify/polaris/commit/c7afbd4984048ddc7438c7cef9e50acd1d174db1) Thanks [@samrose3](https://github.com/samrose3)! - Update Sass spacing migration to properly map spacing functions where quoted string arguments are passed (ex: `spacing('tight')`)

* [#7229](https://github.com/Shopify/polaris/pull/7229) [`2fec9611d`](https://github.com/Shopify/polaris/commit/2fec9611dec0a147be0be0410e955e92c025edc0) Thanks [@samrose3](https://github.com/samrose3)! - Update Sass spacing migrator to apply operator migrations as comments

## 0.1.1

### Patch Changes

- [#7217](https://github.com/Shopify/polaris/pull/7217) [`77d7b5ae3`](https://github.com/Shopify/polaris/commit/77d7b5ae3ff94d29133ff132316cb779a635b047) Thanks [@samrose3](https://github.com/samrose3)! - Update the Sass spacing migration to perform spacing replacement even when there is an operator.

## 0.1.0

### Minor Changes

- [#7153](https://github.com/Shopify/polaris/pull/7153) [`17d5bd0e8`](https://github.com/Shopify/polaris/commit/17d5bd0e8a0ba8adbaf31992e15894e2afa23451) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Add migration for legacy static breakpoint mixins
