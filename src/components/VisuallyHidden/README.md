---
name: Visually hidden
category: Titles and text
keywords:
  - screen readers
  - hidden but available for screen readers
  - visually hidden headings
  - hide
  - hidden headings
  - hidden text
  - visually hidden table headers
  - visually hidden headers
  - hidden table headers
  - hidden table headings
  - accessibility
  - a11y
  - assistive technology
---

# Visually hidden

Use when an element needs to be available to assistive technology (e.g. screen readers) but otherwise hidden.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

A content element may be visually redundant but provides important context to merchants who are using a screen reader.

### Solution

Wrap the piece of text in the visually hidden component so it doesn’t show on the interface, but will still be available to merchants using a screen reader.

---

## Best practices

Visually hidden should:

- Not be used if semantic markup can make content understandable to people using assistive technology
- Be used to provide extra context when semantic markup isn’t enough
- Be used on any content that is normally present but is being omitted
- Make sense in context when used with a screen reader

---

## Content guidelines

There are no content elements specific to this component. Follow any guidelines appropriate to the element being hidden.


| Prop | Type | Description |
| ---- | ---- | ----------- |
| children | React.ReactNode | The content to be hidden visually |


## Examples

### Visually hidden heading

Always provide a heading for a major page section such as a card. In rare cases the heading is visually redundant and the meaning is conveyed by context. Rather than omit the heading, wrap the heading in the visually hidden component.

```jsx
<Card sectioned>
  <VisuallyHidden>
    <Heading>Title and description</Heading>
  </VisuallyHidden>
  <FormLayout>
    <TextField label="Title" value="Artisanal Wooden Spoon" />
    <TextField label="Description" multiline />
  </FormLayout>
</Card>
```

### Visually hidden table headers

Whenever one or more table columns has no need for a visible header, hide the header content rather than omitting it. Note that due to browser quirks the visually hidden component must go inside each `<th>`.

```jsx
<table>
  <thead>
    <tr>
      <th scope="col"><VisuallyHidden>Line item</VisuallyHidden></th>
      <th scope="col"><VisuallyHidden>Value</VisuallyHidden></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Subtotal</th>
      <td>$184.13</td>
    </tr>
    <tr>
      <th scope="row">Tax</th>
      <td>$0.00</td>
    </tr>
    <tr>
      <th scope="row">Total</th>
      <td>$184.13</td>
    </tr>
  </tbody>
</table>
```
