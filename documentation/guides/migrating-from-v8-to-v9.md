## From `ThemeProvider` to `CustomProperties`

The `ThemeProvider` has been deprecated in favor of the new `CustomProperties` component. As a result, a number of internal components using the `ThemeProvider` have been updated to use `CustomProperties` and adjusted their prop interfaces accordingly (such as: `AppProvider`, `Popover`, etc.).

`@shopify/polaris` no longer supports custom theme objects used to influence the component library and will now maintain a set of predefined color-schemes that meet the immediate needs of the admin. Replace the `ThemeProvider` with the `CustomProperties` component and (optionally) set the `colorScheme` prop to `light` or `dark`:

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

The `CustomProperties` component will generate Polaris custom properties (`--p-*`) based on the `colorScheme` prop and make them accessible to all it's descendants.

> Note: `colorScheme="inverse"` has been deprecated and requires authors to explicitly set `light` or `dark` values.

> IMPORTANT: We do not officially support dark mode at this time and the example above is simply representative of the current implementation.

## `AppProvider` changes

The `ThemeProvider` has been removed from the `AppProvider` and replaced with the `CustomProperties` component. Thus, the `AppProvider` no longer accepts a custom theme object. Remove the `theme` prop from the `AppProvider` and (optionally) set the `colorScheme` prop to `light` or `dark`:

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

## Removed all theme types, constants, and utilities

A number of types, constants, and utilities have been removed with the deprecation of the `ThemeProvider` component:

- `ThemeContext` - React context
- `useTheme` - React hook
- `Theme` - Type
- `ThemeConfig` - Type
- `ProcessThemeConfig` - Type
- `RoleColors` - Type
- `Role` - Type
- `AppThemeConfig` - Type
- `buildCustomProperties` - Utility
- `buildThemeContext` - Utility
- `toString` - Utility
- `toCssCustomPropertySyntax` - Utility
- `UNSTABLE_toCssCustomPropertySyntax` - Utility
- `UNSTABLE_Tokens` - Constant
