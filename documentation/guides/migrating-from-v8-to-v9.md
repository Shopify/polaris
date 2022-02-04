# Migrating from v8 to v9

Polaris v9.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v9.0.0)) features removal of the public scss api and removal of scss functions and mixins.

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

## CSS Custom Properties

CSS custom properties that were renamed can be replaced with the new CSS custom property name.

|              Before               |               After                |
| :-------------------------------: | :--------------------------------: |
|      `--p-badge-font-weight`      |     `--p-font-weight-regular`      |
|     `--p-button-font-weight`      |      `--p-font-weight-medium`      |
|       `--p-duration-1-0-0`        |         `--p-duration-100`         |
|       `--p-duration-1-5-0`        |         `--p-duration-150`         |
|         `--p-card-shadow`         |         `--p-shadow-card`          |
|       `--p-popover-shadow`        |        `--p-shadow-popover`        |
|        `--p-modal-shadow`         |         `--p-shadow-modal`         |
|       `--p-top-bar-shadow`        |        `--p-shadow-top-bar`        |
|     `--p-button-drop-shadow`      |        `--p-shadow-button`         |
|     `--p-button-inner-shadow`     |     `--p-shadows-inset-button`     |
| `--p-button-pressed-inner-shadow` | `--p-shadows-inset-button-pressed` |
|          `--p-icon-size`          |       `--p-icon-size-small`        |

CSS custom properties that have been deprecated can be replaced with the CSS property value.

|             Before              |          Value           |
| :-----------------------------: | :----------------------: |
|       `--p-override-none`       |          `none`          |
|   `--p-override-transparent`    |      `transparent`       |
|       `--p-override-one`        |           `1`            |
|     `--p-override-visible`      |        `visible`         |
|       `--p-override-zero`       |           `0`            |
|     `--p-non-null-content`      |           `''`           |
|   `--p-badge-mix-blend-mode`    |       `luminosity`       |
| `--p-range-slider-thumb-scale`  |          `1.5`           |
|       `--p-frame-offset`        |          `0px`           |
| `--p-shadow-from-ambient-light` | `rgba(23, 24, 24, 0.05)` |
| `--p-shadow-from-direct-light`  |  `rgba(0, 0, 0, 0.15)`   |
|   `--p-shadow-from-dim-light`   |   `rgba(0, 0, 0, 0.2)`   |

## Removal of the public scss api

Any functions that were being consumed from `build/styles/_public-api.scss` have been removed. The functions can be found in the following permalinks.

[`./foundation/layout`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/foundation/_layout.scss)

[`./foundation/focus-ring`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/foundation/_focus-ring.scss)

[`./shared/accessibility`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_accessibility.scss)

[`./shared/breakpoints`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_breakpoints.scss)

[`./shared/buttons`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_buttons.scss)

[`./shared/controls`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_controls.scss)

[`./shared/forms`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_forms.scss)

[`./shared/icons`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_icons.scss)

[`./shared/layout`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_layout.scss)

[`./shared/page`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_page.scss)

[`./shared/typography`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_typography.scss)

[`./shared/skeleton`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_skeleton.scss)

[`./shared/interaction-state`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_interaction-state.scss)

[`./shared/printing`](https://github.com/Shopify/polaris-react/blob/e2e6cb263bac1c5c1e607a6f6bd949a2d349d197/src/styles/shared/_printing.scss)
