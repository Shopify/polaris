---
title: Version 12
description: This version introduces Shopify's new admin design language, refined tokens, aligned component APIs, and an updated Figma UI kit.
previewImg: /images/updates/uplift-beta@2x.png
keywords:
  - new design language
  - uplift
  - v12
  - version 12
  - redesign
  - admin design language
  - new design
  - black button
  - How to migrate to the new design language
order: 0
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

![Illustration of a hand drawing a four pointed star](/images/updates/uplift-beta@2x.png)

---

## Upgrade to v12

Follow our [migration guide](/version-guides/migrating-from-v11-to-v12) to upgrade Polaris from v11 to v12.

## What's changing

### The design language

Polaris version 12 introduces a new design language for Shopify's admin. This includes a style uplift for all of our [components](/components), updates to our token values, and a [new web font, Inter](/version-guides/migrating-from-v11-to-v12#a-new-web-font).

#### Pro design language

"Pro", in Shopify's context, refers to a design language that prioritizes efficiency and intuitive interactions, catering to the daily tasks merchants perform everyday.

- **Assign meaning**: Visual language is clear for merchants.
- **Increase density**: Space is optimized while maintaining high usability.
- **Craft juicy interactions**: Interfaces incorporate a sense of realness.
- **Make it predictable**: Objects with similar appearance share a common behavior.

Read more about Polaris' [Pro design language](/design/pro-design-language) to start designing in the new language.

### Token refinement

The version 12 updates aim to create an intentional set of tokens that clearly communicates intent so that builders have exactly what they need to apply the new design language on their surfaces. To do this, v12 introduces primitive and semantic token layers.

For more information on how to migrate from v11 tokens, check out the [migration guide](/version-guides/migrating-from-v11-to-v12#token-migrations).

#### Primitive tokens

Primitive tokens are generic keys for the base values of a token scale. Primitive tokens are not context dependent and can be used anywhere in the admin. For example, `--p-space-100` is a primitive space token.

#### Semantic tokens

Semantic tokens are references to base values that are used in specific contexts within the admin. These tokens should never be used for anything other than the concept they’re referencing. When no semantic token is a good fit, a primitive token should be used instead. For example, `--p-space-table-cell-padding` is a semantic token.

#### Updated token resources

- [Color token list](/tokens/color)
- [Font token list](/tokens/font)
- [Shadow token list](/tokens/shadow)
- [Space token list](/tokens/space)

### Component API simplification

The version 12 breaking component changes aim to simplify inconsistent and complicated component APIs. For a comprehensive list on all component changes and how to migrate from v11's component APIs, check out the [migration guide](/version-guides/migrating-from-v11-to-v12#component-migrations).

**At a high level the API changes aimed to simplify, consolidate, and align by:**

- Renaming directional components to use `Inline` and `Block` which are defined by [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- Renaming border radius properties to align with [CSS border radius constituent properties](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius#constituent_properties)
- Renaming various color control props to `tone` and space control props to `gap`. This creates more consistent APIs across components
- Consolidating boolean props to a single `variant` prop on various components to make logical combinations more intentional

### Figma UI Kit

The Polaris [components](https://www.figma.com/community/file/1293611962331823010/polaris-components), [styles](https://www.figma.com/community/file/1293614121185734569/polaris-styles), and [icons](https://www.figma.com/community/file/1293614863849914283/polaris-icons) libraries have been updated to reflect the new design language, updated tokens, and component API changes.

#### Figma variables

The kits have been updated to use Figma variables for color, space, and size. Color variables are accessible via fill, stroke, and text color menus in the right panel. Space variables are accessible via auto layout's gap and padding.

## Resources

- [v11 to v12 migration guide](/version-guides/migrating-from-v11-to-v12)
- [Add the new web font](/version-guides/migrating-from-v11-to-v12#a-new-web-font)
- [Pro design language](/design/pro-design-language)
- [Uplifted components](/components)
- [Updated token lists](/tokens)
- [Figma component library](https://www.figma.com/community/file/1293611962331823010/polaris-components)
- [Figma styles library](https://www.figma.com/community/file/1293614121185734569/polaris-styles)
- [Figma icons library](https://www.figma.com/community/file/1293614863849914283/polaris-icons)
