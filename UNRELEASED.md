# Unreleased v5.0.0 changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

- Upgraded `react` and `react-dom` peer-dependencies to 16.9.0 to enable the use of `React.Profiler` ([#2462](https://github.com/Shopify/polaris-react/pull/2462))
- Removed `NavigationMessageProps` as the `Message` component no longer exists ([#2502](https://github.com/Shopify/polaris-react/pull/2502))
- Removed `ResourceList.FilterControl` component. The `FilterControl` component is available under a private name for legacy Shopify applications, but it should not be relied upon and might be deleted at any point ([#2047](https://github.com/Shopify/polaris-react/pull/2047) [#3116](https://github.com/Shopify/polaris-react/pull/3116))
- Removed `AppBridge`, `ResourcePicker` and `Loading`, `Modal`, `Page`, `Toast` App Bridge render delegation ([#2046](https://github.com/Shopify/polaris-react/pull/2046))
- Dropped support for iOS 9 ([#2195](https://github.com/Shopify/polaris-react/pull/2195))
- Moved several of our build artifacts into a `dist` folder ([#2938](https://github.com/Shopify/polaris-react/pull/2938)):
  - `styles.css` has moved to `dist/styles.css`
  - `styles.min.css` has been removed - import `dist/styles.css` instead. Styles are compacted by default so the performance hit is negligible.
  - `styles.scss` has been removed - import `dist/styles.css`and `dist/styles/_public-api.scss` instead
- Updated "esnext" build output to ship plain css files instead of scss source files. Apps built using `@shopify/sewing-kit` will need to update to at least version `0.132.2`. ([#2938](https://github.com/Shopify/polaris-react/pull/2938))
- Moved styles from `global.scss` to `AppProvider`. This change only affects applications using the `esnext` build (applications importing `@shopify/polaris/styles.css` aren’t affected), who no longer need to import the `@shopify/polaris/esnext/global.scss` file. ([#2392](https://github.com/Shopify/polaris-react/pull/2392))
- Reversed the precedence of the language dictionaries passed into the `AppProvider`’s `i18n` prop. When passing an array of dictionaries the first dictionary should be your prefered language, followed by any fallback languages. ([#2572](https://github.com/Shopify/polaris-react/pull/2572))
- Removed `centeredLayout` prop in `EmptyState`. All layouts within the new design language context will be center aligned ([#3111](https://github.com/Shopify/polaris-react/pull/3111))
- Updated types of `DatePicker` component - `month`,`year` `weekStartsOn` are now typed as plain `number` - functionality remains identical as the former types effectivly ended up being aliases of `number` anyway ([#3113](https://github.com/Shopify/polaris-react/pull/3113))
- Removed `Year` type export (used by the DatePicker's props). Replace its usage with `number`. ([#3121](https://github.com/Shopify/polaris-react/pull/3121))
- Removed the `Month` enum export (used by the DatePicker's props). Replace its usage with a number from 0 to 11, representing the number of the month in question - `Month.January` becomes `0`, `Month.December` becomes `11` etc. ([#3121](https://github.com/Shopify/polaris-react/pull/3121))
- Removed the `TypeOf` enum, and `GeneralObject`, `DeepPartial`, `EffectCallback`, `DependencyList` and `Comparator` type exports - these were for internal use, and were never documented for external use. ([#3123](https://github.com/Shopify/polaris-react/pull/3123))

### Enhancements

- Added an activator prop to `Modal` so that focus can be returned to it when the `Modal` is closed ([#2206](https://github.com/Shopify/polaris-react/pull/2206))

### Bug fixes

- Fixed case where `DatePicker` did not translate the month name in an aria label ([#3121](https://github.com/Shopify/polaris-react/pull/3121))

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
- Removed dependency on `@shopify/javascript-utilities` ([#3108](https://github.com/Shopify/polaris-react/pull/3108))

### Deprecations
