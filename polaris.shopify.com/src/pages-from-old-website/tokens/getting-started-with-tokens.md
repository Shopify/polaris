---
name: Tokens/Getting started with tokens
slug: getting-started-with-tokens
icon: IconNotes
keywords:
  - tokens
---

# Getting started with tokens

Design tokens allow us to ship design decisions with consistency and scale.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/NvDY37tOn_o?rel=0' frameborder='0' allowfullscreen></iframe></div>

---

## What are tokens

Design tokens represent design decisions such as color, spacing, and typography. Each token has a unique name that references a specific value.

The benefits of using tokens over hard-coded values include:

- Shopify standardizes common design decisions, allowing you to focus on unique design challenges
- Consistent naming between design and development improves collaboration
- Shopify can make big design changes across the admin simply by adjusting the tokens

For example, imagine there are several elements in a design that need a primary action color. Instead of trying to find a hard-coded value, designers can use the Figma style "Action Primary/Hovered". That token matches a specific value for the primary action color. Developers can reference the same color in code by using the CSS custom property with the same name.

![Illustration showing Figma and CSS referencing same token value](/public_images/tokens/tokens@2x.png)

If primary action color changes, or improvements need to be shipped, we can make those updates to the token itself. Those changes then get pushed to every element that references that token, instead of you having to manually update several individual hard-coded values.

---

## Tokens in development

When developing with Polaris, tokens are automatically injected into your web app so you can reference them in your CSS.

---

## Tokens in design

We store design tokens as Figma styles, which are available to all Shopify designers.

If you don't work at Shopify but still want to build with Polaris, you can access our styles by duplicating any of the Polaris for Admin files on Shopify's [Figma community page](https://www.figma.com/@shopify). Note that with this method, Shopify won’t be able to automatically push style updates to your local copy of the design file. Learn more about styles by visiting the [Figma help center](https://help.figma.com/hc/en-us/articles/360039820134-Manage-and-share-styles).
