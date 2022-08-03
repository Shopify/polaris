# Migrating from v9 to v10

Polaris v10.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v10.0.0)) features removal of the dark color scheme along with the `CustomProperties` component.

## Table of Contents

- [Consolidated color schemes](#consolidated-color-schemes)
- [Components](#components)
  - [Removed support for `colorScheme`](#removed-support-for-colorscheme)
  - [Using dark color tokens](#using-dark-color-tokens)
  - [Removing `CustomProperties`](#removing-customproperties)
- [Updated typopgraphy tokens](#updated-typography-tokens)
  - [Font-size tokens](#font-size-tokens)
  - [Line-height tokens](#line-height-tokens)

## Consolidated color schemes

The dark color palette has been removed. Polaris is now only supporting one opinionated color palette for the admin.

Supporting light and dark palettes lead to unnecessary complexity in our token system and how handle color schemes in Polaris. Dark values have been added into the single consolidated palette to support current dark interface needs.

## Components

### Removed support for `colorScheme`

The following components no longer have support for the `colorScheme` prop:

- AppProvider
- PolarisTestProvider
- Popover
- Menu
- UserMenu

### Using dark color tokens

If you are currently using a dark color scheme in your UI, we recommend assessing the reasoning for using a dark. If a dark interface isn't providing intentional benefits, considering using the default light tokens.

You can use the following mapping to port CSS custom properties to the newly added dark values if a dark interface makes sense for your UI:

| Light CSS Custom Property      | Dark Replacement Value              |
| ------------------------------ | ----------------------------------- |
| `--p-surface`                  | `--p-surface-dark`                  |
| `--p-surface-neutral-subdued`  | `--p-surface-neutral-subdued-dark`  |
| `--p-surface-hovered`          | `--p-surface-hovered-dark`          |
| `--p-surface-pressed`          | `--p-surface-pressed-dark`          |
| `--p-surface-search-field`     | `--p-surface-search-field-dark`     |
| `--p-border`                   | `--p-border-on-dark`                |
| `--p-divider`                  | `--p-divider-dark`                  |
| `--p-border-divider`           | `--p-border-divider-on-dark`        |
| `--p-icon`                     | `--p-icon-on-dark`                  |
| `--p-text`                     | `--p-text-on-dark`                  |
| `--p-text-subdued`             | `--p-text-subdued-on-dark`          |
| `--p-interactive`              | `--p-interactive-on-dark`           |
| `--p-interactive-pressed`      | `--p-interactive-pressed-on-dark`   |
| `--p-action-secondary-hovered` | `--p-action-secondary-hovered-dark` |
| `--p-action-secondary-pressed` | `--p-action-secondary-pressed-dark` |

For example, the following style modifications would be the necessary in order to maintain a dark UI:

```diff
.Toast {
-  background: var(--p-surface);
-  color: var(--p-text);
+  background: var(--p-surface-dark);
+  color: var(--p-text-on-dark);
}
```

### Removing `CustomProperties`

The `CustomProperties` component has been deprecated as a result of simplifying to a single light color scheme. As a result, a number of internal components using `CustomProperties` have been updated to either use the dark token alternatives or removed support for a dark interface entirely.

It is preferred to either remove usage of a dark interface or adjust styles to use the dark version of the color tokens. However, if you need to replace the `CustomProperties` component in order style components that may be difficult to target, you can use the following method to map the light color tokens to the dark equivalents:

```diff
- import {CustomProperties} from '@shopify/polaris-react';

const App = (props) => (
-  <CustomProperties colorScheme="dark">
-    {props.children}
-  </CustomProperties>
+  <div style={{ '--p-surface': 'var(--p-surface-dark)' }}>
+    {props.children}
+  </div>
)
```

## Tokens

The dark color scheme palette has been removed. Dark color tokens are now consolidated into a single color palette.

The `@shopify/polaris-tokens` exported tokens object has replaced the `tokens.colorScheme` property with `tokens.colors`.

```diff
import {tokens} from '@shopify/polaris-tokens';

- const colors = tokens.colorSchemes.light
+ const colors = tokens.colors
```

Token groups are now exported individually, allowing for tree-shaking and smaller import size.

```diff
- import {tokens} from '@shopify/polaris-tokens';
- const {depth, spacing} = tokens;

+ import {depth, spacing} from '@shopify/polaris-tokens';
```

## Updated typography tokens

We have updated and streamlined token values, and updated token names to reflect a token naming convention that makes tokens easier to use and understand.

### Font-size tokens

We updated the size tokens to use increments of 100 for the variants. This allows us to set `--p-font-size-100` as the base and go lower (` --p-font-size-75` ) or higher (`--p-font-size-200`) as needed numerically.

| New token         | Old token        | px value  | rem value |
| ----------------- | ---------------- | --------- | --------- |
| --p-font-size-75  | --p-font-size-1  | 12        | 0.75      |
| -                 | --p-font-size-2  | 13        | 0.8125    |
| --p-font-size-100 | --p-font-size-3  | 14 (base) | 0.875     |
| -                 | --p-font-size-4  | 15        | 0.9375    |
| --p-font-size-200 | --p-font-size-5  | 16        | 1         |
| -                 | --p-font-size-6  | 17        | 1.0625    |
| --p-font-size-300 | --p-font-size-7  | 20        | 1.25      |
| -                 | --p-font-size-8  | 21        | 1.3125    |
| --p-font-size-400 | --p-font-size-9  | 24        | 1.50      |
| -                 | --p-font-size-10 | 26        | 1.625     |
| -                 | --p-font-size-11 | 27        | 1.6875    |
| --p-font-size-500 | --p-font-size-12 | 28        | 1.75      |
| --p-font-size-600 | -                | 32        | 2         |
| --p-font-size-700 | -                | 40        | 2.5       |

### Line-height tokens

| New token              | Value | Old token         | Value |
| ---------------------- | ----- | ----------------- | ----- |
| --p-font-line-height-1 | 16    | --p-line-height-1 | 16    |
| --p-font-line-height-2 | 20    | --p-line-height-2 | 20    |
| --p-font-line-height-3 | 24    | --p-line-height-3 | 24    |
| --p-font-line-height-4 | 28    | --p-line-height-4 | 28    |
| --p-font-line-height-5 | 32    | --p-line-height-5 | 32    |
| --p-font-line-height-6 | 40    | --p-line-height-6 | 36    |
| --p-font-line-height-7 | 48    | --p-line-height-7 | 44    |
