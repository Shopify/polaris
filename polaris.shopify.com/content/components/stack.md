---
name: Stack
category: Structure
keywords:
  - rows
  - vertical centering
  - horizontal row of components
  - flexible items
  - flexbox
  - row of components
  - stack spacing
  - vertical centering
  - fill available space
  - fill space
  - equal width
  - right-aligned stack
  - stack layout
  - layout
examples:
  - fileName: stack-default-behavior.tsx
    title: Default behavior
    description: >-
      Use to quickly lay out a horizontal row of components and maintain their
      relative sizes. On small screens, children rows wrap down to additional
      rows as needed.
  - fileName: stack-non-wrapping.tsx
    title: Non-wrapping Stacks
    description: >-
      Use to create a stack where the children will not wrap to new rows on
      small screens. As noted above, the wrap option defaults to true. This
      means you must explicitly set it to false to turn it off.
  - fileName: stack-spacing-options.tsx
    title: Spacing options
    description: >-
      Use to control spacing of items in a stack in standard increments. Use
      tight for less spacing, loose for more spacing, or none to remove normal
      spacing altogether.
  - fileName: stack-vertical-centering.tsx
    title: Vertical centering with a stack
    description: Use to vertically center a set of items that have different heights.
  - fileName: stack-fill-available-space-proportionally.tsx
    title: Fill available space proportionally
    description: >-
      Use to have the stack’s items fill the horizontal space in the container
      but maintain their relative proportions.
  - fileName: stack-where-items-fill-space-evenly.tsx
    title: Stack where items fill space evenly
    description: >-
      Use to have the stack’s items fill the horizontal space in the container
      and be equal widths, regardless of their content.
  - fileName: stack-where-a-single-item-fills-the-remaining-space.tsx
    title: Stack where a single item fills the remaining space
    description: >-
      Use for aligning buttons or secondary content to the right edge of another
      element, allowing it to wrap below on small screens.
---

# Stack

Use to lay out a horizontal row of components or to achieve no-fuss vertical centering. A stack is made of flexible items that wrap each of the stack’s children. Options provide control of the wrapping, spacing, and relative size of the items in the stack.

---

## Best practices

Stacks should:

- Be used for small-scale layout tasks when you want a row of components that should wrap on small screen widths
- Be used to vertically center two elements
- Not be used for complex or unique arrangements of components
- Not be used for large-scale page layout

---

## Stack item

The stack component will treat multiple elements wrapped in a stack item component as one item. By default, each individual element is treated as one stack item. Use the fill prop on a single stack item component to make it fill the rest of the available horizontal space. See the “Stack where a single item fills the remaining space” example.

### Stack item properties

| Prop     | Type    | Description                                                    | Default |
| -------- | ------- | -------------------------------------------------------------- | ------- |
| fill     | boolean | Fill the available horizontal space in the stack with the item | false   |
| children | any     | Elements to display inside stack item                          |         |

---

## Related components

- To create the large-scale structure of pages, [use the layout component](https://polaris.shopify.com/components/structure/layout)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

The stack component is for alignment only and doesn’t provide any structural information for assistive technologies. To convey relationships between specific items, consider using the [list component](https://polaris.shopify.com/components/lists-and-tables/list).

<!-- /content-for -->
