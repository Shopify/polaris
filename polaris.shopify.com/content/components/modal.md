---
name: Modal
category: Overlays
platforms:
  - android
  - ios
  - web
keywords:
  - modal
  - src
  - open
  - title
  - width
  - height
  - primary action
  - secondary action
  - tertiary action
  - destructive action
  - footer
  - instant
  - sectioned
  - large
  - small
  - limit height
  - loading
  - outer wrapper
  - iframe
  - overlay
  - dialog
  - alert
  - android
  - ios
examples:
  - fileName: modal-basic.tsx
    title: Basic modal
    description: Use as the default option for a modal.
  - fileName: modal-with-primary-action.tsx
    title: Modal with primary action
    description: Use to let merchants take a key action.
  - fileName: modal-with-primary-and-secondary-actions.tsx
    title: Modal with primary and secondary actions
    description: >-
      Use to let merchants take key actions at the bottom of the
      modal.
  - fileName: modal-large.tsx
    title: Large modal
    description: Use when you need to increase the width of your modal.
  - fileName: modal-small.tsx
    title: Small modal
    description: Use when you need to decrease the width of your modal.
  - fileName: modal-without-a-title.tsx
    title: Modal without a title
    description: A title is required for accessibility, but you may hide it.
  - fileName: modal-with-scroll-listener.tsx
    title: Modal with scroll listener
    description: Use to implement infinite scroll of modal content.
  - fileName: modal-with-activator-ref.tsx
    title: Modal with activator ref
  - fileName: modal-without-an-activator-prop.tsx
    title: Modal without an activator prop
  # - fileName: modal-warning.tsx
  #   title: Warning modal
  #   description: >-
  #     Use to make it clear to the merchant that the action is potentially
  #     dangerous. Only use this option when the merchant is about to perform an
  #     action that can’t be undone or is difficult to undo.
---

# Modal

Modals are overlays that require merchants to take an action before they can continue interacting with the rest of Shopify. They can be disruptive and should be used thoughtfully and sparingly.

---

## Best practices

Use modals for confirmations and conditional changes. They should be thought of as temporary and not be used for information or actions that need to live on in the UI in a persistent way. Don’t use modals to display complex forms or large amounts of information.

Modals should:

- Require that merchants take an action.
- Close when merchants press the `X` button, the `Cancel` button, or the <kbd>Esc</kbd> key, not when merchants click or tap the area outside the modal.
- Not have more than two buttons (primary and secondary) at the bottom. This prevents unclear action hierarchy and crowding on mobile screens. Since modals are for focused tasks, they should have focused actions. In some cases however, a [tertiary action](#tertiary-actions) may be appropriate.

---

## Content guidelines

### Title

Modal titles should:

- Use a clear {verb}+{noun} question or statement
- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings)

<!-- usagelist -->

#### Do

- Edit email address
- Delete customer?
- Discard unsaved changes?

#### Don’t

- Edit the email address for this order
- Are you sure you want to delete customer?
- Discard?

<!-- end -->

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- usagelist -->

#### Do

- Notification emails will be sent to this address.
- This can’t be undone.

#### Don’t

- You can edit the email address where emails will be sent.
- Are you sure you want to delete the variant Dark Blue Tee/Small/Silk? You cannot reverse this.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

### Primary and secondary actions

Actions should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Action-led: actions should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on actions except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

<a name="tertiary-actions"></a>

### Tertiary actions

Tertiary actions should:

- Only be used when the action requires the context of the content in the modal
- Never be used to dismiss the modal

<!-- usagelist -->

#### Do

- Use a plain button for a tertiary action if needed
  ![Screenshot of modal with a plain button as a tertiary action](/public_images/components/Modal/do-use-plain-button-for-tertiary-action@2x.png)

#### Don’t

- Use a tertiary action for a destructive action
  ![Screenshot of modal with a destructive button as a tertiary action](/public_images/components/Modal/dont-use-destructive-tertiary-action@2x.png)

<!-- end -->

### Footer

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- usagelist -->

#### Do

- Notification emails will be sent to this address.

#### Don’t

- You can edit the email address where emails will be sent.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

---

## Related components

- To present large amounts of additional information or actions that don’t require confirmation, [use the collapsible component](https://polaris.shopify.com/components/behavior/collapsible) to expand content in place within the page
- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](https://polaris.shopify.com/components/overlays/popover)
- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](https://polaris.shopify.com/components/feedback-indicators/banner)

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

- Modals use ARIA `role=”dialog”` to convey to screen reader users that they work like native dialog windows.
- If you set the `title` prop to give the modal component a heading, then the `title` is used to label the dialog element with `aria-labelledby`. This helps to convey the purpose of the modal to screen reader users when it displays.
- After a modal is closed, in order to return focus to the button that launched it, pass the button to the modal as an `activator`.

### Keyboard support

- When a modal opens, focus moves automatically to the modal container so it can be accessed by keyboard users
- While the modal is open, keyboard focus shouldn’t leave the modal
- Merchants can dismiss the modal with the keyboard by activating the `X` button, the `Cancel` button if one is provided, or by pressing the <kbd>Esc</kbd> key
- After a modal is closed, focus returns to the button that launched it

<!-- /content-for -->
