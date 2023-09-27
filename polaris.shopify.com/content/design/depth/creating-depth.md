---
title: Creating Depth
icon: ColorsMajor
showTOC: true
keywords:
  - depth
  - depth strategy
  - shadow use
  - bevel use
---

# {frontmatter.title}

<Subnav />

<Stack gap="800">

<Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

         Use a combination of shadows and layering to create a sense of realism and hierarchy in the interface, guiding merchants' attention and indicating interactivity.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ## TODO ADD IMAGE

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Shadows & bevels

          Shadows and bevels create the illusion that an element is raised above the rest of the interface, indicating that it's interactive or important.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 8, xl: 8}}>

        <DoDont>

          #### Do

          Use shadows and bevels to indicate important interactions. This will make buttons and other important interactive elements appear more tactile, obvious, and inviting to click.

          #### Dont

          Overuse shadows or bevels, as they will make the interface look cluttered and confusing. They’re meant to be used sparingly and consistently.

        </DoDont>

        <DoDont>

          #### Do

          Use consistent shadow and bevel styles across your interface, to maintain visual harmony and make the interface feel more cohesive.

          #### Dont

          Use different styles for similar elements. This can confuse merchants about the hierarchy and interactivity of the elements.

        </DoDont>

      </Grid.Cell>
    </Grid>

  </Card>

  <Card>

    <Grid gap="400">
      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Lighting
          Lighting plays a crucial role in creating the illusion of depth. It reinforces interactivity and guides merchant's attention.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>
        <DirectiveCard status="Tip">
          Decrease the brightness of an element, when it’s being pushed down in the Z index. When a button is pressed, it goes down.
        </DirectiveCard>
      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>
        <DirectiveCard status="Tip">
          Increase the brightness of an element, when it’s being pushed up in the Z index. When a page is active, it goes up.
        </DirectiveCard>
      </Grid.Cell>

    </Grid>

  </Card>

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

        ## Layering

        Layering can be used to organize elements and create a sense of hierarchy. By placing elements on different layers, you can indicate which elements are in focus or interactive.


        </Box>

      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 8, xl: 8}}>
        <DoDont>

          #### Do

          Use layering to organize the interface and guide merchant focus. Higher layers should be used for more important or interactive elements.

          #### Dont

          Use too many layers in one screen, as it can confuse merchants and make the interface difficult to navigate.

        </DoDont>
        <DoDont>

          #### Do
          Keep most elements on the same layer to establish a visual baseline, and allow for purposeful use of layering when necessary to denote importance or interactivity.

          #### Dont
          Resort to layering as the initial tool for emphasis. Explore other visual techniques first to highlight elements without disrupting the layering system.

        </DoDont>
      </Grid.Cell>
    </Grid>

  </Card>
  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Containers
          Containers, even in flat design, enhance depth perception in an interface by establishing hierarchy and guiding attention. Grouping related elements in a container forms a visual "chunk" on its own layer, creating an illusion of depth.


          The distinct separation between the container and other elements, depending on the visual boundary, can suggest an indentation or elevation, further intensifying the sense of depth and spatial hierarchy.



        </Box>

      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 8, xl: 8}}>
        <DoDont>

          #### Do

          Use containers to group related elements together. This makes the interface easier to understand and navigate.

          #### Dont

          Use too many containers, as they can make the interface look too segmented, cluttered and confusing. Use them sparingly and only when necessary to highlight or downplay a group of information.

        </DoDont>
        <DoDont>

          #### Do
          Use a gray background to deemphasize contained information. This will divert merchants’ attention towards more important information, as the muted background visually recedes, pushing the contained content into the background.

          #### Dont

          Use bright or contrasting colors for container backgrounds or outlines, unless it’s a system message, as this will distract from the main content and create a cluttered appearance.

          System messages do require such emphasis to ensure they are noticed and understood.

        </DoDont>
        <DoDont>
          #### Do
          Use outlines to contain a group of information that needs to be emphasized. This will make that container stand out from the rest of the interface, drawing merchant’s attention to the grouped elements.

          The outlined container creates an illusion of depth, suggesting that the contained content is elevated above the primary interface layer.

          #### Dont
          Use unique styles for containers. This will make the interface noisy and confuse merchants about the information hierarchy.
        </DoDont>
      </Grid.Cell>
    </Grid>

  </Card>

</Stack>
