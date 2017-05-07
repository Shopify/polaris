---
name: Stack
tags:
  - rows
  - vertical centering
  -
category: Structure
---

# Stack
Use to lay out a horizontal row of components or to achieve no-fuss vertical
centering. A stack is made of flexible items that wrap each of the stack’s
children. Options provide control of the spacing and relative size of the items
in the stack.

> **Not what you’re looking for?**
>
>* To create the large-scale structure of pages,[use the layout component](/components/structure/layout).

---

## Best Practices
Stacks should:

* Be used for small-scale layout tasks when you want a row of components that should wrap on small screen widths
* Be used to vertically center two elements
* Not be used for complex or unique arrangements of components
* Not be used for large-scale page layout

---

## Content guidelines
There are no content elements that are specific to stack.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| children | React.ReactNode | Elements to display inside stack |
| vertical | boolean | Stack the elements vertically |
| spacing | enum['tight', 'loose', 'extraLoose', 'none'] | Adjust spacing between elements |
| alignment | enum['leading', 'trailing', 'center', 'fill', 'baseline'] | Adjust alignment of elements |
| distribution | enum['leading', 'trailing', 'center', 'fill', 'baseline', 'fillEvenly'] | Adjust distrubution of elements |

## Examples

### Default behavior

Use to quickly lay out a horizontal row of components and maintain their relative sizes.

```jsx
<Stack>
  <Badge>Paid</Badge>
  <Badge>Fulfilled</Badge>
</Stack>
```

### Spacing options

Use to control spacing of items in a stack in standard increments. Use tight for less spacing, loose for more spacing, or none to remove normal spacing altogether.

```jsx
<Stack spacing="loose">
  <Badge>Paid</Badge>
  <Badge>Fulfilled</Badge>
</Stack>
```

### Vertical centering with a stack

Use to vertically center a set of items.

```jsx
<Stack alignment="center">
  <Heading>Order #1136</Heading>
  <Badge>Paid</Badge>
  <Badge>Fulfilled</Badge>
</Stack>
```

### Fill available space proportionally

Use to have the stack’s items fill the horizontal space in the container but maintain their relative proportions.

```jsx
<Stack distribution="fill">
  <Heading>Order #1136</Heading>
  <Badge>Paid</Badge>
  <Badge>Fulfilled</Badge>
</Stack>
```

### Stack where items fill space evenly

Use to have the stack’s items fill the horizontal space in the container and be equal widths, regardless of their content.

```jsx
<Stack distribution="fillEvenly">
  <Heading>Order #1136</Heading>
  <Badge>Paid</Badge>
  <Badge>Fulfilled</Badge>
</Stack>
```

### Stack where a single item fills the remaining space

Use for aligning buttons or secondary content to the right edge of another element, allowing it to wrap below on small screens.

```jsx
<Stack>
  <Stack.Item fill>
    <Heading>Order #1136</Heading>
  </Stack.Item>
  <Stack.Item>
    <Badge>Paid</Badge>
  </Stack.Item>
  <Stack.Item>
    <Badge>Fulfilled</Badge>
  </Stack.Item>
</Stack>
```
