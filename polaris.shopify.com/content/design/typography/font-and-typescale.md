---
title: Font and Typescale
description: Typography is the art of arranging type in ways that provides innate hierarchy to UI.
showTOC: true
keywords:
  - type styles
  - font sizes
  - fonts
icon: TypeMajor
hideChildren: true
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

## Font

The Shopify admin utilizes the Inter font, an open-source variable font that offers adjustable knobs for fine-tuning font weight and slant.

For languages where Inter doesn’t offer a complete set of glyphs, the admin employs the system font to ensure proper rendering and compatibility.

![A showcase of Inter, an open source font used by the Shopify admin]()

### Mono

In code applications, the system mono font is used consistently. Use the mono font in all instances where there is any type of reference to code.

![A showcase of a monospace font, in code blocks and editable text fields in the admin]()

<InlineGrid gap='2' columns={{xs: '1', lg: '3'}}>
  <Do>

    ![An editable code block in the admin with mono as its font]()

    Always use mono font in any place, like text inputs, where code is expected.

  </Do>

  <Dont>
    ![A table of products with their prices, but the prices are styled with a mono font instead of tabular numbers]()

    Don’t use mono to align numbers for readability. Use tabular numbers (link) instead.

  </Dont>

  <Dont>
    ![A promotional card that uses mono typeface to indicate a new AI feature]()

    Don’t use mono for decoration, or to grab attention.

  </Dont>
</InlineGrid>

## Typescale

Polaris offers two typescale: heading and body. These typescales are used to create visual pairings in the UI and all line heights are aligned with the 4px grid.

The typescale in the admin is tailored for UI usage as the primary focus. Designed with software in mind first and foremost, it’s optimized for use in high density layouts with intricate details and complex features.

Learn more about applying type in the using type section (link).

![Each font size of both the heading and body typescales with their line heights highlighted and aligned on a 4px grid]()
