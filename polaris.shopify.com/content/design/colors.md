---
title: Color
description: Color is a powerful tool that helps merchants quickly navigate and manage their businesses in the Shopify Admin.
icon: ColorsMajor
keywords:
  - visual patterns
  - color strategy
  - color use
---

![A rainbow of colors created by small bricks](/images/design/colors/color-intro@2x.png)

---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

## Overview

<Grid gap="4">

  <Grid.Cell columnSpan={{xs: 4, sm: 2, md: 2, lg: 4, xl: 4}}>

    ### Color has purpose

    The purpose of using color has to be clear. Color needs to support a message or a status that needs to be easily identifiable by merchants.

  </Grid.Cell>

  <Grid.Cell columnSpan={{xs: 8, sm: 4, md: 4, lg: 8, xl: 8}}>

    ![A rainbow of colors created by small bricks](/images/design/colors/color-intro@2x.png)

  </Grid.Cell>

  <Grid.Cell columnSpan={{xs: 4, sm: 2, md: 2, lg: 4, xl: 4}}>

    Each usage of color within the Shopify admin is purposefully tied to a specific meaning. For instance, red signifies critical errors, green represents success messages, and blue is used to draw attention to tips and offers. Using color as decoration is exclusive to illustration.

    This deliberate color coding facilitates merchants in identifying which parts of the user interface require focus and distinguishes them from the default features provided by the Shopify admin.

  </Grid.Cell>

  <Grid.Cell columnSpan={{xs: 4, sm: 2, md: 2, lg: 4, xl: 4}}>

    ![A rainbow of colors created by small bricks](/images/design/colors/color-intro@2x.png)

    <Do>
    Use color to support different states merchants need to be informed about.
    </Do>

  </Grid.Cell>

  <Grid.Cell columnSpan={{xs: 4, sm: 2, md: 2, lg: 4, xl: 4}}>

    ![A rainbow of colors created by small bricks](/images/design/colors/color-intro@2x.png)

    <Dont>
    Use color to decorate or to distract merchants from performing tasks.
    </Dont>

  </Grid.Cell>

</Grid>

Each usage of color within the Shopify admin is purposefully tied to a specific meaning. For instance, red signifies critical errors, green represents success messages, and blue is used to draw attention to tips and offers. Using color as decoration is exclusive to illustration.

This deliberate color coding facilitates merchants in identifying which parts of the user interface require focus and distinguishes them from the default features provided by the Shopify admin.

### 2. Design accessible experiences

The color system is designed to meet WCAG 2.1 contrast ratios. Sufficient contrast makes things easier to find, identify, and interact with for all merchants. However, you should never convey information using color alone. For example, using an icon or a label in addition to using red, yellow, or green when communicating the status of something ensures that the status is visible to merchants who are color blind.

### 3. Create heirarchy

Color plays a key role in creating the overall hierarchy of a screen. Using the subdued and strong token variants is an easy way to change that hierarchy and draw a merchant's attention to the right place.

---

## Color palette

The Polaris color palette is composed of 8 different colors, each with 10 unique shades. These colors are then used to create semantic tokens that style both Polaris components and custom components within the Shopify admin.

<Colors />

## Tokens

![A picture of the admin user interface with overlays showing what parts of the user interface use different color token names](/images/design/colors/color-tokens@2x.png)

Polaris provides a comprehensive suite of [color tokens](/tokens/colors) for styling each part of the user interface. These tokens are passed into components and are available via css variables to style custom UI elements within the Shopify admin.

### Token names

Each color token follows the same naming convention. The purpose and intent of a color token is built into the name itself. This makes it easy to understand how and when any given token should be used.

**Naming formula:** `--p-color-element-role-variant-state`

**Example:** `--p-color-bg-critical-subdued-hover`

| Name space | Description                                                                                         | Examples                                                       |
| ---------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Element    | This refers to the actual UI element being styled.                                                  | bg, text, icon & border                                        |
| Role       | Assigned roles to specific colors to ensure consistent communication of color throughout the admin. | interactive, caution, success, primary, critical, info & magic |
| Variant    | This is the key descriptor of a token that communicates exactly what this token is to be used for.  | subdued, strong, on-color, inverse                             |
| State      | Communicates the state on which this token is applied.                                              | hover, active, selected, disabled & focus                      |

The element slot is the only one that is required. When there is no role, variant or state associated with a token those slots are omitted from the final token name.

### Examples

![A list of token name examples showing how the element, role, variant and state are applied to color tokens](/images/design/colors/color-token-naming-example@2x.png)

## Applying tokens

### Using color roles

Colors have assigned roles, which hold a specific meaning based on how they function within the interface. Using these color roles correctly brings consistency across the admin, making it easier for merchants to work.

![An example of user interface with color roles highlighted](/images/design/colors/color-roles@2x.png)

### Variants

Use variants to create hierarchy within the experience. Strong variants put emphasis on an element while subdued variants push them more into the background.

![An example of user interface with variants highlighted](/images/design/colors/color-variants@2x.png)

### Interaction states

State tokens make interactions clear to merchants as they manage their store.

![An example of user interface with interaction states highlighted](/images/design/colors/interaction-states@2x.png)
