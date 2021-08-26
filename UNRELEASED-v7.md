# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

### Breaking changes

- Updated `react` and `react-dom` to version 16.14.0. This is now the minimum version of React required to use the `@shopify/polaris` library.
- Dropping support for node 10.x
- Dropped support for Desktop Safari versions less than 13.1, and ios Safari versions less than 13.6. ([#4304](https://github.com/Shopify/polaris-react/pull/4304))
- Made `autoComplete` prop in `TextField` a required string ([#4267](https://github.com/Shopify/polaris-react/pull/4267)). If you do not want the browser to autofill a user's information (for example an email input which is a customer's email, but not the email of the user who is entering the information), we recommend setting `autoComplete` to `"off"`.
- `Autocomplete` now requires `Autocomplete.TextField` to be used ([#3910](https://github.com/Shopify/polaris-react/pull/3910))
- Removed ComboBox as a named export on `Autocomplete` ([#3910](https://github.com/Shopify/polaris-react/pull/3910))
- Remove the `esnext` folder from the package. If you use Polaris in an app built with sewing-kit, it must use at least sewing-kit 0.152.0 to leverage esnext builds. ([#4425](https://github.com/Shopify/polaris-react/pull/4425))
- The component styles have moved fromm `dist/styles.css` to `build/esm/styles.css`. Consumers who import styles shall need to update their import path. ([#4424](https://github.com/Shopify/polaris-react/pull/4424))
- The public Sass API has moved from `dist/styles/_public-api.scss` to `build/styles/_public-api.scss`. Consumers who use our Sass API shall need to update their import path. ([#4424](https://github.com/Shopify/polaris-react/pull/4424))

### Enhancements

- Added support for multi-sectioned options in `Autocomplete` [#4221](https://github.com/Shopify/polaris-react/pull/4221)

### Bug fixes

### Documentation

### Development workflow

- Use `sewing-kit-next` for test and linting harnesses. ([#4402](https://github.com/Shopify/polaris-react/pull/4402))

### Dependency upgrades

### Code quality

- Rebuilt `Autocomplete` internals using new `Combobox` and `Listbox` components built on the ARIA 1.2 spec for improved accessibility ([#3910](https://github.com/Shopify/polaris-react/pull/3910))
- Updated `@shopify/react-testing` to v3.2.0 for React 17 support in tests ([#4349](https://github.com/Shopify/polaris-react/pull/4349))

### Deprecations
