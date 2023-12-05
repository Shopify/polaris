---
hideFromNav: true
---

<HowItHelps>

## How it helps merchants

![Products index page](/images/patterns/resource-index-layout/resource-index-cover-image.png)

1. The resource index layout is based on a single column to create a clear top-to-bottom hierarchy of tasks and to provide horizontal space for resource data.
2. At the top of the page, merchants find the page title and actions that affect the index as a whole.
3. At the top of the index, merchants can use filters, sorting, and multi-select actions that affect the list below.
4. In the main body of the index, merchants find the individual resource objects that they want to view or manage.

<DefinitionTable>

### Use when merchants need to:

**Overview and manage resources**
: Resource objects, such as products, orders and customers, are at the heart of merchants’ businesses. While resource types can be very different, they typically share many general activities, such as adding, finding, or taking action. Use the resource index layout pattern when merchants need to organize objects and carry out such activities. An example can be found in Products.

</DefinitionTable>
</HowItHelps>
<Usage>

## Using this pattern

This pattern uses the [`Card`](/components/layout-and-structure/card), [`Badge`](/components/feedback-indicators/badge), [`ChoiceList`](/components/selection-and-input/choice-list), [`IndexFilter`](/components/selection-and-input/index-filters), [`IndexTable`](/components/tables/index-table) and [`Page`](/components/layout-and-structure/page) components.

{/* prettier-ignore */}
```javascript {"type":"previewContext","for":"example"}
<div style={{ padding: '2rem', height: '600px' }}>
  {(____CODE____)()}
</div>
```

{/* prettier-ignore */}
```javascript {"type":"sandboxContext","for":"example"}
{(____CODE____)()}
```

