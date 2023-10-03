---
title: Creating Icons
description: Icons enhance an experience by providing intuitive and efficient navigation, conveying information concisely, and making it more visually appealing.
icon: EditMinor
keywords:
  - icons
  - icon design
  - user interface design
  - visual navigation
  - consistent icon style
  - universally recognized symbols
  - icon creation
  - icon layout
  - 2d icons
  - icon stroke weight
  - filled icons
  - outlined icons
  - icon navigation
  - iconography
  - icon visual weight
  - icon design guidelines
  - icon use in interface
  - icon and typography
  - icon size and weight
  - icon clarity
  - icon meaning
  - icon aesthetics
  - icon functionality
  - icon grid alignment
  - icon visual harmony.
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

<Stack gap='4'>
<Card>
  ## Icon layout

  <InlineGrid gap="4" columns="2">
    <DirectiveCard>

      ![](/images/design/icons/icons-creating-layout-1@2x.png)

      The icon container is 20x20 px, but the content of an icon should be
      confined within the 14 x 14 px.

    </DirectiveCard>
    <DirectiveCard>

      ![](/images/design/icons/icons-creating-layout-2@2x.png)

      Exceptionally, if the icon requires more visual prominence, or more space to
      read effectively, the content can expand beyond that, however, no part of
      the icon should exceed 16 x 16 px

    </DirectiveCard>

  </InlineGrid>
</Card>

<Card>
  ## Keylines

  <InlineGrid gap="4" columns='2'>
    <DirectiveCard>

      ![](/images/design/icons/icons-creating-keylines-1@2x.png)

      The overall shape of an icon can vary from a circle to a square, or from a tall rectangle to a wide one. So all icons have the same visual weight, always start with the following keylines.

    </DirectiveCard>
    <DirectiveCard>

      ![](/images/design/icons/icons-creating-keylines-2@2x.png)

      The guidelines are a starting point, not a hard constraint. If it makes the concept stronger or keeps the icon optically aligned, it’s ok to deviate.

    </DirectiveCard>

  </InlineGrid>

</Card>

<Card>
  ## General Rules

  <Grid gap='4'>

  <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
    <Do>

      ![](/images/design/icons/icons-creating-rules-1@2x.png)

      Icons are two-dimensional, and objects face forward.

    </Do>

  </Grid.Cell>
  <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>
    <Dont>
    
      ![](/images/design/icons/icons-creating-rules-2@2x.png)
    
      Use perspective and 3D objects

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

</Card>

{/* Filled vs outlined */}

<Card>
  <Grid gap='4'>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 4, lg: 4, xl: 4}}>

      ## Filled vs Outlined

      Outline icons are the default. Filled icons are reserved to navigation only.

    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 8, lg: 8, xl: 8}}>

      ![](/images/design/icons/icons-creating-filled-vs-outline-1@2x.png)

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
        ![](/images/design/icons/icons-creating-filled-vs-outline-2@2x.png)

        Use filled icons as navigation.

      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
        ![](/images/design/icons/icons-creating-filled-vs-outline-3@2x.png)

        Use filled icons for semi-permanent selected states, like pinning an app.

      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>

      <Dont>
        ![](/images/design/icons/icons-creating-filled-vs-outline-4@2x.png)

        Use filled icons to create emphasis.

      </Dont>

    </Grid.Cell>

  </Grid>

### Designing outlined icons

  <Grid gap='4'>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-outline-1@2x.png)

        Stroke weight is 1.5px

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-outline-2@2x.png)

        Since the stroke has half a pixel, one side of the stroke should always be aligned with the pixel grid.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-outline-3@2x.png)

        Exceptions are allowed for optical adjustments, as long as they fall on 0.25 px increments.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-outline-4@2x.png)

        Terminals are round, even when a shape cuts out into another.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-outline-5@2x.png)

        Corner radius can go from 1 px to 3 px, depending on the object roundness. Joins must be rounded, and sharp corners are not allowed, except for intersections and cutouts.


      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-outline-6@2x.png)

        Filled shapes can be used, only in really small objects, like a dot in an exclamation point.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-outline-7@2x.png)

        The minimum gap between strokes should never be less than 1px.

      </DirectiveCard>

    </Grid.Cell>

  </Grid>

### Designing filled icons

  <Grid gap='4'>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-filled-1@2x.png)

        Filled icons should align closely to their outline pairs. They don’t need to be a pixel perfect match, but they must have a similar visual weight, and the transition from one to the other must feel smooth.


      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-filled-2@2x.png)

        Icons are made out of contiguous shapes. Ideally one, but it’s possible to go up to three, when required for clarity.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-filled-3@2x.png)


        Stroke weight is 1.5 px, but is reduced to 1.25 px when used inside a shape as a cut-out. Shapes must align with the pixel grid.

        Exceptions are allowed for optical adjustments, as long as they fall on 0.25 px increments.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-filled-4@2x.png)

        Terminals are round.

        Corner radius can go from 1 px to 3 px, depending on the object roundness. Joins must be rounded, and sharp corners are not allowed, except for intersections and cutouts.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-filled-5@2x.png)

        If it’s impossible to fill the outline icon, a 2px stroke can be used as a filled version.

      </DirectiveCard>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <DirectiveCard>

        ![](/images/design/icons/icons-creating-filled-6@2x.png)

        The minimum gap between strokes should never be less than 1px.

      </DirectiveCard>

    </Grid.Cell>

  </Grid>
</Card>

</Stack>
