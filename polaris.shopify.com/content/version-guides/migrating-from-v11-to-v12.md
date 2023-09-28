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

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="small" --to="size" --newValue="small"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="large" --to="size" --newValue="large"`

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Modal" --from="fullScreen" --to="size" --newValue="fullScreen"`

### List

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="List" --from="spacing" --to="gap"`

### DescriptionList

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="DescriptionList" --from="spacing" --to="gap"`

### AppProvider

The `AppProvider`'s `features` prop no longer accepts the keys `polarisSummerEditions2023` and `polarisSummerEditions2023ShadowBevelOptOut`. You should be able to remove the `features` prop completely from your Polaris `AppProvider` since there aren't any feature flags in Polaris for v12.

## Token migrations

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
  This includes content wrapped in a [`LegacyStack`](/components/layout-and-structure/legacy-stack)
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
