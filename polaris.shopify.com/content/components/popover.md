---
name: Popover
category: Overlays
platforms:
  - android
  - ios
  - web
keywords:
  - interactive
  - container
  - dropdown
  - drop down
  - drop-down
  - popover
  - pop over
  - menu
  - fly out
  - select
  - action list
  - menu
  - context menu
  - popover with form components
  - popover with action list
  - popover with content and actions
  - action sheet
  - ios
  - android
examples:
  - fileName: popover-with-action-list.tsx
    title: Popover with action list
    description: >-
      Use when presenting a set of actions in a disclosable
      menu.
  - fileName: popover-with-content-and-actions.tsx
    title: Popover with content and actions
    description: >-
      Use to present a combination of content, instructions, and actions in a
      panel for tasks that are of low or secondary importance to the current
      page. When used this way, popovers provide useful entry points to related
      features without overwhelming merchants.
  - fileName: popover-with-form-components.tsx
    title: Popover with form components
    description: Use to present secondary input tasks on demand.
  - fileName: popover-with-lazy-loaded-list.tsx
    title: Popover with lazy loaded list
    description: >-
      Use to present merchants with a list that dynamically loads more items on
      scroll or arrow down.
  # - fileName: popover-action-sheet.tsx
  #   title: Action sheet
  #   description: >-
  #     Use when you have few actions that affects the whole page. Action sheets
  #     doesn’t support icons or additional information.
---

# Popover

Popovers are small overlays that open on demand. They let merchants access additional content and actions without cluttering the page.

---

## Best practices

Popovers should:

- Always be positioned next to the button or other interface element that triggers them
- Be used for secondary or less important information and actions since they’re hidden until merchants hit the trigger
- Contain navigation or actions that share a relationships to each other
- Be triggered by a clearly labeled button

---

## Content guidelines

### Popover content

If a popover contains actions, they should:

- Be clear and predictable: merchants should be able to anticipate what will happen when they click on an action item. Never deceive merchants by mislabeling an action.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Be action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Rename
- Edit HTML
- Duplicate

#### Don’t

- HTML editing options
- File name changes
- Duplicate this order so that you can make edits, updates, or changes

<!-- end -->

- Be scannable, especially when the popover contains a list of actions or options. Avoid unnecessary words and articles such as “the”, “an”, or “a”.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

If the popover includes a series of navigational links, each item should:

- Be concise but still give merchants enough information so they can easily find and accurately navigate to the path they want.

<!-- usagelist -->

#### Do

- Online store
- Messenger
- Facebook
- Buy Button

#### Don’t

- Sales channel

<!-- end -->

---

## Related components

- To put a list of actions in a popover, [use the action list component](https://polaris.shopify.com/components/actions/action-list)
- To let merchants select simple options from a list, [use the select component](https://polaris.shopify.com/components/forms/select)

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

Popovers usually contain an [option list](https://polaris.shopify.com/components/lists-and-tables/option-list) or an [action list](https://polaris.shopify.com/components/actions/action-list), but can also contain other controls or content.

To assist screen readers with sending focus to an [action list](https://polaris.shopify.com/components/actions/action-list), pass `autofocusTarget='first-node'` to `Popover`. This will avoid known issues a screen reader may have with keyboard support once focus is moved off the activator.

Web browsers assign a default value of 'menu' to the `aria-haspopup` role. You can use the prop `ariaHaspopup` to specify a value. Screen readers may fail to send focus to the `Popover` content when they expect the content to be adjacent to the element with `aria-haspopup` in the DOM tree. In this scenario, it is recommended not to provide the `ariaHaspopup` prop.

### Keyboard support

- When a popover opens, focus moves to the first focusable element or to the popover container
- Once focus is in the popover, merchants can access controls in the popover using the <kbd>tab</kbd> key (and <kbd>shift</kbd> + <kbd>tab</kbd> backwards) and standard keystrokes for interacting
- Merchants can dismiss the popover by tabbing out of it, pressing the <kbd>esc</kbd> key, or clicking outside of it
- When the popover is closed, focus returns to the element that launched it

<!-- /content-for -->
