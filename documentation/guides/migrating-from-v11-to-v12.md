# Migrating from v11 to v12

Polaris v12.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v12.0.0)) prop replacement, removal of components, renamed components, and token changes.

## Table of Contents

- [Quick migration guide](#quick-migration-guide)

## Quick migration guide

**Avatar**

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

**Badge**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Badge" --from="status" --to="tone"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Badge" --from="statusAndProgressLabelOverride" --to="toneAndProgressLabelOverride"`

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

- Boolean props to `variant` and `tone`

`npx @shopify/polaris-migrator v12-react-update-button-component <path>`

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

**AppProvider**

The `AppProvider`'s `features` prop no longer accepts the keys `polarisSummerEditions2023` and `polarisSummerEditions2023ShadowBevelOptOut`. You should be able to remove the `features` prop completely from your Polaris `AppProvider` since there aren't any feature flags in Polaris for v12.
