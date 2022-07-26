---
name: Listbox
category: Lists and tables
keywords:
  - list
  - listbox
  - list box
  - interactive list
---

# Listbox

A Listbox is a vertical list of interactive options, with room for icons, descriptions, and other elements.

---

## Anatomy

![A diagram of the Listbox component showing the smaller primitive components it can be composed of.](/images/components/listbox/listbox-anatomy.png)

A listbox can be composed of:

1. **Options:** The individual options inside the Listbox that merchants can select or deselect.
2. **Dividers:** Placed between items and are useful in complex lists when there’s a lot of information for the merchant to parse.
3. **Section headers:** Used at the begining of a section when it’s necessary to call out the content being displayed. In most cases, the surrounding context should be enough for the merchant to understand the information in the list.

---

## Best practices

Listboxes should:

- Be clearly labeled so it’s noticeable to the merchant what type of options will be available
- Limit the number of options displayed at once
- Indicate a loading state to the merchant while option data is being populated

---

## Content guidelines

### Option lists

Each item in a `Listbox` should be clear and descriptive.

<!-- dodont -->

#### Do

- Traffic referrer source

#### Don’t

- Source

<!-- end -->

## Patterns that use `Listbox`

Location picker

---

## Examples

### Default

Basic implementation of a control element used to let merchants select options

```jsx
function BaseListboxExample() {
  return (
    <Listbox accessibilityLabel="Basic Listbox example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
    </Listbox>
  );
}
```

### With Loading

Implementation of a control element showing a loading indicator to let merchants know more options are being loaded

```jsx
function ListboxWithLoadingExample() {
  return (
    <Listbox accessibilityLabel="Listbox with loading example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
      <Listbox.Loading />
    </Listbox>
  );
}
```

### With Action

Implementation of a control element used to let merchants take an action

```jsx
function ListboxWithActionExample() {
  return (
    <Listbox accessibilityLabel="Listbox with Action example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2" divider>
        Item 2
      </Listbox.Option>
      <Listbox.Action value="ActionValue">
        <Stack spacing="tight">
          <Icon source={CirclePlusMinor} color="base" />
          <div>Add item</div>
        </Stack>
      </Listbox.Action>
    </Listbox>
  );
}
```

### With custom element

Implementation of a control with custom rendering of options

```jsx
function ListboxWithCustomElementExample() {
  return (
    <Listbox accessibilityLabel="Listbox with custom element example">
      <Listbox.Action value="ActionValue" divider>
        Add item
      </Listbox.Action>
      <Listbox.Option value="UniqueValue-1">
        <div>Item 1</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-2">
        <div>Item 2</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-3">
        <div>Item 3</div>
      </Listbox.Option>
      <Listbox.Loading accessibilityLabel="items are loading" />
    </Listbox>
  );
}
```

### With search

Use to help merchants browse, filter, and choose from a list of options.

