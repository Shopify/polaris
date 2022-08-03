---
title: Spacing
description: Consistent spacing creates visual balance that makes the user interface (UI) easier for merchants to scan. Apply consistent spacing to improve the quality of the UI.
keywords:
  - spacing
  - space
  - layout
  - grid
  - position
  - margin
  - padding
---

## Principles

### Create visual rhythm

We use incrementally measured spacing to create harmonious arrangements of components and text. This gives the elements a predictable rhythm, which makes the experience as a whole feel intentional and well designed.

### Precise but flexible

Beyond mathematical precision, spacing also reacts to the objects it surrounds, giving more space to larger objects, less to small. Optical adjustments can also be made if an element looks off and the spacing needs a nudge to make things feel right.

---

## The spacing system

All spacing for components and typography is done in increments of 4 pixels. This forms the basic unit of measurement for spacing.

![The mobile interface of the Shopify admin on a 4 pixel grid.](/images/foundations/design/spacing/spacing-4px-grid@2x.png)

### 4px grid

Typography doesn’t use a traditional baseline grid. Instead, line heights are set in increments of 4px and spacing is measured from the edges of the text boxes.

![A profile card component on a 4 pixel grid with text placed vertically at 20 pixel intervals](/images/foundations/design/spacing/spacing-20px-elements@2x.png)

Many components are sized in increments of 20px to match the line height of body text. This makes it easy to create harmonious arrangements of components and&nbsp;text.

---

## Spacing in code

You can apply spacing in code in two ways:

- Using stylesheets
- Using utility components provided by Polaris React

### Applying spacing with stylesheets

When applying spacing in CSS, use these [spacing tokens](/tokens/spacing).

### Applying spacing with components

Various components within Polaris enable automatic spacing between elements:

![Several paragraphs of text with space in between, with their edges and spacing highlighted](/images/foundations/design/spacing/spacing-text-container@2x.png)

Use the [text container](/components/text-container) component to wrap and automatically add the correct spacing between a set of paragraphs, lists, or other textual components.

![A text label, text value and badge arranged in a row, with their edges and spacing highlighted](/images/foundations/design/spacing/spacing-stack@2x.png)

The [stack](/components/stack) component can be used to arrange arbitrary components in a horizontal row or vertical stack with space in between. It accepts the same values as the Sass spacing function to control spacing between the items.

---

## How to choose spacing

Use less space between small components, or components that share a close functional&nbsp;relationship.

![Two text fields showing spacing within and between them](/images/foundations/design/spacing/spacing-less-space@2x.png)

Use less space between small components, or components that share a close functional&nbsp;relationship.

![Detail of a screen from Shopify admin, showing space between the page header and cards, between the cards, and the space around the layout](/images/foundations/design/spacing/spacing-more-space@2x.png)

Coordinate small and large values, along with structural components (like Home cards), to create visual groupings of related things. This helps merchants understand the interface and more easily find what they’re looking for.
For screens with specialized layouts, adjust overall spacing based on the density of the content. For example, a simple login screen on desktop display has more room to breathe, so more space can be used.

---

## Common values

The most common spacing sizes are used throughout Polaris for admin as follows:

![Space between icon and text in buttons and list items](/images/foundations/design/spacing/spacing-extra-tight@2x.png)

**4px** (`extra-tight`) between icon and text.

The [button](/components/button) component has this spacing built in.

![Two buttons in a row, with annotation showing the space between](/images/foundations/design/spacing/spacing-tight@2x.png)

**8px** (`tight`) between icon and text.

The [button group](/components/button-group) component has this spacing built in.

![A form showing horizontal and vertical space between text fields](/images/foundations/design/spacing/spacing-base-forms@2x.png)

16 or 20px between form fields.

**16px** (`base`) vertically, **20px** (`loose`) horizontally.

The [form layout](/components/form-layout) component has this spacing built in.

![Detail of a card component from a large screen display, showing padding on the top, sides and between card sections](/images/foundations/design/spacing/spacing-loose-forms@2x.png)

**20px** (`loose`) padding in cards.

![Detail of a card on a small screen, showing reduced side padding](/images/foundations/design/spacing/spacing-loose-mobile@2x.png)

**16px** (`base`) side padding on small screen.

The [card](/components/card) component has this built in.

![Detail of a screen from the Shopify admin, showing horizontal and vertical spacing between cards](/images/foundations/design/spacing/spacing-loose-between-cards@2x.png)

**20px** (`loose`) between cards

The The [card](/components/card) component automatically adds vertical space between it and any preceding card.

For horizontal spacing, use the [layout](/components/layout) component to create multi-column layouts.

---

## Adjustments and exceptions

In cases where minute alignment adjustments are necessary, some exceptions apply:

![Closeup of a badge component, showing how its internal padding can be arbitrary, but its height is a multiple of 4px and the text within is vertically centered](/images/foundations/design/spacing/spacing-exception-badge@2x.png)

When text is vertically centered inside a component, the top and bottom padding can be any size.

![Three buttons in a row, showing how their width depends on their text content](/images/foundations/design/spacing/spacing-text-width@2x.png)

Allow the length of text to determine the width of components and where they fall horizontally when placed in a row.

![Diagram of a button with optical adjustment for an icon](/images/foundations/design/spacing/spacing-optical-adjustment@2x.png)

### Optical adjustment

Sometimes an element is larger than it appears. Spacing based on the invisible edges of the element will feel wrong. Correct for these optical effects by adjusting the space in 4px increments until it looks more balanced.

Without optical adjustment, the disclosure icon appears too far from the right edge of the button. After optical correction, the perceived spacing is more balanced.

---

## Touch targets

Merchants can more easily perform a task on mobile when interactive elements follow the recommended touch target sizes and spacing guidelines. Make sure that there’s enough space between links, buttons, and inputs prevents accidental actions. Note: touch target sizes differ across iOS (44px) and Android (48dpi).

<!-- dodont -->

#### Do

- Assess the content in the surrounding area and position the UI elements accordingly
- If you work at Shopify, use the components provided in the iOS and Android UI kits

#### Don’t

- Don’t use adjacent actions (if possible). It will reduce the risk of error.

<!-- end -->
