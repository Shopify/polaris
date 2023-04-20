---
title: Alpha card
description: Cards are used to group similar concepts and tasks together for merchants to scan, read, and get things done. It displays content in a familiar and recognizable style.
category: Layout and structure
keywords:
  - layout
  - card
  - responsive
  - container
  - box
  - grid
  - panel
  - card with call to action in the footer
  - card with call to action in the heading
  - card with call to action in a section
  - card with button in the footer
  - card with button in the heading
  - card with multiple sections
  - card with subsections
  - sectioned card
  - card with a subdued section
  - subdued card for secondary content
  - callout
  - call out
status:
  value: Alpha
  message: This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).
examples:
  - fileName: alpha-card-default.tsx
    title: Default
    description: >-
      By default, cards have an 8px border radius and uses `--p-surface` as the background and `--p-shadow-md` as the shadow. There is padding of `space-5` (20px) around children and `space-4` (16px) for small screens.
  - fileName: alpha-card-with-subdued-background.tsx
    title: With subdued background
    description: >-
      Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.
  - fileName: alpha-card-with-varying-padding.tsx
    title: With varying padding
    description: >-
      Use the `padding` property to adjust the spacing of content within a card. The `padding` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).
  - fileName: alpha-card-with-rounded-corners.tsx
    title: Rounded corners
    description: >-
      Cards can have a border radius applied responsively with the `roundedAbove` prop.
  - fileName: alpha-card-with-section.tsx
    title: With section
    description: >-
      Use when you have a distinct piece of information to communicate to merchants.
  - fileName: alpha-card-with-subdued-section.tsx
    title: With subdued section
    description: >-
      Use to indicate when one of the sections in your card contains inactive or disabled content.
  - fileName: alpha-card-with-subsection.tsx
    title: With subsection
    description: >-
      Use when your card sections need further categorization.
  - fileName: alpha-card-with-multiple-sections.tsx
    title: With multiple sections
    description: Use when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.
  - fileName: alpha-card-with-flush-section.tsx
    title: With flush section
    description: Use when you need further control over the spacing of your card sections.
  - fileName: alpha-card-with-titled-sections.tsx
    title: With multiple titled sections
    description: Use when you have a distinct piece of information to communicate to merchants that is complex enough to require a title to introduce it.
  - fileName: alpha-card-with-multiple-titled-sections.tsx
    title: With multiple titled sections
    description: Use when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.
  - fileName: alpha-card-with-sections-and-actions.tsx
    title: With sections and actions
    description: Use when your card section has actions that apply only to that section.
  - fileName: alpha-card-with-custom-react-node-title.tsx
    title: With custom React Node title
    description: Use to render custom content such as icons, links, or buttons in a card section’s header.
  - fileName: alpha-card-with-separate-header.tsx
    title: With separate header
    description: Use to be able to use custom React elements as header content.
  - fileName: alpha-card-with-header-actions.tsx
    title: With header actions
    description: Use for less important card actions, or actions merchants may do before reviewing the contents of the card. For example, merchants may want to add items to a card containing a long list, or enter a customer’s new address.
  - fileName: alpha-card-with-footer-actions.tsx
    title: With footer actions
    description: Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card. For example, merchants should review the contents of a shipment before an important action like adding tracking information.
  - fileName: alpha-card-with-multiple-footer-actions.tsx
    title: With multiple footer actions
    description: When multiple secondary footer actions are provided, they will render in an action list popover activated by a disclosure button. The disclosure button text can be customized with the `secondaryFooterActionsDisclosureText` prop in the `secondaryActionsFrom` utility function.
  - fileName: alpha-card-with-custom-footer-actions.tsx
    title: With custom footer actions
    description: Use to present actionable content that is optional or not the primary purpose of the page.
  - fileName: alpha-card-with-destructive-footer-actions.tsx
    title: With destructive footer action
    description: Use when a card action will delete merchant data or be otherwise difficult to recover from.
  - fileName: alpha-card-with-destructive-action.tsx
    title: With destructive action
    description: Use when a card action applies only to one section and will delete merchant data or be otherwise difficult to recover from.
  - fileName: alpha-card-with-all-elements.tsx
    title: With all elements
    description: Use as a broad example that includes using other layout components to build out the card.
---

## Best practices

Cards should:

- Group related information
- Display information in a way that prioritizes what the merchant needs to know most first
- Use headings that set clear expectations about the card’s purpose
- Stick to single user flows or break more complicated flows into multiple sections
- Avoid too many call-to-action buttons or links and only one primary call to action per card
- Use calls to action on the bottom of the card for next steps and use the space in the upper right corner of the card for persistent, optional actions (such as Edit)

---

## Related components

- For more flexibility on styling, [use the Box component](https://polaris.shopify.com/components/layout-and-structure/box)
