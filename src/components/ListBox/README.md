---
name: ListBox
category: Forms
keywords:
  - list
  - listbox
---

# ListBox

The `ListBox` component is a list component that implements part the Aria 1.2 ListBox specs.

---

## Best practices

---

## Content guidelines

---

### Example

### Basic ListBox

```jsx
<ListBox>
  <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
  <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
  <ListBox.Option value="UniqueValue-3">Item 3</ListBox.Option>
</ListBox>
```

### ListBox with Section

```jsx
<ListBox>
  <ListBox.Section title={<ListBox.Header>Section Header</ListBox.Header>}>
    <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
    <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
    <ListBox.Option value="UniqueValue-3">Item 3</ListBox.Option>
  </ListBox.Section>
</ListBox>
```

### ListBox with Loading

```jsx
<ListBox>
  <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
  <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
  <ListBox.Option value="UniqueValue-3">Item 3</ListBox.Option>
  <ListBox.Loading />
</ListBox>
```

### ListBox with Action

```jsx
<ListBox>
  <ListBox.Action value="ActionValue" divider>
    <div>Add item</div>
  </ListBox.Action>
  <ListBox.Option value="UniqueValue-1">Item 1</ListBox.Option>
  <ListBox.Option value="UniqueValue-2">Item 2</ListBox.Option>
</ListBox>
```

### ListBox with custom element

```jsx
<ListBox>
  <ListBox.Action value="ActionValue" divider>
    Add item
  </ListBox.Action>
  <ListBox.Section title={<div>Section Header</div>}>
    <ListBox.Option value="UniqueValue-1">
      <div>Item 1</div>
    </ListBox.Option>
    <ListBox.Option value="UniqueValue-2">
      <div>Item 2</div>
    </ListBox.Option>
    <ListBox.Option value="UniqueValue-3">
      <div>Item 3</div>
    </ListBox.Option>
  </ListBox.Section>
  <ListBox.Loading accessibilityLabel="items are loading" />
</ListBox>
```
