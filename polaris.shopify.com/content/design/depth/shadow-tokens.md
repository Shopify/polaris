---
title: Shadow Tokens
icon: ColorsMajor
showTOC: true
keywords:
  - design tokens
  - depth
  - shadow
---

# {frontmatter.title}

<Subnav />

<Stack gap="800">

<Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

            ## Primitive shadow token scales

            The primitive shadow tokens scale offers a versatile range of shadows that can be applied to components, providing a fundamental foundation for creating visual cues of depth in the UI. These tokens are categorized into three sets:

            1.  Elevation tokens: These tokens visually represent a shadow being cast on a surface below the element, effectively simulating a sense of elevation.
            2.  Inset tokens: Demonstrate an inner shadow creating the impression of an embedded element.
            3.  Bevel tokens: provide a dimensional appearance to an element, enhancing its perceived shape and structure.
                Each of these sets is declared with the shadow token group name. In addition, the scales offer comprehensive ranges in increments of 100, and the base value is set at 100

            </Box>

          </Grid.Cell>

          <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>

            ## TODO ADD IMAGE

          </Grid.Cell>
        </Grid>

  </Card>

  <Card>

    <Grid gap="400">
      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

          ## Component specific tokens

          Components such as buttons require component-specific shadows to visually exhibit their unique tactility. To achieve this button styling, component-specific shadow tokens are assigned to each variant of the button. These tokens reside in a separate token collection and should only be utilized for the specific component they are named after.

        </Box>

      </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 8, xl: 8}}>

        ## TODO ADD IMAGE

      </Grid.Cell>
    </Grid>

  </Card>

  <Card>

    <Grid gap="400">

      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

        ## Token pairing

        When combining the bevel token with elevation tokens, builders can achieve a desired visual distinction that is necessary to create contrast between an elevated surface and its bg. The bevel token adds dimensionality to the element, while elevation tokens provide a drop shadow effect that creates the perception of distance. To implement this pairing, assign the bevel token as a pseudo class with absolute positioning and set the mix-blend-mode CSS property to luminosity to create the desired effect.


        </Box>

      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 8, xl: 8}}>
        ## TODO ADD CODE SNIPPET
      </Grid.Cell>
    </Grid>

  </Card>
  <Card>

    <Grid gap="400">
      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>

        <Box padding="400">

        ## Polaris component shadows

        Components use specific shadow tokens. The following table can be a useful resource

        </Box>

      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 3, lg: 8, xl: 8}}>

| Polaris Component                                                                                                                                               | Shadow tokens                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Account connection Card<br/>Data table<br/>Empty states<br/>Fullscreen bar<br/>Index table<br/>Media card<br/>Resource list<br/>Setting toggle<br/>Top bar<br/> | `--p-shadow-100` <br/> `--p-shadow-bevel-100`       |
| Banner <br/> Callout card                                                                                                                                       | `--p-shadow-200` <br/> `--p-shadow-bevel-100` <br/> |
| Action list <br/> Option list <br/> Color picker <br/>Date picker <br/>Popover <br/>Tooltip                                                                     | `--p-shadow-300`<br/>`--p-shadow-bevel-100`<br/>    |
| Toast                                                                                                                                                           | `--p-shadow-400`<br/>`--p-shadow-bevel-100`<br/>    |
| Modal                                                                                                                                                           | `--p-shadow-600` <br/> `--p-shadow-bevel-100` <br/> |
| Search                                                                                                                                                          | `--p-shadow-600`                                    |

</Grid.Cell>

</Grid>

  </Card>
</Stack>
