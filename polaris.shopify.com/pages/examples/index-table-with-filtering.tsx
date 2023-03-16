import {
  TextField,
  IndexTable,
  LegacyCard,
  Filters,
  Select,
  useIndexResourceState,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IndexTableWithFilteringExample() {
  const customers = [
    {
      id: '3416',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2566',
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
  const handleTaggedWithRemove = useCallback(
    () => setTaggedWith(undefined),
    [],
  );
  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    [],
  );
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback(
    (value: string) => setSortValue(value),
    [],
  );

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

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith',
          label: disambiguateLabel('taggedWith', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const sortOptions = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <div style={{padding: '16px', display: 'flex'}}>
        <div style={{flex: 1}}>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={setQueryValue}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          />
        </div>
        <div style={{paddingLeft: '0.25rem'}}>
          <Select
            labelInline
            label="Sort by"
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
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

export default withPolarisExample(IndexTableWithFilteringExample);