```javascript {"type":"livePreview","id":"example","title":"Resource index layout"}
function IndexFiltersDefault() {
  function disambiguateLabel(key, value) {
    switch (key) {
      case 'type':
        return value.map((val) => `type: ${val}`).join(', ');
      case 'tone':
        return value.map((val) => `tone: ${val}`).join(', ');
      default:
        return value;
    }
  }
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [itemStrings, setItemStrings] = useState([
    'All',
    'Active',
    'Draft',
    'Archived',
  ]);
  const deleteView = (index) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };
  const duplicateView = async (name) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };
  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value) => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (name) => {
                await sleep(1);
                duplicateView(name);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };
  const sortOptions = [
    {label: 'Product', value: 'product asc', directionLabel: 'Ascending'},
    {label: 'Product', value: 'product desc', directionLabel: 'Descending'},
    {label: 'Status', value: 'tone asc', directionLabel: 'A-Z'},
    {label: 'Status', value: 'tone desc', directionLabel: 'Z-A'},
    {label: 'Type', value: 'type asc', directionLabel: 'A-Z'},
    {label: 'Type', value: 'type desc', directionLabel: 'Z-A'},
    {label: 'Vendor', value: 'vendor asc', directionLabel: 'Ascending'},
    {label: 'Vendor', value: 'vendor desc', directionLabel: 'Descending'},
  ];
  const [sortSelected, setSortSelected] = useState(['product asc']);
  const {mode, setMode} = useSetIndexFiltersMode();
  const onHandleCancel = () => {};
  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };
  const primaryAction =
    selected === 0
      ? {
          type: 'save-as',
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: 'save',
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };
  const [tone, setStatus] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [queryValue, setQueryValue] = useState('');
  const handleStatusChange = useCallback((value) => setStatus(value), []);
  const handleTypeChange = useCallback((value) => setType(value), []);
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleStatusRemove = useCallback(() => setStatus(undefined), []);
  const handleTypeRemove = useCallback(() => setType(undefined), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleStatusRemove();
    handleTypeRemove();
    handleQueryValueRemove();
  }, [handleStatusRemove, handleQueryValueRemove, handleTypeRemove]);
  const filters = [
    {
      key: 'tone',
      label: 'Status',
      filter: (
        <ChoiceList
          title="tone"
          titleHidden
          choices={[
            {label: 'Active', value: 'active'},
            {label: 'Draft', value: 'draft'},
            {label: 'Archived', value: 'archived'},
          ]}
          selected={tone || []}
          onChange={handleStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'type',
      label: 'Type',
      filter: (
        <ChoiceList
          title="Type"
          titleHidden
          choices={[
            {label: 'Brew Gear', value: 'brew-gear'},
            {label: 'Brew Merch', value: 'brew-merch'},
          ]}
          selected={type || []}
          onChange={handleTypeChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];
  const appliedFilters = [];
  if (tone && !isEmpty(tone)) {
    const key = 'tone';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, tone),
      onRemove: handleStatusRemove,
    });
  }
  if (type && !isEmpty(type)) {
    const key = 'type';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, type),
      onRemove: handleTypeRemove,
    });
  }
  const products = [
    {
      id: '1020',
      price: '$200',
      product: '1ZPRESSO | J-MAX Manual Coffee Grinder',
      tone: <Badge tone="success">Active</Badge>,
      inventory: '20 in stock',
      type: 'Brew Gear',
      vendor: 'Espresso Shot Coffee',
    },
    {
      id: '1018',
      price: '$200',
      product: 'Acaia Pearl Set',
      tone: <Badge tone="success">Active</Badge>,
      inventory: '2 in stock for 50 variants',
      type: 'Brew Gear',
      vendor: 'Espresso Shot Coffee',
    },
    {
      id: '1016',
      price: '$200',
      product: 'AeroPress Go Brewer',
      tone: <Badge tone="info">Draft</Badge>,
      inventory: '3 in stock for 50 variants',
      type: 'Brew Gear',
      vendor: 'Espresso Shot Coffee',
    },
    {
      id: '1015',
      price: '$200',
      product: 'Canadiano Brewer',
      tone: <Badge tone="success">Active</Badge>,
      inventory: '890 in stock for 50 variants',
      type: 'Brew Merch',
      vendor: 'Espresso Shot Coffee',
    },
    {
      id: '1014',
      price: '$200',
      product: 'Canadiano Brewer White Ash',
      tone: <Badge tone="success">Active</Badge>,
      inventory: '890 in stock for 50 variants',
      type: 'Brew Gear',
      vendor: 'Espresso Shot Coffee',
    },
  ];
  const resourceName = {
    singular: 'product',
    plural: 'products',
  };
  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(products);
  const rowMarkup = products.map(
    ({id, thumbnail, product, price, tone, inventory, type, vendor}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <img
            src={'https://picsum.photos/50?random=' + String(index)}
            alt={'product thumbnail' + product}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>{product}</IndexTable.Cell>
        <IndexTable.Cell>{price}</IndexTable.Cell>
        <IndexTable.Cell>{tone}</IndexTable.Cell>
        <IndexTable.Cell>{inventory}</IndexTable.Cell>
        <IndexTable.Cell>{type}</IndexTable.Cell>
        <IndexTable.Cell>{vendor}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <Page
      title={'Products'}
      primaryAction={{content: 'Add product'}}
      secondaryActions={[
        {
          content: 'Export',
          accessibilityLabel: 'Export product list',
          onAction: () => alert('Export action'),
        },
        {
          content: 'Import',
          accessibilityLabel: 'Import product list',
          onAction: () => alert('Import action'),
        },
      ]}
    >
      <Card padding="0">
        <IndexFilters
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={() => {}}
          onSort={setSortSelected}
          primaryAction={primaryAction}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          canCreateNewView
          onCreateNewView={onCreateNewView}
          filters={filters}
          appliedFilters={appliedFilters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            {title: ''},
            {title: 'Product'},
            {title: 'Price', alignment: 'end'},
            {title: 'Status'},
            {title: 'Inventory'},
            {title: 'Type'},
            {title: 'Vendor'},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Page>
  );
}
```

</Usage>

### Useful to know

<SideBySide>

- Use the resource type as page title.

  ![“Orders” and “Gift cards” pages](/images/patterns/resource-index-layout/resource-index-usage-1.png)

- Always use the primary action in the top right corner for resource creation. Remove the button if there is no such functionality.

  ![“Add product” primary action button on a resource index page](/images/patterns/resource-index-layout/resource-index-usage-2.png)

- Set the page width to normal if the index doesn’t need full width.

  ![Index page with margins on either side of the main content](/images/patterns/resource-index-layout/resource-index-usage-3.png)

</SideBySide>
