# Unreleased changes

### Breaking changes

### Enhancements

- Updated `Popover` to focus the correct element when closed ([#2255](https://github.com/Shopify/polaris-react/pull/2255))
- Updated the type of the `title` prop in `ChoiceList` from `string` to `ReactNode` ([#2355](https://github.com/Shopify/polaris-react/pull/2355))
- Added `disabled` prop to `Filters` component ([2389](https://github.com/Shopify/polaris-react/pull/2389))

### Bug fixes

- Fixed an issue where types were not generated for a JSON config file [#2361](https://github.com/Shopify/polaris-react/pull/2361))

### Documentation

### Development workflow

- Enabled maintainers running `yarn dev` to hide [`yarn splash`](https://github.com/Shopify/polaris-react/tree/master/scripts/splash) reports from the console by running `DISABLE_SPLASH=1 yarn dev` ([#2372](https://github.com/Shopify/polaris-react/pull/2372))
- Updated to sewing-kit 0.112.0 and eslint 6 and updated vscode config to use the eslint plugin to format js/ts files ((#2369)[https://github.com/Shopify/polaris-react/pull/2369])

### Dependency upgrades

### Code quality

- Migrated `Popover` to use hooks ([#2386](https://github.com/Shopify/polaris-react/pull/2386))

### Deprecations
