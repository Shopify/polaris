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
icon: Colors
---

# Color &rarr; {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

<Stack gap="800">

<Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Global palette

          The Polaris color palette includes 12 colors, each with 16 shades. These colors are assigned different roles in the Shopify admin to convey specific meanings and serve distinct purposes.

          The global palette is built using HSLuv Lightness values. HSLuv is a color space that stands for "Hue, Saturation, Lightness (L), and perceptual uniformity." It is designed to address the limitations of traditional color spaces, such as RGB and HSL, by providing more perceptually uniform and intuitive color representation. It aims to ensure that color transformations, such as lightening or darkening, are visually consistent and predictable to the human eye.

          Considering this, the Polaris color palette maintains uniformity in shades within each hue. Consequently, colors like Red 12 and Blue 12 will have identical contrast ratios when paired with the same color, such as Gray 1. This simplifies the process of styling color roles by easily substituting hues as necessary.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        <Colors/>

      </Grid.Cell>

    </Grid>

  </Card>

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Color roles

          A color role is composed of a collection of tokens that represent different parts of the UI. Each color role follows the same logic for all tokens, but not all tokens are defined for each color role.

          Color roles like `default` will have all tokens defined, because the default color role offers the baseline color for all elements in the Shopify admin. Roles like `critical` or `information` will only have a selection of tokens defined, as these roles are usually applied to specific, smaller and more specialized components like badges or banners.

          More information about tokens and their usage can be found under [Using color](/design/colors/using-color).

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Color role schemas](/images/design/colors/color-palettes-roles-roles@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Default

          The default role is used to style the entire Shopify admin and is considered to be the baseline theme for all experiences. This role defines default, secondary and tertiary visual hierarchy for a variety of components and are used when communicating default statuses, neutral messaging and common merchant data.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Visual of default colors being used](/images/design/colors/color-palettes-roles-default@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A card on a background with customer information](/images/design/colors/color-palettes-roles-default-do@2x.png)

      Use the default role for the default admin experience and messaging. Use secondary and tertiary for any additional details.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A card that has all secondary roles applied to it](/images/design/colors/color-palettes-roles-default-dont@2x.png)

      Use secondary and tertiary tokens for main default messaging.
      </Dont>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A card with different sections within that use secondary and tertiary surface colors to create visual separation](/images/design/colors/color-palettes-roles-default-secondary-do@2x.png)

      Use secondary and tertiary colors to create visual separation within complex components.
      </Do>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Brand

          Brand is used to pull additional focus on main actions in the UI. This role is used across the admin to guide merchants to the most intended interactions when many options are available.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Brand color palette](/images/design/colors/color-palettes-roles-brand@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A card with multiple actions, the main one being in the primary color theme and the others being secondary and tertiary](/images/design/colors/color-palettes-roles-brand-do@2x.png)

      Use brand color to guide merchants to a primary action, especially with default, secondary or tertiary roles.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A card with multiple primary buttons, each with different actions](/images/design/colors/color-palettes-roles-brand-dont@2x.png)

      Use multiple brand roles in the same area, this can confuse merchants as to which action is the most appropriate in the current context.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Info

          Info is used to convey important bits of information in the admin. Info is the catch-all color role when it comes to giving more attention to information that can benefit the merchant, like tips, promotions, or incentives.


        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Info color palette](/images/design/colors/color-palettes-roles-info@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A card that has a “First month free” badge using the info color role](/images/design/colors/color-palettes-roles-info-do@2x.png)

      Use info to grab attention on information that is not part of the typical admin experience.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A card with a title and text that are using the info color role just for decoration](/images/design/colors/color-palettes-roles-info-dont@2x.png)

      Use info on multiple elements that need attention in the same component. This dilutes attention on what matters most.
      </Dont>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A banner that shares a warning message that needs immediate action](/images/design/colors/color-palettes-roles-info-banner-dont@2x.png)

      Use info to share statuses or messages that require immediate attention from the merchant.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Success

          Success is used to confirm that an action has been completed successfully. Success can also be used to convey confirmation messages or statuses that are positive and that do not require any immediate action from the merchant.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Success color palette](/images/design/colors/color-palettes-roles-success@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A success message appearing because of a successful interaction](/images/design/colors/color-palettes-roles-success-do@2x.png)

      Use success to tell merchants that everything is OK.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A success badge used above a title to denote a special, limited time offer](/images/design/colors/color-palettes-roles-success-dont@2x.png)

      Use success to entice merchants or to share special offers.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Caution

          Caution is used to show information that does not need immediate attention from merchants, as well as incomplete or unstarted statuses. Caution is often used before a piece of information becomes more severe.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Caution color palette](/images/design/colors/color-palettes-roles-caution@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A caution badge that shows what products are unfulfilled](/images/design/colors/color-palettes-roles-caution-do@2x.png)

      Use caution to share statuses that have stalled or have not started, but are not blocked due to errors.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A caution badge that announces an new feature in the admin](/images/design/colors/color-palettes-roles-caution-dont@2x.png)

      Use caution for announcements.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Warning

          Warning is used to tell merchants that something needs their attention. Warning is also used to convey statuses that are in-progress, pending, or that could require merchant intervention. Warning is the strongest, non-blocking color role in the admin.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Warning color palette](/images/design/colors/color-palettes-roles-warning@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A warning badge used for showing partially paid and partially fulfilled statuses](/images/design/colors/color-palettes-roles-warning-do@2x.png)

      Use warning for elements that require merchant intervention.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A warning banner that announces that this section of the admin is under construction and it’s coming soon](/images/design/colors/color-palettes-roles-warning-dont@2x.png)

      Use warning for “under construction” or “coming soon” messaging.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Critical

          Critical is used as the color of highest importance. Elements using critical must convey messaging that implies that an action is impossible, blocked, or has resulted in an error.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Critical color palette](/images/design/colors/color-palettes-roles-critical@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A form field that has missing content resulting in an error](/images/design/colors/color-palettes-roles-critical-do@2x.png)

      Use critical when the UI calls for immediate action or errors in the UI.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A critical colored icon of a heart used to show a liked product](/images/design/colors/color-palettes-roles-critical-dont@2x.png)

      Use critical for less important, non-actionable or contradicting messaging.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Magic

          Magic is used on elements that denote the usage of artificial intelligence or any other type of automation technology that saves merchant’s time while performing tasks.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Magic color palette](/images/design/colors/color-palettes-roles-magic@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A magic indicator to generate text for the description of a product](/images/design/colors/color-palettes-roles-magic-do@2x.png)

      Use magic for UI like the Sidekick icon or the Shopify Magic indicator.

      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A card styled entirely with magic, including borders shadows](/images/design/colors/color-palettes-roles-magic-dont@2x.png)

      Use magic as a “pop of color” to differentiate elements in the admin, or to present new features.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Emphasis

          The emphasis color role is used to indicate areas of focus within the UI and to highlight active elements in editors.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Emphasis color palette](/images/design/colors/color-palettes-roles-emphasis@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![The theme editor with a focused element ready to be edited](/images/design/colors/color-palettes-roles-emphasis-do@2x.png)

      Use emphasis to show merchants what is currently selected in editors like the theme editor.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A non-interactive card with an emphasis colored outline](/images/design/colors/color-palettes-roles-emphasis-dont@2x.png)

      Use emphasis to pivot a merchant’s attention to content that is not interactive.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Transparent

          Transparent is used on elements that have low visual affordance, and to minimize visual noise in information-heavy interfaces. This color is mainly used on smaller elements that have secondary roles.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Transparent color palette](/images/design/colors/color-palettes-roles-transparent@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A list of “Edit” and “Delete” transparent icon buttons  in a product list](/images/design/colors/color-palettes-roles-transparent-do@2x.png)

      Use transparent on elements that are repeating across the admin, like edit buttons.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A card with only transparent buttons at the bottom right corner](/images/design/colors/color-palettes-roles-transparent-dont@2x.png)

      Use the transparent color role on elements that require higher affordances like buttons that have text labels.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Inverse

          The inverse color role offers the possibility of styling elements in situations where a darker theme is necessary. Inverse is used sparingly in the admin, and on specific elements that frame the Shopify admin, like the top bar.


        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Inverse color palette](/images/design/colors/color-palettes-roles-inverse@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![The admin’s top bar](/images/design/colors/color-palettes-roles-inverse-do@2x.png)

      Use inverse on larger elements, like the top bar.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A notification for a special offer in the bottom right of the admin window](/images/design/colors/color-palettes-roles-inverse-dont@2x.png)

      Use inverse to grab a merchant’s attention on a specific element.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Card>

  <Box padding="400">

    ## Specialized roles

    Specialized roles are used in specific components that require detailed visual distinctions for a variety of reasons, like accessibility and high complexity components.

  </Box>

