---
title: Tooltip
category: Overlays
keywords:
  - info
  - help
  - popover
  - infotip
  - hint
  - small popover
  - hover
  - tap
examples:
  - fileName: tooltip-default.tsx
    title: Default
    description: Use only when necessary to provide an explanation for an interface element.
  - fileName: tooltip-visible-only-with-child-interaction.tsx
    title: Visible only with child interaction
    description: Use when the tooltip overlays interactive elements when active, for example a form input. The `dismissOnMouseOut` prop prevents the tooltip from remaining active when mouse hover or focus leaves its `children` and enters the tooltip's content.
  - fileName: tooltip-with-persistence-on-click.tsx
    title: With persistence on click
    description: Use to present a tooltip that remains open if activated by click or keypress.
  - fileName: tooltip-with-suffix.tsx
    title: With suffix
    description: Use when merchants benefit from information supplemental to the tooltip content. For example, to present a keyboard shortcut beside the content of a tooltip that describes an icon button.
previewImg: /images/components/overlays/tooltip.png
---

# {frontmatter.title}

<Lede>

Tooltips are floating labels that briefly explain the function of a user interface element. They can be triggered when merchants hover, focus, tap, or click.

</Lede>

<Examples />

<Props componentName={frontmatter.title} />

## Best practices

Tooltips should:

- Provide useful, additional information or clarification.
- Succinctly describe or expand on the element they point to.
- Be provided for icon-only buttons or a button with an associated keyboard shortcut.
- Not be used to communicate critical information, including errors in forms or other interaction feedback.
- Not contain any links or buttons.
- Be used sparingly. If you’re building something that requires a lot of tooltips, work on clarifying the design and the language in the experience.

---

## Content guidelines

### Basic tooltips

Tooltips should:

- Be written in sentence case
- Be concise and scannable
- Not be used to communicate error messages or important account information

<DoDont>

#### Do

Post reach is the number of people who have seen your post in their News Feed.

#### Don’t

To continue using Shopify, this amount must be paid immediately.

</DoDont>

---

## Related components

- To make helpful content more visible to merchants, use the help text portions of form components such as [text fields](https://polaris.shopify.com/components/selection-and-input/text-field), [footer help](https://polaris.shopify.com/components/navigation/footer-help), or [an inline link to help](https://polaris.shopify.com/components/link)
