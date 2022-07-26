---
name: Action list
category: Actions
keywords:
  - ActionList
  - dropdown
  - drop down
  - popover
  - pop over
  - menu
  - drop-down
  - select
  - options
---

# Action list

Action lists render a list of actions or selectable options. This component is usually placed inside a [popover container](https://polaris.shopify.com/components/popover) to create a dropdown menu or to let merchants select from a list of options.

---

## Best practices

Actions lists should:

- Be used for secondary or less important information and actions since they’re hidden until merchants expose them by opening a popover
- Contain actions that are related to each other

---

## Content guidelines

### Action lists

Each item in an action list should be clear and predictable. Merchants should be able to anticipate what will happen when they click on an action item.

<!-- dodont -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

Each item in an action list should always lead with a strong verb that encourages action. To provide enough context use the {verb}+{noun} format unless the action is clear with a single verb.

<!-- dodont -->

#### Do

- Rename
- Edit HTML

#### Don’t

- File name changes
- HTML editing options

<!-- end -->

Each item in an action list should be scannable avoiding unnecessary words and articles such as the, an, or a.

<!-- dodont -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

---

## Examples

### In a popover

Use for the least important actions so merchants aren’t distracted by secondary tasks. Can also be used for a set of actions that won’t fit in the available screen space.

```jsx
const [active, setActive] = useState(true);

const toggleActive = useCallback(() => setActive((active) => !active), []);

const handleImportedAction = useCallback(
  () => console.log('Imported action'),
  [],
);

const handleExportedAction = useCallback(
  () => console.log('Exported action'),
  [],
);

const activator = (
  <Button onClick={toggleActive} disclosure>
    More actions
  </Button>
);

return (
  <div style={{height: '250px'}}>
    <Popover
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'Import file',
            onAction: handleImportedAction,
          },
          {
            content: 'Export file',
            onAction: handleExportedAction,
          },
        ]}
      />
    </Popover>
  </div>
);
```

### With icons or image

Use when the items benefit from an associated action or image, such as a list of products.

```jsx
const [active, setActive] = useState(true);

const toggleActive = useCallback(() => setActive((active) => !active), []);

const activator = (
  <Button onClick={toggleActive} disclosure>
    More actions
  </Button>
);

return (
  <div style={{height: '200px'}}>
    <Popover
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {content: 'Import file', icon: ImportMinor},
          {content: 'Export file', icon: ExportMinor},
        ]}
      />
    </Popover>
  </div>
);
```

### With an icon and a suffix

Use when the items benefit from an associated action or image, such as a list of products.

```jsx
const [active, setActive] = useState(true);

const toggleActive = useCallback(() => setActive((active) => !active), []);

const activator = (
  <Button onClick={toggleActive} disclosure>
    More actions
  </Button>
);

return (
  <div style={{height: '200px'}}>
    <Popover
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {
            active: true,
            content: 'Import file',
            icon: ImportMinor,
            suffix: <Icon source={TickSmallMinor} />,
          },
          {content: 'Export file', icon: ExportMinor},
        ]}
      />
    </Popover>
  </div>
);
```

### With sections

Use when the items benefit from sections to help differentiate actions.

```jsx
const [active, setActive] = useState(true);

const toggleActive = useCallback(() => setActive((active) => !active), []);

const activator = (
  <Button onClick={toggleActive} disclosure>
    More actions
  </Button>
);

return (
  <div style={{height: '250px'}}>
    <Popover
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        sections={[
          {
            title: 'File options',
            items: [
              {content: 'Import file', icon: ImportMinor},
              {content: 'Export file', icon: ExportMinor},
            ],
          },
          {
            title: 'Bulk actions',
            items: [
              {content: 'Edit', icon: EditMinor},
              {content: 'Delete', icon: DeleteMinor},
            ],
          },
        ]}
      />
    </Popover>
  </div>
);
```

### With destructive item

Use to visually indicate that an action list item is destructive.

```jsx
const [active, setActive] = useState(true);

const toggleActive = useCallback(() => setActive((active) => !active), []);

const activator = (
  <Button onClick={toggleActive} disclosure>
    More actions
  </Button>
);

return (
  <div style={{height: '250px'}}>
    <Popover
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        sections={[
          {
            title: 'File options',
            items: [
              {
                active: true,
                content: 'Import file',
                icon: ImportMinor,
              },
              {content: 'Export file', icon: ExportMinor},
              {
                destructive: true,
                content: 'Delete file',
                icon: DeleteMinor,
              },
            ],
          },
        ]}
      />
    </Popover>
  </div>
);
```

### With help text

Use help text when the normal Verb noun syntax for the actions does not provide sufficient context for the merchant.

```jsx
const [active, setActive] = useState(true);

const toggleActive = useCallback(() => setActive((active) => !active), []);

const activator = (
  <Button onClick={toggleActive} disclosure>
    More actions
  </Button>
);

return (
  <div style={{height: '250px'}}>
    <Popover
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        sections={[
          {
            items: [
              {
                content: 'Blog posts',
                helpText: 'Manage your blog articles',
              },
              {
                content: 'Blogs',
                helpText: 'Manage blogs published to your Online Store',
              },
            ],
          },
        ]}
      />
    </Popover>
  </div>
);
```

### With a prefix and a suffix

Use help text when the normal Verb noun syntax for the actions does not provide sufficient context for the merchant.

```jsx
return (
  <div style={{height: '250px', maxWidth: '350px'}}>
    <ActionList
      actionRole="menuitem"
      items={[
        {
          content: 'Go here',
          prefix: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
              size="small"
              alt="Black leather pet collar"
            />
          ),
          suffix: <Icon source={ChevronRightMinor} />,
        },
        {
          content: 'Or there',
          prefix: <Avatar customer name="Farrah" size="small" />,
          suffix: <Icon source={ChevronRightMinor} />,
        },
      ]}
    />
  </div>
);
```

---

## Related components

- To combine more than one button in a single layout, [use the button group component](https://polaris.shopify.com/components/button-group)
- To display a list of related content, [use the list component](https://polaris.shopify.com/components/list)

---

## Accessibility

Items in an action list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users. Each item is implemented as a [button](https://polaris.shopify.com/components/button).

### Keyboard support

- Give the action list items keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- When action list items have a role of `menuitem`, navigate through the list with <kbd>down arrow</kbd> (<kbd>up arrow</kbd> to move backwards)
- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key

### High contrast support

- Each item is clearly discernible in high contrast mode
- Each item that is focused and hovered is clearly discernible in high contrast mode
