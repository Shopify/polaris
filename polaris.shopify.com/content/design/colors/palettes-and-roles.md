---
title: Palettes and roles
order: 1
description: Color highlights important areas, communicates status, urgency, and directs attention.
keywords:
  - color role
  - color strategy
  - color use
  - black and white
  - grayscale
icon: ColorsMajor
---

# Color &rarr; {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

<Stack gap="8">

<Card>

    <Grid gap="4">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="4">

          ## Color has purpose

          The purpose of using color has to be clear. Color needs to support a message or a status that needs to be easily identifiable by merchants.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![A display of Polaris components like badges, menus and banners with different color roles](/images/design/colors/color-overview-purpose@2x.png)

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="4">

        Each usage of color within the Shopify admin is purposefully tied to a specific meaning. For instance, red signifies critical errors, green represents success messages, and blue is used to draw attention to tips and offers. Using color as decoration is exclusive to illustration.

        This deliberate color coding facilitates merchants in identifying which parts of the user interface require focus and distinguishes them from the default features provided by the Shopify admin.
        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>

        <Do img="/images/design/colors/color-overview-states-do@2x.png" alt="A list of badges that display paid, fulfilled, in progress, partially paid and unfulfilled states">
        Use color to support different states merchants need to be informed about.
        </Do>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>

        <Dont alt="A card with a pink border and a pink $99 trying to entice the merchant" img="/images/design/colors/color-overview-decorate-dont@2x.png">
        Use color to decorate or to distract merchants from performing tasks.
        </Dont>

      </Grid.Cell>

    </Grid>

  </Card>

  <Card>

    <Grid gap="4">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="4">

          ## Color has impact

          The Shopify admin interface adopts a black and white color scheme, intentionally creating a neutral backdrop. By employing this monochromatic design, elements that incorporate color gain heightened visual impact and prominence.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Cards in a grayscale interface with colorful badges that serve as headings](/images/design/colors/color-overview-impact@2x.png)

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="4">

          The intentional design of the overall interface in black and white enables strategically positioned and carefully selected elements to grab merchants' attention. By utilizing color purposefully, the focus is directed towards crucial information, actions, and visual cues.

          Create impact when using color by using appropriate shades to convey the importance of what is being communicated to merchants.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>

        <Do alt="A modal with a bright red header and bright red button that stops the user from navigating away from a page with unsaved changes" img="/images/design/colors/color-overview-vivid-do@2x.png">
        Use strong, vivid colors to grab attention to things that matter most.
        </Do>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>


        <Dont img="/images/design/colors/color-overview-diminish-dont@2x.png" alt="A modal with a gray header and white button with red text that stops the user from navigating away from a page with unsaved changes">
        Contradict or diminish messaging by using subdued colors or grayscale.
        </Dont>


      </Grid.Cell>

    </Grid>

  </Card>

  <Card>

    <Grid gap="4">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="4">

          ## Color is accessible

          Polaris offers consistent color palettes for each color role. This means that each color is assigned a specific relationship within the overall palette.

          These color relationships ensure that color contrasts remain consistent across every application of color and ensure proper legibility and understanding when it comes to combining texts with color and interactive shapes with various backgrounds.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![A dialog box with various elements highlighted where color combinations used for these elements passes AA and AAA accessibility standards for contrast](/images/design/colors/color-overview-accessible@2x.png)

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="4">

          Colors are meant to be easily understood and read by all merchants. Sufficient contrast makes things easier to find, identify and interact with.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>
        <Do alt="An orange badge with an alert icon and text label in a table column that indicates that an item is almost out of stock" img="/images/design/colors/color-overview-conjunction-do@2x.png">
        Use color in conjunction with other discernible elements to amplify the message.
        </Do>
      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 4, xl: 4}}>

        <Dont img="/images/design/colors/color-overview-alone-dont@2x.png" alt="A text label in orange in a table column that indicates that an item is almost out of stock">
        Use color alone to convey meaning
        </Dont>

      </Grid.Cell>

    </Grid>

  </Card>

</Stack>
