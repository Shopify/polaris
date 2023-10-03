---
title: Using type
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

## Typesetting

Polaris uses line height and vertical alignment to set type in the UI.

![A piece of text where line height is highlighted, aligned on the 4px grid]()

## Line height

Type in the admin is aligned on the 4px grid. For this reason, all line heights are multiples of the 4px base unit.

This ensures that bounding boxes, which are defined by line heights in web, are used to define how text is positioned in the UI.

## Vertical alignment

Vertical alignment is used on type where line height and padding on an element are not sufficient to fill the entire space. Careful consideration needs to be taken in order to strike visual balance.

![Type being vertically aligned in a button, index table, etc. ]()

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A badge where the type and icon are different sizes, but are centered vertically to achieve symmetry]()

    Consider aligning centering type vertically when bounding boxes differ from one element to another.

  </Do>

  <DirectiveCard status="Caution">
    ![A back arrow that is smaller than the following type, which is top aligned, making the UI feel unbalanced]()

    Top aligning elements that are presented in-line, but have varying bounding box sizes, can create a feeling of a broken UI.

  </DirectiveCard>
</InlineGrid>

## Hierarchy

Proper type hierarchy facilitates UI flow and rhythm when building for the Shopify admin.

![A series of cards using headings as an introduction]()

Headings are used in almost all cards as a way to identify the feature they contain.

### Headings

Headings introduce new sections, and subsections in the admin. They initiate the visual rhythm of a page by defining the main use of each feature in the interface.

<Stack gap='4'>

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A card containing a data table that is introduced by a small heading]()

    Use shorter headings. Headings don’t need to be larger than the content, especially if the content or component is complex.

  </Do>

  <Do>
    ![A card with a heading that is the same size as the body type]()

    Use proper heading sizes. Headings should be equal or larger in size than the following text, unless they are used as a lede or kicker.

  </Do>
</InlineGrid>

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![The title, description and media part of a product detail page, which does not have a heading]()

    Optimize the usage of headings, as they might not be necessary if the content they are introducing is self-evident.

  </Do>

  <Dont>
    ![A page introduced with a heading in a normal font weight]()

    Headings do not vary in weight.

  </Dont>
</InlineGrid>
</Stack>

### Body

Body is used everywhere else in the admin. Buttons, inputs, paragraphs, navigation elements, etc. Any element that is part of the usable UI uses body type.

Body is often the same size as its leading heading, but will rarely be the same weight. Weight plays the role of pulling the merchant’s attention to specific parts of the UI, by complementing other design choices like color and positioning to reinforce the importance of the intended interaction.

![A card with some body text elements that have the same weight as its introducing heading]()

Body can vary in weight a lot, and can even mimic the style of headings for a streamlined look.

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A card with two different body sizes using two different colors to differentiate between the two]()

    Use different body type sizes and colors to create clear hierarchy in complex components.

  </Do>

  <DirectiveCard status='Caution'>
    ![A card with every element using the same body type size]()

    Using the same body size everywhere can make it hard for merchants to identify key elements in components.

  </DirectiveCard>
</InlineGrid>

## Formatting

Formatting modifies the appearance of type to enhance its readability, emphasize certain elements, or convey specific meanings.

### Underline

Text that is underlined can serve two purposes: link to other pages, or offer additional contextual information through a tooltip or a popover.

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <DirectiveCard>

    ![Visual of a link in a footer of a page]()

    Text links have a solid underline and use a distinct link color (link) to differentiate them additionally from surrounding text.

  </DirectiveCard>

  <DirectiveCard>
    ![A definition text in an analytics page explaining what the definition of “Total sales” is in a popover]()

    Definition indicators have a dotted underline and only react on hover or touch without sending merchants to another section in the admin.

  </DirectiveCard>
</InlineGrid>

### List

List elements are introduced with bullets, or more preferably, with icons that are related to the content that they introduce.

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A list of features offered by a Shopify Plan]()

    Use lists to share short, easily identifiable and relevant bits of information, like specific features.

  </Do>

  <Do>
    ![A list of tasks completed in a home card]()

    Use lists for task completion interfaces.

  </Do>
</InlineGrid>
