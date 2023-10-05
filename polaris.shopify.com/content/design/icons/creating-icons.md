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

# Icons &rarr; {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

## Icon layout

<InlineGrid gap="400" columns={{xs: '1', md: '2'}}>
  <DirectiveCard>

    ![A 20 pixels square grid with an icon in a 14 pixels square.](/images/design/icons/icons-creating-layout-1@2x.png)

    The icon container is 20x20 px, but the content of an icon should be
    confined within the 14 x 14 px.

  </DirectiveCard>
  <DirectiveCard>

    ![A 20 pixels square grid with an icon in a 14 pixels square, with an element sticking out slightly.](/images/design/icons/icons-creating-layout-2@2x.png)

    Exceptionally, if the icon requires more visual prominence, or more space to
    read effectively, the content can expand beyond that, however, no part of
    the icon should exceed 16 x 16 px

  </DirectiveCard>

</InlineGrid>

## Keylines

<InlineGrid gap="400" columns={{xs: '1', md: '2'}}>
  <DirectiveCard>

    ![Four icons that fit inside the following grids: 13x13 pixels square, 14x14 pixels circle, 14x12 pixels rectangles, horizontal and vertical.](/images/design/icons/icons-creating-keylines-1@2x.png)

    The overall shape of an icon can vary from a circle to a square, or from a tall rectangle to a wide one. So all icons have the same visual weight, always start with the following keylines.

  </DirectiveCard>
  <DirectiveCard>

    ![Four icons that stick our slightly from the the following grids: 13x13 pixels square, 14x14 pixels circle, 14x12 pixels rectangles, horizontal and vertical.](/images/design/icons/icons-creating-keylines-2@2x.png)

    The guidelines are a starting point, not a hard constraint. If it makes the concept stronger or keeps the icon optically aligned, it’s ok to deviate.

  </DirectiveCard>

</InlineGrid>

## General Rules

<Stack gap='400'>
  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>
    <Do>

      ![An archive box and a building represented in two dimensions. ](/images/design/icons/icons-creating-rules-1@2x.png)

      Icons are two-dimensional, and objects face forward.

    </Do>

    <Dont>

      ![An archive box and a building represented with a perspective. ](/images/design/icons/icons-creating-rules-2@2x.png)

      Use perspective and 3D objects

    </Dont>

  </InlineGrid>

  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>
    <DirectiveCard status="Caution">

      ![A package and a globe represented with slight hints of a third dimension.](/images/design/icons/icons-creating-rules-3@2x.png)

      Subtle hints of a third dimension are acceptable when necessary for
      conceptual clarity.

    </DirectiveCard>

    <Do>
      ![A presentation board icon centered in a 20 pixel square.](/images/design/icons/icons-creating-rules-4@2x.png)

      Center icon in their container.
    </Do>

  </InlineGrid>
  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>

    <Do>
      ![Three simple icons made with simple geometric shapes representing a smile, a scroll and a page](/images/design/icons/icons-creating-rules-5@2x.png)

      Bold and stylized icons.

    </Do>

      <Dont>

        ![Three icons made with organic shapes and small details representing a pin, a bell and a christmas tree.](/images/design/icons/icons-creating-rules-6@2x.png)

        Use small details and organic shapes.

      </Dont>

  </InlineGrid>

  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>

    <Do>

      ![A shopping cart with solid speed lines behind. ](/images/design/icons/icons-creating-rules-7@2x.png)

      Use a consistent visual style, stroke weight and only one color.

    </Do>

    <Dont>

      ![A shopping cart with semi-transparent speed lines behind.](/images/design/icons/icons-creating-rules-8@2x.png)

      Use transparency.

    </Dont>

  </InlineGrid>
</Stack>

{/* Filled vs outlined */}

## Filled vs Outlined

Outline icons are the default. Filled icons are reserved to navigation only.

<Stack gap='400'>
  ![Shopify’s admin interface with search open, showing a few results that use different icons like a person, a tag, or an inbox, to differentiate the types of results.](/images/design/icons/icons-creating-filled-vs-outline-1@2x.png)

  <InlineGrid gap="400" columns={{xs: '1', md: '3'}}>

    <Do>
      ![A settings navigation menu with icons differentiating each item in the menu. All icons are filled expect for the one selected that is outlined.](/images/design/icons/icons-creating-filled-vs-outline-2@2x.png)

      Use filled icons as navigation.

    </Do>

    <Do>
      ![A filled icons with a pin.](/images/design/icons/icons-creating-filled-vs-outline-3@2x.png)

      Use filled icons for semi-permanent selected states, like pinning an app.

    </Do>

    <Dont>
      ![A filled icon within a blue badge.](/images/design/icons/icons-creating-filled-vs-outline-4@2x.png)

      Use filled icons to create emphasis.

    </Dont>

  </InlineGrid>
