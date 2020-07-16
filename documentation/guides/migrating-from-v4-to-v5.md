# Migrating from v4 to v5

Polaris v5.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v5.0.0)) removes most features deprecated in v4.x.x releases. This file describes all code updates required to stay up to date.

## AppBridge integrations removed

In v3 and v4 `AppProvider` could accept `apiKey` `shopOrigin` and `forceRedirect` props that would configure AppBridge delegation in our `ResourcePicker`, `Loading`, `Modal`, `Page` and `Toast` components.

The `ResourcePicker` component has been fully removed is it only had meaning within an AppBridge app. Other components retain their non-app-bridge behaviour.

AppBridge integration has been removed and abstracted into a separate `@shopify/app-bridge-react` package. If you require the AppBridge implementation of these components then use the components from the [`@shopify/app-bridge-react` package](https://shopify.dev/tools/app-bridge/react-components).

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
import {Provider, TitleBar} from '@shopify/app-bridge-react';

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

## AppProvider's i18n translations array is now preferred language first

AppProvider's i18n prop accepts an array of translation dictionaries so that if a translation key in one language is not found it can try a fallback language.

In v4 this order was `[fallbackDictionary, preferredDictionary]`. This was unintuitive, and does not align with other translation tools used at Shopify.
In v5 this order is `[preferredDictionary, fallbackDictionary]`.

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

Our compiled styles file has moved. Imports must be updated:

```diff
- import '@shopify/polaris/styles.css';
+ import '@shopify/polaris/dist/styles.css';
```

Our minified styles file has been removed, and you should use the above file instead.

```diff
- import '@shopify/polaris/styles.min.css';
+ import '@shopify/polaris/dist/styles.css';
```

Our scss entrypoint has been removed, and you should use the above styles file instead. If you require our mixins/functions you should also import the our public-api entrypoint.

```diff
- @import 'path_to_node_modules/@shopify/polaris/styles';
+ @import 'path_to_node_modules/@shopify/polaris/dist/styles.css';
+ /* Optional - only needed if you use our mixins/functions */
+ @import 'path_to_node_modules/@shopify/polaris/dist/styles/public-api';

## Build output changes - @shopify/sewing-kit integrations only

Apps using `@shopify/sewing-kit` - Shopify's in-house opinionated build toolkit - will need to update to at least v0.132.2 to make use of the reworked "esnext" build output in polaris v5.

Apps using `@shopify/sewing-kit` and Polaris v4 also had to have an explicit import of `@shopify/polaris/esnext/styles/global.scss` in the same file as they imported and used `AppProvider`. This is no longer required, this import can be removed. The styles in this file will be implicitly imported when you use `AppProvider`.

```diff
- import '@shopify/polaris/esnext/styles/global.scss';
```

Sewing-kit apps can use our sass public API by configuring their sass plugin's autoInclude option. The path to the sass API file has now changed and should be updated accordingly:

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

### EmptyState

The `EmptyState` component's `centeredLayout` prop has been removed as the illustration's location is now handled automatically by opting into the new design language. You should remove any usage of this prop.

### Removed Exports

#### NavigationMessageProps

The `NavigationMessageProps` type has been removed, as Navigation's Message internal subcomponent has been removed.

## Dependencies

The peer dependencies on `react` and `react-dom` have been increased to 16.9.0, to allow us to use react's Profiler component in the future. Use the package manager of your choice to install a recent version of these pacakges.

Apps built using `@shopify/sewing-kit` - Shopify's in-house opinionated build toolkit - will need to upgrade to at least version `0.132.2`.

## CDN usage

As a result of build output changes, the location of our static stylesheet for CSS-only usage has been moved. Update any stylesheet imports to use the new path:

```diff
<link
  rel="stylesheet"
- href="https://unpkg.com/@shopify/polaris@4.0.0/styles.min.css"
+ href="https://unpkg.com/@shopify/polaris@5.0.0/dist/styles.css"
/>
```
