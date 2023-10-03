---
title: Icons
description: Icons enhance an experience by providing intuitive and efficient navigation, conveying information concisely, and making it more visually appealing.
showTOC: true
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

{/* Clear card */}

<Stack gap='4'>

<Card>

  <Grid gap="4" >
    
    {/* Clear */}
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
    
      ## Clear

      Icons are simple and effectively convey their intended meaning. Avoid unnecessary complexity that makes the icon difficult to recognize. The goal is to communicate quickly and clearly.

    </Grid.Cell>

    {/* Do */}
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

      <Do>
        ![](/images/design/icons/icons-overview-clear-1@2x.png)

        Draw simple objects that are easy to identify.

      </Do>

    </Grid.Cell>

    {/* Dont */}
    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

      <Dont>

        ![](/images/design/icons/icons-overview-clear-2@2x.png)

        Embellish the icon with unnecessary details.

      </Dont>

    </Grid.Cell>

  </Grid>

</Card>

{/* Consistent card */}

<Card>

  <Grid gap='4'>
   {/* Consistent */}
   <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

     ## Consistent
     Icons follow a cohesive visual style across the user interface. This includes a consistent use of line weights, shapes, dimensions, perspectives, and general style. Design consistency enables users to quickly recognize functionality and navigate the interface more intuitively.

   </Grid.Cell>
   {/* Do */}
   <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 9, lg: 8, xl: 8}}>

     <Stack gap='4'>

      <Do>

        ![](/images/design/icons/icons-overview-consistent-1@2x.png)

        Reuse parts of other icons in the set to maintain visual harmony across all icons.

      </Do>

      <InlineGrid gap='4' columns='2'>

        <Do>

          ![](/images/design/icons/icons-overview-consistent-2@2x.png)

          Use universally recognized icons.


        </Do>

        <Dont>

          ![](/images/design/icons/icons-overview-consistent-3@2x.png)

          Reinvent the way an object is represented.

        </Dont>


      </InlineGrid>

     </Stack>

   </Grid.Cell>
  </Grid>

</Card>

{/* Universal */}

<Card>

  <Grid gap='4'>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

    ## Universal

    Universally recognized symbols and metaphors ensure icons are easily understood by a broad user base.

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

      <Do>
        ![](/images/design/icons/icons-overview-universal-1@2x.png)

        Leverage universally recognized symbols and metaphors to create new icons.

      </Do>
    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

      <Dont>
        ![](/images/design/icons/icons-overview-universal-2@2x.png)

        Rely on cultural-specific, niche symbols or outdated metaphors may not be understood by all users.

      </Dont>
    </Grid.Cell>

  </Grid>
</Card>

</Stack>
