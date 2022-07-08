---
name: SearchableListbox
category: Lists and tables
keywords:
  - searchable list
  - list with search
  - listbox
  - list box
  - interactive list
  - list
  - search
  - textfield
---

# SearchableListbox

A SearchableListbox is a vertical, searchable list of interactive, customisable options

---

## Anatomy

A SearchableListbox is composed of:

1. **Activator node**: Customisable activator to toggle popover containing list items
2. **Search field**: Textfield for performing serach that can be toggled via the `showSearch` prop
3. **List items:** Customisable options inside the list that users can select or deselect
4. **Footer action:** Optional footer action placed below the list that can be used for actions such as list expansion

---

## Best practices

SearchableListboxes should:

- Have clear activator node that toggles popover, and content that indicates selected list item
- Limit the number of list items displayed at once; use the `footerAction` prop for list expansion
- Indicate search empty state to user when search value doesn't match any results
- Show loading state to user when list data is being generated

---

## Examples

### Basic SearchableListbox

Basic implementation

```jsx
function BaseExample() {
  const [open, setOpen] = useState(false);

  return (
    <SearchableListbox
      activatorNode={
        <Button
          plain
          monochrome
          removeUnderline
          size="large"
          textAlign="left"
          disclosure="down"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Option 1
        </Button>
      }
      open={open}
      showSearch={false}
      searchValue=""
      searchEmptyStateMessage="No results found"
      searchLabel="Search"
      listItems={[
        {value: '1', children: 'option 1', selected: true},
        {value: '2', children: 'option 2'},
      ]}
      onClose={() => {
        setOpen(false);
      }}
      onSearch={() => {}}
      onOptionSelect={(value) => {
        console.log(value);
        setOpen(false);
      }}
    />
  );
}
```

### SearchableListbox with search enabled

```jsx
function ExampleWithSearch() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const initialListItems = [
    {value: 'option 1', children: <span>option 1</span>, selected: true},
    {value: 'choice 2', children: <span>choice 2</span>},
  ];
  const [listItems, setListItems] = useState(initialListItems);

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);

    const nextListItems = searchTerm
      ? listItems.filter(({value}) => value.includes(searchTerm))
      : initialListItems;
    setListItems(nextListItems);
  };

  return (
    <SearchableListbox
      activatorNode={
        <Button
          plain
          monochrome
          removeUnderline
          size="large"
          textAlign="left"
          disclosure="down"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Option 1
        </Button>
      }
      open={open}
      showSearch
      searchValue={searchValue}
      searchEmptyStateMessage="No results found"
      searchLabel="Search"
      listItems={listItems}
      onClose={() => {
        setOpen(false);
        setSearchValue('');
      }}
      onSearch={handleSearch}
      onOptionSelect={(value) => {
        console.log(value);
        setOpen(false);
      }}
    />
  );
}
```

### SearchableListbox in loading state

```jsx
function LoadingExample() {
  const [open, setOpen] = useState(false);

  return (
    <SearchableListbox
      activatorNode={
        <Button
          plain
          monochrome
          removeUnderline
          size="large"
          textAlign="left"
          disclosure="down"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Option 1
        </Button>
      }
      open={open}
      loading
      showSearch={false}
      searchValue=""
      searchEmptyStateMessage="No results found"
      searchLabel="Search"
      listItems={[]}
      onClose={() => {
        setOpen(false);
      }}
      onSearch={() => {}}
      onOptionSelect={(value) => {
        console.log(value);
        setOpen(false);
      }}
    />
  );
}
```

### SearchableListbox with Footer Action

```jsx
function FooterActionExample() {
  const [open, setOpen] = useState(false);
  const [listItems, setListItems] = useState([
    {value: 'option 1', children: 'option 1', selected: true},
    {value: 'option 2', children: 'option 2'},
  ]);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

  return (
    <SearchableListbox
      activatorNode={
        <Button
          plain
          monochrome
          removeUnderline
          size="large"
          textAlign="left"
          disclosure="down"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Option 1
        </Button>
      }
      open={open}
      showSearch={false}
      searchValue=""
      searchEmptyStateMessage="No results found"
      searchLabel="Search"
      listItems={listItems}
      onClose={() => {
        setOpen(false);
      }}
      onSearch={() => {}}
      onOptionSelect={(value) => {
        console.log(value);
        setOpen(false);
      }}
      footerAction={
        infiniteScrollEnabled ? undefined : (
          <Button
            plain
            removeUnderline
            textAlign="left"
            onClick={() => {
              setInfiniteScrollEnabled(true);
              setListItems([
                ...listItems,
                {value: 'option 3', children: 'option 3'},
                {value: 'option 4', children: 'option 4'},
              ]);
            }}
          >
            Show all
          </Button>
        )
      }
    />
  );
}
```

### SearchableListbox with custom list options

```jsx
function CustomOptionExample() {
  const [open, setOpen] = useState(false);

  return (
    <SearchableListbox
      activatorNode={
        <Button
          plain
          monochrome
          removeUnderline
          size="large"
          textAlign="left"
          disclosure="down"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Option 1
        </Button>
      }
      open={open}
      showSearch={false}
      searchValue=""
      searchEmptyStateMessage="No results found"
      searchLabel="Search"
      listItems={[
        {
          value: '1',
          children: (
            <Stack wrap={false} alignment="leading">
              <Stack.Item fill>
                <Stack vertical spacing="extraTight">
                  <span>option 1</span>
                </Stack>
              </Stack.Item>
            </Stack>
          ),
          selected: true,
        },
        {
          value: '2',
          children: (
            <Stack wrap={false} alignment="leading">
              <Stack.Item fill>
                <Stack vertical spacing="extraTight">
                  <span>option 2</span>
                </Stack>
              </Stack.Item>
              <Badge status="info">Draft</Badge>
            </Stack>
          ),
        },
      ]}
      onClose={() => {
        setOpen(false);
      }}
      onSearch={() => {}}
      onOptionSelect={(value) => {
        console.log(value);
        setOpen(false);
      }}
    />
  );
}
```
