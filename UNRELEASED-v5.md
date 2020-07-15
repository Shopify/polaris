# Unreleased v5.0.0 changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

- Upgraded `react` and `react-dom` peer-dependencies to 16.9.0 to enable the use of `React.Profiler` ([#2462](https://github.com/Shopify/polaris-react/pull/2462))
- Removed `NavigationMessageProps` as the `Message` component no longer exists ([#2502](https://github.com/Shopify/polaris-react/pull/2502))
- Removed `FilterControl` component ([#2047](https://github.com/Shopify/polaris-react/pull/2047))
- Removed `AppBridge`, `ResourcePicker` and `Loading`, `Modal`, `Page`, `Toast` App Bridge render delegation ([#2046](https://github.com/Shopify/polaris-react/pull/2046))
- Dropped support for iOS 9 ([#2195](https://github.com/Shopify/polaris-react/pull/2195))
- Moved styles from `global.scss` to `AppProvider`. This change only affects applications using the `esnext` build (applications importing `@shopify/polaris/styles.css` aren’t affected), who no longer need to import the `@shopify/polaris/esnext/global.scss` file. An empty `global.scss` was kept in, to ensure applications using sewing-kit \<v0.113.0 still build ([#2392](https://github.com/Shopify/polaris-react/pull/2392))
- Reversed the precedence of the language dictionaries passed into the `AppProvider`’s `i18n` prop. When passing an array of dictionaries the first dictionary should be your prefered language, followed by any fallback languages. ([#2572](https://github.com/Shopify/polaris-react/pull/2572))
- Removed `centeredLayout` prop in `EmptyState`. All layouts within the new design language context will be center aligned ([#3111](https://github.com/Shopify/polaris-react/pull/3111))

### Enhancements

- Added an activator prop to `Modal` so that focus can be returned to it when the `Modal` is closed ([#2206](https://github.com/Shopify/polaris-react/pull/2206))

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

- Updated browserlist to use `@shopify/browserslist-config` ([#3101](https://github.com/Shopify/polaris-react/pull/3101))

### Code quality

- Converted `Modal` to a functional component ([#2376](https://github.com/Shopify/polaris-react/pull/2376))
- Migrated to use `react-transition-group` instead of the material-ui fork. ([#3094](https://github.com/Shopify/polaris-react/pull/3094))
- Removed `withAppProvider` higher-order component. ([#3098](https://github.com/Shopify/polaris-react/pull/3098))
- Removed several dependencies on the deprecated `@shopify/javascript-utilities` library ([#3102](https://github.com/Shopify/polaris-react/pull/3102))
- Removed dependency on `@shopify/useful-types`

### Deprecations
