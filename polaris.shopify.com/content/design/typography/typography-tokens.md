---
title: Typography tokens
description: Typography is the art of arranging type in ways that provides innate hierarchy to UI.
showTOC: true
keywords:
  - type styles
  - font sizes
  - fonts
icon: SubtractMajor
hideChildren: true
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

<Subnav />

## Primitive font scales

The primitive font scales have five key token sets:

1. Font Family
2. Font Weight
3. Letter Spacing
4. Font Size
5. Line Height

![Diagram showing primitive tokens with examples for each]()

## Token structure

The font size and line height token scales adhere to the convention of the size token scale, which translates to pixel values. On the other hand, the font weight and letter spacing scales adopt a contextual approach that is more appropriate for their design requirements.

![a token structure composed of system, group, property and scale values]()

## Semantic text tokens

Polaris introduced a new layer of semantic text tokens that reference the primitive font scales. These semantic tokens create a streamlined approach that enhances consistency and facilitates the assembly of Text variants. 
By aligning semantic text tokens with the respective font scales, a composite solution is achieved, directly mapping to the various variants available within the Text component.

![card with a heading a body text with corresponding tokens]()

## Token structure
These semantically routed, composite building blocks include properties such as font size, line height, font weight, letter spacing, and font family, allow for a comprehensive and customizable typographic experience

![structure of a semantic token, composed of system, concept, variant, and property values]()

## How to apply them

### Polaris react
The Text component provides a variant prop that seamlessly applies font token styling specific to the selected variant, ensuring consistency. Alternatively, when markup access is limited, semantic text tokens offer flexibility for styling elements. 

Polaris also exposes font scales in the token styles.css file, allowing users to create custom variants. Using the Text component, semantic (composite) text tokens, and font scales, builders receive both flexibility and system synchronicity.

![abstract visual depicting the creation of a typography token]()

