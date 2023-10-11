---
title: Density
order: 2
icon: Columns3Minor
keywords:
  - layout
  - layout components
  - structure
  - position
  - stack
  - columns
  - bleed
  - card
  - box
  - inline
  - divider
  - responsive
  - spacing
description: The admin is high density by default, but the level of density can range depending on the merchant's task.
---

# Layout &rarr; {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

<Stack gap="800">
    <Card>
        <Grid gap="400">
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            <Box padding="400">

                ## High density

Information-rich interfaces, like index pages or data tables, require high-density layouts for efficiency. By presenting information in a denser format, merchants can quickly access and compare data, enhancing the effectiveness of the Shopify admin.

</Box>

            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Do>
                    ![An index table with each row divided by a line](/images/design/layout/layout-density-01-high-density-do@2x.png)

                    Use divider lines and surface colors to create clear delineation between sections in a high density component.
                </Do>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            <Box padding="400">
                Another way to create visual zones in high density layouts is to [use different surface colors](/design/colors/using-color#surface). Secondary colors can be used to create visual hierarchy within a high density component, and to guide merchants to the data that matters most.
            </Box>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Do>
                    ![A card with inset surfaces of different colors](/images/design/layout/layout-density-02-high-density-inset-do@2x.png)

                    Use different surface colors to style inset surfaces and create visual divisions without using lines.
                </Do>
            </Grid.Cell>
        </Grid>
    </Card>

    <Card>
        <Grid gap="400">
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            <Box padding="400">

                ### Grid and vertical divisions

                Dividing surfaces vertically and in a grid pattern also offers a way to increase density. This type of visual pattern is better suited for selections or data visualization and should be used accordingly. These divisions are made by using different surface colors instead of using line dividers.
            </Box>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Do>
                    ![A grid layout depicting a packaging selection tool](/images/design/layout/layout-density-03-high-density-selection-grid-do@2x.png)

                    Divide surfaces into a grid pattern for complex components that expect an action, like a selection.
                </Do>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Dont>
                    ![A card split in the middle with packaging options on the left in a list and customer details on the right](/images/design/layout/layout-density-04-high-density-vertical-dont@2x.png)

                    Divide and organize surfaces vertically by creating columns of unrelated content.
                </Dont>
            </Grid.Cell>
        </Grid>
    </Card>

     <Card>
        <Grid gap="400">
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            <Box padding="400">

                ### Action components use high density

                Smaller components, like option lists or popovers, are built with high density in mind. Because their main purpose is to offer a set of actions to the merchant, they need to feel small and efficient.

                Effectively designed action components give the [feeling of a pro tool](/design/pro-design-language) in the Shopify admin and increase efficiency when using different features.
            </Box>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Do>
                    ![A popover with different sorting options, all shown in a tight list](/images/design/layout/layout-density-05-high-density-action-do@2x.png)

                    Use high density consistently when offering lists of options to choose or select from.
                </Do>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Dont>
                    ![A list of collections to choose from, with one section using images and the other using a list](/images/design/layout/layout-density-06-high-density-sudden-change-dont@2x.png)

                    Suddenly change density in an action component. Always offer the most condensed option possible instead.
                </Dont>
            </Grid.Cell>
        </Grid>
    </Card>

    <Card>
        <Grid gap="400">
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            <Box padding="400">

                ## Low density

                Low density interfaces are best suited for focused editing interfaces, like a product detail page. These interfaces offer larger hit targets, wordier buttons, and are best suited to specialized UI that offers uncommon actions in the Shopify admin.

                Because low density interfaces offer more space, there is more for the merchant to analyze before taking action. Low density interfaces can also contain high density components, like a complex text editor within a card that serves to edit a product title and description.

                Top-to-bottom visual rhythm is often used to create a linear and predictable layout that is easy for merchants to understand.
            </Box>

            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Do>
                    ![A detail shot of a product detail page](/images/design/layout/layout-density-07-low-density-do@2x.png)

                    Low density layouts are useful when switching contexts in the same page often, which happens often in the Shopify admin.
                </Do>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Dont>
                    ![A product variant detail page with a vertical division between options and media](/images/design/layout/layout-density-08-low-density-grid-dont@2x.png)

                    Use grid or vertical dividers to create low density layouts. These can be confusing and hard to understand in a focused editing UI.
                </Dont>
            </Grid.Cell>
        </Grid>
    </Card>

    <Card>
        <Grid gap="400">
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            <Box padding="400">

                ### Switching contexts

                Cards are the best way to switch context in low density layouts. Each card can be specialized in a set of features that requires the merchant to recenter their focus.
            </Box>

            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Do>
                    ![The description card in the product detail page followed by the media card](/images/design/layout/layout-density-09-low-density-switch-context-do@2x.png)

                    Split each context into its own card.
                </Do>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 4}}>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, lg: 8}}>
                <Dont>
                    ![A description box followed by a data table describing the size and weight of each image](/images/design/layout/layout-density-10-low-density-mix-density-dont@2x.png)

                    Mix low-density information with a high-density component in the same card.
                </Dont>
            </Grid.Cell>
        </Grid>
    </Card>

</Stack>
