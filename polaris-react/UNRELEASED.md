# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Replaced hardcoded `padding` or `margin` values with spacing tokens ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Added `border-width-4` and `border-width-5` tokens and replaced hardcoded values ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Replaced any hardcoded `outline-width` with `border-width` ([#5528](https://github.com/Shopify/polaris/pull/5528))
- Added the ability to disable specific dates in the `DatePicker`, to go along with date ranges ([#5356](https://github.com/Shopify/polaris/pull/5356))
- Added breakpoint CSS custom properties and SCSS media conditions ([#5558](https://github.com/Shopify/polaris/pull/5558))

### Bug fixes

- Used prop-provided `selectable` value in `IndexTable` ([#5661](https://github.com/Shopify/polaris/pull/5661))
- Fixed passing inline styles to the root element of the `CustomProperties` component ([#5661](https://github.com/Shopify/polaris/pull/5661))
- Replaced incorrect usage of `aria-expanded` on `Collapsible` with `aria-hidden` ([#5661](https://github.com/Shopify/polaris/pull/5661))

### Documentation

- Added wrapper with height on `Combobox` example for autocomplete with loading ([#5624](https://github.com/Shopify/polaris/pull/5624))

### Development workflow

### Dependency upgrades

- Removed `lodash` ([#5544](https://github.com/Shopify/polaris/pull/5544))
- Uses more permissive dependency for `@types/react` and `@types/react-dom` ([#5575](https://github.com/Shopify/polaris/pull/5575))

### Code quality

- Replaced `skeleton-content` and `thumbnail-size` mixins with css values ([#5630](https://github.com/Shopify/polaris/pull/5630))

### Deprecations
