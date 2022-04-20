---
name: Design/Spacing
slug: spacing
icon: IconSpacing
keywords:
  - spacing
  - space
  - layout
  - grid
  - position
  - margin
  - padding
---

# Spacing

Consistent spacing creates visual balance that makes the user interface (UI) easier for merchants to scan. Apply consistent spacing to improve the quality of the UI.

---

## Principles

### Create visual rhythm

We use incrementally measured spacing to create harmonious arrangements of components and text. This gives the elements a predictable rhythm, which makes the experience as a whole feel intentional and well designed.

### Precise but flexible

Beyond mathematical precision, spacing also reacts to the objects it surrounds, giving more space to larger objects, less to small. Optical adjustments can also be made if an element looks off and the spacing needs a nudge to make things feel right.

---

## The spacing system

All spacing for components and typography is done in increments of 4 pixels. This forms the basic unit of measurement for spacing.

<!-- centeredcontent -->

![The mobile interface of the Shopify admin on a 4 pixel grid.](/public_images/design/spacing/spacing-4px-grid@2x.png)

### 4px grid

Typography doesn’t use a traditional baseline grid. Instead, line heights are set in increments of 4px and spacing is measured from the edges of the text boxes.

<!-- end -->

<!-- centeredcontent -->

![A profile card component on a 4 pixel grid with text placed vertically at 20 pixel intervals](/public_images/design/spacing/spacing-20px-elements@2x.png)

Many components are sized in increments of 20px to match the line height of body text. This makes it easy to create harmonious arrangements of components and&nbsp;text.

<!-- end -->

---

## Spacing in code

You can apply spacing in code in two ways:

- Using stylesheets
- Using utility components provided by Polaris React

### Applying spacing with stylesheets

When applying spacing in CSS, use these [spacing tokens](/tokens/all-tokens#section-spacing).

### Applying spacing with components

Various components within Polaris enable automatic spacing between elements:

<!-- centeredcontent -->

![Several paragraphs of text with space in between, with their edges and spacing highlighted](/public_images/design/spacing/spacing-text-container@2x.png)

Use the [text container](/components/titles-and-text/text-container) component to wrap and automatically add the correct spacing between a set of paragraphs, lists, or other textual components.

<!-- end -->

<!-- centeredcontent -->

![A text label, text value and badge arranged in a row, with their edges and spacing highlighted](/public_images/design/spacing/spacing-text-container@2x.png)

The [stack](/components/structure/stack) component can be used to arrange arbitrary components in a horizontal row or vertical stack with space in between. It accepts the same values as the Sass spacing function to control spacing between the items.

<!-- end -->

---

## How to choose spacing

<!-- showcasecontent -->

Use less space between small components, or components that share a close functional&nbsp;relationship.

![Two text fields showing spacing within and between them](/public_images/design/spacing/spacing-less-space@2x.png)

<!-- end -->

<!-- showcasecontent -->

Use less space between small components, or components that share a close functional&nbsp;relationship.

![Detail of a screen from Shopify admin, showing space between the page header and cards, between the cards, and the space around the layout](/public_images/design/spacing/spacing-more-space@2x.png)

<!-- end -->

Coordinate small and large values, along with structural components (like Home cards), to create visual groupings of related things. This helps merchants understand the interface and more easily find what they’re looking for.
For screens with specialized layouts, adjust overall spacing based on the density of the content. For example, a simple login screen on desktop display has more room to breathe, so more space can be used.

---

## Common values

The most common spacing sizes are used throughout Polaris for admin as follows:

<!-- centeredcontent -->

![Space between icon and text in buttons and list items](/public_images/design/spacing/spacing-extra-tight@2x.png)

**4px** (`extra-tight`) between icon and text.

The [button](/components/actions/button) component has this spacing built in.

<!-- end -->

<!-- centeredcontent -->

![Two buttons in a row, with annotation showing the space between](/public_images/design/spacing/spacing-tight@2x.png)

**8px** (`tight`) between icon and text.

The [button group](/components/actions/button-group) component has this spacing built in.

<!-- end -->

<!-- centeredcontent -->

![A form showing horizontal and vertical space between text fields](/public_images/design/spacing/spacing-base-forms@2x.png)

16 or 20px between form fields.

**16px** (`base`) vertically, **20px** (`loose`) horizontally.

The [form layout](/components/forms/form-layout) component has this spacing built in.

<!-- end -->

<!-- centeredcontent -->

![Detail of a card component from a large screen display, showing padding on the top, sides and between card sections](/public_images/design/spacing/spacing-loose-forms@2x.png)

**20px** (`loose`) padding in cards.

<!-- end -->

<!-- centeredcontent -->

![Detail of a card on a small screen, showing reduced side padding](/public_images/design/spacing/spacing-loose-mobile@2x.png)

**16px** (`base`) side padding on small screen.

The [card](/components/structure/card) component has this built in.

<!-- end -->

<!-- centeredcontent -->

![Detail of a screen from the Shopify admin, showing horizontal and vertical spacing between cards](/public_images/design/spacing/spacing-loose-between-cards@2x.png)

**20px** (`loose`) between cards

The The [card](/components/structure/card) component automatically adds vertical space between it and any preceding card.

For horizontal spacing, use the [layout](/components/structure/layout) component to create multi-column layouts.

<!-- end -->

---

## Adjustments and exceptions

In cases where minute alignment adjustments are necessary, some exceptions apply:

<!-- centeredcontent -->

![Closeup of a badge component, showing how its internal padding can be arbitrary, but its height is a multiple of 4px and the text within is vertically centered](/public_images/design/spacing/spacing-exception-badge@2x.png)

When text is vertically centered inside a component, the top and bottom padding can be any size.

<!-- end -->

<!-- centeredcontent -->

![Three buttons in a row, showing how their width depends on their text content](/public_images/design/spacing/spacing-text-width@2x.png)

Allow the length of text to determine the width of components and where they fall horizontally when placed in a row.

<!-- end -->

<!-- centeredcontent -->

![Diagram of a button with optical adjustment for an icon](/public_images/design/spacing/spacing-optical-adjustment@2x.png)

### Optical adjustment

Sometimes an element is larger than it appears. Spacing based on the invisible edges of the element will feel wrong. Correct for these optical effects by adjusting the space in 4px increments until it looks more balanced.

Without optical adjustment, the disclosure icon appears too far from the right edge of the button. After optical correction, the perceived spacing is more balanced.

<!-- end -->

---

## Touch targets

Merchants can more easily perform a task on mobile when interactive elements follow the recommended touch target sizes and spacing guidelines. Make sure that there’s enough space between links, buttons, and inputs prevents accidental actions. Note: touch target sizes differ across iOS (44px) and Android (48dpi).

<!-- usageblock -->

#### Do

- Assess the content in the surrounding area and position the UI elements accordingly
- If you work at Shopify, use the components provided in the iOS and Android UI kits

#### Don’t

- Don’t use adjacent actions (if possible). It will reduce the risk of error.

<!-- end -->

Read the [foundational principles for mobile design](/foundations/mobile).

<div class="NextPage">
Next<br/>
<a href="/design/data-visualizations#navigation">Data visualizations</a>
</div>
