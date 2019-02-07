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

Buttons are used to make common actions immediately visible and easy to perform with one click or tap. Merchants can use it to navigate, or take action.

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

### Plain monochrome button

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

<!-- content-for: android -->

![Plain button for Android](/public_images/components/Button/android/plain@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Plain button for iOS](/public_images/components/Button/ios/plain@2x.png)

<!-- /content-for -->

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

### Pressed button

<!-- example-for: web -->

Use to display the button in a pressed state.

```jsx
<Button pressed>Toggle me</Button>
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
