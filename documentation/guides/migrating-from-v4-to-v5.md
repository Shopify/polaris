# Migrating from v4 to v5

Polaris v5.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v5.0.0)) removes most features deprecated in v4.x.x releases. This file describes all code updates required to stay up to date.

## AppBridge integrations removed

In v3 and v4 `AppProvider` could accept `apiKey` `shopOrigin` and `forceRedirect` props that would configure AppBridge delegation in our `ResourcePicker`, `Loading`, `Modal`, `Page` and `Toast` components. This functionality has been removed.

In v5 AppBridge integration has been removed from these components:

- The `AppProvider` component’s `apiKey`, `shopOrigin` and `forceRedirect` have been removed.
- The `Modal` component's `size` and `message` props have been removed as they only had meaning within an AppBridge app.
- The `Page` component's `forceRender` prop has been removed as it only had meaning within an AppBridge app.
- The `ResourcePicker` component has been removed as it only had meaning within an AppBridge app.

AppBridge behaviour has been abstracted into a separate `@shopify/app-bridge-react` package. If you require the AppBridge implementation of these components then use the components from the [`@shopify/app-bridge-react` package](https://shopify.dev/tools/app-bridge/react-components).

```js
// Old
import {AppProvider, Modal} from '@shopify/polaris';

function MyApp() {
  const config = {apiKey: '12345', shopOrigin: shopOrigin};

  return (
    <AppProvider apiKey={config.apiKey} shopOrigin={config.shopOrigin}>
      <Modal /* ... *//>
    </AppProvider>
  );
}


// New
import {AppProvider} from '@shopify/polaris';
import {Provider, Modal} from '@shopify/app-bridge-react';

function MyApp() {
  const config = {apiKey: '12345', shopOrigin: shopOrigin};

  return (
    <AppProvider>
      <Provider config={config}>
        <Modal /* ... *//>
      </Provider>
    <AppProvider>
  );
}
```

## AppProvider's i18n translations array is now ordered by preferred language first

AppProvider's i18n prop accepts an array of translation dictionaries so that if a translation key in one language is not found it can try a fallback language.

In v4 this order was `[fallbackDictionary, preferredDictionary]`. This was unintuitive, and does not align with other translation tools used at Shopify.

In v5 this order is `[preferredDictionary, fallbackDictionary]`. You should reverse the order of the array you pass into the i18n prop.

```diff
import enTranslations from '@shopify/polaris/locales/en.json';
import frTranslations from '@shopify/polaris/locales/fr.json';

function App() {
  return (
    // French translations as the primary language, english as a fallback
-    <AppProvider i18n={[enTranslations, frTranslations]}>
+    <AppProvider i18n={[frTranslations, enTranslations]}>
      {/* App content */}
    </AppProvider>
  );
}
```

If you are using `react-i18n` to provide async translations you can now pass translations in the order returned by `react-i18n`:

```diff
import AppProvider from '@shopify/polaris';
// en.json is English. Replace with fr.json for French, etc
import translations from '@shopify/polaris/locales/en.json';
import {useI18n} from '@shopify/react-i18n';

function App() {
  const [i18n] = useI18n({
    id: 'Polaris',
    fallback: translations,
    translations(locale) {
      return import(
        /* webpackChunkName: "Polaris-i18n", webpackMode: "lazy-once" */ `@shopify/polaris/locales/${locale}.json`
      ).then((dictionary) => dictionary && dictionary.default);
    },
  });

  return (
-    <AppProvider i18n={i18n.translations.reverse()}>{/* App content */}</AppProvider>
+    <AppProvider i18n={i18n.translations}>{/* App content */}</AppProvider>
  );
}
```

## Build output changes - general consumers

The compiled styles file has moved. Imports must be updated:

```diff
- import '@shopify/polaris/styles.css';
+ import '@shopify/polaris/dist/styles.css';
```

The minified styles file has been removed, and you should use the above file instead.

```diff
- import '@shopify/polaris/styles.min.css';
+ import '@shopify/polaris/dist/styles.css';
```

The scss entry point has been removed, and you should use the above `styles.css` file instead. If you require Polaris React’s Sass mixins and functions, you should also import the `public-api` entry point.

```diff
- @import 'path_to_node_modules/@shopify/polaris/styles';
+ @import 'path_to_node_modules/@shopify/polaris/dist/styles.css';
+ /* Optional - only needed if you use our mixins/functions */
+ @import 'path_to_node_modules/@shopify/polaris/dist/styles/public-api';
```

## Build output changes - @shopify/sewing-kit integrations only

Apps built using `@shopify/sewing-kit` - Shopify's in-house opinionated build toolkit - will need to update to at least v0.132.2 to make use of the reworked "esnext" build output in Polaris React v5.

Apps built using `@shopify/sewing-kit` and Polaris v4 also had to have an explicit import of `@shopify/polaris/esnext/styles/global.scss` in the same file as they imported and used `AppProvider`. This is no longer required, this import should be removed. The styles in this file will be implicitly imported when you use `AppProvider`.

```diff
- import '@shopify/polaris/esnext/styles/global.scss';
```

Sewing-kit apps can use Polaris React’s Sass public API by configuring their Sass plugin's `autoInclude` option. The path to the Sass API file has now changed and should be updated accordingly:

```diff
plugins.sass({
  autoInclude: [
-    path.join(__dirname, 'node_modules/@shopify/polaris/esnext/styles/_public-api.scss'),
+    path.join(__dirname, 'node_modules/@shopify/polaris/dist/styles/_public-api.scss'),
  ],
 })
```

## Component API Changes

### ResourceList.FilterControl

The `ResourceList.FilterControl` subcomponent has been removed. You should use the `Filters` component to provide filtering options.

### DatePicker

The `DatePicker` component's `year`, `month` and `weekStartsOn` prop type have changed from `Year`, `Months` and `Weekdays` to all be `number`. This is functionally identical to v4's behaviour as you could always pass a number into these props however you can no longer use the `Months` and `Weekdays` enums.

Replace usage of the `Months` enum with a number between 0 and 11 representing the month. `0` is January, `1` is February, `11` is December etc. This matches the number you get back from `(new Date()).getMonth()`.

Replace usage of the `Weekdays` enum with a number between 0 and 6 representing the day of the week. `0` is Sunday, `1` is Monday, `6` is Saturday etc. This matches the number you get back from `(new Date()).getDay()`.

```diff
- import {Weekdays} from '@shopify/javascript-utilities';
- import {DatePicker, Months, Year} from '@shopify/polaris';
+ import {DatePicker} from '@shopify/polaris';

function MyComponent() {
-   function handleOnMonthChange(month: Month, year: Year) {
+   function handleOnMonthChange(month: number, year: number) {
    console.log(month, year);
  }

  return (
    <DatePicker
      year={2019}
-      month={Months.February}
+      month={1}
-      weekStartsOn={Weekdays.Monday}
+      weekStartsOn={1}
      onMonthChange={handleOnMonthChange}
    />
  );
}
```

### Page

The `Page` component's `singleColumn` prop has been removed. You should replace any usage of this prop with the `narrowWidth` prop which has identical functionality.

### EmptyState

The `EmptyState` component's `centeredLayout` prop has been removed as the illustration's location is now handled automatically by opting in to the new design language. You should remove any usage of this prop.

### Removed Exports

#### NavigationMessageProps

The `NavigationMessageProps` type has been removed, as `Navigation`'s `Message` internal subcomponent has been removed.

#### Months and Year

The `Months` enum and `Year` type have both been removed, as `DatePicker` now uses
`number` in place of both these types to reduce indirection.

Replace usage of `Year` and `Months` as types with `number`.

Replace usage of the `Months` enum with a number between 0 and 11 representing the month. `0` is January, `1` is February, `11` is December etc. This matches the number you get back from `(new Date()).getMonth()`.

See the DatePicker section above for more information.

## Dependencies

The peer dependencies on `react` and `react-dom` have been increased to `^16.9.0`, opening the door to using the [React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) in the future. Use the package manager of your choice to install a recent version of these packages.

Apps built using `@shopify/sewing-kit` will need to upgrade to at least version `0.132.2`.

## CDN usage

As a result of build output changes, the location of the static stylesheet for CSS-only usage has been moved. Update any stylesheet imports to use the new path:

```diff
<link
  rel="stylesheet"
- href="https://unpkg.com/@shopify/polaris@4.0.0/styles.min.css"
+ href="https://unpkg.com/@shopify/polaris@5.0.0/dist/styles.css"
/>
```
