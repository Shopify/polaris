---
title: Migrating from v11 to v12
description: Polaris v12.0.0 prop replacement, removal of components, renamed components, and token changes.
navTitle: v12
icon: ColorsMajor
order: 1
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

[Full release notes](https://github.com/Shopify/polaris/releases/tag/v12.0.0)

## Component migrations

### Avatar

`npx @shopify/polaris-migrator v12-react-avatar-component <path>`

- Replace the `size` prop with the new mapping below

| Before                    | After       |
| ------------------------- | ----------- |
| `size="extraSmall"`       | `size="xs"` |
| `size="small"`            | `size="sm"` |
| `size="medium"`           | `size="md"` |
| `size="large"`            | `size="lg"` |
| `size="xl-experimental"`  | `size="xl"` |
| `size="2xl-experimental"` | `size="xl"` |

### Badge

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Badge" --from="status" --to="tone"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Badge" --from="statusAndProgressLabelOverride" --to="toneAndProgressLabelOverride"`

### Layout.Section

- One third:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="oneThird" --to="variant" --toValue="oneThird"`

- One half:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="oneHalf" --to="variant" --toValue="oneHalf"`

- Full width:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="fullWidth" --to="variant" --toValue="fullWidth"`

- Secondary, becomes oneThird:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="secondary" --to="variant" --toValue="oneThird"`

### TextField

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="TextField" --from="borderless" --to="variant" --toValue="borderless"`

### Box

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusEndStart" --to="borderEndStartRadius"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusEndEnd" --to="borderEndEndRadius"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusStartStart" --to="borderStartStartRadius"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Box" --from="borderRadiusStartEnd" --to="borderStartEndRadius"`

### HorizontalStack

`npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="HorizontalStack" --renameTo="InlineStack" --renamePropsFrom="HorizontalStackProps" --renamePropsTo="InlineStackProps"`

### VerticalStack

`npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="VerticalStack" --renameTo="BlockStack" --renamePropsFrom="VerticalStackProps" --renamePropsTo="BlockStackProps"`

### HorizontalGrid

`npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="HorizontalGrid" --renameTo="InlineGrid" --renamePropsFrom="HorizontalGridProps" --renamePropsTo="InlineGridProps"`

### Button

- connectedDisclosure: [See the updated split example](/components/actions/button)

- Boolean props to `variant` and `tone`

`npx @shopify/polaris-migrator v12-react-update-button-component <path>`

### ButtonGroup

- Spacing

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="ButtonGroup" --from="spacing" --to="gap"`

- Segmented

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="ButtonGroup" --from="segmented" --to="variant" --toValue="segmented"`

### Banner

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Banner" --from="status" --to="tone"`

### Icon

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

### Text

- Color

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Text" --from="color" --to="tone"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Text" --from="tone" --to="tone" --fromValue="warning" --toValue="caution"`

### Modal

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="small" --to="size" --toValue="small"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="large" --to="size" --toValue="large"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="fullScreen" --to="size" --toValue="fullScreen"`

### List

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="List" --from="spacing" --to="gap"`

### DescriptionList

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="DescriptionList" --from="spacing" --to="gap"`

### AppProvider

The `AppProvider`'s `features` prop no longer accepts the keys `polarisSummerEditions2023` and `polarisSummerEditions2023ShadowBevelOptOut`. You should be able to remove the `features` prop completely from your Polaris `AppProvider` since there aren't any feature flags in Polaris for v12.

### Text

The `Text` component no longer supports `headingXs` and `heading4xl` as options for the `variant` prop. You will need to manually update usage of `<Text variant="headingXs">` to `<Text variant="headingSm">` instead. Similarly, usage of `<Text variant="heading4xl">` need to be manually updated to `<Text variant="heading3xl">`.

## Token migrations

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

#### `on-color` tokens

`on-color` is being replaced by `on-bg-fill` tokens. These tokens will no longer be the same value but tailored to the bg color the element is sitting on. This gives us greater control over the visual design of the admin.

The table below shows which `on-bg-fill` colors to use against their respective `bg-fill` colors. Use the mappings below as a general guide to updating `text-on-color` and `icon-on-color` tokens.

| Background color   | Text + Icon color                                      |
| ------------------ | ------------------------------------------------------ |
| `bg-fill-info`     | `text-info-on-bg-fill`                                 |
| `bg-fill-success`  | `text-success-on-bg-fill`                              |
| `bg-fill-caution`  | `text-caution-on-bg-fill`                              |
| `bg-fill-warning`  | `text-warning-on-bg-fill`                              |
| `bg-fill-critical` | `text-critical-on-bg-fill`                             |
| `bg-fill-magic`    | `text-magic-on-bg-fill`                                |
| `bg-fill-emphasis` | `text-emphasis-on-bg-fill`                             |
| `bg-fill-inverse`  | `text-inverse` `text-inverse-secondary` `icon-inverse` |
| `bg-inverse`       | `text-inverse` `text-inverse-secondary` `icon-inverse` |

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

**⚠️ Important**: The font migration needs to be run in 4 sequential steps due to overlapping `font-size` token names. After each migration step, run the associated post-migration validation regex and handle any manual migrations.

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-font <path> --step=1
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-font <path> --step=2
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-font <path> --step=3
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-font <path> --step=4
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `font` custom properties across all file types:

**[STEP 1]** Check RegExp for hardcoded `font` custom properties across all file types

```
(?:--p-font-size-70-experimental|--p-font-size-80-experimental|--p-font-size-100|--p-font-size-700|--p-font-line-height-075-experimental|--p-font-line-height-1|--p-font-line-height-2|--p-font-line-height-3|--p-font-line-height-4|--p-font-line-height-5|--p-font-line-height-6|--p-font-line-height-7)(?![\w-])
```

**[STEP 2]** Check RegExp for hardcoded `font` custom properties across all file types

```
(?:--p-font-size-500|--p-font-size-600)(?![\w-])
```

**[STEP 3]** Check RegExp for hardcoded `font` custom properties across all file types

```
(?:--p-font-size-300|--p-font-size-400)(?![\w-])
```

**[STEP 4]** Check RegExp for hardcoded `font` custom properties across all file types

```
(?:--p-font-size-75|--p-font-size-200)(?![\w-])
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
- box-shadow: var(--p-shadow-xs);
+ box-shadow: var(--p-shadow-100);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-shadow <path>
```

The following tokens need to be manually migrated because their values are context dependent.

| Deprecated CSS Custom Property                 | Replacement Value                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--p-shadow-button-primary-experimental`       | `--p-shadow-button-primary-critical`<br/>`--p-shadow-button-primary-success`             |
| `--p-shadow-button-primary-hover-experimental` | `--p-shadow-button-primary-critical-hover`<br/>`--p-shadow-button-primary-success-hover` |
| `--p-shadow-button-inset-experimental`         | `--p-shadow-button-primary-critical-inset`<br/>`--p-shadow-button-primary-success-inset` |

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `shadow` custom properties across all file types:

```
(?:--p-shadow-inset-lg|--p-shadow-inset-md|--p-shadow-inset-sm|--p-shadow-none|--p-shadow-xs|--p-shadow-sm|--p-shadow-md|--p-shadow-lg|--p-shadow-xl|--p-shadow-2xl|--p-shadow-bevel-experimental|--p-shadow-card-sm-experimental|--p-shadow-card-md-experimental|--p-shadow-card-lg-experimental|--p-shadow-button-experimental|--p-shadow-button-hover-experimental|--p-shadow-button-disabled-experimental|--p-shadow-button-primary-strong-experimental|--p-shadow-button-primary-strong-inset-experimental|--p-shadow-button-primary-strong-hover-experimental|--p-shadow-border-inset-experimental|--p-shadow-button-primary-experimental|--p-shadow-button-primary-hover-experimental|--p-shadow-button-inset-experimental)(?![\w-])
```

```
<Box[^>\w](?:[^>]|\n)*?shadow
```

```
<ShadowBevel[^>\w](?:[^>]|\n)*?boxShadow
```

#### Replacement maps

| Deprecated Token                                      | Replacement Value                                                                        |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--p-shadow-inset-lg`                                 | `--p-shadow-inset-200`                                                                   |
| `--p-shadow-inset-md`                                 | `--p-shadow-inset-200`                                                                   |
| `--p-shadow-inset-sm`                                 | `--p-shadow-inset-100`                                                                   |
| `--p-shadow-none`                                     | `--p-shadow-0`                                                                           |
| `--p-shadow-xs`                                       | `--p-shadow-100`                                                                         |
| `--p-shadow-sm`                                       | `--p-shadow-200`                                                                         |
| `--p-shadow-md`                                       | `--p-shadow-300`                                                                         |
| `--p-shadow-lg`                                       | `--p-shadow-400`                                                                         |
| `--p-shadow-xl`                                       | `--p-shadow-500`                                                                         |
| `--p-shadow-2xl`                                      | `--p-shadow-600`                                                                         |
| `--p-shadow-bevel-experimental`                       | `--p-shadow-bevel-100`                                                                   |
| `--p-shadow-card-sm-experimental`                     | `--p-shadow-100`                                                                         |
| `--p-shadow-card-md-experimental`                     | `--p-shadow-200`                                                                         |
| `--p-shadow-card-lg-experimental`                     | `--p-shadow-300`                                                                         |
| `--p-shadow-button-experimental`                      | `--p-shadow-button`                                                                      |
| `--p-shadow-button-hover-experimental`                | `--p-shadow-button-hover`                                                                |
| `--p-shadow-button-disabled-experimental`             | `inset 0 0 0 1px rgba(227, 227, 227, 1)`                                                 |
| `--p-shadow-button-primary-strong-experimental`       | `--p-shadow-button-primary`                                                              |
| `--p-shadow-button-primary-strong-inset-experimental` | `--p-shadow-button-primary-inset`                                                        |
| `--p-shadow-button-primary-strong-hover-experimental` | `--p-shadow-button-primary-hover`                                                        |
| `--p-shadow-button-primary-experimental`              | `--p-shadow-button-primary-critical`<br/>`--p-shadow-button-primary-success`             |
| `--p-shadow-button-primary-hover-experimental`        | `--p-shadow-button-primary-critical-hover`<br/>`--p-shadow-button-primary-success-hover` |
| `--p-shadow-button-inset-experimental`                | `--p-shadow-button-primary-critical-inset`<br/>`--p-shadow-button-primary-success-inset` |
| `--p-shadow-border-inset-experimental`                | `--p-shadow-border-inset`                                                                |

### Space

#### Migration

To replace these deprecated `space` custom properties, you can run the [v12-styles-replace-custom-property-space](https://polaris.shopify.com/tools/polaris-migrator#v12-styles-replace-custom-property-space) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- padding: var(--p-space-1);
+ padding: var(--p-space-100);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-space <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `space` custom properties across all file types:

```
(?:--p-space-05|--p-space-1|--p-space-1_5-experimental|--p-space-2|--p-space-3|--p-space-4|--p-space-5|--p-space-6|--p-space-8|--p-space-10|--p-space-12|--p-space-16 |--p-space-20 |--p-space-24|--p-space-28 |--p-space-32)(?![\w-])
```

```
<Tooltip[^>\w](?:[^>]|\n)*?padding
```

**⚠️ Important**: The RegExp you use here will depend on if you've run component migrations. If you have not then use `HorizontalGrid` if you have then use `InlineGrid`.

```
<HorizontalGrid[^>\w](?:[^>]|\n)*?gap
```

```
<InlineGrid[^>\w](?:[^>]|\n)*?gap
```

```
<Box[^>\w](?:[^>]|\n)*?padding
```

```
<Box[^>\w](?:[^>]|\n)*?paddingBlockStart
```

```
<Box[^>\w](?:[^>]|\n)*?paddingBlockEnd
```

```
<Box[^>\w](?:[^>]|\n)*?paddingInlineStart
```

```
<Box[^>\w](?:[^>]|\n)*?paddingInlineEnd
```

```
<Box[^>\w](?:[^>]|\n)*?insetBlockStart
```

```
<Box[^>\w](?:[^>]|\n)*?insetBlockEnd
```

```
<Box[^>\w](?:[^>]|\n)*?insetInlineStart
```

```
<Box[^>\w](?:[^>]|\n)*?insetInlineEnd
```

**⚠️ Important**: The RegExp you use here will depend on if you've run component migrations. If you have not then use `VerticalStack` if you have then use `BlockStack`.

```
<VerticalStack[^>\w](?:[^>]|\n)*?gap
```

```
<BlockStack[^>\w](?:[^>]|\n)*?gap
```

**⚠️ Important**: The RegExp you use here will depend on if you've run component migrations. If you have not then use `HorizontalStack` if you have then use `InlineStack`.

```
<HorizontalStack[^>\w](?:[^>]|\n)*?gap
```

```
<InlineStack[^>\w](?:[^>]|\n)*?gap
```

```
<Choice[^>\w](?:[^>]|\n)*?bleed
```

```
<Choice[^>\w](?:[^>]|\n)*?bleedBlockStart
```

```
<Choice[^>\w](?:[^>]|\n)*?bleedBlockEnd
```

```
<Choice[^>\w](?:[^>]|\n)*?bleedInlineStart
```

```
<Choice[^>\w](?:[^>]|\n)*?bleedInlineEnd
```

```
<RadioButton[^>\w](?:[^>]|\n)*?bleed
```

```
<RadioButton[^>\w](?:[^>]|\n)*?bleedBlockStart
```

```
<RadioButton[^>\w](?:[^>]|\n)*?bleedBlockEnd
```

```
<RadioButton[^>\w](?:[^>]|\n)*?bleedInlineStart
```

```
<RadioButton[^>\w](?:[^>]|\n)*?bleedInlineEnd
```

```
<Checkbox[^>\w](?:[^>]|\n)*?bleed
```

```
<Checkbox[^>\w](?:[^>]|\n)*?bleedBlockStart
```

```
<Checkbox[^>\w](?:[^>]|\n)*?bleedBlockEnd
```

```
<Checkbox[^>\w](?:[^>]|\n)*?bleedInlineStart
```

```
<Checkbox[^>\w](?:[^>]|\n)*?bleedInlineEnd
```

```
<Stack[^>\w](?:[^>]|\n)*?gap
```

```
<Grid[^>\w](?:[^>]|\n)*?gap
```

```
<Grid[^>\w](?:[^>]|\n)*?gapX
```

```
<Grid[^>\w](?:[^>]|\n)*?gapY
```

```
<Card[^>\w](?:[^>]|\n)*?padding
```

```
<Bleed[^>\w](?:[^>]|\n)*?marginInline
```

```
<Bleed[^>\w](?:[^>]|\n)*?marginBlock
```

```
<Bleed[^>\w](?:[^>]|\n)*?marginBlockStart
```

```
<Bleed[^>\w](?:[^>]|\n)*?marginBlockEnd
```

```
<Bleed[^>\w](?:[^>]|\n)*?marginInlineStart
```

```
<Bleed[^>\w](?:[^>]|\n)*?marginInlineEnd
```

#### Replacement maps

| Deprecated Token             | Replacement Value |
| ---------------------------- | ----------------- |
| `--p-space-05`               | `--p-space-050`   |
| `--p-space-1`                | `--p-space-100`   |
| `--p-space-1_5-experimental` | `--p-space-150`   |
| `--p-space-2`                | `--p-space-200`   |
| `--p-space-3`                | `--p-space-300`   |
| `--p-space-4`                | `--p-space-400`   |
| `--p-space-5`                | `--p-space-500`   |
| `--p-space-6`                | `--p-space-600`   |
| `--p-space-8`                | `--p-space-800`   |
| `--p-space-10`               | `--p-space-1000`  |
| `--p-space-12`               | `--p-space-1200`  |
| `--p-space-16`               | `--p-space-1600`  |
| `--p-space-20`               | `--p-space-2000`  |
| `--p-space-24`               | `--p-space-2400`  |
| `--p-space-28`               | `--p-space-2800`  |
| `--p-space-32`               | `--p-space-3200`  |

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
    <br />

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

## Manual updates and fixes

### A new web font

The new design language comes with a web font called [Inter via Google Fonts](https://fonts.google.com/specimen/Inter).
Polaris references this font but doesn't load it. Apps will need to load the font, otherwise it will fallback to to the user's system font.

{/* prettier-ignore */}
```html
<link rel="preconnect" href="https://fonts.googleapis.com/" />
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" />
```

### Icons

Major and minor icon sizes are now identical.
You may need to update custom icons in your app as they may look much larger than Polaris icons now.
All icons still maintain the 20x20 viewbox.

### Dividers

We removed dividers across Polaris components, most noticeably in [`Page`](/components/layout-and-structure/page) and [`LegacyCard`](/components/deprecated/legacy-card).
We now recommend using spacing to create a visual hierarchy.
If you must use a divider, use the [`Divider`](/components/layout-and-structure/divider) component to add them back in where needed.

### Buttons beside inputs

Default buttons have decreased in height and no longer match the height of some inputs, namely [`TextField`](/components/selection-and-input/text-field) and [`Select`](/components/selection-and-input/select).
To get a buttons matching the height of input fields, use the large size by using the `large` size variant of [`Button`](/components/actions/button).

```diff
- <TextField connectedRight={<Button icon={DeleteMajor} />} />
+ <TextField connectedRight={<Button icon={DeleteMajor} size="large" />} />
```

### LegacyCard

#### Heading size

The [`LegacyCard`](/components/deprecated/legacy-card) now also enforces that `h1` and `h2` content is `headingSm` (`--p-font-size-80-experimental`).
If you want to use custom heading sizes, please refactor [`LegacyCard`](/components/deprecated/legacy-card) to [`Card`](/components/layout-and-structure/card).

#### Spacing and visual hierarchy

The [`LegacyCard`](/components/deprecated/legacy-card) now has much tighter spacing and does not have dividers between sections and subsections.
This may result in some visual hierarchy/padding issues depending on how your cards are composed.
You can resolve this in a number of ways:

- _recommended_ – Use [`Card`](/components/layout-and-structure/card) and [`BlockStack`](/components/layout-and-structure/block-stack) to compose a new card layout
- Remove any custom content spacing wrappers and use `<LegacyCard.Section />`, `<LegacyCard.Header />`, or `<LegacyCard.Section flush />` instead.
  Issues involving a lack of top or bottom padding on the card is likely caused by this.
- Update all custom content padding using `--p-space-500` to use `--p-space-400`.
  This includes content wrapped in a [`LegacyStack`](/components/deprecated/legacy-stack)
  ```diff
  - spacing='loose'
  + spacing={undefined}
  ```
  or for [`InlineStack`](/components/layout-and-structure/inline-stack)
  ```diff
  - gap='5'
  + gap='4'
  ```
- Add back dividers using [`Divider`](/components/layout-and-structure/divider) where needed
- As a last resort, you can add space with [`Box`](/components/layout-and-structure/box) or remove space with [`Bleed`](/components/layout-and-structure/bleed).

### Z-Index

The new design language introduces a shadow bevel in numerous components.
The following component's children cannot be above the bevel's `z-index` elevation:

| Component      | Bevel z-index<br/>_(children cannot be above this)_ |
| -------------- | --------------------------------------------------- |
| Card           | 32                                                  |
| LegacyCard     | 101                                                 |
| Popover        | 2                                                   |
| TooltipOverlay | 1                                                   |

### Custom elements

Custom elements that were styled to look like the previous Polaris design language will need to be updated.
Take the opportunity to put custom styles and components on mainline Polaris using our [components](/components) and [tokens](/tokens/color).
See a list of new tokens and the mapping our current tokens to our new once below.
