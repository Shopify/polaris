---
name: Colors
keywords:
  - visual patterns
  - color strategy
  - color use
---

# Colors

Our color system builds on the recognition of the Shopify brand colors to make the admin interface more usable.

<!-- showcasecontent -->

![Diagram showcasing layers of color of various hues](/public_images/design/colors/color-intro@2x.png)

<!-- end -->

---

## Principles

<!-- keywords: color principles, accessible colors, focus attention, communication -->

### Communication is key

Although we value an aesthetically pleasing use of color, we place a higher value on clear communication. Color supports the purpose of the content, communicating things like hierarchy of information, interactive states, and the difference between distinct elements.

### Colors have meaning

Colors have assigned roles, which hold a specific meaning based on how they function within the interface. Defined color roles make things easy to modify and customize later. They also extend the color system so it works across any touchpoint at Shopify.

### Colors follow accessibility guidelines

The color system is designed within the HSLuv color space to generate themes that meet WCAG 2.1 compliant contrast ratios. This makes things easier to find, identify, and interact with. It also makes the whole experience more accessible for merchants who are color blind or who have low vision. However you should never convey information using color alone.

---

## Color roles

<!-- keywords: color roles, palette scss, color scheme, color names, color sass, sass colors, hex colors -->

<!-- showcasecontent -->

![Diagram of colors representing the new Polaris color system](/public_images/design/colors/color-roles@2x.png)

We define colors based on the role they play in the interface. There are 10 color roles, which we use to generate the values of all the color variants in the palette.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting color variants in a user interface](/public_images/design/colors/color-variants@2x.png)

### Color variants

Color variants are variables that apply color to the UI, and their values are generated from the color roles. Color variants are available as tokens.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting a color naming pattern for the color token Border Success Subdued](/public_images/design/colors/color-variant-naming@2x.png)

Variants share a naming pattern that references their color role, the interaction state they define, and any UI elements they’re linked to.

<!-- end -->

---

## The color system in action

How the color roles relate to the variants, and how they’re applied across the interface.

<!-- centeredcontent -->

![Diagram presenting the surface color role, with mainly white and gray colors](/public_images/design/colors/color-role-surface@2x.png)

### Surface

Surface colors affect surfaces of components, such as page, card, sheet, and popover.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the on surface color role, with mainly black and darker gray colors](/public_images/design/colors/color-role-onsurface@2x.png)

### On surface

Apply on-surface colors to elements that appear on neutral surfaces, usually borders, secondary icons, and text elements.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the primary color role, with mainly green colors](/public_images/design/colors/color-role-primary@2x.png)

### Primary

Use primary colors for primary actions like buttons, icons and text on navigation and tabs, and for the background in navigation and tab interactive states.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the secondary color role, with mainly white and gray colors](/public_images/design/colors/color-role-secondary@2x.png)

### Secondary

Use secondary colors for secondary and tertiary buttons and the background of form elements.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the interactive color role, with mainly blue colors](/public_images/design/colors/color-role-interactive@2x.png)

### Interactive

Use interactive colors for things like links, focus indicators, and selected interactive states.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the success color role, with mainly green colors](/public_images/design/colors/color-role-success@2x.png)

### Success

Success colors indicate something positive, like the success of a merchant action or to illustrate growth.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the warning color role, with mainly yellow and orange colors](/public_images/design/colors/color-role-warning@2x.png)

### Warning

Warning colors let the merchant know they need to take action, and are applied to badges, banners, and exception lists.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the critical color role, with mainly red colors](/public_images/design/colors/color-role-critical@2x.png)

### Critical

Critical colors are for destructive interactive elements, errors, and critical events that require immediate action.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the highlight color role, with mainly cyan and teal colors](/public_images/design/colors/color-role-highlight@2x.png)

### Highlight

Highlight colors indicate important elements that don’t require immediate action. They’re used with informational banners and badges, indicators that draw attention to new information, loading or progress bars, and data visualization.

<!-- end -->

<!-- centeredcontent -->

![Diagram presenting the decorative color role, with a variety of colors like yellow, turquoise and rose](/public_images/design/colors/color-role-decorative@2x.png)

### Decorative

Decorative colors are for expressive communications that assert the Shopify brand presence.

<!-- end -->

<div class="NextPage">
Next<br/>
<a href="/design/typography#navigation">Typography</a>
</div>
