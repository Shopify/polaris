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

![A piece of text where line height is highlighted, aligned on the 4px grid](/images/design/typography/typography-using-type-01-line-height@2x.png)

## Line height

Type in the admin is aligned on the 4px grid. For this reason, all line heights are multiples of the 4px base unit.

This ensures that bounding boxes, which are defined by line heights in web, are used to define how text is positioned in the UI.

## Vertical alignment

Vertical alignment is used on type where line height and padding on an element are not sufficient to fill the entire space. Careful consideration needs to be taken in order to strike visual balance.

![Type being vertically aligned in a button, index table, etc. ](/images/design/typography/typography-using-type-02-vertical@2x.png)

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A badge where the type and icon are different sizes, but are centered vertically to achieve symmetry](/images/design/typography/typography-using-type-03-vertical-do@2x.png)

    Consider aligning centering type vertically when bounding boxes differ from one element to another.

  </Do>

  <DirectiveCard status="Caution">
    ![A back arrow that is smaller than the following type, which is top aligned, making the UI feel unbalanced](/images/design/typography/typography-using-type-04-vertical-dont@2x.png)

    Top aligning elements that are presented in-line, but have varying bounding box sizes, can create a feeling of a broken UI.

  </DirectiveCard>
</InlineGrid>

## Hierarchy

Proper type hierarchy facilitates UI flow and rhythm when building for the Shopify admin.

![A series of cards using headings as an introduction](/images/design/typography/typography-using-type-05-headings@2x.png)

Headings are used in almost all cards as a way to identify the feature they contain.

### Headings

Headings introduce new sections, and subsections in the admin. They initiate the visual rhythm of a page by defining the main use of each feature in the interface.

<Stack gap='4'>

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A card containing a data table that is introduced by a small heading](/images/design/typography/typography-using-type-06-headings-do@2x.png)

    Use shorter headings. Headings don’t need to be larger than the content, especially if the content or component is complex.

  </Do>

  <Do>
    ![A card with a heading that is the same size as the body type](/images/design/typography/typography-using-type-07-headings-size-do@2x.png)

    Use proper heading sizes. Headings should be equal or larger in size than the following text, unless they are used as a lede or kicker.

  </Do>
</InlineGrid>

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![The title, description and media part of a product detail page, which does not have a heading](/images/design/typography/typography-using-type-08-headings-evident-do@2x.png)

    Optimize the usage of headings, as they might not be necessary if the content they are introducing is self-evident.

  </Do>

  <Dont>
    ![A page introduced with a heading in a normal font weight](/images/design/typography/typography-using-type-09-headings-dont@2x.png)

    Headings do not vary in weight.

  </Dont>
</InlineGrid>
</Stack>

### Body

Body is used everywhere else in the admin. Buttons, inputs, paragraphs, navigation elements, etc. Any element that is part of the usable UI uses body type.

Body is often the same size as its leading heading, but will rarely be the same weight. Weight plays the role of pulling the merchant’s attention to specific parts of the UI, by complementing other design choices like color and positioning to reinforce the importance of the intended interaction.

![A card with some body text elements that have the same weight as its introducing heading](/images/design/typography/typography-using-type-10-body@2x.png)

Body can vary in weight a lot, and can even mimic the style of headings for a streamlined look.

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A card with two different body sizes using two different colors to differentiate between the two](/images/design/typography/typography-using-type-11-body-do@2x.png)

    Use different body type sizes and colors to create clear hierarchy in complex components.

  </Do>

  <DirectiveCard status='Caution'>
    ![A card with every element using the same body type size](/images/design/typography/typography-using-type-12-body-caution@2x.png)

    Using the same body size everywhere can make it hard for merchants to identify key elements in components.

  </DirectiveCard>
</InlineGrid>

## Formatting

Formatting modifies the appearance of type to enhance its readability, emphasize certain elements, or convey specific meanings.

![Text editor formatting toolbar](/images/design/typography/typography-using-type-13-formatting@2x.png)

