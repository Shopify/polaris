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

#### `border()`

| Function                     | Replacement Value/Token  |
| ---------------------------- | ------------------------ |
| `border()`<br>`border(base)` | `--p-border-base`        |
| `border(dark)`               | `--p-border-dark`        |
| `border(transparent)`        | `--p-border-transparent` |
| `border(divider)`            | `--p-border-divider`     |

#### `border-radius()`

| Function                                   | Replacement Value/Token   |
| ------------------------------------------ | ------------------------- |
| `border-radius()`<br>`border-radius(base)` | `--p-border-radius-base`  |
| `border-radius(large)`                     | `--p-border-radius-large` |

#### `border-width()`

| Function                                 | Replacement Value/Token |
| ---------------------------------------- | ----------------------- |
| `border-width()`<br>`border-width(base)` | `--p-border-width-1`    |
| `border-width(thick)`                    | `--p-border-width-2`    |
| `border-width(thicker)`                  | `--p-border-width-3`    |

#### `duration()`

| Function                         | Replacement Value/Token |
| -------------------------------- | ----------------------- |
| `duration(none)`                 | 0                       |
| `duration(fast)`                 | `--p-duration-100`      |
| `duration()`<br>`duration(base)` | `--p-duration-200`      |
| `duration(slow)`                 | `--p-duration-300`      |
| `duration(slower)`               | `--p-duration-400`      |
| `duration(slowest)`              | `--p-duration-500`      |

#### `easing()`

| Function                     | Replacement Value/Token                |
| ---------------------------- | -------------------------------------- |
| `easing()`<br>`easing(base)` | `--p-ease`                             |
| `easing(in)`                 | `--p-ease-in`                          |
| `easing(out)`                | `--p-ease-out`                         |
| `easing(excite)`             | `--p-ease-excite`                      |
| `easing(overshoot)`          | `cubic-bezier(0.07, 0.28, 0.32, 1.22)` |
| `easing(anticipate)`         | `cubic-bezier(0.38, -0.4, 0.88, 0.65)` |

#### `filter()`

We replaced a few of the following filter function instances with color tokens instead of their exact replacement values. However, this can break intended behavior so be careful if you take this approach as well.

