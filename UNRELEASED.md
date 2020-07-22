# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

### Enhancements

### Bug fixes

- Fixed case where `DatePicker` did not translate the weekday name in an aria label ([#3113](https://github.com/Shopify/polaris-react/pull/3113))
- Updated browserslist config to be an explicit list instead of extending an existing config, so that consuming apps don't need to depend upon `@shopify/browserslist-config` ([#3132](https://github.com/Shopify/polaris-react/pull/3132))

### Documentation

- Updated Polaris to the latest version in the [CDN Styles example](https://github.com/Shopify/polaris-react/tree/master/examples/cdn-styles?rgh-link-date=2020-06-12T21%3A05%3A52Z) ([#3068](https://github.com/Shopify/polaris-react/pull/3068))
- Updated `TextField` example to use a number instead of a boolean ([#3114](https://github.com/Shopify/polaris-react/pull/3114))

### Development workflow

### Dependency upgrades

### Code quality

- Updated linting to prefer the fragment shorthand `<>` instead of `<React.Fragment> ([#3133](https://github.com/Shopify/polaris-react/pull/3133))
- Updated how we access React exports such as React.Component and React.PureComponent to help treeshakability ([#3133](https://github.com/Shopify/polaris-react/pull/3133))

### Deprecations