</Card>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Input

          The input color role is reserved for form elements. Input ensures that form elements will adhere to WCAG color contrast accessibility standards and makes forms look uniform across the admin.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Input color palette](/images/design/colors/color-palettes-roles-input@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![A form with a text input and complex select box](/images/design/colors/color-palettes-roles-input-do@2x.png)

      Use the input color role on form elements, or elements that behave like other form elements, like complex select boxes.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![A card with a button styled with input colors](/images/design/colors/color-palettes-roles-input-dont@2x.png)

      Use the input color role outside of a form. This can confuse merchants into thinking an element is part of a form when it isn’t.
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

<Stack gap="400">

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ### Nav

          Nav colors are reserved for the Shopify admin menu. The menu consists of specialized elements that are purpose-built to offer the best navigation experience, and therefore require a specific set of colors defined in the nav color role.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

        ![Nav color palette](/images/design/colors/color-palettes-roles-nav@2x.png)

      </Grid.Cell>

    </Grid>

  </Card>

  <Grid gap="400">

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Do>
      ![The sidebar navigation of the admin](/images/design/colors/color-palettes-roles-nav-do@2x.png)

      Use nav colors only for the Shopify admin menu, in all levels of navigation.
      </Do>

    </Grid.Cell>

    <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 6, xl: 6}}>

      <Dont>
      ![Tabs styled with navigation colors on top of an index page](/images/design/colors/color-palettes-roles-nav-dont@2x.png)

      Use nav colors for other navigational elements, like tabs or links. These should use the [default color role](/design/colors/palettes-and-roles#default).
      </Dont>

    </Grid.Cell>

  </Grid>

</Stack>

</Stack>
