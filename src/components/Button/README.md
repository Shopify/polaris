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
---

# Button

Buttons are used to make common actions immediately visible and easy to perform with one click, tap, or keypress. Merchants can use them to navigate or to take action.

---

## Best practices

Buttons should:

- Be clearly and accurately labeled.
- Lead with strong, actionable verbs.
- Use established button colors appropriately. For example, only use a red
  button for an action that’s difficult or impossible to undo.
- Prioritize the most important actions. Too many calls to action can cause
  confusion and make merchants unsure of what to do next.
- Be positioned in consistent locations in the interface.

---

## Content guidelines

Buttons should be clear and predictable—merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

Read the [actionable language guidelines](/content/actionable-language) to learn what to label buttons for different states in web, iOS, and Android.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

Buttons should always lead with a strong verb that encourages
action. To provide enough context to merchants use the {verb}+{noun} format on
buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

<!-- end -->

Buttons should be scannable—avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

---

## Examples

### Basic button

Used most in the interface. Only use another style if a button requires more or less visual weight.

```jsx
<Button>Add product</Button>
```

<!-- content-for: android -->

![Basic button for Android](/public_images/components/Button/android/basic@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Basic button for iOS](/public_images/components/Button/ios/basic@2x.png)

<!-- /content-for -->

### Outline button

<!-- example-for: web -->

Use against shaded or colorful backgrounds. An outline button will maintain the appropriate visual weight and won’t clash with the background color.

```jsx
<Button outline>Add product</Button>
```

### Outline monochrome button

<!-- example-for: web -->

Use against shaded or colorful backgrounds where matching the current text colors is more appropriate than the current outline theme.

```jsx
<div style={{color: '#bf0711'}}>
  <Button monochrome outline>
    Retry
  </Button>
</div>
```

### Plain button

Use for less important or less commonly used actions since they’re less prominent. For example, plain buttons are used as actions in cards.

```jsx
<Button plain>View shipping settings</Button>
```

<!-- content-for: android -->

![Plain button for Android](/public_images/components/Button/android/plain@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Plain button for iOS](/public_images/components/Button/ios/plain@2x.png)

<!-- /content-for -->

### Plain monochrome button

<!-- example-for: web -->

Use to render a buttons that look like links where matching the surrounding text color is visually more appropriate. For example in the InlineError component.

```jsx
<InlineError
  message={
    <React.Fragment>
      An error occurred. &nbsp;
      <Button plain monochrome>
        Try again
      </Button>
    </React.Fragment>
  }
/>
```

### Primary button

Use to highlight the most important actions in any experience. Don’t use more than one primary button in a section or screen to avoid overwhelming merchants.

```jsx
<Button primary>Save theme</Button>
```

<!-- content-for: android -->

![Primary button for Android](/public_images/components/Button/android/primary@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Primary button for iOS](/public_images/components/Button/ios/primary@2x.png)

<!-- /content-for -->

### Destructive button

Use when the action will delete merchant data or be otherwise difficult to recover from. Destructive buttons should trigger a confirmation dialog before the action is completed. Be thoughtful about using destructive buttons because they can feel stressful for merchants.

```jsx
<Button destructive>Delete theme</Button>
```

<!-- content-for: android -->

![Destrutive plain and destructive basic button for Android](/public_images/components/Button/android/destructive@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Destrutive plain and destructive basic button for iOS](/public_images/components/Button/ios/destructive@2x.png)

<!-- /content-for -->

### Slim button

<!-- example-for: web -->

Use when a table or list has a set of actions on each item to avoid making items taller than they need to be. Don’t use slim buttons for primary actions.

```jsx
<Button size="slim">Save variant</Button>
```

### Large button

<!-- example-for: web -->

Use for the main call to action in empty states or for calls to action shown with large illustrations.

```jsx
<Button size="large">Create store</Button>
```

### Full-width button

<!-- example-for: web -->

Use for buttons placed in a narrow column (especially when stacking multiple buttons) or for creating a set of buttons of equal width. Full-width buttons should rarely exceed 320 px wide.

```jsx
<Button fullWidth>Add customer</Button>
```

### Text-aligned button

<!-- example-for: web -->

Use for plain or monochrome buttons that could have a long length and should be aligned when they potentially overflow onto the next line.

```jsx
<Button plain textAlign="left">
  This is a really long string of text that overflows onto the next line we need
  to put in a lot of words now you can see the alignment. It is very long but a
  customer could potentially name something this long.
</Button>
```

### Disabled state

Use for actions that aren’t currently available. The surrounding interface should make it clear why the button is disabled and what needs to be done to enable it.

```jsx
<Button disabled>Buy shipping label</Button>
```

<!-- content-for: android -->

![Disabled primary button for Android](/public_images/components/Button/android/disabled@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Disabled primary button for iOS](/public_images/components/Button/ios/disabled@2x.png)

<!-- /content-for -->

### Loading state

<!-- example-for: web -->

Use when a button has been pressed and the associated action is in progress.

```jsx
<Button loading>Save product</Button>
```

---

## Related components

- To learn how to combine or lay out multiple buttons, [use the button group component](/components/actions/button-group)
- To embed an action into a line of text, [use the link component](/components/navigation/link)

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
- Use the `ariaPressed` prop to add an `aria-pressed` attribute to the button.

#### Navigation

Merchants generally expect buttons to submit data or take action, and for links to navigate. If navigation is required for the button component, use the `url` prop. The control will output an anchor styled as a button, instead of a button in HTML, to help convey this difference.

For more information on making accessible links, see the [link component](/components/navigation/link).

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

For more information on making accessible links, see the [link component](/components/navigation/link).

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
