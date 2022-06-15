---
name: Button
category: Actions
platforms:
  - android
  - ios
  - web
keywords:
  - CTA
  - call to action
  - call-to-action
  - primary
  - action
  - basic button
  - outline
  - plain
  - destructive
  - slim
  - large
  - full-width
  - disabled state
  - disabled
  - button
  - link
  - click
  - submit
  - ios
  - android
examples:
  - fileName: button-basic.tsx
    title: Basic button
    description: >-
      Used most in the interface. Only use another style if a button requires
      more or less visual weight.
  - fileName: button-outline.tsx
    title: Outline button
    description: >-
      Use against shaded or colorful backgrounds. An outline button will
      maintain the appropriate visual weight and won’t clash with the background
      color.
  - fileName: button-outline-monochrome.tsx
    title: Outline monochrome button
    description: >-
      Use against shaded or colorful backgrounds where matching the current text
      colors is more appropriate than the current outline theme.
  - fileName: button-plain.tsx
    title: Plain button
    description: >-
      Use for less important or less commonly used actions since they’re less
      prominent. For example, plain buttons are used as actions in
      cards.
  - fileName: button-plain-monochrome.tsx
    title: Plain monochrome button
    description: >-
      Use for less important or less commonly used actions where matching the
      current text color is desired. For example in the InlineError component.
  - fileName: button-plain-destructive.tsx
    title: Plain destructive button
    description: >-
      Use for actions that will delete merchant data or be otherwise difficult
      to recover from. Since they’re less prominent, use for less important or
      less commonly used destructive actions. For example, plain buttons are
      used as actions in cards.
  - fileName: button-primary.tsx
    title: Primary button
    description: >-
      Use to highlight the most important actions in any experience. Don’t use
      more than one primary button in a section or screen to avoid overwhelming
      merchants.
  - fileName: button-destructive.tsx
    title: Destructive button
    description: >-
      Use when the action will delete merchant data or be otherwise difficult to
      recover from. Destructive buttons should trigger a confirmation dialog
      before the action is completed. Be thoughtful about using destructive
      buttons because they can feel stressful for merchants.
  - fileName: button-slim.tsx
    title: Slim button
    description: >-
      Use when a table or list has a set of actions on each item to avoid making
      items taller than they need to be. Don’t use slim buttons for primary
      actions.
  - fileName: button-large.tsx
    title: Large button
    description: >-
      Use for the main call to action in empty states or for calls to action
      shown with large illustrations.
  - fileName: button-full-width.tsx
    title: Full-width button
    description: "Use for buttons placed in a narrow column (especially when stacking multiple buttons) or for creating a set of buttons of equal width. Full-width buttons should rarely exceed 320\_px wide."
  - fileName: button-text-aligned.tsx
    title: Text-aligned button
    description: >-
      Use for plain or monochrome buttons that could have a long length and
      should be aligned when they potentially overflow onto the next line.
  - fileName: button-pressed.tsx
    title: Pressed button
    description: >-
      Buttons are sometimes used as a toggle for other parts of the user
      interface.
  - fileName: button-plain-disclosure.tsx
    title: Plain disclosure button
    description: >-
      Use to indicate that more content can be disclosed on click, like text in
      a collapsible.
  - fileName: button-right-aligned-disclosure.tsx
    title: Right-aligned disclosure
  - fileName: button-select-disclosure.tsx
    title: Select disclosure button
  - fileName: button-split.tsx
    title: Split button
    description: >-
      Use when there is only one primary action but other related actions can be
      taken.
  - fileName: button-disabled-state.tsx
    title: Disabled state
    description: >-
      Use for actions that aren’t currently available. The surrounding interface
      should make it clear why the button is disabled and what needs to be done
      to enable it.
  - fileName: button-loading-state.tsx
    title: Loading state
    description: >-
      Use when a button has been pressed and the associated action is in
      progress.
---

# Button

Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons, which look similar to links, are used for less important or less commonly used actions, such as “view shipping settings”.

