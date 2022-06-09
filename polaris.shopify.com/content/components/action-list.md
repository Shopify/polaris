---
name: Action list
category: Actions
keywords:
  - ActionList
  - dropdown
  - drop down
  - popover
  - pop over
  - menu
  - drop-down
  - select
  - options
examples:
  - fileName: action-list-in-a-popover.tsx
    title: Action list in a popover
    description: >-
      Use for the least important actions so merchants aren’t distracted by
      secondary tasks. Can also be used for a set of actions that won’t fit in
      the available screen space.
  - fileName: action-list-with-icons-or-image.tsx
    title: Action list with icons or image
    description: >-
      Use when the items benefit from an associated action or image, such as a
      list of products.
  - fileName: action-list-with-an-icon-and-a-suffix.tsx
    title: Action list with an icon and a suffix
    description: >-
      Use when the items benefit from an associated action or image, such as a
      list of products.
  - fileName: action-list-sectioned.tsx
    title: Sectioned action list
    description: Use when the items benefit from sections to help differentiate actions.
  - fileName: action-list-with-destructive-item.tsx
    title: Action list with destructive item
    description: Use to visually indicate that an action list item is destructive.
  - fileName: action-list-with-help-text.tsx
    title: Action list with help text
    description: >-
      Use help text when the normal Verb noun syntax for the actions does not
      provide sufficient context for the merchant.
  - fileName: action-list-with-a-prefix-and-a-suffix.tsx
    title: Action list with a prefix and a suffix
    description: >-
      Use help text when the normal Verb noun syntax for the actions does not
      provide sufficient context for the merchant.
---

# Action list

Action lists render a list of actions or selectable options. This component is usually placed inside a [popover container](https://polaris.shopify.com/components/overlays/popover) to create a dropdown menu or to let merchants select from a list of options.

---

## Best practices

Actions lists should:

- Be used for secondary or less important information and actions since they’re hidden until merchants expose them by opening a popover
- Contain actions that are related to each other

---

## Content guidelines

### Action lists

Each item in an action list should be clear and predictable. Merchants should be able to anticipate what will happen when they click on an action item.

<!-- usagelist -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

Each item in an action list should always lead with a strong verb that encourages action. To provide enough context use the {verb}+{noun} format unless the action is clear with a single verb.

<!-- usagelist -->

#### Do

- Rename
- Edit HTML

#### Don’t

- File name changes
- HTML editing options

<!-- end -->

Each item in an action list should be scannable avoiding unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

---

## Related components

- To combine more than one button in a single layout, [use the button group component](https://polaris.shopify.com/components/actions/button-group)
- To display a list of related content, [use the list component](https://polaris.shopify.com/components/lists-and-tables/list)

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

Items in an action list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users. Each item is implemented as a [button](https://polaris.shopify.com/components/actions/button).

### Keyboard support

- Give the action list items keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- When action list items have a role of `menuitem`, navigate through the list with <kbd>down arrow</kbd> (<kbd>up arrow</kbd> to move backwards)
- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key

### High contrast support

- Each item is clearly discernible in high contrast mode
- Each item that is focused and hovered is clearly discernible in high contrast mode

<!-- /content-for -->