| Function                                         | Replacement Value/Token                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `filter('purple', 'text')`                       | `brightness(0) saturate(100%) invert(29%) sepia(3%) saturate(2843%) hue-rotate(223deg) brightness(92%) contrast(86%)`    |
| `filter('purple', 'darker')`                     | `brightness(0) saturate(100%) invert(8%) sepia(38%) saturate(6605%) hue-rotate(265deg) brightness(99%) contrast(124%)`   |
| `filter('purple', 'dark')`                       | `brightness(0) saturate(100%) invert(12%) sepia(46%) saturate(4964%) hue-rotate(258deg) brightness(101%) contrast(93%)`  |
| `filter('purple')`<br>`filter('purple', 'base')` | `brightness(0) saturate(100%) invert(49%) sepia(77%) saturate(1864%) hue-rotate(229deg) brightness(91%) contrast(91%)`   |
| `filter('purple', 'light')`                      | `brightness(0) saturate(100%) invert(82%) sepia(13%) saturate(1535%) hue-rotate(203deg) brightness(103%) contrast(104%)` |
| `filter('purple', 'lighter')`                    | `brightness(0) saturate(100%) invert(84%) sepia(15%) saturate(135%) hue-rotate(219deg) brightness(110%) contrast(98%)`   |
| `filter('indigo', 'text')`                       | `brightness(0) saturate(100%) invert(24%) sepia(11%) saturate(1035%) hue-rotate(195deg) brightness(97%) contrast(94%)`   |
| `filter('indigo', 'darker')`                     | `brightness(0) saturate(100%) invert(5%) sepia(81%) saturate(5060%) hue-rotate(229deg) brightness(72%) contrast(111%)`   |
| `filter('indigo', 'dark')`                       | `brightness(0) saturate(100%) invert(17%) sepia(28%) saturate(4409%) hue-rotate(218deg) brightness(87%) contrast(98%)`   |
| `filter('indigo')`<br>`filter('indigo', 'base')` | `brightness(0) saturate(100%) invert(45%) sepia(17%) saturate(1966%) hue-rotate(194deg) brightness(88%) contrast(84%)`   |
| `filter('indigo', 'light')`                      | `brightness(0) saturate(100%) invert(82%) sepia(37%) saturate(4261%) hue-rotate(194deg) brightness(111%) contrast(92%)`  |
| `filter('indigo', 'lighter')`                    | `brightness(0) saturate(100%) invert(100%) sepia(25%) saturate(1090%) hue-rotate(179deg) brightness(100%) contrast(96%)` |
| `filter('blue', 'text')`                         | `brightness(0) saturate(100%) invert(27%) sepia(13%) saturate(709%) hue-rotate(158deg) brightness(96%) contrast(89%)`    |
| `filter('blue', 'darker')`                       | `brightness(0) saturate(100%) invert(5%) sepia(33%) saturate(5606%) hue-rotate(195deg) brightness(97%) contrast(102%)`   |
| `filter('blue', 'dark')`                         | `brightness(0) saturate(100%) invert(22%) sepia(70%) saturate(1308%) hue-rotate(182deg) brightness(94%) contrast(101%)`  |
| `filter('blue')`<br>`filter('blue', 'base')`     | `brightness(0) saturate(100%) invert(19%) sepia(98%) saturate(2885%) hue-rotate(190deg) brightness(99%) contrast(101%)`  |
| `filter('blue', 'light')`                        | `brightness(0) saturate(100%) invert(80%) sepia(7%) saturate(1832%) hue-rotate(178deg) brightness(108%) contrast(96%)`   |
| `filter('blue', 'lighter')`                      | `brightness(0) saturate(100%) invert(100%) sepia(94%) saturate(686%) hue-rotate(175deg) brightness(103%) contrast(96%)`  |
| `filter('teal', 'text')`                         | `brightness(0) saturate(100%) invert(31%) sepia(11%) saturate(665%) hue-rotate(128deg) brightness(94%) contrast(93%)`    |
| `filter('teal', 'darker')`                       | `brightness(0) saturate(100%) invert(15%) sepia(23%) saturate(2237%) hue-rotate(141deg) brightness(96%) contrast(104%)`  |
| `filter('teal', 'dark')`                         | `brightness(0) saturate(100%) invert(28%) sepia(83%) saturate(3919%) hue-rotate(168deg) brightness(93%) contrast(101%)`  |
| `filter('teal')`<br>`filter('teal', 'base')`     | `brightness(0) saturate(100%) invert(72%) sepia(8%) saturate(2838%) hue-rotate(130deg) brightness(92%) contrast(87%)`    |
| `filter('teal', 'light')`                        | `brightness(0) saturate(100%) invert(95%) sepia(12%) saturate(683%) hue-rotate(122deg) brightness(97%) contrast(91%)`    |
| `filter('teal', 'lighter')`                      | `brightness(0) saturate(100%) invert(87%) sepia(5%) saturate(1124%) hue-rotate(173deg) brightness(114%) contrast(92%)`   |
| `filter('green', 'text')`                        | `brightness(0) saturate(100%) invert(30%) sepia(8%) saturate(1010%) hue-rotate(63deg) brightness(91%) contrast(91%)`     |
| `filter('green', 'darker')`                      | `brightness(0) saturate(100%) invert(15%) sepia(32%) saturate(727%) hue-rotate(118deg) brightness(93%) contrast(91%)`    |
| `filter('green', 'dark')`                        | `brightness(0) saturate(100%) invert(18%) sepia(75%) saturate(6649%) hue-rotate(155deg) brightness(97%) contrast(87%)`   |
| `filter('green')`<br>`filter('green', 'base')`   | `brightness(0) saturate(100%) invert(56%) sepia(10%) saturate(2637%) hue-rotate(64deg) brightness(106%) contrast(91%)`   |
| `filter('green', 'light')`                       | `brightness(0) saturate(100%) invert(93%) sepia(15%) saturate(599%) hue-rotate(52deg) brightness(93%) contrast(93%)`     |
| `filter('green', 'lighter')`                     | `brightness(0) saturate(100%) invert(92%) sepia(51%) saturate(187%) hue-rotate(46deg) brightness(108%) contrast(89%)`    |
| `filter('yellow', 'text')`                       | `brightness(0) saturate(100%) invert(28%) sepia(42%) saturate(413%) hue-rotate(11deg) brightness(97%) contrast(91%)`     |
| `filter('yellow', 'darker')`                     | `brightness(0) saturate(100%) invert(19%) sepia(75%) saturate(981%) hue-rotate(17deg) brightness(103%) contrast(103%)`   |
| `filter('yellow', 'dark')`                       | `brightness(0) saturate(100%) invert(37%) sepia(51%) saturate(709%) hue-rotate(0deg) brightness(93%) contrast(89%)`      |
| `filter('yellow')`<br>`filter('yellow', 'base')` | `brightness(0) saturate(100%) invert(65%) sepia(91%) saturate(530%) hue-rotate(5deg) brightness(100%) contrast(100%)`    |
| `filter('yellow', 'light')`                      | `brightness(0) saturate(100%) invert(77%) sepia(72%) saturate(246%) hue-rotate(355deg) brightness(103%) contrast(107%)`  |
| `filter('yellow', 'lighter')`                    | `brightness(0) saturate(100%) invert(88%) sepia(27%) saturate(234%) hue-rotate(357deg) brightness(103%) contrast(98%)`   |
| `filter('orange', 'text')`                       | `brightness(0) saturate(100%) invert(23%) sepia(18%) saturate(1092%) hue-rotate(348deg) brightness(99%) contrast(84%)`   |
| `filter('orange', 'darker')`                     | `brightness(0) saturate(100%) invert(9%) sepia(83%) saturate(1926%) hue-rotate(356deg) brightness(98%) contrast(99%)`    |
| `filter('orange', 'dark')`                       | `brightness(0) saturate(100%) invert(29%) sepia(94%) saturate(1431%) hue-rotate(5deg) brightness(96%) contrast(82%)`     |
| `filter('orange')`<br>`filter('orange', 'base')` | `brightness(0) saturate(100%) invert(54%) sepia(86%) saturate(416%) hue-rotate(340deg) brightness(105%) contrast(91%)`   |
| `filter('orange', 'light')`                      | `brightness(0) saturate(100%) invert(77%) sepia(39%) saturate(483%) hue-rotate(335deg) brightness(101%) contrast(103%)`  |
| `filter('orange', 'lighter')`                    | `brightness(0) saturate(100%) invert(93%) sepia(11%) saturate(918%) hue-rotate(312deg) brightness(107%) contrast(98%)`   |
| `filter('red', 'text')`                          | `brightness(0) saturate(100%) invert(22%) sepia(9%) saturate(2068%) hue-rotate(325deg) brightness(92%) contrast(83%)`    |
| `filter('red', 'darker')`                        | `brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(5699%) hue-rotate(353deg) brightness(75%) contrast(101%)` |
| `filter('red', 'dark')`                          | `brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(5699%) hue-rotate(353deg) brightness(75%) contrast(101%)` |
| `filter('red')`<br>`filter('red', 'base')`       | `brightness(0) saturate(100%) invert(28%) sepia(67%) saturate(3622%) hue-rotate(353deg) brightness(89%) contrast(95%)`   |
| `filter('red', 'light')`                         | `brightness(0) saturate(100%) invert(80%) sepia(9%) saturate(2561%) hue-rotate(313deg) brightness(101%) contrast(99%)`   |
| `filter('red', 'lighter')`                       | `brightness(0) saturate(100%) invert(89%) sepia(21%) saturate(137%) hue-rotate(324deg) brightness(102%) contrast(97%)`   |
| `filter('ink')`<br>`filter('ink', 'base')`       | `brightness(0) saturate(100%) invert(10%) sepia(10%) saturate(2259%) hue-rotate(171deg) brightness(99%) contrast(84%)`   |
| `filter('ink', 'light')`                         | `brightness(0) saturate(100%) invert(32%) sepia(9%) saturate(1069%) hue-rotate(173deg) brightness(83%) contrast(84%)`    |
| `filter('ink', 'lighter')`                       | `brightness(0) saturate(100%) invert(45%) sepia(8%) saturate(825%) hue-rotate(166deg) brightness(95%) contrast(90%)`     |
| `filter('ink', 'lightest')`                      | `brightness(0) saturate(100%) invert(68%) sepia(18%) saturate(246%) hue-rotate(169deg) brightness(88%) contrast(90%)`    |
| `filter('sky', 'dark')`                          | `brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(502%) hue-rotate(167deg) brightness(96%) contrast(91%)`     |
| `filter('sky')`<br>`filter('sky', 'base')`       | `brightness(0) saturate(100%) invert(100%) sepia(95%) saturate(336%) hue-rotate(175deg) brightness(97%) contrast(87%)`   |
| `filter('sky', 'light')`                         | `brightness(0) saturate(100%) invert(99%) sepia(12%) saturate(467%) hue-rotate(174deg) brightness(99%) contrast(96%)`    |
| `filter('sky', 'lighter')`                       | `brightness(0) saturate(100%) invert(99%) sepia(1%) saturate(159%) hue-rotate(170deg) brightness(99%) contrast(99%)`     |
| `filter('black')`<br>`filter('black', 'base')`   | `brightness(0) saturate(100%)`                                                                                           |
| `filter('white')`<br>`filter('white', 'base')`   | `brightness(0) saturate(100%) invert(100%)`                                                                              |
| `filter('icon')`<br>`filter('icon', 'base')`     | `brightness(0) saturate(100%) invert(36%) sepia(13%) saturate(137%) hue-rotate(169deg) brightness(95%) contrast(87%)`    |
| `filter('action')`<br>`filter('action', 'base')` | `brightness(0) saturate(100%) invert(20%) sepia(59%) saturate(5557%) hue-rotate(162deg) brightness(95%) contrast(101%)`  |

