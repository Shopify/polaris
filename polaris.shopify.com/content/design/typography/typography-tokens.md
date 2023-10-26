---
title: Tokens
description: Typography is the art of arranging type in ways that provides innate hierarchy to UI.
showTOC: true
keywords:
  - type styles
  - font sizes
  - fonts
icon: Hexagon
hideChildren: true
order: 3
---

# Typography &rarr; {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

<Section>
  <Row variant="1-2">
  
    <Column>
      ## Primitive font scales

      The primitive font scales have five key token sets:

      1. Font Family
      2. Font Weight
      3. Letter Spacing
      4. Font Size
      5. Line Height
    </Column>
    <Column>
      ![Diagram showing primitive tokens with examples for each](/images/design/typography/typography-tokens-01-primitive-scales@2x.png)
    </Column>

  </Row>
  <Row variant="1-2">
  
    <Column>
      ## Token structure

      The font size and line height token scales adhere to the convention of the size token scale, which translates to pixel values. On the other hand, the font weight and letter spacing scales adopt a contextual approach that is more appropriate for their design requirements.
    </Column>
    <Column>
      ![a token structure composed of system, group, property and scale values](/images/design/typography/typography-tokens-02-primitive-token-structure@2x.png)
    </Column>

  </Row>
</Section>

<Section>
  <Row variant="1-2">
  
    <Column>
      ## Semantic text tokens

      Polaris introduced a new layer of semantic text tokens that reference the primitive font scales. These semantic tokens create a streamlined approach that enhances consistency and facilitates the assembly of Text variants.
      By aligning semantic text tokens with the respective font scales, a composite solution is achieved, directly mapping to the various variants available within the Text component.
    </Column>
    <Column>
      ![card with a heading a body text with corresponding tokens](/images/design/typography/typography-tokens-03-semantic@2x.png)
    </Column>

  </Row>
  
  <Row variant="1-2">
  
    <Column>
      ## Token structure

      These semantically-routed composite building blocks include properties such as font size, line height, font weight, letter spacing, and font family, and allow for a comprehensive and customizable typographic experience.
    </Column>
    <Column>
      ![structure of a semantic token, composed of system, concept, variant, and property values](/images/design/typography/typography-tokens-04-semantic-token-structure@2x.png)
    </Column>

  </Row>
</Section>

<Section>
  <Row variant="1-2">
  
    <Column>
      ## How to apply them

      ### Polaris react

      The Text component provides a variant prop that seamlessly applies font token styling specific to the selected variant, ensuring consistency. Alternatively, when markup access is limited, semantic text tokens offer flexibility for styling elements.

      Polaris also exposes font scales in the token styles.css file, allowing users to create custom variants. Using the Text component, semantic (composite) text tokens, and font scales, builders receive both flexibility and system synchronicity.
    </Column>
    <Column>
      ![abstract visual depicting the creation of a typography token](/images/design/typography/typography-tokens-05-how-to-apply@2x.png)
    </Column>

  </Row>
</Section>
