---
name: Option list
category: Lists and tables
keywords:
  - option list
  - choices
  - decision
  - list
  - list of tags
  - list of collections
  - collections lists
  - collection lists
  - list selection
---

# Option list

The option list component lets you create a list of grouped items that merchants can pick from. This can include single selection or multiple selection of options. Option list usually appears in a popover, and sometimes in a modal or a sidebar. Option lists are styled differently than [choice lists](https://polaris.shopify.com/components/choice-list) and should not be used within a form, but as a standalone menu.

---

## Best practices

The option list component should:

- Be placed on its own inside a container. Usually the container behaves like a menu, as it does with [popover](https://polaris.shopify.com/components/popover). Don’t place other components within the same container.
- Not be used when a [select component](https://polaris.shopify.com/components/select) will do.

---

## Content guidelines

### Option lists

Each item in an option list should be clear and descriptive.

<!-- dodont -->

#### Do

- Traffic referrer source

#### Don’t

- Source

<!-- end -->

---

## Examples

### Default

Use for a group of similar selectable items when only one should be selectable at once.

```jsx
function OptionListExample() {
  const [selected, setSelected] = useState([]);

  return (
    <Card>
      <OptionList
        title="Inventory Location"
        onChange={setSelected}
        options={[
          {value: 'byward_market', label: 'Byward Market'},
          {value: 'centretown', label: 'Centretown'},
          {value: 'hintonburg', label: 'Hintonburg'},
          {value: 'westboro', label: 'Westboro'},
          {value: 'downtown', label: 'Downtown'},
        ]}
        selected={selected}
      />
    </Card>
  );
}
```

### Multiple

Use when you have a group of similar selectable items and more than one item can be selected at once.

```jsx
function MultipleOptionListExample() {
  const [selected, setSelected] = useState([]);

  return (
    <Card>
      <OptionList
        title="Manage sales channels availability"
        onChange={setSelected}
        options={[
          {value: 'online_store', label: 'Online Store'},
          {value: 'messenger', label: 'Messenger'},
          {value: 'facebook', label: 'Facebook'},
          {value: 'wholesale', label: 'Wholesale'},
          {value: 'buzzfeed', label: 'BuzzFeed'},
        ]}
        selected={selected}
        allowMultiple
      />
    </Card>
  );
}
```

### With sections

Use sections when you have multiple groups of similar selectable items.

```jsx
function OptionListWithSectionsExample() {
  const [selected, setSelected] = useState([]);

  return (
    <Card>
      <OptionList
        onChange={setSelected}
        sections={[
          {
            options: [
              {value: 'type', label: 'Sale item type'},
              {value: 'kind', label: 'Sale kind'},
            ],
          },
          {
            title: 'Traffic',
            options: [
              {value: 'source', label: 'Traffic referrer source'},
              {value: 'host', label: 'Traffic referrer host'},
              {value: 'path', label: 'Traffic referrer path'},
            ],
          },
        ]}
        selected={selected}
        allowMultiple
      />
    </Card>
  );
}
```

### In a popover

Use when a set of selections won’t fit in the available screen space.

```jsx
function OptionListInPopoverExample() {
  const [selected, setSelected] = useState([]);
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );

  return (
    <div style={{height: '275px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <OptionList
          title="Inventory Location"
          onChange={setSelected}
          options={[
            {
              value: 'byward_market',
              label: 'Byward Market',
              active: true,
            },
            {value: 'centretown', label: 'Centretown'},
            {
              value: 'hintonburg',
              label: 'Hintonburg',
              active: true,
            },
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={selected}
        />
      </Popover>
    </div>
  );
}
```

---

## Related components

- To render a list of actions,
  [use the action list component](https://polaris.shopify.com/components/action-list)
- To create a list of grouped radio buttons or checkboxes,
  [use the choice list component](https://polaris.shopify.com/components/choice-list)
- For a basic version of option list as a single choice menu,
  [use the select component](https://polaris.shopify.com/components/select)

---

## Accessibility

Items in an option list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users.

Controls in simple option lists are [buttons](https://polaris.shopify.com/components/button), and controls in multiple option lists are [checkboxes](https://polaris.shopify.com/components/checkbox).

If you customize the option list, you can provide ARIA roles that fit the context. These roles must be valid according to the [W3C ARIA specification](https://www.w3.org/TR/wai-aria-1.1/) to be conveyed correctly to screen reader users.

- The `role` prop adds an ARIA role to the option list wrapper
- The `optionRole` prop adds an ARIA role to the option list items