#### `font-family()`

| Function                                        | Replacement Value/Token |
| ----------------------------------------------- | ----------------------- |
| `font-family()`<br>`font-family($family: base)` | `--p-font-family-sans`  |
| `font-family($family: 'monospace')`             | `--p-font-family-mono`  |

#### `high-contrast-border()`

| Mixin                                                          | Replacement Value/Token                              |
| -------------------------------------------------------------- | ---------------------------------------------------- |
| `@include high-contrast-border`                                | `border: var(--p-border-width-1) solid transparent;` |
| `@include high-contrast-border($border-width: <border-width>)` | `border: <border-width> solid transparent;`          |

For `<border-width>` instances that are functions, see the [`border-width()`](#border-width) section for replacing it.

For `<border-width>` instances that are hard coded values, see if you can replace it with one of our [new border-width tokens](https://github.com/Shopify/polaris-react/blob/77e8669595a4964ff5ce399967661a7621ea2a4d/src/tokens/token-groups/shape.json), otherwise leave it hardcoded.

#### `high-contrast-outline()`

| Mixin                                                           | Replacement Value/Token                               |
| --------------------------------------------------------------- | ----------------------------------------------------- |
| `@include high-contrast-outline`                                | `outline: var(--p-border-width-1) solid transparent;` |
| `@include high-contrast-outline($border-width: <border-width>)` | `outline: <border-width> solid transparent;`          |

For `<border-width>` instances that are functions, see the [`border-width()`](#border-width) section for replacing it.

For `<border-width>` instances that are hard coded values, see if you can replace it with one of our [new border-width tokens](https://github.com/Shopify/polaris-react/blob/77e8669595a4964ff5ce399967661a7621ea2a4d/src/tokens/token-groups/shape.json), otherwise leave it hardcoded.

#### `ms-high-contrast-color()`

| Function                                             | Replacement Value/Token |
| ---------------------------------------------------- | ----------------------- |
| `ms-high-contrast-color('text')`                     | `windowText`            |
| `ms-high-contrast-color('disabled-text')`            | `grayText`              |
| `ms-high-contrast-color('selected-text')`            | `highlightText`         |
| `ms-high-contrast-color('selected-text-background')` | `highlight`             |
| `ms-high-contrast-color('button-text')`              | `buttonText`            |
| `ms-high-contrast-color('button-text-background')`   | `buttonFace`            |
| `ms-high-contrast-color('background')`               | `window`                |

#### `rem()`

This function has been deprecated, but the definition can be copied and used locally.

| Function | Source                                                                                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rem()`  | [definition](https://github.com/Shopify/polaris-react/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss#L293) |

#### `shadow()`

| Function                     | Replacement Value/Token  |
| ---------------------------- | ------------------------ |
| `shadow(faint)`              | `--p-shadow-faint`       |
| `shadow()`<br>`shadow(base)` | `--p-shadow-base`        |
| `shadow(deep)`               | `--p-shadow-deep`        |
| `shadow(layer)`              | `--p-shadow-layer`       |
| `shadow(transparent)`        | `--p-shadow-transparent` |

#### `spacing()`

| Function                       | Replacement Value/Token |
| ------------------------------ | ----------------------- |
| `spacing(none)`                | `--p-space-0`           |
| `spacing(extra-tight)`         | `--p-space-1`           |
| `spacing(tight)`               | `--p-space-2`           |
| `spacing(base-tight)`          | `--p-space-3`           |
| `spacing()`<br>`spacing(base)` | `--p-space-4`           |
| `spacing(loose)`               | `--p-space-5`           |
| `spacing(extra-loose)`         | `--p-space-8`           |

#### `unstyled-link()`

Replace any instances of `@include unstyled-link` with the following code block.

```scss
color: inherit;
text-decoration: none;

&:visited {
  color: inherit;
}
```

#### `unstyled-list()`

Replace any instances of `@include unstyled-list` with the following code block.

```scss
margin: 0;
padding: 0;
list-style: none;
```

## Tokens

### Border Radius

| Token                                     | Replacement Value/Token  |
| ----------------------------------------- | ------------------------ |
| `--p-border-radius-slim`                  | `--p-border-radius-05`   |
| `--p-border-radius-base`                  | `--p-border-radius-1`    |
| `--p-border-radius-wide`                  | `--p-border-radius-2`    |
| `--p-border-radius-full`                  | `--p-border-radius-half` |
| `--p-text-field-focus-ring-border-radius` | `7px`                    |

### Duration

| Token                | Replacement Value/Token |
| -------------------- | ----------------------- |
| `--p-duration-1-0-0` | `--p-duration-100`      |
| `--p-duration-1-5-0` | `--p-duration-150`      |

### Shadow

| Token                             | Replacement Value/Token            |
| --------------------------------- | ---------------------------------- |
| `--p-card-shadow`                 | `--p-shadow-card`                  |
| `--p-popover-shadow`              | `--p-shadow-popover`               |
| `--p-modal-shadow`                | `--p-shadow-modal`                 |
| `--p-top-bar-shadow`              | `--p-shadow-top-bar`               |
| `--p-button-drop-shadow`          | `--p-shadow-button`                |
| `--p-button-inner-shadow`         | `--p-shadows-inset-button`         |
| `--p-button-pressed-inner-shadow` | `--p-shadows-inset-button-pressed` |
| `--p-shadow-from-ambient-light`   | `rgba(23, 24, 24, 0.05)`           |
| `--p-shadow-from-direct-light`    | `rgba(0, 0, 0, 0.15)`              |
| `--p-shadow-from-dim-light`       | `rgba(0, 0, 0, 0.2)`               |

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
