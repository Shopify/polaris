# Migrating from v7 to v8

Polaris v8.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v8.0.0)) features a rebuild of the `Autocomplete` component, build changes, . This file describes all code updates required to stay up to date.

## `ThemeProvider` changes

The `ThemeProvider` has been deprecated in favor of the new `CustomProperties` component. As a result, a number of internal components using the `ThemeProvider` have been updated to use the `CustomProperties` component and adjusted their prop interfaces accordingly (such as: `AppProvider`, `Popover`, etc.).

`polaris-react` no longer supports accepting and transforming a custom theme object to influence the component library. Polaris will now maintain a set of predefined color-schemes that meet the immediate needs of the admin and thus the following changes are required:

```diff
- import {ThemeProvider} from '@shopify/polaris-react';
+ import {CustomProperties} from '@shopify/polaris-react';

const App = (props) => (
-  <ThemeProvider theme={{colorScheme: 'dark'}}>
-    {props.children}
-  </ThemeProvider>
+  <CustomProperties colorScheme="dark">
+    {props.children}
+  </CustomProperties>
)
```

As mentioned above, the `ThemeProvider` has been removed from the `AppProvider` and replaced with the `CustomProperties` component.

With that said, the `AppProvider` no longer accepts a custom theme object to forward to the `ThemeProvider`. However, similar behavior is still optionally exposed by forwarding the `colorScheme` prop to the `CustomProperties` component:

```diff
import {AppProvider} from '@shopify/polaris-react';

const App = (props) => (
-  <AppProvider theme={{colorScheme: 'dark'}}>
-    {props.children}
-  </AppProvider>
+  <AppProvider colorScheme="dark">
+    {props.children}
+  </AppProvider>
)
```
