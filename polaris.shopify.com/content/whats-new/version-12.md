---
title: Version 12
description: This version introduces Shopify's new admin design language, refined tokens, and aligned component APIs.
previewImg: /images/updates/uplift-beta@2x.png
keywords:
  - new design language
  - uplift
  - v12
  - version 12
  - redesign
  - admin design language
  - new design
  - black button
  - How to migrate to the new design language
order: 0
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

![Illustration of a hand drawing a four pointed star](/images/updates/uplift-beta@2x.png)

---

## Upgrade to v12

Follow our [migration guide](/migrating-from-v11-to-v12) to upgrade Polaris from v11 to v12.

## What's changing

### The design language

Polaris version 12 introduces a new design language for Shopify's admin. This includes a style uplift for all of our [components](/components), updates to our token values, and a [new web font, Inter](/version-guides/migrating-from-v11-to-v12#a-new-web-font).

#### Design principles

The new design language was crafted with guiding principles in mind, ultimately to create surfaces that best serve merchants.

- **Pro feel**: Interactions are highly functional, responsive, and effective.
- **Meaningful**: Visual language is clear for merchants.
- **High density**: Space is optimized while maintaining high usability.
- **Tactility**: Interfaces incorporate a sense of realness.
- **Commonality**: Objects with similar appearance share a common behavior.

Read more about Polaris' [design principles](/design) to start designing in the new language.

### Token refinement

The version 12 updates aim to create an intentional set of tokens that clearly communicates intent so that builders have exactly what they need to apply the new design language on their surfaces. To do this, v12 introduces primitive and semantic token layers.

For more information on how to migrate from v11 tokens, check out the [migration guide](/migrating-from-v11-to-v12#token-migrations).

#### Primitive tokens

Primitive tokens are generic keys for the base values of a token scale. Primitive tokens are not context dependent and can be used anywhere in the admin. For example, `--p-space-100` is a primitive space token.

#### Semantic tokens

Semantic tokens are references to base values that are used in specific contexts within the admin. These tokens should never be used for anything other than the concept they’re referencing. When no semantic token is a good fit, a primitive token should be used instead. For example, `--p-space-table-cell-padding` is a semantic token.

#### Updated token resources

| Token guidance                                         | Full token list                     |
| ------------------------------------------------------ | ----------------------------------- |
| [Color token guidance](/design/colors/tokens)          | [Color token list](/tokens/color)   |
| [Typography token guidance](/design/typography/tokens) | [Font token list](/tokens/font)     |
| [Depth token guidance](/design/depth/tokens)           | [Shadow token list](/tokens/shadow) |
| [Space token guidance](/design/layout/tokens)          | [Space token list](/tokens/space)   |

### Component API simplification

The version 12 breaking component changes aim to simplify inconsistent and complicated component APIs.

Note: the below examples are for illustrative purposes only. For a comprehensive list on all component changes and how to migrate from v11's component APIs, check out the [migration guide](/migrating-from-v11-to-v12#component-migrations).

#### Logical properties rename

Directional components now use `Inline` and `Block` which are defined by [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values). This is to be consistent with other Polaris component APIs as well as wider web conventions.

```diff
- <HorizontalStack />
+ <InlineStack />
- <VerticalStack />
+ <BlockStack />
- <HorizontalGrid />
+ <InlineGrid />
```

#### Consolidate color changes to `tone`

Renaming color control props to `tone` creates a consistent API across components.

```diff
- <Banner status="success" />
+ <Banner tone="success" />

- <Icon color="success" />
- <Icon color="warning" />
- <Icon color="highlight" />
+ <Icon tone="success" />
+ <Icon tone="caution" />
+ <Icon tone="info" />

- <Text color="success" />
- <Text color="warning" />
+ <Text tone="success" />
+ <Text tone="caution" />

- <Badge status="success" statusAndProgressLabelOverride="My string" />
+ <Badge tone="success" toneAndProgressLabelOverride="My string" />

- <Button destructive />
+ <Button variant="primary" tone="critical" />
- <Button primarySuccess />
+ <Button variant="primary" tone="success" />
- <Button destructive outline />
+ <Button tone="critical" />
- <Button destructive plain />
+ <Button variant="plain" tone="critical" />
```

#### Consolidate boolean props to `variant`

The logical combinations of boolean props can get confusing. A single `variant` prop is now used to control rendering different component styles.

```diff
- <ButtonGroup segmented />
+ <ButtonGroup variant="segmented" />

- <TextField borderless />
+ <TextField variant="borderless" />

- <Layout.Section oneThird>
- <Layout.Section oneHalf>
- <Layout.Section fullWidth>
- <Layout.Section secondary>
+ <Layout.Section variant="oneThird">
+ <Layout.Section variant="oneHalf">
+ <Layout.Section variant="fullWidth">
+ <Layout.Section variant="oneThird">

- <Button plain />
+ <Button variant="plain" />
- <Button primary />
+ <Button variant="primary" />
- <Button destructive />
+ <Button variant="primary" tone="critical" />
- <Button primarySuccess />
+ <Button variant="primary" tone="success" />
- <Button destructive plain />
+ <Button variant="plain" tone="critical" />

- <Modal small />
- <Modal large />
- <Modal fullScreen />
+ <Modal size="small" />
+ <Modal size="large" />
+ <Modal size="fullScreen" />
```

#### Rename `spacing` to `gap`

Renaming space control props to `gap` creates a consistent API across components.

```diff
- <ButtonGroup spacing="tight" />
+ <ButtonGroup gap="tight" />

- <List spacing="loose" />
+ <List gap="loose" />

- <DescriptionList spacing="loose" />
+ <DescriptionList gap="loose" />
```

#### Other prop renames

```diff
- <Box borderRadiusEndStart="2" borderRadiusEndEnd="2" borderRadiusStartStart="2" borderRadiusStartEnd="2" />
+ <Box borderEndStartRadius="2" borderEndEndRadius="2" borderStartStartRadius="2" borderStartEndRadius="2" />

- <Avatar size="extraSmall" />
- <Avatar size="small" />
- <Avatar size="medium" />
- <Avatar size="large" />
- <Avatar size="xl-experimental" />
- <Avatar size="2xl-experimental" />
+ <Avatar size="xs" />
+ <Avatar size="sm" />
+ <Avatar size="md" />
+ <Avatar size="lg" />
+ <Avatar size="xl" />
+ <Avatar size="xl" />
```

#### Prop deprecations

```diff
- <Icon backdrop />
+ <Box padding="1" width="28px" borderRadius="full">
+   <Icon />
+ </Box>

- <Button connectedDisclosure />
+ <ButtonGroup variant="segmented">
+   <Button />
+   <Button icon={ChevronDownMinor} />
+ </ButtonGroup>

- <Button monochrome />
- <Button outline />
+ <Button />
+ <Button />
```

## Resources

- [v11 to v12 migration guide](/migrating-from-v11-to-v12)
- [Add the new web font](/version-guides/migrating-from-v11-to-v12#a-new-web-font)
- [Design principles](/design)
