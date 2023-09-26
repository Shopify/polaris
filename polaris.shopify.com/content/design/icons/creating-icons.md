---
title: Creating Icons
description: Icons enhance an experience by providing intuitive and efficient navigation, conveying information concisely, and making it more visually appealing.
keywords:
  - shopify icons
  - icon sets
  - icon designs
  - icon guidelines
  - icon standards
  - iconography
  - visual helpers
  - minor icons
  - major icons
  - inline icons
  - in-line icons
  - main navigation icons
  - main nav icons
  - icons in nav
  - icons in main nav
  - icon colors
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

## Icon layout

<Stack gap='4'>
<InlineGrid gap="4" columns="2">
  <DirectiveCard status="Tip">

    ![](/images/design/icons/icons-creating-layout-1@2x.png)

    The icon container is 20x20 px, but the content of an icon should be
    confined within the 14 x 14 px.

  </DirectiveCard>
  <DirectiveCard status="Tip">

    ![](/images/design/icons/icons-creating-layout-2@2x.png)

    Exceptionally, if the icon requires more visual prominence, or more space to
    read effectively, the content can expand beyond that, however, no part of
    the icon should exceed 16 x 16 px

  </DirectiveCard>
</InlineGrid>

## Keylines

<InlineGrid gap="4" columns='2'>
  <DirectiveCard status="Tip">

    ![](/images/design/icons/icons-creating-keylines-1@2x.png)

    The overall shape of an icon can vary from a circle to a square, or from a tall rectangle to a wide one. So all icons have the same visual weight, always start with the following keylines.

  </DirectiveCard>
  <DirectiveCard status="Tip">

    ![](/images/design/icons/icons-creating-keylines-2@2x.png)

    The guidelines are a starting point, not a hard constraint. If it makes the concept stronger or keeps the icon optically aligned, it’s ok to deviate.

  </DirectiveCard>
</InlineGrid>

## General Rules

<Grid gap='4'>

{' '}

<Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
  <Do>

    ![](/images/design/icons/icons-creating-rules-1@2x.png)

    Icons are two-dimensional, and objects face forward.

  </Do>
</Grid.Cell>
<Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
  <Dont>
  
    ![](/images/design/icons/icons-creating-rules-2@2x.png)
  
    Icons are two-dimensional, and objects face forward.

  </Dont>
</Grid.Cell>
<Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
  <DirectiveCard status="Caution">

    ![](/images/design/icons/icons-creating-rules-3@2x.png)

    Subtle hints of a third dimension are acceptable when necessary for
    conceptual clarity.

  </DirectiveCard>
</Grid.Cell>
<Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
  <Do>
    ![](/images/design/icons/icons-creating-rules-4@2x.png)
    
    Center icon in their container.
  </Do>
</Grid.Cell>
<Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
  <Do>
    ![](/images/design/icons/icons-creating-rules-5@2x.png)

    Bold and stylized icons.

  </Do>
</Grid.Cell>

  <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
    <Dont>

      ![](/images/design/icons/icons-creating-rules-6@2x.png)

      Use small details and organic shapes.

    </Dont>

  </Grid.Cell>
  <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
    <Do>

      ![](/images/design/icons/icons-creating-rules-7@2x.png)

      Use a consistent visual style, stroke weight and only one color.

    </Do>

  </Grid.Cell>

  <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
    <Dont>

      ![](/images/design/icons/icons-creating-rules-8@2x.png)

      Use transparency.

    </Dont>

  </Grid.Cell>

</Grid>

{/* Filled vs outlined */}

<Card>
  <Grid gap='4'>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 4, lg: 4, xl: 4}}>

      ## Filled vs Outlined

      Outline icons are the default. Filled icons are reserved to navigation only.

    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 8, lg: 8, xl: 8}}>

      ![](/images/design/icons/icons-creating-filled-1@2x.png)

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>

      <Do>
        ![](/images/design/icons/icons-creating-filled-2@2x.png)

        Use filled icons as navigation.

      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>

      <Do>
        ![](/images/design/icons/icons-creating-filled-3@2x.png)

        Use filled icons for semi-permanent selected states, like pinning an app.

      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>

      <Dont>
        ![](/images/design/icons/icons-creating-filled-4@2x.png)

        Use filled icons to create emphasis.

      </Dont>

    </Grid.Cell>

  </Grid>
</Card>
</Stack>