### Underline

Text that is underlined can serve two purposes: link to other pages, or offer additional contextual information through a tooltip or a popover.

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <DirectiveCard>

    ![Visual of a link in a footer of a page](/images/design/typography/typography-using-type-14-formatting-underline-link@2x.png)

    Text links have a solid underline and use a distinct link color (link) to differentiate them additionally from surrounding text.

  </DirectiveCard>

  <DirectiveCard>
    ![A definition text in an analytics page explaining what the definition of “Total sales” is in a popover](/images/design/typography/typography-using-type-15-formatting-underline-definition@2x.png)

    Definition indicators have a dotted underline and only react on hover or touch without sending merchants to another section in the admin.

  </DirectiveCard>
</InlineGrid>

### Lists

List elements are introduced with bullets, or more preferably, with icons that are related to the content that they introduce.

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
  <Do>

    ![A list of features offered by a Shopify Plan](/images/design/typography/typography-using-type-16-formatting-list-features@2x.png)

    Use lists to share short, easily identifiable and relevant bits of information, like specific features.

  </Do>

  <Do>
    ![A list of tasks completed in a home card](/images/design/typography/typography-using-type-17-formatting-list-tasks@2x.png)

    Use lists for task completion interfaces.

  </Do>
</InlineGrid>

### Tabular numbers

Tabular numbers are a feature that equalizes the widths of all numbers in type to make lists of numbers align with each other vertically.
The Shopify admin uses tabular numbers everywhere currency or money amounts are presented.

![Two columns made from multiple rows of numbers, one of which is non-tabular and misaligned vertically, and the other one using tabular numbers, which are neatly aligned with each other](/images/design/typography/typography-using-type-18-formatting-tabular@2x.png)

<Stack gap='2'>
  <InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
    <Do>

      ![An index table showing the inventory of multiple items in several rows](/images/design/typography/typography-using-type-19-formatting-tabular-do@2x.png)

      Use tabular for numbers that repeat in tables to increase their scannability

    </Do>

    <Do>
      ![Larger currency number in a customer detail page](/images/design/typography/typography-using-type-20-formatting-tabular-currency-do@2x.png)

      Use tabular numbers for all currency amounts, this makes them easily discernible and visually constant everywhere in the admin.

    </Do>

  </InlineGrid>
  <InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
    <DirectiveCard status='Caution'>

      ![A card that shows the total number of orders and total spend of a customer](/images/design/typography/typography-using-type-21-formatting-tabular-decoration-caution@2x.png)

      For larger numbers, like in the case of the plans page or any promotional or incentive visual where numbers are larger than the rest of the content, you can forgo tabular numbers.

    </DirectiveCard>

    <Dont>
      ![An index table showing the value of several orders in a row, but the numbers are monospaced](/images/design/typography/typography-using-type-22-formatting-tabular-dont@2x.png)

      Don’t use mono in lieu of tabular numbers to achieve a tabular number look.

    </Dont>

  </InlineGrid>
</Stack>

## Icons and symbols

In Polaris, type and icons are part of the same family. When used with type, icons inherit the color of the copy they are tied to.

![A collection of components using icons and symbols close together, in the same shape or containers](/images/design/typography/typography-using-type-23-icons@2x.png)

Icons and symbols align with type when used outside of a component, and use the same text color as the accompanying text.

<InlineGrid gap='2' columns={{xs: '1', md: '2'}}>
    <Do>
      ![A badge using a micro icon](/images/design/typography/typography-using-type-24-icons-micro-do@2x.png)

      Use micro icons for small body text, like in smaller badges. Use regular icons everywhere else.

    </Do>
    <DirectiveCard status='Caution'>

      ![A spot icon presenting an empty state for the search feature](/images/design/typography/typography-using-type-25-icons-spot-caution@2x.png)

      Spot icons are not used in-line with type, nor are they considered to be part of typography.

    </DirectiveCard>

  </InlineGrid>
