# Migrating from v8 to v9

Polaris v9.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v9.0.0)) features removal of the public scss api and removal of scss functions and mixins.

## ThemeProvider changes

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

## CSS custom properties

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

## Sass functions and mixins

The following sass functions and mixins have been removed. You will either need to add the functions to your repo or replace all function instances with values.

### Adding the functions and mixins to your repo

To help you quickly add these functions and mixins back to your repo, we've created a css file with all the removed functions and mixins.

[✨ Amazing mega file linked here ✨]

### Replacing function and mixin instances with values or tokens

A list of functions/mixins and their value equivalents or new token values.

#### `easing()`

| Function                     | Replacement Value/Token                |
| ---------------------------- | -------------------------------------- |
| `easing()`<br>`easing(base)` | `var(--p-ease)`                        |
| `easing(in)`                 | `var(--p-ease-in)`                     |
| `easing(out)`                | `var(--p-ease-out)`                    |
| `easing(excite)`             | `var(--p-ease-excite)`                 |
| `easing(overshoot)`          | `cubic-bezier(0.07, 0.28, 0.32, 1.22)` |
| `easing(anticipate)`         | `cubic-bezier(0.38, -0.4, 0.88, 0.65)` |

#### `duration()`

| Function                         | Replacement Value/Token |
| -------------------------------- | ----------------------- |
| `duration(none)`                 | 0                       |
| `duration(fast)`                 | `var(--p-duration-100)` |
| `duration()`<br>`duration(base)` | `var(--p-duration-200)` |
| `duration(slow)`                 | `var(--p-duration-300)` |
| `duration(slower)`               | `var(--p-duration-400)` |
| `duration(slowest)`              | `var(--p-duration-500)` |

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
