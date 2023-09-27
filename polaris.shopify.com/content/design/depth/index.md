---
title: Depth
description: Depth introduces a sense of realism, helps establish visual hierarchy, and creates focus.
keywords:
  - depth
  - visual hierarchy
  - focus
icon: TypeMajor
showTOC: true
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />
<Stack gap="800">
<Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Hierarchy

          Depth can effectively establish visual hierarchy. The higher an element sits in the Z scale, the more important it will seem. This enables merchants to understand the importance of different elements and guides their navigation through the interface.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 8}}>

      <DoDont>

        #### Do

        Use depth tactically, to differentiate between primary and secondary elements.


        #### Dont

        Overuse depth, as it can lead to a cluttered and confusing interface. Too many elements pulling attention can disorient merchants.

      </DoDont>
      <DoDont>

        #### Dont

        Use unnecessary depth to an element. The depth of an element should always be related to its importance or interactivity.

      </DoDont>
      <DoDont>

        #### Dont

        Allow elements to protrude outside of their parent containers. This disrupts the natural perception of depth and hierarchy, leading to a visually confusing interface. Instead, maintain the integrity of parent-child relationship in the layout for a cohesive depth perception.

      </DoDont>
      </Grid.Cell>

    </Grid>

</Card>
<Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Interactivity

          Depth indicates interactivity. Interactive elements like buttons or cards get more depth to signal to merchants that they can interact with such components.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 8}}>

      <DoDont>

        #### Do

        Use depth to indicate interactive elements, so it’s obvious what elements merchants can interact with.

        #### Dont

        Give static elements unnecessary depth, as this can mislead merchants to think they’re interactive.
    </DoDont>
    <DoDont>
        #### Do

        Apply intuitive changes to an element's perceived depth upon interaction, like pushing a button down. This provides visual feedback and intensifies the sense of tactility.

        #### Dont

        Apply unexpected changes to an element’s perceived depth. This causes disorientation and makes the interface feel ill-conceived.

      </DoDont>
      </Grid.Cell>

    </Grid>

  </Card>
<Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Focus

          Depth helps to guide the merchants' focus. By giving more depth to an element, you can guide the merchants' attention towards it.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 8}}>

      <DoDont>

        #### Do

        Use depth to highlight action and large pieces of information that overlay on top of other information. To ensure merchants see these first.


        #### Dont

        Use depth to create emphasis, or to draw attention to small/individual elements, as it distracts from the main content.
    </DoDont>
    <DoDont>
        #### Dont

        Rely solely on depth to create focus. Not all merchants perceive depth in the same way, so it's important to use a combination of techniques to ensure your design is accessible to everyone.

      </DoDont>
      </Grid.Cell>

    </Grid>

  </Card>
</Stack>
