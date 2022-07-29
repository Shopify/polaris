# Migrating from v9 to v10

Polaris v10.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v10.0.0)) features removal of the dark color scheme along with the `CustomProperties` component.

## Table of Contents

- [Consolidated color schemes](#consolidated-color-schemes)
- [Components](#components)
  - [Removed support for `colorScheme`](#removed-support-for-colorscheme)
  - [Using dark color tokens](#using-dark-color-tokens)
  - [Removing `CustomProperties`](#removing-customproperties)

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
