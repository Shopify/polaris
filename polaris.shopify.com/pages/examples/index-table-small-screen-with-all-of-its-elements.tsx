import {
  TextField,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
} from '@shopify/polaris';
import type {IndexFiltersProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SmallScreenIndexTableWithAllElementsExample() {
  const customers = [
    {
      id: '3418',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2568',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);
  const [taggedWith, setTaggedWith] = useState<string | undefined>('VIP');
  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);
  const [sortValue, setSortValue] = useState('today');

  const handleTaggedWithChange = useCallback(
    (value: string) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback(
    (value: string) => setSortValue(value),
    [],
  );

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const filters = [
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters =
    taggedWith && !isEmpty(taggedWith)
      ? [
          {
            key: 'taggedWith',
            label: disambiguateLabel('taggedWith', taggedWith),
            onRemove: handleTaggedWithRemove,
          },
        ]
      : [];

  const sortOptions = [
    {label: 'Date', value: 'today asc', directionLabel: 'Ascending'},
    {label: 'Date', value: 'today desc', directionLabel: 'Descending'},
    {label: 'Customer', value: 'customer asc', directionLabel: 'A-Z'},
    {label: 'Customer', value: 'customer desc', directionLabel: 'Z-A'},
  ];

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <div style={{padding: '.75rem 1rem'}}>
          <Text fontWeight="bold" as="p">
            {name}
          </Text>
          <p>{location}</p>
          <Text as="p" alignment="end" numeric>
            {orders}
          </Text>
          <Text as="p" alignment="end" numeric>
            {amountSpent}
          </Text>
        </div>
      </IndexTable.Row>
    ),
  );

  const tabs = [
    {
      id: 'all',
      content: 'All customers',
    },
  ];

  const {mode, setMode} = useSetIndexFiltersMode();

  const cancelAction = {
    onAction: () => {},
  };

  async function emptyPromise() {
    const prom = Promise.resolve();
    return prom.then(() => {
      return true;
    });
  }

  const primaryAction: IndexFiltersProps['primaryAction'] = {
    onAction: emptyPromise,
    type: 'save-as',
  };

  return (
    <div style={{width: '430px'}}>
      <LegacyCard>
        <IndexFilters
          tabs={tabs}
          selected={0}
          onSelect={() => {}}
          onCreateNewView={emptyPromise}
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={setQueryValue}
          onQueryClear={handleQueryValueRemove}
          onClearAll={handleClearAll}
          sortOptions={sortOptions}
          sortSelected={sortValue}
          onSort={handleSortChange}
          mode={mode}
          setMode={setMode}
          cancelAction={cancelAction}
          primaryAction={primaryAction}
        />
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          hasMoreItems
          condensed
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          headings={[
            {title: 'Name'},
            {title: 'Location'},
            {
              id: 'order-count',
              title: (
                <Text as="span" alignment="end">
                  Order count
                </Text>
              ),
            },
            {
              id: 'amount-spent',
              title: (
                <Text as="span" alignment="end">
                  Amount spent
                </Text>
              ),
            },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </div>
  );

  function disambiguateLabel(key: string, value: string): string {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value: string): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}

export default withPolarisExample(SmallScreenIndexTableWithAllElementsExample);
