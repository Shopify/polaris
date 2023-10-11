---
title: Typography
description: Typography is the art of arranging type in ways that provides innate hierarchy to UI.
showTOC: true
order: 7
keywords:
  - type styles
  - font sizes
  - fonts
icon: TypeMajor
hideChildren: true
status: New
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

## Typography defines hierarchy

Typography plays a crucial role in defining hierarchy within design. Variable weights convey different levels of importance, where bolder weights indicate greater significance.

Good type positioning also establishes visual prominence and emphasizes key information.

<Stack gap='400'>

![A series of cards in the admin, each introduced by a bold heading and medium weight body typography](/images/design/typography/typography-overview-01-hierarchy@2x.png)

<InlineGrid gap='400' columns={{xs: '1', md: '2'}}>
  <Do>

![A card with different levels of type presented in different weights, sizes and positions ](/images/design/typography/typography-overview-02-hierarchy-do@2x.png)

Use a combination of weight, size, [color](/design/colors/using-color#text) and positioning to define hierarchy.

  </Do>

  <Dont>
    ![The same card as before, but only using color to style all type elements](/images/design/typography/typography-overview-03-hierarchy-dont@2x.png)

    Rely only on color to define hierarchy.

  </Dont>
</InlineGrid>

</Stack>

## Typography defines purpose

Polaris assigns meaning to type based on its usage. Mono is used for code; tabular number stylesets are employed for numbers and currency amounts; and typescales are designed with UI design in mind.

<Stack gap='400'>

![A variety of cards, one showing a list of prices neatly aligned, another one showing monospace type for code, and another one showing type and icon pairings](/images/design/typography/typography-overview-04-purpose@2x.png)

<InlineGrid gap='400' columns={{xs: '1', md: '2'}}>
  <Do>

    ![Different currency amounts in the Shopify admin, all using tabular numbers](/images/design/typography/typography-overview-05-purpose-do@2x.png)

    Consistently style similar or repeating type in the UI.

  </Do>

  <Do>
    ![A list of products with an “add product” button that is style like a link](/images/design/typography/typography-overview-06-purpose-dont@2x.png)

    Repurpose or reinterpret known patterns in typography, especially when it comes to interactions.

  </Do>
</InlineGrid>

</Stack>
