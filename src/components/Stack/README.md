---
name: Stack
category: Structure
keywords:
  - rows
  - vertical centering
  - horizontal row of components
  - flexible items
  - flexbox
  - row of components
  - stack spacing
  - vertical centering
  - fill available space
  - fill space
  - equal width
  - right-aligned stack
  - stack layout
  - layout
---

# Stack

Use to lay out a horizontal row of components or to achieve no-fuss vertical
centering. A stack is made of flexible items that wrap each of the stack’s
children. Options provide control of the wrapping, spacing, and relative size of the items in the stack.

---

## Best practices

Stacks should:

- Be used for small-scale layout tasks when you want a row of components that should wrap on small screen widths
- Be used to vertically center two elements
- Not be used for complex or unique arrangements of components
- Not be used for large-scale page layout

---

## Content guidelines

There are no content elements that are specific to stack.

---

## Examples

### Default behavior

Use to quickly lay out a horizontal row of components and maintain their relative sizes. On small screens, children rows wrap down to additional rows as needed.

```jsx
<Stack>
  <Badge>Paid</Badge>
  <Badge>Processing</Badge>
  <Badge>Fulfilled</Badge>
  <Badge>Completed</Badge>
</Stack>
```

### Non-wrapping Stacks

Use to create a stack where the children will not wrap to new rows on small screens. As noted above, the wrap option defaults to true. This means you must explitly set it to false to turn it off.

```jsx
<Stack wrap={false}>
  <Badge>Paid</Badge>
  <Badge>Processing</Badge>
  <Badge>Fulfilled</Badge>
  <Badge>Completed</Badge>
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

---

## Related components

- To create the large-scale structure of pages, [use the layout component](/components/structure/layout)
