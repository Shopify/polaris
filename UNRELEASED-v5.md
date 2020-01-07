# Unreleased v5.0.0 changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Breaking changes

- Upgraded `react` and `react-dom` peer-dependencies to 16.9.0 to enable the use of `React.Profiler` ([#2462](https://github.com/Shopify/polaris-react/pull/2462))
- Removed `NavigationMessageProps` as the `Message` component no longer exists ([#2502](https://github.com/Shopify/polaris-react/pull/2502))
- Removed `FilterControl` component ([#2047](https://github.com/Shopify/polaris-react/pull/2047))
- Removed `AppBridge`, `ResourcePicker` and `Loading`, `Modal`, `Page`, `Toast` App Bridge render delegation ([#2046](https://github.com/Shopify/polaris-react/pull/2046))
- Drop support for iOS 9 ([#2195](https://github.com/Shopify/polaris-react/pull/2195))
- The styles in global.scss have been moved into AppProvider. This only affects apps using the 'esnext' build; if you import `@shopify/polaris/styles.css` you are unaffected. Any applications using the 'esnext' build no longer needs to import the `@shopify/polaris/esnext/global.scss` file as it does nothing. An empty global.scss is provided in order to not break existing integration with sewing-kit versions < 0.113.0. ([#2392](https://github.com/Shopify/polaris-react/pull/2392))
- Reversed the precedence of the language dictionaries passed into the `AppProvider`'s `i18n` prop. When passing an array of dictionaries the first dictionary should be your prefered language, followed by any fallback languages. ([#2572](https://github.com/Shopify/polaris-react/pull/2572))

### Enhancements

- Added an activator prop to `Modal` so that focus can be returned to it when the `Modal` is closed ([#2206](https://github.com/Shopify/polaris-react/pull/2206))

### Bug fixes

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

- Converted `Modal` to a functional component ([#2376](https://github.com/Shopify/polaris-react/pull/2376))

### Deprecations
