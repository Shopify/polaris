# @shopify/polaris-migrator

## 0.7.0

### Minor Changes

- [#7499](https://github.com/Shopify/polaris/pull/7499) [`85c0c3290`](https://github.com/Shopify/polaris/commit/85c0c329003c0d234f339164c0d2940aff4f6b26) Thanks [@jesstelford](https://github.com/jesstelford)! - Add `createSassMigrator` utility to stash common logic, starting with only parsing each event once.

* [#7541](https://github.com/Shopify/polaris/pull/7541) [`141746b5b`](https://github.com/Shopify/polaris/commit/141746b5b4dc2f99b0c729883e98f4210f5a16c0) Thanks [@jesstelford](https://github.com/jesstelford)! - Internally setup stylelint metadata for SASS migrations in preparation for switching to stylelint as our migration runner.

## 0.6.0

### Minor Changes

- [#7342](https://github.com/Shopify/polaris/pull/7342) [`dc2990acf`](https://github.com/Shopify/polaris/commit/dc2990acf1071c2bae352bce6fc5a28092b9f52f) Thanks [@lgriffee](https://github.com/lgriffee)! - Rename `replace-sass-length` migration to `replace-spacing-lengths`
  Add `gap` properties to `replace-sass-space` migration

* [#7310](https://github.com/Shopify/polaris/pull/7310) [`8fb215836`](https://github.com/Shopify/polaris/commit/8fb2158368945ad1e58b6e3ff74567b80b652757) Thanks [@gwyneplaine](https://github.com/gwyneplaine)! - Add sass z-index migration

- [#7335](https://github.com/Shopify/polaris/pull/7335) [`699b70713`](https://github.com/Shopify/polaris/commit/699b707132bfe486785955084961bcb91753fb2a) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Add migration to `replace-typography-declarations`

* [#7375](https://github.com/Shopify/polaris/pull/7375) [`8194e174a`](https://github.com/Shopify/polaris/commit/8194e174ab45e1995f693e786d6925ab79717c1c) Thanks [@samrose3](https://github.com/samrose3)! - Add Sass color function migration

- [#7387](https://github.com/Shopify/polaris/pull/7387) [`a0fa96ed4`](https://github.com/Shopify/polaris/commit/a0fa96ed4eaf53652feb5ee0d79aeec1c84f5d12) Thanks [@lgriffee](https://github.com/lgriffee)! - Added `replace-border-declarations` migration

### Patch Changes

- [#7487](https://github.com/Shopify/polaris/pull/7487) [`60191f353`](https://github.com/Shopify/polaris/commit/60191f353d1ef86f1eef167d36c0b040f21b72d6) Thanks [@lgriffee](https://github.com/lgriffee)! - Update numeric operator detection to check all node types

* [#7412](https://github.com/Shopify/polaris/pull/7412) [`6d82e8965`](https://github.com/Shopify/polaris/commit/6d82e896587bacec60471e06fa81b2c61518551f) Thanks [@samrose3](https://github.com/samrose3)! - Enhance Sass spacing migration to catch Sass interpolations

- [#7423](https://github.com/Shopify/polaris/pull/7423) [`0591db26a`](https://github.com/Shopify/polaris/commit/0591db26a4d13a5640245e433f61f77bf1be88d4) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Update `replace-typography-declarations` comment strategy

* [#7459](https://github.com/Shopify/polaris/pull/7459) [`933a9d71b`](https://github.com/Shopify/polaris/commit/933a9d71b71b172657bbaf050cfc8793e39a49c0) Thanks [@lgriffee](https://github.com/lgriffee)! - Add missing values to borderRadius length map

## 0.5.0

### Minor Changes

- [#7373](https://github.com/Shopify/polaris/pull/7373) [`56c82ee8d`](https://github.com/Shopify/polaris/commit/56c82ee8d15a58ef5e68b04968b126b93aa8dec9) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Add `getFunctionArgs` utility

### Patch Changes

- Updated dependencies [[`c3f427c17`](https://github.com/Shopify/polaris/commit/c3f427c17d268f406618aaddb684ba12c3fa15d1)]:
  - @shopify/polaris-tokens@6.2.1

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
