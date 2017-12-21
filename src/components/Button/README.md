---
name: Button
category: Actions
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
---

# Button

Buttons make common actions immediately visible and easy to perform with one
click or tap. They can be used for any type of action, including navigation.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

An action needs to be completed by a merchant.

### Solution

The button component can be used to help merchants find and complete actions across Shopify.

---

## Best practices

Buttons should:

* Be clearly and accurately labeled.
* Lead with strong, actionable verbs.
* Use established button colors appropriately. For example, only use a red
button for an action that’s difficult or impossible to undo.
* Prioritize the most important actions. Too many calls to action can cause
confusion and make merchants unsure of what to do next.
* Be positioned in consistent locations in the interface.

---

## Content guidelines

Buttons should be clear and predictable—merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling a button.

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


| Prop | Type | Description |
| ---- | ---- | ----------- |
| children | string | The content to display inside the button |
| url | string | A destination to link to, rendered in the href attribute of a link |
| primary | boolean | Provides extra visual weight and identifies the primary action in a set of buttons |
| destructive | boolean | Indicates a dangerous or potentially negative action |
| disabled | boolean | Disables the button, disallowing merchant interactiion |
| loading | boolean | Replaces button text with a spinner while a background action is being performed |
| size | enum['slim', 'large'] | Changes the size of the button, giving it more or less padding |
| outline | boolean | Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops |
| fullWidth | boolean |  Allows the button to grow to the width of its container |
| disclosure | boolean | Displays the button with a disclosure icon |
| submit | boolean | Allows the button to submit a form |
| plain | boolean | Renders a button that looks like a link |
| external | boolean | Forces url to open in a new tab |
| icon | SVG | Icon to display to the left of the button content |
| accessibilityLabel | string | Visually hidden text for screen readers |
| onClick | function() | Callback when clicked |
| onFocus | function() | Callback when button becomes focussed |
| onBlur | function() | Callback when focus leaves button |

## Examples

### Basic button

Used most in the interface. Only use another style if a button requires more or less visual weight.

```jsx
<Button>Add product</Button>
```

### Outline button

Use against shaded or colorful backgrounds. An outline button will maintain the appropriate visual weight and won’t clash with the background color.

```jsx
<Button outline>Add product</Button>
```

### Plain button

Use for less important or less commonly used actions since they’re less prominent. For example, plain buttons are used as secondary actions in card headers.

```jsx
<Button plain>View shipping settings</Button>
```

### Primary buttons

Use to highlight the most important actions in any experience. Don’t use more than one primary button in a section or screen to avoid overwhelming merchants.

```jsx
<Button primary>Save theme</Button>
```

### Destructive buttons

Use when the action will delete merchant data or be otherwise difficult to recover from. Destructive buttons should trigger a confirmation dialog before the action is completed. Be thoughtful about using destructive buttons because they can feel stressful for merchants.

```jsx
<Button destructive>Delete theme</Button>
```

### Slim buttons

Use when a table or list has a set of actions on each item to avoid making items taller than they need to be. Don’t use slim buttons for primary actions.

```jsx
<Button size="slim">Save variant</Button>
```

### Large buttons

Use for the main call to action in empty states or for calls to action shown with large illustrations.

```jsx
<Button size="large">Create store</Button>
```

### Full-width buttons

Use for buttons placed in a narrow column (especially when stacking multiple buttons) or for creating a set of buttons of equal width. Full-width buttons should rarely exceed 320 px wide.

```jsx
<Button fullWidth>Add customer</Button>
```

### Disabled state

Use for actions that aren’t currently available. The surrounding interface should make it clear why the button is disabled and what needs to be done to enable it.

```jsx
<Button disabled>Buy shipping label</Button>
```

### Loading state

Use when a button has been pressed and the associated action is in progress.

```jsx
<Button loading>Save product</Button>
```

---

## Related components

* To learn how to combine or lay out multiple buttons, [use the button group component](/components/actions/button-group)
* To embed an action into a line of text, [use the link component](/components/navigation/link)
