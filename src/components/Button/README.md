---
name: Button
tags:
  - form
  - input
category: Forms
---

# Button

Buttons are used to trigger actions or navigation.

## Problem

An action needs to be completed by a merchant.

## Solution

A button component can be used to allow the merchant to click or press it to complete the action.

---

## Design guidelines

Great buttons should:

- Lead with strong, actionable verbs.
- Use established button colors appropriately. For example, only use a red button for an action that is potentially destructive and hard or impossible to undo.
- Be focused on the primary and secondary action a merchant needs to take. Too many calls to action can cause confusion and make merchants unsure of what to do next.

---

## Content guidelines

Buttons should be:

Clear and predictable: Merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling a button.

DO: Create order; Buy shipping label
DON’T: New order; Buy

Action-led: Buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

DO: Activate Apple Pay; View shipping settings
DON’T: Try Apple Pay; View your settings

Scannable: Avoid unnecessary words and articles such as the, an, or a.

DO: Add menu item
DON’T: Add a menu item

---

| Prop | Type | Description |
| ---- | ---- | ----------- |
| to | string | URL to link to |
| primary | boolean | Display as primary button |
| destructive | boolean | Display as destuctive button |
| disabled | boolean | Display as destuctive button |
| slim | boolean | Display a slimmer button |
| large | boolean | Display a larger button |
| fullWidth | boolean | Display full width button |
| onClick | function(value: string) | Function to call when clicked |
| children | React.ReactNode | The content to display inside the button. |

## Examples

### Default button

Use this when you have a simple message to communicate to merchants that doesn’t require any secondary steps.

```jsx
<Button>Button</Button>
```

### Button that links

Use this when you need the visual style of a button but the action to be navigation to another page.

```jsx
<Button to="http://www.google.ca" external>Go to Google</Button>
```

### Primary button

Use this when you have a simple message to communicate to merchants that requires them to take an action. Put a call-to-action in the footer when you need merchants to read the content in the card before taking the action.

```jsx
<Button primary>Primary button</Button>
```

### Disabled button

Use a disabled state when an action isn't currently able to be completed, but a change of state would enable it to be.

```jsx
<Button disabled>Disabled button</Button>
```