</Stack>

### Designing outlined icons

<Stack gap='400'>

  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>

    <DirectiveCard>

      ![An inbox icon where the outline stroke is highlighted.](/images/design/icons/icons-creating-outline-1@2x.png)

      Stroke weight is 1.5px

    </DirectiveCard>

    <DirectiveCard>

      ![An inbox icon where the alignment with the pixel grid is highlighted. ](/images/design/icons/icons-creating-outline-2@2x.png)

      Since the stroke has half a pixel, one side of the stroke should always be aligned with the pixel grid.

    </DirectiveCard>

  </InlineGrid>

  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>

    <DirectiveCard>

      ![A clock icon highlighting the alignment with 0.25 pixels increments.](/images/design/icons/icons-creating-outline-3@2x.png)

      Exceptions are allowed for optical adjustments, as long as they fall on 0.25 px increments.

    </DirectiveCard>

    <DirectiveCard>

      ![A Shopping card icons with the stroke terminals highlighted.](/images/design/icons/icons-creating-outline-4@2x.png)

      Terminals are round, even when a shape cuts out into another.

    </DirectiveCard>

  </InlineGrid>
  <InlineGrid gap="400" columns={{xs: '1', md: '3'}}>

    <DirectiveCard>

      ![A calendar, an inbox and a shop icon with the corner radius highlighted. 3 pixels for the calendar, 2 pixels for the inbox and 1 pixel for the inbox.](/images/design/icons/icons-creating-outline-5@2x.png)

      Corner radius can go from 1 px to 3 px, depending on the object roundness. Joins must be rounded, and sharp corners are not allowed, except for intersections and cutouts.

    </DirectiveCard>

    <DirectiveCard>

      ![Six outline icons with small filled object highlighted, like a credit card that is made out of outlines and an icon that is filled.](/images/design/icons/icons-creating-outline-6@2x.png)

      Filled shapes can be used, only in really small objects, like a dot in an exclamation point.

    </DirectiveCard>

    <DirectiveCard>

      ![An icons with a hand pressing a button, where the gaps between the button and the hand. ](/images/design/icons/icons-creating-outline-7@2x.png)

      The minimum gap between strokes should never be less than 1px.

    </DirectiveCard>

  </InlineGrid>

### Designing filled icons

  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>

    <DirectiveCard>

      ![A filled icon overlapping an outlined icon.](/images/design/icons/icons-creating-filled-1@2x.png)

      Filled icons should align closely to their outline pairs. They don’t need to be a pixel perfect match, but they must have a similar visual weight, and the transition from one to the other must feel smooth.

    </DirectiveCard>

    <DirectiveCard>

      ![A tag, a person and a flower icons made of simple shapes.](/images/design/icons/icons-creating-filled-2@2x.png)

      Icons are made out of contiguous shapes. Ideally one, but it’s possible to go up to three, when required for clarity.

    </DirectiveCard>

  </InlineGrid>

  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>

    <DirectiveCard>

      ![Two icons with the stroke weight being highlighted.](/images/design/icons/icons-creating-filled-3@2x.png)


      Stroke weight is 1.5 px, but is reduced to 1.25 px when used inside a shape as a cut-out. Shapes must align with the pixel grid.

      Exceptions are allowed for optical adjustments, as long as they fall on 0.25 px increments.

    </DirectiveCard>

    <DirectiveCard>

      ![A shopping cart icon with the stroke terminals being highlighted, and a wallet icon with cutouts and intersection angles highlighted.](/images/design/icons/icons-creating-filled-4@2x.png)

      Terminals are round.

      Corner radius can go from 1 px to 3 px, depending on the object roundness. Joins must be rounded, and sharp corners are not allowed, except for intersections and cutouts.

    </DirectiveCard>

  </InlineGrid>

  <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>

    <DirectiveCard>

      ![Two arrow icons with the stroke being highlighted.](/images/design/icons/icons-creating-filled-5@2x.png)

      If it’s impossible to fill the outline icon, a 2px stroke can be used as a filled version.

    </DirectiveCard>

    <DirectiveCard>

      ![An icon with a person and a key, where the gap between the two elements is highlighted.](/images/design/icons/icons-creating-filled-6@2x.png)

      The minimum gap between strokes should never be less than 1px.

    </DirectiveCard>

  </InlineGrid>
</Stack>