```jsx
function ListboxWithSearchExample() {
  const actionValue = '__ACTION__';

  const segments = [
    {
      label: 'All customers',
      id: 'gid://shopify/CustomerSegment/1',
      value: '0',
    },
    {
      label: 'VIP customers',
      id: 'gid://shopify/CustomerSegment/2',
      value: '1',
    },
    {
      label: 'New customers',
      id: 'gid://shopify/CustomerSegment/3',
      value: '2',
    },
    {
      label: 'Abandoned carts - last 30 days',
      id: 'gid://shopify/CustomerSegment/4',
      value: '3',
    },
    {
      label: 'Wholesale customers',
      id: 'gid://shopify/CustomerSegment/5',
      value: '4',
    },
    {
      label: 'Email subscribers',
      id: 'gid://shopify/CustomerSegment/6',
      value: '5',
    },
    {
      label: 'From New York',
      id: 'gid://shopify/CustomerSegment/7',
      value: '6',
    },
    {
      label: 'Repeat buyers',
      id: 'gid://shopify/CustomerSegment/8',
      value: '7',
    },
    {
      label: 'First time buyers',
      id: 'gid://shopify/CustomerSegment/9',
      value: '8',
    },
    {
      label: 'From Canada',
      id: 'gid://shopify/CustomerSegment/10',
      value: '9',
    },
    {
      label: 'Bought in last 60 days',
      id: 'gid://shopify/CustomerSegment/11',
      value: '10',
    },
    {
      label: 'Bought last BFCM',
      id: 'gid://shopify/CustomerSegment/12',
      value: '11',
    },
  ];

  const lazyLoadSegments = Array.from(Array(100)).map((_, index) => ({
    label: `Other customers ${index + 12}`,
    id: `gid://shopify/CustomerSegment/${index + 12}`,
    value: `${index + 12}`,
  }));

  segments.push(...lazyLoadSegments);

  const interval = 25;

  const [showFooterAction, setShowFooterAction] = useState(true);
  const [query, setQuery] = useState('');
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(6);
  const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState([]);

  const handleClickShowAll = () => {
    setShowFooterAction(false);
    setVisibleOptionIndex(segments.length);
  };

  const handleFilterSegments = (query) => {
    const nextFilteredSegments = segments.filter((segment) => {
      return segment.label
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim());
    });

    setFilteredSegments(nextFilteredSegments);
  };

  const handleQueryChange = (query) => {
    setQuery(query);

    if (query.length >= 2) handleFilterSegments(query);
  };

  const handleQueryClear = () => {
    handleQueryChange('');
  };

  const handleResetVisibleOptionIndex = () => {
    setVisibleOptionIndex(interval);
  };

  const handleSegmentSelect = (segmentIndex) => {
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(Number(segmentIndex));
  };

  const handleActiveOptionChange = (_, domId) => {
    setActiveOptionId(domId);
  };

  /* This is just to illustrate lazy loading state vs loading state. This is an example, so we aren't fetching from GraphQL. You'd use `pageInfo.hasNextPage` from your GraphQL query data instead of this fake "willLoadMoreResults" state along with setting `first` your GraphQL query's variables to your app's default max edges limit (e.g., 250). */

  const handleLazyLoadSegments = () => {
    if (willLoadMoreResults && !showFooterAction) {
      setLazyLoading(true);

      const options = query ? filteredSegments : segments;

      setTimeout(() => {
        const remainingOptionCount = options.length - visibleOptionIndex;
        const nextVisibleOptionIndex =
          remainingOptionCount >= interval
            ? visibleOptionIndex + interval
            : visibleOptionIndex + remainingOptionCount;

        setLazyLoading(false);
        setVisibleOptionIndex(nextVisibleOptionIndex);

        if (remainingOptionCount <= interval) {
          setWillLoadMoreResults(false);
        }
      }, 1000);
    }
  };

  const listboxId = 'SearchableListbox';

  const textFieldMarkup = (
    <div style={{padding: '12px'}}>
      <TextField
        focused={showFooterAction}
        clearButton
        labelHidden
        label="Customer segments"
        placeholder="Search segments"
        autoComplete="off"
        value={query}
        prefix={<Icon source={SearchMinor} />}
        ariaActiveDescendant={activeOptionId}
        ariaControls={listboxId}
        onChange={handleQueryChange}
        onClearButtonClick={handleQueryClear}
      />
    </div>
  );

  const segmentOptions = query ? filteredSegments : segments;

  const segmentList =
    segmentOptions.length > 0
      ? segmentOptions
          .slice(0, visibleOptionIndex)
          .map(({label, id, value}) => {
            const selected = segments[selectedSegmentIndex].value === value;

            return (
              <Listbox.Option key={id} value={value} selected={selected}>
                <Listbox.TextOption selected={selected}>
                  {label}
                </Listbox.TextOption>
              </Listbox.Option>
            );
          })
      : null;

  const showAllMarkup = showFooterAction ? (
    <Listbox.Action value={actionValue}>
      <Button plain onClick={handleClickShowAll}>
        Show all 111 segments
      </Button>
    </Listbox.Action>
  ) : null;

  const lazyLoadingMarkup = lazyLoading ? (
    <Listbox.Loading
      accessibilityLabel={`${
        query ? 'Filtering' : 'Loading'
      } customer segments`}
    />
  ) : null;

  const noResultsMarkup =
    segmentOptions.length === 0 ? (
      <EmptySearchResult
        title=""
        description={`No segments found matching "${query}"`}
      />
    ) : null;

  const listboxMarkup = (
    <Listbox
      enableKeyboardControl
      autoSelection="FIRST_SELECTED"
      onSelect={handleSegmentSelect}
      onActiveOptionChange={handleActiveOptionChange}
    >
      {segmentList}
      {showAllMarkup}
      {noResultsMarkup}
      {lazyLoadingMarkup}
    </Listbox>
  );

  return (
    <Card>
      <div
        style={{
          alignItems: 'stretch',
          borderTop: '1px solid #DFE3E8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'stretch',
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {textFieldMarkup}

        <Scrollable
          shadow
          style={{
            position: 'relative',
            width: '100%',
            height: '292px',
            padding: 'var(--p-space-2) 0',
            borderBottomLeftRadius: 'var(--p-border-radius-2)',
            borderBottomRightRadius: 'var(--p-border-radius-2)',
          }}
          onScrolledToBottom={handleLazyLoadSegments}
        >
          {listboxMarkup}
        </Scrollable>
      </div>
    </Card>
  );
}
```

---

## Related components

- For a text field and popover container, [use the combobox component](https://polaris.shopify.com/components/combobox)
- [Autocomplete](https://polaris.shopify.com/components/autocomplete) can be used as a convenience wrapper in lieu of Combobox and Listbox.

---

## Accessibility

### Structure

The `Listbox` component is based on the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).

It is important to not present interactive elements inside of list box options as they can interfere with navigation for assistive technology users.

<!-- dodont -->

#### Do

- Use labels

#### Don’t

- Use interactive elements inside the list

<!-- end -->

### Keyboard support

- Access the list of options with the up and down arrow keys
- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key
