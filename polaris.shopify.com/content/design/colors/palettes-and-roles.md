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
---

# Color &rarr; {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />
<Stack gap="8">

<Card>

  <Grid gap="4">

    <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 4, xl: 4}}>

      <Box className="text-extra-padding">

        ## Global palette

        The Polaris color palette includes 12 colors, each with 16 shades. These colors are assigned different roles in the Shopify admin to convey specific meanings and serve distinct purposes.

        The global palette is built using HSLuv Lightness values. HSLuv is a color space that stands for "Hue, Saturation, Lightness (L), and perceptual uniformity." It is designed to address the limitations of traditional color spaces, such as RGB and HSL, by providing more perceptually uniform and intuitive color representation. It aims to ensure that color transformations, such as lightening or darkening, are visually consistent and predictable to the human eye.

        Considering this, the Polaris color palette maintains uniformity in shades within each hue. Consequently, colors like Red 12 and Blue 12 will have identical contrast ratios when paired with the same color, such as Gray 01. This simplifies the process of styling color roles by easily substituting hues as necessary.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![A display of Polaris components like badges, menus and banners with different color roles](/images/design/colors/color-overview-purpose@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

<Card>

  <Grid gap="4">

    <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 4, xl: 4}}>

      <Box className="text-extra-padding">

      ## Color roles

      A color role is composed of a collection of tokens that represent different parts of the UI. Each color role follows the same logic for all tokens, but not all tokens are defined for each color role.

      Color roles like default will have all tokens defined, because the default color role offers the baseline color for all elements in the Shopify admin. Roles like critical or information will only have a selection of tokens defined, as these roles are usually applied to specific, smaller and more specialized components like badges or banners.

      More information about tokens and their usage can be found under Using color (link).

      </Box>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 8, xl: 8}}>

      ![A display of Polaris components like badges, menus and banners with different color roles](/images/design/colors/color-overview-purpose@2x.png)

    </Grid.Cell>

  </Grid>

</Card>

<Card>

  <Grid gap="4">

    <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 4, xl: 4}}>

      <Box className="text-extra-padding">

      ### Default

      The default role is used to style the entire Shopify admin and is considered to be the baseline theme for all experiences. This role defines default, secondary and tertiary visual hierarchy for a variety of components and are used when communicating default statuses, neutral messaging and common merchant data.

      </Box>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 8, xl: 8}}>

      ![A display of Polaris components like badges, menus and banners with different color roles](/images/design/colors/color-overview-purpose@2x.png)

    </Grid.Cell>

  </Grid>

</Card>

<Do
  img="../images/design/colors/color-overview-diminish-dont@2x.png"
  alt="A modal with a gray header and white button with red text that stops the user from navigating away from a page with unsaved changes"
>
  Use color to support different states merchants need to be informed about.
</Do>

<Grid gap="4">

  <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 4, xl: 4}}>

    <Box className="text-extra-padding">

    ### Default

    The default role is used to style the entire Shopify admin and is considered to be the baseline theme for all experiences. This role defines default, secondary and tertiary visual hierarchy for a variety of components and are used when communicating default statuses, neutral messaging and common merchant data.

    </Box>

  </Grid.Cell>

  <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 8, xl: 8}}>

    ![A display of Polaris components like badges, menus and banners with different color roles](/images/design/colors/color-overview-purpose@2x.png)

  </Grid.Cell>

</Grid>

</Stack>
