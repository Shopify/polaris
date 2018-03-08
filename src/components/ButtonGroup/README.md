---
name: Button group
category: Actions
keywords:
  - ButtonGroup
  - choices
  - decision
  - call-to-action
  - CTA
  - segmented buttons
  - divided buttons
  - grouped actions
  - multiple horizontal buttons
  - multiple buttons
  - set of buttons
  - set of actions
  - horizontal arrangement of buttons
---

# Button group

Button group displays multiple related actions in a row to help with horizontal
arrangement and the spacing of calls to action.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants need to understand when a set of actions are related so they can take
the appropriate next step.

### Solution

Button group lays out a set of buttons horizontally as a set and lets them wrap
if necessary.

---

## Best practices

Button groups should:

* Only use buttons that follow the
[best practices outlined in the button component](/components/actions/button#best-practices)
* Group together calls to action that have a relationship
* Be used with consideration that too many calls to action can cause merchants
to be unsure of what to do next
* Be thoughtful about how multiple horizontally placed buttons will look and work
on small screens
* Only be used in groups of up to six buttons if the buttons contain an icon
with no text

---

## Content guidelines

Follow the [content guidelines](/components/actions/button#content-guidelines)
outlined in the button component.

## Examples

### Default button group

Use when you have multiple buttons to space them out evenly.

```jsx
<ButtonGroup>
  <Button>Cancel</Button>
  <Button primary>Save</Button>
</ButtonGroup>
```

### Button group with segmented buttons

Use to emphasize several buttons as a thematically-related set among other controls.

```jsx
<ButtonGroup segmented>
  <Button>Bold</Button>
  <Button>Italic</Button>
  <Button>Underline</Button>
</ButtonGroup>
```
---

## Related components

* To learn how to use individual buttons, [use the button component](/components/actions/button)
* To embed an action or navigation into a line of text, [use the link component](/components/navigation/link)
