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
    <Grid gap="400" areas={{
      xs: ['a a a a a a', 'b b b b b b'],
      lg: ['a a a a b b b b b b b b']
    }}>
        <Grid.Cell area="auto/a">

          <Box padding="400">
            Use a combination of shadows and layering to create a sense of realism and hierarchy in the interface, guiding merchants' attention and indicating interactivity.
          </Box>

        </Grid.Cell>

        <Grid.Cell area="auto/b">
          ![A card with search results, overlaying the remaining interface.](/images/design/depth/creating/depth-creating-1@2x.png)

        </Grid.Cell>

    </Grid>

  </Card>
  <Card>
    <Grid gap="400"
      areas={{
        xs: ['a a a a a a ', 'b b b b b b'],
        lg: ['a a a a b b b b b b b b']
      }}
    >
    <Grid.Cell area="a">
      <Box padding="400">

          ## Shadows & bevels

          Shadows and bevels create the illusion that an element is raised above the rest of the interface, indicating that it's interactive or important.

      </Box>
    </Grid.Cell>
    <Grid.Cell area="b">
      <Stack gap="400">
        <DoDont className="margin-considered-harmful">

          #### Do

          ![A piece of interface featuring a bevel effect on primary buttons and the main container.](/images/design/depth/creating/depth-creating-2@2x.png)

          Use shadows and bevels to indicate important interactions. This will make buttons and other important interactive elements appear more tactile, obvious, and inviting to click.

          #### Dont

          ![A table with a series of text fields and buttons with a notable bevel effect.](/images/design/depth/creating/depth-creating-3@2x.png)

          Overuse shadows or bevels, as they will make the interface look cluttered and confusing. They’re meant to be used sparingly and consistently.

        </DoDont>
        <Do>
          ![A series of cards with a consistent shadow effect.](/images/design/depth/creating/depth-creating-4@2x.png)

          Use consistent shadow and bevel styles across your interface, to maintain visual harmony and make the interface feel more cohesive.
        </Do>
        <Dont>
          ![Two cards with distinct shadows.](/images/design/depth/creating/depth-creating-5@2x.png)

          Use different styles for similar elements. This can confuse merchants about the hierarchy and interactivity of the elements.
        </Dont>
      </Stack>
    </Grid.Cell>
    </Grid>

  </Card>

  <Card>
    <Grid gap="400"
      areas={{
        xs: ['a a a a a a ', 'b b b b b b', 'c c c c c c'],
        lg: ['a a a a b b b b c c c c']
      }}
    >
      <Grid.Cell area="a">

        <Box padding="400">

          ## Lighting
          Lighting plays a crucial role in creating the illusion of depth. It reinforces interactivity and guides merchant's attention.

        </Box>

      </Grid.Cell>

      <Grid.Cell area="b">
        <DirectiveCard status="Tip">
          ![Two buttons, where the one being pressed is darked than the other.](/images/design/depth/creating/depth-creating-6@2x.png)

          Decrease the brightness of an element when it’s being pushed down in the Z index. When a button is pressed, it goes down.
        </DirectiveCard>
      </Grid.Cell>

      <Grid.Cell area='c'>
        <DirectiveCard status="Tip">
          ![A menu where the item selected featured a light background. ](/images/design/depth/creating/depth-creating-7@2x.png)

          Increase the brightness of an element when it’s being pushed up in the Z index. When a page is active, it goes up.
        </DirectiveCard>
      </Grid.Cell>
    </Grid>

  </Card>
  <Card>
    <Grid gap="400" areas={{
        xs: ['a a a a a a ', 'b b b b b b'],
        lg: ['a a a a b b b b b b b b']
    }}>
      <Grid.Cell area="a">

        <Box padding="400">

        ## Layering

        Layering can be used to organize elements and create a sense of hierarchy. By placing elements on different layers, you can indicate which elements are in focus or interactive.


        </Box>

      </Grid.Cell>
      <Grid.Cell area="b">
        <Stack gap="400">
          <Do>

            ![A snapshot of Shopify’s admin page, with 4 level being highlighted. Menu (-1), Background (0) Card with metrics (1) Drop down menu (2)](/images/design/depth/creating/depth-creating-8@2x.png)

            Use layering to organize the interface and guide merchant focus. Higher layers should be used for more important or interactive elements.

          </Do>
          <Dont>

            ![A series of cards with distinct shadows.](/images/design/depth/creating/depth-creating-9@2x.png)

            Use too many layers in one screen, as it can confuse merchants and make the interface difficult to navigate.

          </Dont>
          <DoDont className="margin-considered-harmful">

            #### Do
            ![A card with tasks, where the task in view features a gray background.](/images/design/depth/creating/depth-creating-10@2x.png)

            Keep most elements on the same layer to establish a visual baseline, and allow for purposeful use of layering, when necessary, to denote importance or interactivity.

            #### Dont
            ![A card with tasks, where the task in view features a drop shadow and a bevel effect.](/images/design/depth/creating/depth-creating-11@2x.png)

            Resort to layering as the initial tool for emphasis. Explore other visual techniques first to highlight elements without disrupting the layering system.

          </DoDont>
        </Stack>
      </Grid.Cell>
    </Grid>

  </Card>
  <Card>

    <Grid gap="400" areas={{
      xs: ['a a a a a a', 'b b b b b b'],
      lg: ['a a a a b b b b b b b b']
    }}>

      <Grid.Cell area="a">

        <Box padding="400">

          ## Containers
          Containers, even in flat design, enhance depth perception in an interface by establishing hierarchy and guiding attention. Grouping related elements in a container forms a visual "chunk" on its own layer, creating an illusion of depth.


          The distinct separation between the container and other elements, depending on the visual boundary, can suggest an indentation or elevation, further intensifying the sense of depth and spatial hierarchy.



        </Box>

      </Grid.Cell>
      <Grid.Cell area="b">
        <Stack gap="400">
          <DoDont className="margin-considered-harmful">

            #### Do
            ![A list of items with distinct labels and icons grouped within the same container.](/images/design/depth/creating/depth-creating-12@2x.png)

            Use containers to group related elements together. This makes the interface easier to understand and navigate.

            #### Dont
            ![A list of items with distinct labels and icons each housed in individual containers.](/images/design/depth/creating/depth-creating-13@2x.png)

            Use too many containers, as they can make the interface look too segmented, cluttered and confusing. Use them sparingly and only when necessary to highlight or downplay a group of information.

          </DoDont>
          <Do>
            ![The bottom of the search results card, featuring a grey background that contains secondary information.](/images/design/depth/creating/depth-creating-14@2x.png)

            Use a gray background to de-emphasize contained information. This will divert merchants’ attention towards more important information, as the muted background visually recedes, pushing the contained content into the background.
          </Do>
          <Do>
            ![A table with products, featuring an outline container and outline dividers between rows.](/images/design/depth/creating/depth-creating-15@2x.png)

            Use outlines to contain a group of information that needs to be emphasized. This will make the container stand out from the rest of the interface, drawing merchant’s attention to the grouped elements.
            The outlined container creates an illusion of depth, suggesting that the contained content is elevated above the primary interface layer.
          </Do>
          <Grid areas={{ xs: ['a a a a a a', 'b b b b b b'], lg: ['a a a a a a b b b b b b'] }}>
            <Grid.Cell area="a">
              <Dont>
                ![A table with products, featuring a yellow background for the first brown, and yellow outline for the main container.](/images/design/depth/creating/depth-creating-16@2x.png)

                Use bright or contrasting colors for container backgrounds or outlines, unless it’s a system message, as this will distract from the main content and create a cluttered appearance.
                System messages do require such emphasis to ensure they are noticed and understood.
              </Dont>
            </Grid.Cell>
            <Grid.Cell area="b">
              <Dont>
                ![A card with a footer with a gray background and a distinct bevel effect between the main content and the footer.](/images/design/depth/creating/depth-creating-17@2x.png)

                Use unique styles for containers. This will make the interface noisy and confuse merchants about the information hierarchy.
              </Dont>
            </Grid.Cell>
          </Grid>
        </Stack>
      </Grid.Cell>
    </Grid>

  </Card>

</Stack>
