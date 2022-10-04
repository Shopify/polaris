import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  Card,
  EmptySearchResult,
  Filters,
  IndexTable,
  Link,
  Select,
  TextField,
  TextStyle,
  useIndexResourceState,
} from '@shopify/polaris';

export default {
  component: IndexTable,
} as ComponentMeta<typeof IndexTable>;

export function Default() {
  const customers = [
    {
      id: '3411',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function Flush() {
  const customers = [
    {
      id: '3411',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell flush>{location}</IndexTable.Cell>
        <IndexTable.Cell flush>{orders}</IndexTable.Cell>
        <IndexTable.Cell flush>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count', flush: true},
          {title: 'Amount spent', flush: true},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function SmallScreen() {
  const customers = [
    {
      id: '3412',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2562',
      url: 'customers/256',
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
          <p>
            <TextStyle variation="strong">{name}</TextStyle>
          </p>
          <p>{location}</p>
          <p>{orders}</p>
          <p>{amountSpent}</p>
        </div>
      </IndexTable.Row>
    ),
  );

  return (
    <div style={{width: '430px'}}>
      <Card>
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
            {title: 'Order count'},
            {title: 'Amount spent'},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithBulkActions() {
  const customers = [
    {
      id: '3413',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2563',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithMultiplePromotedBulkActions() {
  const customers = [
    {
      id: '3413',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2563',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithBulkActionsAndSelectionAcrossPages() {
  const customers = [
    {
      id: '3414',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2564',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithLoadingState() {
  const customers = [
    {
      id: '3415',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2565',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithFiltering() {
  const customers = [
    {
      id: '3416',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2566',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
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
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      status: 'success',
    },
    {
      id: '2561',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithStickyLastColumn() {
  const customers = [
    {
      id: '3411',
      url: 'customers/341',
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
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{channel}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent', hidden: false},
          {title: 'Status'},
          {title: 'Channel'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
        lastColumnSticky
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithRowNavigationLink() {
  const customers = [
    {
      id: '3411',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
      url: 'customers/256',
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
            <TextStyle variation="strong">{name}</TextStyle>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent', hidden: false},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithClickableButtonColumn() {
  const customers = [
    {
      id: '3411',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
      url: 'customers/256',
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
            <TextStyle variation="strong">{name}</TextStyle>
          </Button>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent', hidden: false},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithoutCheckboxes() {
  const customers = [
    {
      id: '3411',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        headings={[
          {title: 'Name'},
          {title: 'Location'},
          {title: 'Order count'},
          {title: 'Amount spent', hidden: false},
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function WithAllOfItsElements() {
  const customers = [
    {
      id: '3417',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2567',
      url: 'customers/256',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
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
          {title: 'Order count'},
          {title: 'Amount spent', hidden: false},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
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

  const initialRows = [
    {
      id: '3411',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      fulfillmentStatus: 'Fulfilled',
      paymentStatus: 'Paid',
      notes: '',
    },
    {
      id: '2561',
      url: 'customers/256',
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
      url: 'customers/123',
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
      url: 'customers/543',
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
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{notes}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={rows.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Name'},
          {title: 'Order count'},
          {title: 'Amount spent'},
          {title: 'Location'},
          {title: 'Fulfillment status'},
          {title: 'Payment status'},
          {title: 'Notes'},
        ]}
        sortable={[true, true, false, true, true, true, false]}
        sortDirection={sortDirection}
        sortColumnIndex={sortIndex}
        onSort={handleClickSortHeading}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export function SmallScreenWithAllOfItsElements() {
  const customers = [
    {
      id: '3418',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2568',
      url: 'customers/256',
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
          <p>
            <TextStyle variation="strong">{name}</TextStyle>
          </p>
          <p>{location}</p>
          <p>{orders}</p>
          <p>{amountSpent}</p>
        </div>
      </IndexTable.Row>
    ),
  );

  return (
    <div style={{width: '430px'}}>
      <Card>
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
            {title: 'Order count'},
            {title: 'Amount spent'},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
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