For navigational actions that appear within or directly following a sentence, use the [link component](https://polaris.shopify.com/components/navigation/link).

---

## Best practices

Buttons should:

- Be clearly and accurately labeled.
- Lead with a strong, actionable verb.
- Use established button colors appropriately. For example, only use a red
  button for an action that’s difficult or impossible to undo.
- Prioritize the most important actions. Too many calls to action can cause
  confusion and make merchants unsure of what to do next.
- Be positioned in consistent locations in the interface.

### Buttons versus links

Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons, which look similar to links, are used for less important or less commonly used actions, such as “view shipping settings”.

Links are used primarily for navigation, and usually appear within or directly following a sentence.

The HTML that renders for the `Button` and `Link` components carries meaning. Using these components intentionally and consistently results in:

- a more inclusive experience for assistive technology users
- a more cohesive visual experience for sighted users
- products that are easier to maintain at scale

---

## Content guidelines

Buttons should follow the content guidelines for [buttons](https://polaris.shopify.com/content/actionable-language#section-buttons).

---

## Related components

- To combine or lay out multiple buttons, [use the button group component](https://polaris.shopify.com/components/actions/button-group)
- For navigational actions that appear within or directly following a sentence, use the [link component](https://polaris.shopify.com/components/navigation/link)

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

Buttons can have different states that are visually and programmatically conveyed to merchants.

- Use the `ariaControls` prop to add an `aria-controls` attribute to the button. Use the attribute to point to the unique `id` of the content that the button manages.
- If a button expands or collapses adjacent content, then use the `ariaExpanded` prop to add the `aria-expanded` attribute to the button. Set the value to convey the current expanded (`true`) or collapsed (`false`) state of the content.
- Use the `disabled` prop to set the `disabled` state of the button. This prevents merchants from being able to interact with the button, and conveys its inactive state to assistive technologies.
- Use the `pressed` prop to add an `aria-pressed` attribute to the button.

#### Navigation

Merchants generally expect buttons to submit data or take action, and for links to navigate. If navigation is required for the button component, use the `url` prop. The control will output an anchor styled as a button, instead of a button in HTML, to help convey this difference.

For more information on making accessible links, see the [link component](https://polaris.shopify.com/components/navigation/link).

### Labeling

The `accessibilityLabel` prop adds an `aria-label` attribute to the button, which can be accessed by assistive technologies like screen readers. Typically, this label text replaces the visible text on the button for merchants who use assistive technology.

Use `accessibilityLabel` for a button if:

- The button’s visible text doesn’t adequately convey the purpose of the button to non-visual merchants
- The button has no text and relies on an icon alone to convey its purpose

To help support merchants who use speech activation software as well as sighted screen reader users, make sure that the `aria-label` text includes any button text that’s visible. Mismatches between visible and programmatic labeling can cause confusion, and might prevent voice recognition commands from working.

When possible, give the button visible text that clearly conveys its purpose without the use of `accessibilityLabel`. When no additional content is needed, duplicating the button text with `accessibilityLabel` isn’t necessary.

<!-- usageblock -->

#### Do

```jsx
<Button>Edit shipping address</Button>
```

```jsx
<Heading>Shipping address</Heading>
<Button accessibilityLabel="Edit shipping address">Edit</Button>
```

#### Don’t

```jsx
<Button accessibilityLabel="Change your shipping address">Edit</Button>
```

```jsx
<Button accessibilityLabel="Edit">Edit</Button>
```

<!-- end -->

#### External links

When you use the button component to create a link to an external resource:

- Use the `external` prop to make the link open in a new tab (or window, depending on the merchant’s browser settings)
- Use the `icon` prop to add the `external` icon to the button
- Use the `accessibilityLabel` prop to include the warning about opening a new tab in the button text for non-visual screen reader users

For more information on making accessible links, see the [link component](https://polaris.shopify.com/components/navigation/link).

<!-- usageblock -->

#### Do

```jsx
<Button
  accessibilityLabel="Terms and conditions (opens a new window)"
  icon={ExternalMinor}
  url="http://example.com"
  external
>
  Terms and conditions
</Button>
```

#### Don’t

```jsx
<Button url="http://example.com" external>Terms and conditions</Button>
<Button url="http://example.com" external>
  Terms and conditions
</Button>
```

<!-- end -->

### Keyboard support

Buttons use browser defaults for keyboard interactions.

- Give buttons keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key

#### Custom key events

Use the `onKeyDown`, `onKeyPress`, and `onKeyUp` props to create custom events for buttons. With these props, you can use buttons to create complex, custom interactions like drag-and-drop interfaces.

Since these props introduce non-standard features to buttons, make sure to include accessible instructions so that merchants can understand how to use these features.

<!-- /content-for -->
