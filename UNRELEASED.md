# Unreleased changes

Use [the changelog guidelines](/documentation/Versioning%20and%20changelog.md) to format new entries. 💜

### Breaking changes

### Enhancements

- Added `PlainAction` type to `ComplexAction`. ([#4489](https://github.com/Shopify/polaris-react/pull/4489)

### Bug fixes

- Fixed try-catch syntax error in `Modal` ([#4553](https://github.com/Shopify/polaris-react/pull/4553))

### Documentation

### Development workflow

- Tightened up what absolute imports are allowed. Removed `baseUrl` from `tsconfig.json`. Attempting to do an absolute import from `src/X` or `components/X` now results in a error when type-checking. ([#4643](https://github.com/Shopify/polaris-react/pull/4643))

### Dependency upgrades

### Code quality

### Deprecations
