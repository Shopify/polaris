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
- color: var(--p-color-XX);
+ color: var(--p-color-XX);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-color <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `color` custom properties across all file types:

```
--p-color-XX|--p-color-XX|...
```

```
<COMPONENT_NAME[^>\w](?:[^>]|\n)*?PROP_NAME(?!="XX)
```

#### Replacement maps

| Deprecated Token | Replacement Value |
| ---------------- | ----------------- |
| `--p-color-XX`   | `--p-color-XX`    |

### Font

#### Migration

To replace these deprecated `font` custom properties, you can run the [v12-styles-replace-custom-property-font](https://polaris.shopify.com/tools/polaris-migrator#v12-styles-replace-custom-property-font) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- font-size: var(--p-font-XX);
+ font-size: var(--p-font-XX);
```

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-font <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `font` custom properties across all file types:

```
--p-font-XX|--p-font-XX|...
```

```
<COMPONENT_NAME[^>\w](?:[^>]|\n)*?PROP_NAME(?!="XX)
```

#### Replacement maps

| Deprecated Token | Replacement Value |
| ---------------- | ----------------- |
| `--p-font-XX`    | `--p-font-XX`     |

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
