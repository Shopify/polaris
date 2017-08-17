---
name: Button group
tags:
  - choices
  - decision
  - call-to-action
  - CTA
category: Actions
---

# Button group

Button group displays multiple related actions in a row to help with horizontal
arrangement and the spacing of calls to action.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

**Problem**

Merchants need to understand when a set of actions are related so they can take
the appropriate next step.

**Solution**

Button group lays out a set of buttons horizontally as a set and lets them wrap
if necessary.

---

## Best practices

Button groups should:

* Only use buttons that follow the
[best practices outlined in the button component](component/button)
* Group together calls to action that have a relationship
* Be used with consideration that too many calls to action can cause merchants
to be unsure of what to do next
* Be thoughtful about how multiple horizontally placed buttons will look and work
on small screens
* Only be used in groups of up to six buttons if the buttons contain an icon
with no text

---

## Content guidelines

Follow the [content guidelines](/components/button#content-guidelines)
outlined in the button component.


| Prop | Type | Description |
| ---- | ---- | ----------- |
| segmented | boolean | Join buttons as segmented group |
| children | React.ReactElement | Button components |

## Examples

### Default button group

Use when you have multiple buttons to space them out evenly.

```jsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

### Button group with segmented buttons

Use to emphasize several buttons as a thematically-related set among other controls.

```jsx
<ButtonGroup segmented>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```
---

## Related components

* To learn how to use individual buttons, [use the button component](/components/actions/button)
* To embed an action or navigation into a line of text, [use the link component](/components/navigation/link)
