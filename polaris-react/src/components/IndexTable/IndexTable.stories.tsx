import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  LegacyCard,
  EmptySearchResult,
  Filters,
  IndexTable,
  Link,
  Select,
  TextField,
  Text,
  useIndexResourceState,
  Tooltip,
} from '@shopify/polaris';

export default {
  component: IndexTable,
} as ComponentMeta<typeof IndexTable>;

export function Default() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
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
}

export function Flush() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
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

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell flush>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell flush>{location}</IndexTable.Cell>
        <IndexTable.Cell flush>
          <Text as="span" alignment="end" numeric>
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell flush>
          <Text as="span" alignment="end" numeric>
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Name', flush: true},
          {title: 'Location', flush: true},
          {
            id: 'order-count',
            flush: true,
            title: (
              <Text as="span" alignment="end">
                Order count
              </Text>
            ),
          },
          {
            id: 'amount-spent',
            flush: true,
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
}

export function SmallScreen() {
  const customers = [
    {
      id: '3412',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2562',
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

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <div style={{padding: '12px 16px'}}>
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

  return (
    <div style={{width: '430px'}}>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          condensed
          headings={[
            {title: 'Name'},
            {title: 'Location'},
            {
              id: 'order-count',
              title: (
                <Text as="span" fontWeight="medium" alignment="end">
                  Order count
                </Text>
              ),
            },
            {
              id: 'amount-spent',
              title: (
                <Text as="span" fontWeight="medium" alignment="end">
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
}

export function SmallScreenLoading() {
  const customers = [
    {
      id: '3412',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2562',
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

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <div style={{padding: '12px 16px'}}>
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

  return (
    <div style={{width: '430px'}}>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          condensed
          headings={[
            {title: 'Name'},
            {title: 'Location'},
            {
              id: 'order-count',
              title: (
                <Text as="span" fontWeight="medium" alignment="end">
                  Order count
                </Text>
              ),
            },
            {
              id: 'amount-spent',
              title: (
                <Text as="span" fontWeight="medium" alignment="end">
                  Amount spent
                </Text>
              ),
            },
          ]}
          loading
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </div>
  );
}

export function WithEmptyState() {
  const customers = [];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);

  const emptyStateMarkup = (
    <EmptySearchResult
      title="No customers yet"
      description="Try changing the filters or search term"
      withIllustration
    />
  );

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
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        emptyState={emptyStateMarkup}
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
}

export function WithBulkActions() {
  const customers = [
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2563',
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
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
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
  );
}

export function WithMultiplePromotedBulkActions() {
  const customers = [
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2563',
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

  const promotedBulkActions = [
    {
      content: 'Capture payments',
      onAction: () => console.log('Todo: implement payment capture'),
    },
    {
      title: 'Edit customers',
      actions: [
        {
          content: 'Add customers',
          onAction: () => console.log('Todo: implement adding customers'),
        },
        {
          content: 'Delete customers',
          onAction: () => console.log('Todo: implement deleting customers'),
        },
      ],
    },
    {
      title: 'Export',
      actions: [
        {
          content: 'Export as PDF',
          onAction: () => console.log('Todo: implement PDF exporting'),
        },
        {
          content: 'Export as CSV',
          onAction: () => console.log('Todo: implement CSV exporting'),
        },
      ],
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
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
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
  );
}

export function WithBulkActionsAndSelectionAcrossPages() {
  const customers = Array.from({length: 50}, (_, num) => {
    return {
      id: `${num}`,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$24,00',
    };
  });

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
    {
      content: 'Rename customers',
      onAction: () => console.log('Todo: implement bulk rename'),
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
    <div
      style={{padding: 'var(--p-space-4) var(--p-space-4) var(--p-space-10)'}}
    >
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          hasMoreItems
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
                <Text as="span" fontWeight="medium" alignment="end">
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
}

export function WithLoadingState() {
  const customers = [
    {
      id: '3415',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2565',
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
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        loading
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
}

export function WithFiltering() {
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
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState('today');

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

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

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
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
}

export function WithRowStatus() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      status: 'success',
    },
    {
      id: '2561',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
      status: 'subdued',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent, status}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        status={status}
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
}

export function WithStickyLastColumn() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      status: 'Created',
      channel: 'Point of Sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
    },
    {
      id: '2561',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
      status: 'Created',
      channel: 'Online Store',
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Unfulfilled',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);

  const rowMarkup = customers.map(
    (
      {
        id,
        name,
        location,
        orders,
        amountSpent,
        status,
        channel,
        paymentStatus,
        fulfillmentStatus,
      },
      index,
    ) => (
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
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{channel}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
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
            hidden: false,
            title: (
              <Text as="span" alignment="end">
                Amount spent
              </Text>
            ),
          },
          {title: 'Status'},
          {title: 'Channel'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
        lastColumnSticky
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithRowNavigationLink() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
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

  const rowMarkup = customers.map(
    ({id, url, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Link
            dataPrimaryLink
            url={url}
            onClick={() => console.log(`Clicked ${name}`)}
          >
            <Text fontWeight="bold" as="span">
              {name}
            </Text>
          </Link>
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
            hidden: false,
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
}

export function WithClickableButtonColumn() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
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

  const rowMarkup = customers.map(
    ({id, url, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Button
            dataPrimaryLink
            url={url}
            onClick={() => console.log(`Clicked ${name}`)}
          >
            <Text fontWeight="bold" as="span">
              {name}
            </Text>
          </Button>
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
            hidden: false,
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
}

export function WithoutCheckboxes() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
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

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
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
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
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
            hidden: false,
            title: (
              <Text as="span" alignment="end">
                Amount spent
              </Text>
            ),
          },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithAllOfItsElements() {
  const customers = [
    {
      id: '3417',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2567',
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
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState('today');

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

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
        hasMoreItems
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        lastColumnSticky
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
            hidden: false,
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

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
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
}

export function WithSortableHeadings() {
  const [sortIndex, setSortIndex] = useState(0);
  const [sortDirection, setSortDirection] = useState('descending');

  const sortToggleLabels = {
    0: {ascending: 'A-Z', descending: 'Z-A'},
    1: {ascending: 'Ascending', descending: 'Descending'},
    2: {ascending: 'Newest', descending: 'Oldest'},
    3: {ascending: 'Ascending', descending: 'Ascending'},
    4: {ascending: 'A-Z', descending: 'Z-A'},
    5: {ascending: 'A-Z', descending: 'Z-A'},
    6: {ascending: 'A-Z', descending: 'Z-A'},
    7: {ascending: 'A-Z', descending: 'Z-A'},
  };

  const initialRows = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      date: '2022-02-04',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      fulfillmentStatus: 'Fulfilled',
      paymentStatus: 'Paid',
      notes: '',
    },
    {
      id: '2561',
      url: '#',
      date: '2022-01-19',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
      fulfillmentStatus: 'Fulfilled',
      paymentStatus: 'Not paid',
      notes: 'This customer lives on the 3rd floor',
    },
    {
      id: '1245',
      url: '#',
      date: '2021-12-12',
      name: 'Anne-Marie Johnson',
      location: 'Portland, USA',
      orders: 10,
      amountSpent: '$250',
      fulfillmentStatus: 'Fulfilled',
      paymentStatus: 'Not paid',
      notes: '',
    },
    {
      id: '8741',
      url: '#',
      date: '2022-05-11',
      name: 'Bradley Stevens',
      location: 'Hialeah, USA',
      orders: 5,
      amountSpent: '$26',
      fulfillmentStatus: 'Unfulfilled',
      paymentStatus: 'Not paid',
      notes: 'This customer has requested fragile delivery',
    },
  ];
  const [sortedRows, setSortedRows] = useState(
    sortRows(initialRows, sortIndex, sortDirection),
  );

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const rows = sortedRows ?? initialRows;

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows);

  function handleClickSortHeading(index, direction) {
    setSortIndex(index);
    setSortDirection(direction);
    const newSortedRows = sortRows(rows, index, direction);
    setSortedRows(newSortedRows);
  }

  function sortRows(localRows, index, direction) {
    return [...localRows].sort((rowA, rowB) => {
      const key = index === 0 ? 'name' : 'location';
      if (rowA[key] < rowB[key]) {
        return direction === 'descending' ? -1 : 1;
      }
      if (rowA[key] > rowB[key]) {
        return direction === 'descending' ? 1 : -1;
      }
      return 0;
    });
  }

  const rowMarkup = rows.map(
    (
      {
        id,
        name,
        date,
        location,
        orders,
        amountSpent,
        fulfillmentStatus,
        paymentStatus,
        notes,
      },
      index,
    ) => (
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
        <IndexTable.Cell>{date}</IndexTable.Cell>
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
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{notes}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={rows.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Name'},
          {title: 'Date'},
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

          {title: 'Location'},
          {title: 'Fulfillment status'},
          {title: 'Payment status'},
          {title: 'Notes'},
        ]}
        sortable={[true, true, false, true, true, false, false]}
        sortDirection={sortDirection}
        sortColumnIndex={sortIndex}
        onSort={handleClickSortHeading}
        sortToggleLabels={sortToggleLabels}
        lastColumnSticky
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithSortableCustomHeadings() {
  const [sortIndex, setSortIndex] = useState(0);
  const [sortDirection, setSortDirection] = useState('descending');

  const sortToggleLabels = {
    0: {ascending: 'A-Z', descending: 'Z-A'},
    1: {ascending: 'Ascending', descending: 'Descending'},
    2: {ascending: 'Newest', descending: 'Oldest'},
    3: {ascending: 'Ascending', descending: 'Ascending'},
    4: {ascending: 'A-Z', descending: 'Z-A'},
    5: {ascending: 'A-Z', descending: 'Z-A'},
    6: {ascending: 'A-Z', descending: 'Z-A'},
    7: {ascending: 'A-Z', descending: 'Z-A'},
  };

  const initialRows = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      date: '2022-02-04',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      fulfillmentStatus: 'Fulfilled',
      paymentStatus: 'Paid',
      notes: '',
    },
    {
      id: '2561',
      url: '#',
      date: '2022-01-19',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
      fulfillmentStatus: 'Fulfilled',
      paymentStatus: 'Not paid',
      notes: 'This customer lives on the 3rd floor',
    },
    {
      id: '1245',
      url: '#',
      date: '2021-12-12',
      name: 'Anne-Marie Johnson',
      location: 'Portland, USA',
      orders: 10,
      amountSpent: '$250',
      fulfillmentStatus: 'Fulfilled',
      paymentStatus: 'Not paid',
      notes: '',
    },
    {
      id: '8741',
      url: '#',
      date: '2022-05-11',
      name: 'Bradley Stevens',
      location: 'Hialeah, USA',
      orders: 5,
      amountSpent: '$26',
      fulfillmentStatus: 'Unfulfilled',
      paymentStatus: 'Not paid',
      notes: 'This customer has requested fragile delivery',
    },
  ];
  const [sortedRows, setSortedRows] = useState(
    sortRows(initialRows, sortIndex, sortDirection),
  );

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const rows = sortedRows ?? initialRows;

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows);

  function handleClickSortHeading(index, direction) {
    setSortIndex(index);
    setSortDirection(direction);
    const newSortedRows = sortRows(rows, index, direction);
    setSortedRows(newSortedRows);
  }

  function sortRows(localRows, index, direction) {
    return [...localRows].sort((rowA, rowB) => {
      const key = index === 0 ? 'name' : 'location';
      if (rowA[key] < rowB[key]) {
        return direction === 'descending' ? -1 : 1;
      }
      if (rowA[key] > rowB[key]) {
        return direction === 'descending' ? 1 : -1;
      }
      return 0;
    });
  }

  const rowMarkup = rows.map(
    (
      {
        id,
        name,
        date,
        location,
        orders,
        amountSpent,
        fulfillmentStatus,
        paymentStatus,
        notes,
      },
      index,
    ) => (
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
        <IndexTable.Cell>{date}</IndexTable.Cell>
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
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{notes}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={rows.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {
            title: 'Name',
            tooltipContent: 'I am a wide tooltip describing the Name column',
            tooltipWidth: 'wide',
          },
          {title: 'Date', tooltipContent: 'I am the Date tooltip'},
          {
            id: 'order-count',
            title: (
              <Text as="span" alignment="end">
                Order count
              </Text>
            ),
          },
          {
            title: 'Amount spent',
            tooltipContent:
              'I am a wide Amount spent tooltip that stays when clicked',
            tooltipWidth: 'wide',
          },
          {title: 'Location'},
          {title: 'Fulfillment status'},
          {title: 'Payment status'},
          {title: 'Notes'},
        ]}
        sortable={[true, true, false, true, true, false, false]}
        sortDirection={sortDirection}
        sortColumnIndex={sortIndex}
        onSort={handleClickSortHeading}
        sortToggleLabels={sortToggleLabels}
        lastColumnSticky
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithCustomTooltips() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
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
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {
            title: 'Name',
            tooltipContent:
              'I am a wide tooltip describing the Name column and I also stay when clicked',
            tooltipWidth: 'wide',
            tooltipPersistsOnClick: true,
          },
          {
            title: 'Location',
          },
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
}

export function SmallScreenWithAllOfItsElements() {
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
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState('today');

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

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

  return (
    <div style={{width: '430px'}}>
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
                <Text as="span" fontWeight="medium" alignment="end">
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

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
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
}
