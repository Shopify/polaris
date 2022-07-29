# Migrating from v8 to v9

Polaris v9.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v9.0.0)) features removal of the public scss api and removal of scss functions and mixins.

## Table of Contents

- [Components](#components)
  - [From `ThemeProvider` to `CustomProperties`](#from-themeprovider-to-customproperties)
  - [`AppProvider` changes](#appprovider-changes)
  - [Removed all theme types, constants, and utilities](#removed-all-theme-types-constants-and-utilities)
  - [`SkeletonPage`](#skeletonpage)
- [CSS custom properties](#css-custom-properties)
- [Sass functions and mixins](#sass-functions-and-mixins)
  - [Replacing function and mixin instances with value equivalents](#replacing-function-and-mixin-instances-with-value-equivalents)
    - [`available-names()`](#available-names)
    - [`border()`](#border)
    - [`border-radius()`](#border-radius)
    - [`border-width()`](#border-width)
    - [`color()`](#color)
    - [`color-icon()`](#color-icon)
    - [`color-multiply()`](#color-multiply)
    - [`duration()`](#duration)
    - [`em()`](#em)
    - [`easing()`](#easing)
    - [`filter()`](#filter)
    - [`font-family()`](#font-family)
    - [`hidden-when-printing()`](#hidden-when-printing)
    - [`high-contrast-border()`](#high-contrast-border)
    - [`high-contrast-outline()`](#high-contrast-outline)
    - [`icon-size()`](#icon-size)
    - [`map-extend()`](#map-extend)
    - [`ms-high-contrast-color()`](#ms-high-contrast-color)
    - [`print-hidden()`](#print-hidden)
    - [`px()`](#px)
    - [`rem()`](#rem)
    - [`shadow()`](#shadow)
    - [`skeleton-page-header-layout()`](#skeleton-page-header-layout)
    - [`skeleton-page-secondary-actions-layout()`](#skeleton-page-secondary-actions-layout)
    - [`skeleton-shimmer()`](#skeleton-shimmer)
    - [`spacing()`](#spacing)
    - [`state()`](#state)
    - [`unstyled-link()`](#unstyled-link)
    - [`unstyled-list()`](#unstyled-list)
    - [`when-not-printing()`](#when-not-printing)
    - [`when-printing()`](#when-printing)
    - [`z-index()`](#z-index)
  - [Adding the functions and mixins to your repo](#adding-the-functions-and-mixins-to-your-repo)
- [Sass global variables](#sass-global-variables)
- [`@shopify/polaris-tokens`](#shopifypolaris-tokens)

## Components

### From `ThemeProvider` to `CustomProperties`

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

### `AppProvider` changes

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

### Replacing custom properties from `theme` overrides

If passing a custom overrides object to the `AppProvider` or `ThemeProvider`'s `theme` prop, you will need to generate and add the CSS custom properties. Use the [legacy custom properties migration](https://stackblitz.com/edit/legacy-v8-custom-props?file=README.md) script to generate custom property overrides based on your defined `theme` object:

1. Update `theme.js` with your custom theme in the [legacy custom properties migration](https://stackblitz.com/edit/legacy-v8-custom-props?file=README.md) project.
1. Run `npm run build` in the StackBlitz terminal.
1. Copy the resulting `CustomPropertyOverrides.scss` file or style content to your application.
1. Apply the styles to a wrapping `CustomProperties` component within the app or theme provider:

```diff
- import {AppProvider} from '@shopify/polaris';
+ import {AppProvider, CustomProperties} from '@shopify/polaris';

// Generate this file using the migration script.
import styles from './CustomPropertyOverrides.scss';

const App = (props) => (
-  <AppProvider theme={{ colors: { surface: 'rgb(0,0,0)' }}>
-    {props.children}
-  </AppProvider>
+  <AppProvider>
+    <CustomProperties className={styles.CustomPropertyOverrides}>
+      {props.children}
+    </CustomProperties>
+  </AppProvider>
)
```

### Removed all theme types, constants, and utilities

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

### `Page`

The prop `thumbnail` has been removed and is no longer supported.

### `SkeletonPage`

The prop `secondaryActions` has been removed and is no longer supported.

## CSS custom properties

The following CSS custom properties have either been renamed or removed. You will need to replace any instances of them with their new name or value equivalents.

| Deprecated CSS Custom Property            | Replacement Value                  |
| ----------------------------------------- | ---------------------------------- |
| `--p-badge-font-weight`                   | `--p-font-weight-regular`          |
| `--p-badge-mix-blend-mode`                | `luminosity`                       |
| `--p-border-radius-base`                  | `--p-border-radius-1`              |
| `--p-border-radius-full`                  | `--p-border-radius-half`           |
| `--p-border-radius-slim`                  | `--p-border-radius-05`             |
| `--p-border-radius-wide`                  | `--p-border-radius-2`              |
| `--p-button-drop-shadow`                  | `--p-shadow-button`                |
| `--p-button-font-weight`                  | `--p-font-weight-medium`           |
| `--p-button-inner-shadow`                 | `--p-shadows-inset-button`         |
| `--p-button-pressed-inner-shadow`         | `--p-shadows-inset-button-pressed` |
| `--p-card-shadow`                         | `--p-shadow-card`                  |
| `--p-duration-1-0-0`                      | `--p-duration-100`                 |
| `--p-duration-1-5-0`                      | `--p-duration-150`                 |
| `--p-frame-offset`                        | `0px`                              |
| `--p-icon-size`                           | `--p-icon-size-small`              |
| `--p-modal-shadow`                        | `--p-shadow-modal`                 |
| `--p-non-null-content`                    | `''`                               |
| `--p-popover-shadow`                      | `--p-shadow-popover`               |
| `--p-override-none`                       | `none`                             |
| `--p-override-one`                        | `1`                                |
| `--p-override-transparent`                | `transparent`                      |
| `--p-override-visible`                    | `visible`                          |
| `--p-override-zero`                       | `0`                                |
| `--p-range-slider-thumb-scale`            | `1.5`                              |
| `--p-text-field-focus-ring-border-radius` | `7px`                              |
| `--p-top-bar-shadow`                      | `--p-shadow-top-bar`               |
| `--p-shadow-from-ambient-light`           | `rgba(23, 24, 24, 0.05)`           |
| `--p-shadow-from-dim-light`               | `rgba(0, 0, 0, 0.2)`               |
| `--p-shadow-from-direct-light`            | `rgba(0, 0, 0, 0.15)`              |

## Sass functions and mixins

The following Sass functions and mixins have been removed. You will need to either add the function or mixin to your repo or replace any instances of them with a CSS custom property or value equivalent.

The [legacy public API file](./legacy-polaris-v8-public-api.scss) is designed to support Node Sass. If you are using [Dart Sass](https://sass-lang.com/dart-sass) in your project, you can convert the legacy public API file to a Dart-friendly version using the [sass-migrator](https://www.npmjs.com/package/sass-migrator) utility.

```sh
 npx sass-migrator division path/to/legacy-polaris-v8-public-api.scss
```

Once converted, use the resulting Dart-friendly file in your local project to replace usages of the legacy API.

### Replacing function and mixin instances with value equivalents

#### `available-names()`

Use `console.log()` to get the function output and hard code the value you need.

Otherwise, you can copy the function definition and use it locally.

| Deprecated Function | Source                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `available-names()` | [definition](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss#L354-L386) |

#### `border()`

| Deprecated Function          | Replacement Value        |
| ---------------------------- | ------------------------ |
| `border()`<br>`border(base)` | `--p-border-base`        |
| `border(dark)`               | `--p-border-dark`        |
| `border(transparent)`        | `--p-border-transparent` |
| `border(divider)`            | `--p-border-divider`     |

#### `border-radius()`

| Deprecated Function                        | Replacement Value         |
| ------------------------------------------ | ------------------------- |
| `border-radius()`<br>`border-radius(base)` | `--p-border-radius-base`  |
| `border-radius(large)`                     | `--p-border-radius-large` |

#### `border-width()`

| Deprecated Function                      | Replacement Value    |
| ---------------------------------------- | -------------------- |
| `border-width()`<br>`border-width(base)` | `--p-border-width-1` |
| `border-width(thick)`                    | `--p-border-width-2` |
| `border-width(thicker)`                  | `--p-border-width-3` |

#### `color()`

Reference our [new color token file](https://github.com/Shopify/polaris/blob/20dba92b5b226347d4e5220246a7165319a07836/src/tokens/token-groups/color.light.json) and search for a token with an applicable semantic name. These tokens get mapped to css custom properties, if you use them make sure to prefix them with `--p-`. If you can't find a suitable token replacement hard code the color value you need.

#### `color-icon()`

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include color-icon(<value>, <hue>)`

</td>
<td>

```scss
svg {
  fill: color(<value>, <hue>);
}

img {
  filter: filter(<value>, <hue>);
}
```

</td>
</tr>
</table>

See the [`color()`](#color) and [`filter()`](#filter) sections for replacing those functions.

#### `color-multiply()`

Use your browser developer tools to inspect the output color value of the function and hard code the color value you need.

Otherwise, you can copy the function definition and use it locally.

| Deprecated Function | Source                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color-multiply()`  | [definition](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss#L479-L500) |

#### `duration()`

| Deprecated Function              | Replacement Value  |
| -------------------------------- | ------------------ |
| `duration(none)`                 | 0                  |
| `duration(fast)`                 | `--p-duration-100` |
| `duration()`<br>`duration(base)` | `--p-duration-200` |
| `duration(slow)`                 | `--p-duration-300` |
| `duration(slower)`               | `--p-duration-400` |
| `duration(slowest)`              | `--p-duration-500` |

#### `em()`

This function has been deprecated, but the definition can be copied and used locally.

| Deprecated Function | Source                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `em()`              | [definition](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss#L333-L352) |

#### `easing()`

| Deprecated Function          | Replacement Value                      |
| ---------------------------- | -------------------------------------- |
| `easing()`<br>`easing(base)` | `--p-ease`                             |
| `easing(in)`                 | `--p-ease-in`                          |
| `easing(out)`                | `--p-ease-out`                         |
| `easing(excite)`             | `--p-ease-excite`                      |
| `easing(overshoot)`          | `cubic-bezier(0.07, 0.28, 0.32, 1.22)` |
| `easing(anticipate)`         | `cubic-bezier(0.38, -0.4, 0.88, 0.65)` |

#### `filter()`

We replaced a few of the following filter function instances with our [new color tokens](https://github.com/Shopify/polaris/blob/20dba92b5b226347d4e5220246a7165319a07836/src/tokens/token-groups/color.light.json) instead of their exact replacement values. However, this can break intended behavior so be careful if you take this approach as well. If you decide to use the new color tokens make sure to prefix them with `--p-` (they get mapped to css custom properties).

<details>
<summary>Table of Replacement Values</summary>

| Deprecated Function                              | Replacement Value                                                                                                        |
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

</details>

#### `font-family()`

| Deprecated Function                             | Replacement Value      |
| ----------------------------------------------- | ---------------------- |
| `font-family()`<br>`font-family($family: base)` | `--p-font-family-sans` |
| `font-family($family: 'monospace')`             | `--p-font-family-mono` |

#### `hidden-when-printing()`

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include hidden-when-printing`

</td>
<td>

```scss
@media print {
  display: none !important;
}
```

</td>
</tr>
</table>

#### `high-contrast-border()`

| Deprecated Mixin                                               | Replacement Value                                    |
| -------------------------------------------------------------- | ---------------------------------------------------- |
| `@include high-contrast-border`                                | `border: var(--p-border-width-1) solid transparent;` |
| `@include high-contrast-border($border-width: <border-width>)` | `border: <border-width> solid transparent;`          |

For `<border-width>` instances that are functions, see the [`border-width()`](#border-width) section for replacing it.

For `<border-width>` instances that are hard coded values, see if you can replace it with one of our [new border-width tokens](https://github.com/Shopify/polaris/blob/77e8669595a4964ff5ce399967661a7621ea2a4d/src/tokens/token-groups/shape.json), otherwise leave it hardcoded.

#### `high-contrast-outline()`

| Deprecated Mixin                                                | Replacement Value                                     |
| --------------------------------------------------------------- | ----------------------------------------------------- |
| `@include high-contrast-outline`                                | `outline: var(--p-border-width-1) solid transparent;` |
| `@include high-contrast-outline($border-width: <border-width>)` | `outline: <border-width> solid transparent;`          |

For `<border-width>` instances that are functions, see the [`border-width()`](#border-width) section for replacing it.

For `<border-width>` instances that are hard coded values, see if you can replace it with one of our [new border-width tokens](https://github.com/Shopify/polaris/blob/77e8669595a4964ff5ce399967661a7621ea2a4d/src/tokens/token-groups/shape.json), otherwise leave it hardcoded.

#### `icon-size()`

| Deprecated Function | Replacement Value      |
| ------------------- | ---------------------- |
| `icon-size()`       | `--p-icon-size-medium` |

#### `map-extend()`

This function has been deprecated, but the definition can be copied and used locally.

| Deprecated Function | Source                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `map-extend()`      | [definition](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss#L388-L409) |

#### `ms-high-contrast-color()`

| Deprecated Function                                  | Replacement Value |
| ---------------------------------------------------- | ----------------- |
| `ms-high-contrast-color('text')`                     | `windowText`      |
| `ms-high-contrast-color('disabled-text')`            | `grayText`        |
| `ms-high-contrast-color('selected-text')`            | `highlightText`   |
| `ms-high-contrast-color('selected-text-background')` | `highlight`       |
| `ms-high-contrast-color('button-text')`              | `buttonText`      |
| `ms-high-contrast-color('button-text-background')`   | `buttonFace`      |
| `ms-high-contrast-color('background')`               | `window`          |

#### `print-hidden()`

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include print-hidden`

</td>
<td>

```scss
@media print {
  display: none !important;
}
```

</td>
</tr>
</table>

#### `px()`

This function has been deprecated, but the definition can be copied and used locally.

| Deprecated Function | Source                                                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `px()`              | [definition](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss##L313-L331) |

#### `rem()`

This function has been deprecated, but the definition can be copied and used locally.

| Deprecated Function | Source                                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rem()`             | [definition](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss#L293-L311) |

#### `shadow()`

| Deprecated Function          | Replacement Value        |
| ---------------------------- | ------------------------ |
| `shadow(faint)`              | `--p-shadow-faint`       |
| `shadow()`<br>`shadow(base)` | `--p-shadow-base`        |
| `shadow(deep)`               | `--p-shadow-deep`        |
| `shadow(layer)`              | `--p-shadow-layer`       |
| `shadow(transparent)`        | `--p-shadow-transparent` |

#### `skeleton-page-header-layout()`

| Deprecated Mixin                       | Replacement Value                  |
| -------------------------------------- | ---------------------------------- |
| `@include skeleton-page-header-layout` | `padding-bottom: var(--p-space-2)` |

#### `skeleton-page-secondary-actions-layout()`

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include skeleton-page-secondary-actions-layout`

</td>
<td>

```scss
margin-top: var(--p-space-2);
display: flex;
flex-direction: row-reverse;
justify-content: flex-end;
align-items: center;
```

</td>
</tr>
</table>

#### `skeleton-shimmer()`

We completely removed motion from our skeleton components for a better user experience but if you want to keep the functionality of this mixin you can reference the table below for replacement values.

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include skeleton-shimmer`

</td>
<td>

```scss
animation: shimmer 800ms linear infinite alternate;
will-change: opacity;

@keyframes shimmer {
  0% {
    opacity: 0.45;
  }

  100% {
    opacity: 0.9;
  }
}

@media (prefers-reduced-motion) {
  animation: none;
}
```

</td>
</tr>
</table>

#### `spacing()`

| Deprecated Function            | Replacement Value |
| ------------------------------ | ----------------- |
| `spacing(none)`                | `--p-space-0`     |
| `spacing(extra-tight)`         | `--p-space-1`     |
| `spacing(tight)`               | `--p-space-2`     |
| `spacing(base-tight)`          | `--p-space-3`     |
| `spacing()`<br>`spacing(base)` | `--p-space-4`     |
| `spacing(loose)`               | `--p-space-5`     |
| `spacing(extra-loose)`         | `--p-space-8`     |

#### `state()`

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include state(hover)`

</td>
<td>

`background-image: linear-gradient(rgba(223, 227, 232, 0.3), rgba(223, 227, 232, 0.3))`

</td>
</tr>
<tr>
<td>

`@include state(focused)`

</td>
<td>

```scss
box-shadow: inset 2px 0 0 var(--p-focused);
background-image: linear-gradient(
  rgba(223, 227, 232, 0.3),
  rgba(223, 227, 232, 0.3)
);
```

</td>
</tr>
<tr>
<td>

`@include state(active)`

</td>
<td>

`background-image: linear-gradient(rgba(179, 188, 245, 0.1), rgba(179, 188, 245, 0.1))`

</td>
</tr>
<tr>
<td>

`@include state(selected)`

</td>
<td>

`background-image: linear-gradient(rgba(179, 188, 245, 0.15), rgba(179, 188, 245, 0.15))`

</td>
</tr>
<tr>
<td>

`@include state(subdued)`

</td>
<td>

`background-image: linear-gradient(rgba(249, 250, 251, 1), rgba(249, 250, 251, 1))`

</td>
</tr>
<tr>
<td>

`@include state(disabled)`

</td>
<td>

`background-image: linear-gradient(rgba(249, 250, 251, 1), rgba(249, 250, 251, 1))`

</td>
</tr>
<tr>
<td>

`@include state(hover-destructive)`

</td>
<td>

`background-image: linear-gradient(rgba(251, 234, 229, 0.4), rgba(251, 234, 229, 0.4))`

</td>
</tr>
<tr>
<td>

`@include state(focused-destructive)`

</td>
<td>

```scss
box-shadow: inset 2px 0 0 var(--p-focused);
background-image: linear-gradient(
  rgba(251, 234, 229, 0.4),
  rgba(251, 234, 229, 0.4)
);
```

</td>
</tr>
<tr>
<td>

`@include state(active-destructive)`

</td>
<td>

`background-image: linear-gradient(rgba(220, 56, 37, 0.03), rgba(220, 56, 37, 0.03))`

</td>
</tr>
</table>

For `@include state(<interaction-state>)` instances that have multiple `<interaction-state>` parameters, combine the replacement values (make sure to separate multiple `linear gradients()` by a comma).

If replacement is too complicated, you can copy the function definition and use it locally.

| Deprecated Mixin | Source                                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state()`        | [definition](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss#L2049-L2076) |

#### `unstyled-link()`

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include unstyled-link`

</td>
<td>

```scss
color: inherit;
text-decoration: none;

&:visited {
  color: inherit;
}
```

</td>
</tr>
</table>

#### `unstyled-list()`

<table>
<tr>
<th>Deprecated Mixin</th>
<th>Replacement Value</th>
</tr>
<tr>
<td>

`@include unstyled-list`

</td>
<td>

```scss
margin: 0;
padding: 0;
list-style: none;
```

</td>
</tr>
</table>

#### `when-not-printing()`

| Deprecated Mixin             | Replacement Value  |
| ---------------------------- | ------------------ |
| `@include when-not-printing` | `@media not print` |

#### `when-printing()`

| Deprecated Mixin         | Replacement Value |
| ------------------------ | ----------------- |
| `@include when-printing` | `@media print`    |

#### `z-index()`

| Deprecated Function        | Replacement Value |
| -------------------------- | ----------------- |
| `z-index(content)`         | `--p-z-1`         |
| `z-index(overlay)`         | `--p-z-2`         |
| `z-index(global-ribbon)`   | `--p-z-3`         |
| `z-index(top-bar)`         | `--p-z-4`         |
| `z-index(context-bar)`     | `--p-z-5`         |
| `z-index(loading-bar)`     | `--p-z-6`         |
| `z-index(nav-backdrop)`    | `--p-z-7`         |
| `z-index(nav)`             | `--p-z-8`         |
| `z-index(skip-to-content)` | `--p-z-9`         |
| `z-index(backdrop)`        | `--p-z-10`        |
| `z-index(modal)`           | `--p-z-11`        |
| `z-index(toast)`           | `--p-z-12`        |
| `z-index(devUi)`           | `521`             |

### Adding the functions and mixins to your repo

Any functions that were being consumed from `build/styles/_public-api.scss` have been removed. If you wish to continue using them you can add them directly to your repo. All of the removed functions and mixins can found in the following file:

[Legacy Polaris V8 public scss api](https://github.com/Shopify/polaris/blob/b443d114d447df15d9e72914c8ca5058439a175e/documentation/guides/legacy-polaris-v8-public-api.scss)

## Sass global variables

The following Sass global variables have been removed because the functions using them have been removed. If you wish to continue using them you can add them directly to your repo.

| Deprecated Variable                          | Value                                                                                                                                                           |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$color-palette-data`<br/>`$polaris-colors`  | [definition](https://github.com/Shopify/polaris/blob/5267a30b845a0c07bec4036d723fb11c2cb24100/documentation/guides/legacy-polaris-v8-public-api.scss#L5-L88)    |
| `$duration-data`<br/>`$polaris-duration-map` | [definition](https://github.com/Shopify/polaris/blob/5267a30b845a0c07bec4036d723fb11c2cb24100/documentation/guides/legacy-polaris-v8-public-api.scss#L243-L262) |
| `$easing-data`                               | [definition](https://github.com/Shopify/polaris/blob/5267a30b845a0c07bec4036d723fb11c2cb24100/documentation/guides/legacy-polaris-v8-public-api.scss#L678-L685) |

## `@shopify/polaris-tokens`

`@shopify/polaris-tokens` is no longer a dependency. The library will continue to be available via NPM, however we highly encourage removing any usage in your application.
