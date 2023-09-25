# Migrating from v11 to v12

Polaris v12.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v12.0.0)) prop replacement, removal of components, renamed components, and token changes.

## Table of Contents

- [Quick migration guide](#quick-migration-guide)
- [Tokens](#tokens)
  - [Border](#border)
  - [Color](#color)
  - [Font](#font)
  - [Shadow](#shadow)
  - [Space](#space)
  - [Recommended token migration workflow](#recommended-token-migration-workflow)

## Quick migration guide

**Layout.Section**

- One third:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="oneThird" --to="variant" --toValue="oneThird"`

- One half:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="oneHalf" --to="variant" --toValue="oneHalf"`

- Full width:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="fullWidth" --to="variant" --toValue="fullWidth"`

- Secondary, becomes oneThird:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="secondary" --to="variant" --toValue="oneThird"`

**TextField**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="TextField" --from="borderless" --to="variant" --toValue="borderless"`

**Box**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusEndStart" --to="borderEndStartRadius"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusEndEnd" --to="borderEndEndRadius"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusStartStart" --to="borderStartStartRadius"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusStartEnd" --to="borderStartEndRadius"`

**HorizontalStack**

`npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="HorizontalStack" --renameTo="InlineStack" --renamePropsFrom="HorizontalStackProps" --renamePropsTo="InlineStackProps"`

**VerticalStack**

`npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="VerticalStack" --renameTo="BlockStack" --renamePropsFrom="VerticalStackProps" --renamePropsTo="BlockStackProps"`

**HorizontalGrid**

`npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="HorizontalGrid" --renameTo="InlineGrid" --renamePropsFrom="HorizontalGridProps" --renamePropsTo="InlineGridProps"`

**Button**

- connectedDisclosure: [See the updated split example](https://polaris.shopify.com/components/actions/button)

// TODO - Boolean prop to tone, variant migration

**ButtonGroup**

- Spacing

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="ButtonGroup" --from="spacing" --to="gap"`

- Segmented

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="ButtonGroup" --from="segmented" --to="variant" --toValue="segmented"`

**Banner**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Banner" --from="status" --to="tone"`

**Icon**

- Backdrop is not a pattern in the new Polaris design language. If you must use a backdrop on your icon, use Box.

```tsx
<Box background={boxBackground} padding="1" width="28px" borderRadius="full">
  <Icon source={CirclePlusMinor} color={iconColor} />
</Box>
```

- Color

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Icon" --from="color" --to="tone"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Icon" --from="tone" --to="tone" --fromValue="warning" --toValue="caution"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Icon" --from="tone" --to="tone" --fromValue="highlight" --toValue="info"`

**Text**

- Color

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Text" --from="color" --to="tone"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Text" --from="tone" --to="tone" --fromValue="warning" --toValue="caution"`

**Modal**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="small" --to="size" --newValue="small"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="large" --to="size" --newValue="large"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="fullScreen" --to="size" --newValue="fullScreen"`

**List**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="List" --from="spacing" --to="gap"`

**DescriptionList**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="DescriptionList" --from="spacing" --to="gap"`

## Tokens

The following tokens have either been renamed or removed. You will need to replace any instances of them with their new name or value equivalents. Please review each token section for migrations that can be run to resolve these breaking changes.

### Border

#### Migration

To replace these deprecated `border` custom properties, you can run the [v12-styles-replace-custom-property-border](https://polaris.shopify.com/tools/polaris-migrator#v12-styles-replace-custom-property-border) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- border-radius: var(--p-border-radius-1);
+ border-radius: var(--p-border-radius-100);
```

```diff
- border-width: var(--p-border-width-1);
+ border-width: var(--p-border-width-025);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-border <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `border` custom properties across all file types:

```
(?:--p-border-radius-0-experimental|--p-border-radius-05|--p-border-radius-1|--p-border-radius-1_5-experimental|--p-border-radius-2|--p-border-radius-3|--p-border-radius-4|--p-border-radius-5|--p-border-radius-6|--p-border-width-1|--p-border-width-1-experimental|--p-border-width-2|--p-border-width-2-experimental|--p-border-width-3|--p-border-width-4|--p-border-width-5)(?![\w-])
```

```
<Tooltip[^>\w](?:[^>]|\n)*?borderRadius
```

```
<Box[^>\w](?:[^>]|\n)*?borderRadius
```

```
<Box[^>\w](?:[^>]|\n)*?borderRadiusEndStart
```

```
<Box[^>\w](?:[^>]|\n)*?borderRadiusEndEnd
```

```
<Box[^>\w](?:[^>]|\n)*?borderRadiusStartStart
```

```
<Box[^>\w](?:[^>]|\n)*?borderRadiusStartEnd
```

```
<ShadowBevel[^>\w](?:[^>]|\n)*?borderRadius
```

```
<Box[^>\w](?:[^>]|\n)*?borderWidth
```

```
<Box[^>\w](?:[^>]|\n)*?borderBlockStartWidth
```

```
<Box[^>\w](?:[^>]|\n)*?borderBlockEndWidth
```

```
<Box[^>\w](?:[^>]|\n)*?borderInlineStartWidth
```

```
<Box[^>\w](?:[^>]|\n)*?borderInlineEndWidth
```

```
<Box[^>\w](?:[^>]|\n)*?outlineWidth
```

```
<Divider[^>\w](?:[^>]|\n)*?borderWidth
```

#### Replacement maps

| Deprecated Token                     | Replacement Value       |
| ------------------------------------ | ----------------------- |
| `--p-border-radius-0-experimental`   | `--p-border-radius-0`   |
| `--p-border-radius-05`               | `--p-border-radius-050` |
| `--p-border-radius-1`                | `--p-border-radius-100` |
| `--p-border-radius-1_5-experimental` | `--p-border-radius-150` |
| `--p-border-radius-2`                | `--p-border-radius-200` |
| `--p-border-radius-3`                | `--p-border-radius-300` |
| `--p-border-radius-4`                | `--p-border-radius-400` |
| `--p-border-radius-5`                | `--p-border-radius-500` |
| `--p-border-radius-6`                | `--p-border-radius-750` |
| `--p-border-width-1`                 | `--p-border-width-025`  |
| `--p-border-width-1-experimental`    | `--p-border-width-0165` |
| `--p-border-width-2`                 | `--p-border-width-050`  |
| `--p-border-width-2-experimental`    | `--p-border-width-025`  |
| `--p-border-width-3`                 | `--p-border-width-050`  |
| `--p-border-width-4`                 | `--p-border-width-100`  |
| `--p-border-width-5`                 | `--p-border-width-100`  |

### Color

#### Migration

To replace these deprecated `color` custom properties, you can run the [v12-styles-replace-custom-property-color](https://polaris.shopify.com/tools/polaris-migrator#v12-styles-replace-custom-property-color) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- color: var(--p-color-bg);
+ color: var(--p-color-bg-surface);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-color <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `color` custom properties across all file types:

```
(?:--p-color-avatar-background-experimental|--p-color-avatar-color-experimental|--p-color-avatar-style-five-background-experimental|--p-color-avatar-style-five-color-experimental|--p-color-avatar-style-four-background-experimental|--p-color-avatar-style-four-color-experimental|--p-color-avatar-style-one-background-experimental|--p-color-avatar-style-one-color-experimental|--p-color-avatar-style-three-background-experimental|--p-color-avatar-style-three-color-experimental|--p-color-avatar-style-two-background-experimental|--p-color-avatar-style-two-color-experimental|--p-color-bg|--p-color-bg-active|--p-color-bg-app-selected|--p-color-bg-backdrop-experimental|--p-color-bg-caution|--p-color-bg-caution-strong|--p-color-bg-caution-subdued|--p-color-bg-caution-subdued-active|--p-color-bg-caution-subdued-hover|--p-color-bg-critical|--p-color-bg-critical-strong|--p-color-bg-critical-strong-active|--p-color-bg-critical-strong-hover|--p-color-bg-critical-subdued|--p-color-bg-critical-subdued-active|--p-color-bg-critical-subdued-hover|--p-color-bg-disabled|--p-color-bg-hover|--p-color-bg-info|--p-color-bg-info-strong|--p-color-bg-info-subdued|--p-color-bg-info-subdued-active|--p-color-bg-info-subdued-hover|--p-color-bg-input|--p-color-bg-input-active-experimental|--p-color-bg-input-hover-experimental|--p-color-bg-inset|--p-color-bg-inset-strong|--p-color-bg-inverse-active|--p-color-bg-inverse-hover|--p-color-bg-magic|--p-color-bg-magic-active|--p-color-bg-magic-hover|--p-color-bg-magic-strong|--p-color-bg-magic-subdued|--p-color-bg-magic-subdued-hover|--p-color-bg-primary|--p-color-bg-primary-active|--p-color-bg-primary-hover|--p-color-bg-primary-subdued|--p-color-bg-primary-subdued-active|--p-color-bg-primary-subdued-hover|--p-color-bg-primary-subdued-selected|--p-color-bg-secondary-experimental|--p-color-bg-strong|--p-color-bg-strong-active|--p-color-bg-strong-hover|--p-color-bg-subdued|--p-color-bg-subdued-active|--p-color-bg-subdued-hover|--p-color-bg-success|--p-color-bg-success-strong|--p-color-bg-success-strong-active-experimental|--p-color-bg-success-strong-hover-experimental|--p-color-bg-success-subdued|--p-color-bg-success-subdued-active|--p-color-bg-success-subdued-hover|--p-color-bg-transparent-active-experimental|--p-color-bg-transparent-disabled-experimental|--p-color-bg-transparent-experimental|--p-color-bg-transparent-hover-experimental|--p-color-bg-transparent-primary-disabled-experimental|--p-color-bg-transparent-subdued-experimental|--p-color-bg-warning|--p-color-bg-warning-strong-experimental|--p-color-bg-warning-subdued-experimental|--p-color-border-critical-strong-experimental|--p-color-border-input|--p-color-border-input-active-experimental|--p-color-border-input-hover|--p-color-border-interactive|--p-color-border-interactive-active|--p-color-border-interactive-focus|--p-color-border-interactive-hover|--p-color-border-magic-strong|--p-color-border-primary|--p-color-border-strong|--p-color-border-subdued|--p-color-icon-interactive|--p-color-icon-interactive-active|--p-color-icon-interactive-hover|--p-color-icon-primary|--p-color-icon-subdued|--p-color-text-critical-hover-experimental|--p-color-text-info-strong|--p-color-text-interactive|--p-color-text-interactive-active|--p-color-text-interactive-hover|--p-color-text-interactive-inverse|--p-color-text-inverse-subdued|--p-color-text-primary|--p-color-text-primary-hover|--p-color-text-subdued|--p-color-text-warning-experimental)(?![\w-])
```

```
<Box[^>\w](?:[^>]|\n)*?background
```

```
<Card[^>\w](?:[^>]|\n)*?background
```

```
<Box[^>\w](?:[^>]|\n)*?borderColor
```

```
<Box[^>\w](?:[^>]|\n)*?outlineColor
```

```
<Divider[^>\w](?:[^>]|\n)*?borderColor
```

```
<Banner[^>\w](?:[^>]|\n)*?textColor
```

```
<Box[^>\w](?:[^>]|\n)*?color
```

#### Replacement maps

| Deprecated Token                                         | Replacement Value                          |
| -------------------------------------------------------- | ------------------------------------------ |
| `--p-color-bg`                                           | `--p-color-bg-surface`                     |
| `--p-color-bg-hover`                                     | `--p-color-bg-surface-hover`               |
| `--p-color-bg-active`                                    | `--p-color-bg-surface-active`              |
| `--p-color-bg-disabled`                                  | `--p-color-bg-surface-disabled`            |
| `--p-color-bg-subdued`                                   | `--p-color-bg-surface-secondary`           |
| `--p-color-bg-subdued-hover`                             | `--p-color-bg-surface-secondary-hover`     |
| `--p-color-bg-subdued-active`                            | `--p-color-bg-surface-secondary-active`    |
| `--p-color-bg-secondary-experimental`                    | `--p-color-bg-surface-tertiary`            |
| `--p-color-bg-strong`                                    | `--p-color-bg-fill-tertiary`               |
| `--p-color-bg-strong-hover`                              | `--p-color-bg-fill-tertiary-hover`         |
| `--p-color-bg-strong-active`                             | `--p-color-bg-fill-tertiary-active`        |
| `--p-color-bg-input`                                     | `--p-color-input-bg-surface`               |
| `--p-color-bg-input-hover-experimental`                  | `--p-color-input-bg-surface-hover`         |
| `--p-color-bg-input-active-experimental`                 | `--p-color-input-bg-surface-active`        |
| `--p-color-bg-primary`                                   | `--p-color-bg-fill-brand`                  |
| `--p-color-bg-primary-hover`                             | `--p-color-bg-fill-brand-hover`            |
| `--p-color-bg-primary-active`                            | `--p-color-bg-fill-brand-active`           |
| `--p-color-bg-primary-subdued`                           | `--p-color-bg-surface-brand`               |
| `--p-color-bg-primary-subdued-hover`                     | `--p-color-bg-surface-brand-hover`         |
| `--p-color-bg-primary-subdued-active`                    | `--p-color-bg-surface-brand-active`        |
| `--p-color-bg-primary-subdued-selected`                  | `--p-color-bg-surface-brand-selected`      |
| `--p-color-bg-app-selected`                              | `--p-color-bg-surface-selected`            |
| `--p-color-bg-success-strong`                            | `--p-color-bg-fill-success`                |
| `--p-color-bg-success-strong-hover-experimental`         | `--p-color-bg-fill-success-hover`          |
| `--p-color-bg-success-strong-active-experimental`        | `--p-color-bg-fill-success-active`         |
| `--p-color-bg-success`                                   | `--p-color-bg-fill-success-secondary`      |
| `--p-color-bg-success-subdued`                           | `--p-color-bg-surface-success`             |
| `--p-color-bg-success-subdued-hover`                     | `--p-color-bg-surface-success-hover`       |
| `--p-color-bg-success-subdued-active`                    | `--p-color-bg-surface-success-active`      |
| `--p-color-bg-critical-strong`                           | `--p-color-bg-fill-critical`               |
| `--p-color-bg-critical-strong-hover`                     | `--p-color-bg-fill-critical-hover`         |
| `--p-color-bg-critical-strong-active`                    | `--p-color-bg-fill-critical-active`        |
| `--p-color-bg-critical`                                  | `--p-color-bg-fill-critical-secondary`     |
| `--p-color-bg-critical-subdued`                          | `--p-color-bg-surface-critical`            |
| `--p-color-bg-critical-subdued-hover`                    | `--p-color-bg-surface-critical-hover`      |
| `--p-color-bg-critical-subdued-active`                   | `--p-color-bg-surface-critical-active`     |
| `--p-color-bg-caution-strong`                            | `--p-color-bg-fill-caution`                |
| `--p-color-bg-caution`                                   | `--p-color-bg-fill-caution-secondary`      |
| `--p-color-bg-caution-subdued`                           | `--p-color-bg-surface-caution`             |
| `--p-color-bg-caution-subdued-hover`                     | `--p-color-bg-surface-caution-hover`       |
| `--p-color-bg-caution-subdued-active`                    | `--p-color-bg-surface-caution-active`      |
| `--p-color-bg-info-strong`                               | `--p-color-bg-fill-info`                   |
| `--p-color-bg-info`                                      | `--p-color-bg-fill-info-secondary`         |
| `--p-color-bg-info-subdued`                              | `--p-color-bg-surface-info`                |
| `--p-color-bg-info-subdued-hover`                        | `--p-color-bg-surface-info-hover`          |
| `--p-color-bg-info-subdued-active`                       | `--p-color-bg-surface-info-active`         |
| `--p-color-bg-warning-strong-experimental`               | `--p-color-bg-fill-warning`                |
| `--p-color-bg-warning`                                   | `--p-color-bg-fill-warning-secondary`      |
| `--p-color-bg-warning-subdued-experimental`              | `--p-color-bg-surface-warning`             |
| `--p-color-bg-magic-strong`                              | `--p-color-bg-fill-magic`                  |
| `--p-color-bg-magic`                                     | `--p-color-bg-fill-magic-secondary`        |
| `--p-color-bg-magic-hover`                               | `--p-color-bg-fill-magic-secondary-hover`  |
| `--p-color-bg-magic-active`                              | `--p-color-bg-fill-magic-secondary-active` |
| `--p-color-bg-magic-subdued`                             | `--p-color-bg-surface-magic`               |
| `--p-color-bg-magic-subdued-hover`                       | `--p-color-bg-surface-magic-hover`         |
| `--p-color-bg-inset`                                     | `--p-color-bg-fill-secondary`              |
| `--p-color-bg-inset-strong`                              | `--p-color-bg-fill-inverse`                |
| `--p-color-bg-inverse-hover`                             | `--p-color-bg-fill-inverse-hover`          |
| `--p-color-bg-inverse-active`                            | `--p-color-bg-fill-inverse-active`         |
| `--p-color-bg-transparent-experimental`                  | `--p-color-bg-surface-transparent`         |
| `--p-color-bg-transparent-hover-experimental`            | `--p-color-bg-fill-transparent-hover`      |
| `--p-color-bg-transparent-active-experimental`           | `--p-color-bg-fill-transparent-active`     |
| `--p-color-bg-transparent-disabled-experimental`         | `--p-color-bg-fill-disabled`               |
| `--p-color-bg-transparent-subdued-experimental`          | `--p-color-bg-fill-transparent-secondary`  |
| `--p-color-bg-transparent-primary-disabled-experimental` | `--p-color-bg-fill-brand-disabled`         |
| `--p-color-bg-backdrop-experimental`                     | `--p-color-backdrop-bg`                    |
| `--p-color-avatar-background-experimental`               | `--p-color-avatar-bg-fill`                 |
| `--p-color-avatar-style-one-background-experimental`     | `--p-color-avatar-one-bg-fill`             |
| `--p-color-avatar-style-two-background-experimental`     | `--p-color-avatar-two-bg-fill`             |
| `--p-color-avatar-style-three-background-experimental`   | `--p-color-avatar-three-bg-fill`           |
| `--p-color-avatar-style-four-background-experimental`    | `--p-color-avatar-four-bg-fill`            |
| `--p-color-avatar-style-five-background-experimental`    | `--p-color-avatar-five-bg-fill`            |
| `--p-color-text-subdued`                                 | `--p-color-text-secondary`                 |
| `--p-color-text-interactive`                             | `--p-color-text-emphasis`                  |
| `--p-color-text-interactive-hover`                       | `--p-color-text-emphasis-hover`            |
| `--p-color-text-interactive-active`                      | `--p-color-text-emphasis-active`           |
| `--p-color-text-primary`                                 | `--p-color-text-brand`                     |
| `--p-color-text-primary-hover`                           | `--p-color-text-brand-hover`               |
| `--p-color-text-critical-hover-experimental`             | `--p-color-text-critical-hover`            |
| `--p-color-text-info-strong`                             | `--p-color-text-info-on-bg-fill`           |
| ~`--p-color-text-warning-experimental`                   | `--p-color-text-warning`                   |
| `--p-color-text-inverse-subdued`                         | `--p-color-text-inverse-secondary`         |
| `--p-color-text-interactive-inverse`                     | `--p-color-text-link-inverse`              |
| `--p-color-avatar-color-experimental`                    | `--p-color-avatar-text-on-bg-fill`         |
| `--p-color-avatar-style-one-color-experimental`          | `--p-color-avatar-one-text-on-bg-fill`     |
| `--p-color-avatar-style-two-color-experimental`          | `--p-color-avatar-two-text-on-bg-fill`     |
| `--p-color-avatar-style-three-color-experimental`        | `--p-color-avatar-three-text-on-bg-fill`   |
| `--p-color-avatar-style-four-color-experimental`         | `--p-color-avatar-four-text-on-bg-fill`    |
| `--p-color-avatar-style-five-color-experimental`         | `--p-color-avatar-five-text-on-bg-fill`    |
| `--p-color-icon-subdued`                                 | `--p-color-icon-secondary`                 |
| `--p-color-icon-interactive`                             | `--p-color-icon-emphasis`                  |
| `--p-color-icon-interactive-hover`                       | `--p-color-icon-emphasis-hover`            |
| `--p-color-icon-interactive-active`                      | `--p-color-icon-emphasis-active`           |
| `--p-color-icon-primary`                                 | `--p-color-icon-brand`                     |
| `--p-color-border-subdued`                               | `--p-color-border-secondary`               |
| `--p-color-border-strong`                                | `--p-color-border-tertiary`                |
| `--p-color-border-input`                                 | `--p-color-input-border`                   |
| `--p-color-border-input-hover`                           | `--p-color-input-border-hover`             |
| `--p-color-border-input-active-experimental`             | `--p-color-input-border-active`            |
| `--p-color-border-interactive`                           | `--p-color-border-emphasis`                |
| `--p-color-border-interactive-hover`                     | `--p-color-border-emphasis-hover`          |
| `--p-color-border-interactive-active`                    | `--p-color-border-emphasis-active`         |
| `--p-color-border-interactive-focus`                     | `--p-color-border-focus`                   |
| `--p-color-border-primary`                               | `--p-color-border-brand`                   |
| `--p-color-border-critical-strong-experimental`          | `--p-color-border-critical-secondary`      |
| `--p-color-border-magic-strong`                          | `--p-color-border-magic-secondary`         |

### Font

#### Migration

To replace these deprecated `font` custom properties, you can run the [v12-styles-replace-custom-property-font](https://polaris.shopify.com/tools/polaris-migrator#v12-styles-replace-custom-property-font) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- font-size: var(--p-font-size-75);
+ font-size: var(--p-font-size-300);
```

```diff
- line-height: var(--p-font-line-height-1);
+ line-height: var(--p-font-line-height-400);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-font <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `font` custom properties across all file types:

```
(?:--p-font-size-70-experimental|--p-font-size-75|--p-font-size-80-experimental|--p-font-size-100|--p-font-size-200|--p-font-size-300|--p-font-size-400 |--p-font-size-500|--p-font-size-600|--p-font-size-700|--p-font-line-height-075-experimental|--p-font-line-height-1|--p-font-line-height-2|--p-font-line-height-3|--p-font-line-height-4|--p-font-line-height-5|--p-font-line-height-6|--p-font-line-height-7)(?![\w-])
```

#### Replacement maps

| Deprecated Token                        | Replacement Value           |
| --------------------------------------- | --------------------------- |
| `--p-font-size-70-experimental`         | `--p-font-size-275`         |
| `--p-font-size-75`                      | `--p-font-size-300`         |
| `--p-font-size-80-experimental`         | `--p-font-size-325`         |
| `--p-font-size-100`                     | `--p-font-size-350`         |
| `--p-font-size-200`                     | `--p-font-size-400`         |
| `--p-font-size-300`                     | `--p-font-size-500`         |
| `--p-font-size-400`                     | `--p-font-size-600`         |
| `--p-font-size-500`                     | `--p-font-size-750`         |
| `--p-font-size-600`                     | `--p-font-size-900`         |
| `--p-font-size-700`                     | `--p-font-size-1000`        |
| `--p-font-line-height-075-experimental` | `--p-font-line-height-300`  |
| `--p-font-line-height-1`                | `--p-font-line-height-400`  |
| `--p-font-line-height-2`                | `--p-font-line-height-500`  |
| `--p-font-line-height-3`                | `--p-font-line-height-600`  |
| `--p-font-line-height-4`                | `--p-font-line-height-700`  |
| `--p-font-line-height-5`                | `--p-font-line-height-800`  |
| `--p-font-line-height-6`                | `--p-font-line-height-1000` |
| `--p-font-line-height-7`                | `--p-font-line-height-1200` |

### Shadow

#### Migration

To replace these deprecated `shadow` custom properties, you can run the [v12-styles-replace-custom-property-shadow](https://polaris.shopify.com/tools/polaris-migrator#v12-styles-replace-custom-property-shadow) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- box-shadow: var(--p-shadow-XX);
+ box-shadow: var(--p-shadow-XX);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-shadow <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `shadow` custom properties across all file types:

```
--p-shadow-XX|--p-shadow-XX|...
```

```
<COMPONENT_NAME[^>\w](?:[^>]|\n)*?PROP_NAME(?!="XX)
```

#### Replacement maps

| Deprecated Token | Replacement Value |
| ---------------- | ----------------- |
| `--p-shadow-XX`  | `--p-shadow-XX`   |

### Space

#### Migration

To replace these deprecated `space` custom properties, you can run the [v12-styles-replace-custom-property-space](https://polaris.shopify.com/tools/polaris-migrator#v12-styles-replace-custom-property-space) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- padding: var(--p-space-XX);
+ padding: var(--p-space-XX);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-space <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `space` custom properties across all file types:

```
--p-space-XX|--p-space-XX|...
```

```
<COMPONENT_NAME[^>\w](?:[^>]|\n)*?PROP_NAME(?!="XX)
```

#### Replacement maps

| Deprecated Token | Replacement Value |
| ---------------- | ----------------- |
| `--p-space-XX`   | `--p-space-XX`    |

### Recommended token migration workflow

When running token migrations we suggest the following workflow:

- Handle automated migrations
  ```sh
  # Example migration
  npx @shopify/polaris-migrator ...
  # Stage all migrated files
  git add .
  # Format staged files only
  git diff --staged --name-only | xargs npx prettier --write
  # Commit automated migrations
  git commit -m "Migrate X custom properties from Polaris v11 to v12"
  ```
- Handle manual migrations
  - Search for token RegExps and handle manual migrations
    <br>

```sh
# Stage all manually migrated files
git add .
# Format staged files only
git diff --staged --name-only | xargs npx prettier --write
# Commit manual migrations
git commit -m "Manually migrate X custom properties from Polaris v11 to v12"
```

- Optionally if you use `stylelint-polaris`, you can check for errors after all custom property migrations are finished
  ```sh
  npx stylelint <path>
  ```
