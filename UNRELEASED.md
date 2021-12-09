# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

- Update the base font size to `100%` from `62.5%` and update `rem` values accordingly, along with `pxtorem` `rootValue` ([#4794](https://github.com/Shopify/polaris-react/pull/4794))

### Enhancements

- Removed animtion from `Skeleton` components ([#4697](https://github.com/Shopify/polaris-react/pull/4697))
- Remove duplicate duration(fast) usage. ([#4682](https://github.com/Shopify/polaris-react/pull/4682))
- Updated the accessability label for the rollup actions in the `Page` header ([#4080](https://github.com/Shopify/polaris-react/pull/4080))
- Keyboard arrow navigation support added in `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Menu role attribute value support added in `ActionList/Section` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))

### Bug fixes

- Centered full width `Popover` on small viewports ([#4114](https://github.com/Shopify/polaris-react/pull/4114))

### Documentation

- Added arrow navigation instructions in keyboard support for `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))
- Updated examples to properly support JAWS screen reader for `Popover` and `ActionList` ([#4505](https://github.com/Shopify/polaris-react/pull/4505))

### Development workflow

- Remove analyze custom properties check. ([#4718](https://github.com/Shopify/polaris-react/pull/4718))
- Removed support for importing from `components` as it slows tests down ([#4735](https://github.com/Shopify/polaris-react/pull/4735), [#4739](https://github.com/Shopify/polaris-react/pull/4739))

### Dependency upgrades

- Bumped `postcss` to `v8.3.1` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))
- Bumped `@shopify/postcss-plugin` to `v5.0.1` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))
- Bumped `postcss-loader` to `v4.2.0` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))
- Bumped `postcss-modules` to `v4.2.2` ([#4701](https://github.com/Shopify/polaris-react/pull/4701))
- Bumped `node-sass` to `v6.0.1` ([#4783](https://github.com/Shopify/polaris-react/pull/4783))
- Bumped `sass-loader` to `v10.1.1` ([#4783](https://github.com/Shopify/polaris-react/pull/4783))
- Bumped `stylelint` to `v14.1.0` and `@shopify/stylelint-plugin` to `v11.0.0` ([#4798](https://github.com/Shopify/polaris-react/pull/4798))
- Bumped `eslint` to `v8.3.0` and `@shopify/eslint-plugin` to `v41.0.1` ([#4797](https://github.com/Shopify/polaris-react/pull/4797))

### Code quality

- Removed `rem()` function from `tokens.ts` ([#4695](https://github.com/Shopify/polaris-react/pull/4695))
- Remove unnecessary import of `Tokens` in `Collapsible` test ([#4722](https://github.com/Shopify/polaris-react/pull/4722))
- Remove legacy tokens and use default theme for `.storybook/manager.js` ([#4729](https://github.com/Shopify/polaris-react/pull/4729))

### Deprecations

- Deprecated `thumbnail` property for `Page` ([#4733](https://github.com/Shopify/polaris-react/pull/4733))
- Deprecated `secondaryActions` property for `SkeletonPage` ([#4740](https://github.com/Shopify/polaris-react/pull/4740))
