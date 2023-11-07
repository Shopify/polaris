import React, {Fragment, useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {
  IndexFiltersProps,
  IndexTableProps,
  IndexTableRowProps,
} from '@shopify/polaris';
import {
  Icon,
  HorizontalStack,
  Button,
  LegacyCard,
  EmptySearchResult,
  IndexFilters,
  useSetIndexFiltersMode,
  Link,
  TextField,
  Text,
  useIndexResourceState,
} from '@shopify/polaris';

import {IndexTable} from './IndexTable';

export default {
  component: IndexTable,
} as ComponentMeta<typeof IndexTable>;

export function Default() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function Condensed() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
        condensed
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function Flush() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            flush: true,
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            flush: true,
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
              alignment: 'end',
              id: 'order-count',
              title: 'Order count',
            },
            {
              alignment: 'end',
              id: 'amount-spent',
              title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
              alignment: 'end',
              id: 'order-count',
              title: 'Order count',
            },
            {
              alignment: 'end',
              id: 'amount-spent',
              title: 'Amount spent',
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

export function WithDisabledRows() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      disabled: false,
    },
    {
      id: '2561',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
      disabled: true,
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const selectableCustomers = customers.filter(
    (customer) => !customer.disabled,
  );

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(selectableCustomers);

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent, disabled}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        disabled={disabled}
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
        itemCount={selectableCustomers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Name'},
          {title: 'Location'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithSubduedRows() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
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

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        tone={index === 1 || index === 2 ? 'subdued' : undefined}
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      style={{
        padding: 'var(--p-space-400) var(--p-space-400) var(--p-space-1000)',
      }}
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
              alignment: 'end',
              id: 'order-count',
              title: 'Order count',
            },
            {
              alignment: 'end',
              id: 'amount-spent',
              title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState('');
  const [sortValue, setSortValue] = useState(['today asc']);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
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

  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Date', value: 'today asc', directionLabel: 'Ascending'},
    {label: 'Date', value: 'today desc', directionLabel: 'Descending'},
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
        headings={[
          {title: 'Name'},
          {title: 'Location'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Astronaut',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Baker',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      status: 'subdued',
    },
    {
      id: '3412',
      url: '#',
      name: 'Candlestick maker',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
      status: 'success',
    },
    {
      id: '3413',
      url: '#',
      name: 'Rice Cooker',
      location: 'Los Angeles, USA',
      orders: 40,
      amountSpent: '$40',
      status: 'critical',
    },
    {
      id: '3414',
      url: '#',
      name: 'Volleyball Player',
      location: 'Delaware, USA',
      orders: 50,
      amountSpent: '$80',
      status: 'warning',
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
        tone={status as IndexTableRowProps['tone']}
      >
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <code>{status}</code>
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
          {title: 'Tone'},
          {title: 'Location'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      channel: 'Online Store',
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Unfulfilled',
    },
    {
      id: '2562',
      url: '#',
      name: 'Helen Troy',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$975',
      lastOrderDate: 'May 31, 2023',
      status: 'success',
    },
    {
      id: '4102',
      url: '#',
      name: 'Colm Dillane',
      location: 'New York, USA',
      orders: 27,
      amountSpent: '$2885',
      lastOrderDate: 'May 31, 2023',
      status: 'critical',
    },
    {
      id: '2564',
      url: '#',
      name: 'Al Chemist',
      location: 'New York, USA',
      orders: 19,
      amountSpent: '$1,209',
      lastOrderDate: 'April 4, 2023',
      disabled: true,
      status: 'warning',
    },
    {
      id: '2563',
      url: '#',
      name: 'Larry June',
      location: 'San Francisco, USA',
      orders: 22,
      amountSpent: '$1,400',
      lastOrderDate: 'March 19, 2023',
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
        tone={status as IndexTableRowProps['tone']}
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            hidden: false,
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithTonesWithoutCheckboxes() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
      status: 'success',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
      status: 'critical',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
      status: 'warning',
    },
    {
      id: '2563',
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

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent, status}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
        tone={status as IndexTableRowProps['tone']}
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
        headings={[
          {title: 'Name'},
          {title: 'Location'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            hidden: false,
            id: 'amount-spent',
            title: 'Amount spent',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState('');
  const [sortValue, setSortValue] = useState(['today asc']);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
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

  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Date', value: 'today asc', directionLabel: 'Ascending'},
    {label: 'Date', value: 'today desc', directionLabel: 'Descending'},
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
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        lastColumnSticky
        headings={[
          {title: 'Name'},
          {title: 'Location'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            hidden: false,
            id: 'amount-spent',
            title: 'Amount spent',
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
  const [sortDirection, setSortDirection] =
    useState<IndexTableProps['sortDirection']>('descending');

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
          {title: 'Date', defaultSortDirection: 'ascending'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
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
  const [sortDirection, setSortDirection] =
    useState<IndexTableProps['sortDirection']>('descending');

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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
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
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithHeadingTooltips() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
          {title: 'Location', tooltipContent: 'Strictly within the US'},
          {
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
            new: true,
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithZebraStriping() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
        hasZebraStriping
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithZebraStripingCondensed() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
        hasZebraStriping
        condensed
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithZebraStripingAndRowStatus() {
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
        tone={status as IndexTableRowProps['tone']}
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithZebraStripingAndStickyLastColumn() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
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
      channel: 'Online Store',
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Unfulfilled',
    },
    {
      id: '2562',
      url: '#',
      name: 'Helen Troy',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$975',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '4102',
      url: '#',
      name: 'Colm Dillane',
      location: 'New York, USA',
      orders: 27,
      amountSpent: '$2885',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '2564',
      url: '#',
      name: 'Al Chemist',
      location: 'New York, USA',
      orders: 19,
      amountSpent: '$1,209',
      lastOrderDate: 'April 4, 2023',
      disabled: true,
    },
    {
      id: '2563',
      url: '#',
      name: 'Larry June',
      location: 'San Francisco, USA',
      orders: 22,
      amountSpent: '$1,400',
      lastOrderDate: 'March 19, 2023',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
          {title: 'Channel'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
        lastColumnSticky
        hasZebraStriping
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithZebraStripingAndWithoutCheckboxes() {
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            hidden: false,
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
        selectable={false}
        hasZebraStriping
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function SmallScreenWithAllOfItsElements() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState('');
  const [sortValue, setSortValue] = useState(['today asc']);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
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

  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Date', value: 'today asc', directionLabel: 'Ascending'},
    {label: 'Date', value: 'today desc', directionLabel: 'Descending'},
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
              alignment: 'end',
              id: 'order-count',
              title: 'Order count',
            },
            {
              alignment: 'end',
              id: 'amount-spent',
              title: 'Amount spent',
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

export function WithSubHeaders() {
  const rows = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 11,
      amountSpent: '$2,400',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '2562',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$975',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '4102',
      url: '#',
      name: 'Colm Dillane',
      location: 'New York, USA',
      orders: 27,
      amountSpent: '$2885',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '2564',
      url: '#',
      name: 'Al Chemist',
      location: 'New York, USA',
      orders: 19,
      amountSpent: '$1,209',
      lastOrderDate: 'April 4, 2023',
      disabled: true,
    },
    {
      id: '2563',
      url: '#',
      name: 'Larry June',
      location: 'San Francisco, USA',
      orders: 22,
      amountSpent: '$1,400',
      lastOrderDate: 'March 19, 2023',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--name'},
    {title: 'Location', id: 'column-header--location'},
    {
      alignment: 'end',
      id: 'column-header--order-count',
      title: 'Order count',
    },
    {
      alignment: 'end',
      hidden: false,
      id: 'column-header--amount-spent',
      title: 'Amount spent',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, customer) => {
      const groupVal = customer[groupKey];
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          customers: [],
          id: resolveId(groupVal),
        };
      }

      groups[groupVal].customers.push({
        ...customer,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const orders = groupRowsBy(
    'lastOrderDate',
    (date) => `last-order-date--${date.replace(',', '').split(' ').join('-')}`,
  );

  const rowMarkup = Object.keys(orders).map((orderDate, index) => {
    const {customers, position, id: subheaderId} = orders[orderDate];
    let selected: IndexTableRowProps['selected'] = false;

    const someCustomersSelected = customers.some(({id}) =>
      selectedResources.includes(id),
    );

    const allCustomersSelected = customers.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allCustomersSelected) {
      selected = true;
    } else if (someCustomersSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === customers[0].id),
      selectableRows.findIndex(
        (row) => row.id === customers[customers.length - 1].id,
      ),
    ];

    const disabled = customers.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          rowType="subheader"
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all customers whose last order was placed on ${orderDate}`}
        >
          <IndexTable.Cell scope="col" as="th" id={subheaderId}>
            {`Last order placed: ${orderDate}`}
          </IndexTable.Cell>
          <IndexTable.Cell as="th" />
          <IndexTable.Cell as="th" />
          <IndexTable.Cell as="th" />
        </IndexTable.Row>
        {customers.map(
          (
            {id, name, location, orders, amountSpent, position, disabled},
            rowIndex,
          ) => {
            return (
              <IndexTable.Row
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell
                  as="th"
                  scope="row"
                  headers={`${columnHeadings[0].id} ${subheaderId}`}
                >
                  <Text variant="bodyMd" fontWeight="semibold" as="span">
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
            );
          },
        )}
      </Fragment>
    );
  });

  return (
    <LegacyCard>
      <IndexTable
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        resourceName={resourceName}
        itemCount={rows.length}
        headings={columnHeadings as IndexTableProps['headings']}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithPagination() {
  const customers = [
    {
      id: '3410',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '3411',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '3412',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '3413',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
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
            alignment: 'end',
            id: 'order-count',
            title: 'Order count',
          },
          {
            alignment: 'end',
            id: 'amount-spent',
            title: 'Amount spent',
          },
        ]}
        pagination={{
          hasNext: true,
          onNext: () => {},
        }}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithSubHeadersNonSelectable() {
  const rows = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 11,
      amountSpent: '$2,400',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '2562',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$975',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '4102',
      url: '#',
      name: 'Colm Dillane',
      location: 'New York, USA',
      orders: 27,
      amountSpent: '$2885',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '2564',
      url: '#',
      name: 'Al Chemist',
      location: 'New York, USA',
      orders: 19,
      amountSpent: '$1,209',
      lastOrderDate: 'April 4, 2023',
      disabled: true,
    },
    {
      id: '2563',
      url: '#',
      name: 'Larry June',
      location: 'San Francisco, USA',
      orders: 22,
      amountSpent: '$1,400',
      lastOrderDate: 'March 19, 2023',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--name'},
    {title: 'Location', id: 'column-header--location'},
    {
      alignment: 'end',
      id: 'column-header--order-count',
      title: 'Order count',
    },
    {
      alignment: 'end',
      hidden: false,
      id: 'column-header--amount-spent',
      title: 'Amount spent',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, customer) => {
      const groupVal = customer[groupKey];
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          customers: [],
          id: resolveId(groupVal),
        };
      }

      groups[groupVal].customers.push({
        ...customer,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const orders = groupRowsBy(
    'lastOrderDate',
    (date) => `last-order-date--${date.replace(',', '').split(' ').join('-')}`,
  );

  const rowMarkup = Object.keys(orders).map((orderDate, index) => {
    const {customers, position, id: subheaderId} = orders[orderDate];
    let selected: IndexTableRowProps['selected'] = false;

    const someCustomersSelected = customers.some(({id}) =>
      selectedResources.includes(id),
    );

    const allCustomersSelected = customers.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allCustomersSelected) {
      selected = true;
    } else if (someCustomersSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === customers[0].id),
      selectableRows.findIndex(
        (row) => row.id === customers[customers.length - 1].id,
      ),
    ];

    const disabled = customers.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          rowType="subheader"
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all customers whose last order was placed on ${orderDate}`}
        >
          <IndexTable.Cell scope="col" as="th" id={subheaderId}>
            {`Last order placed: ${orderDate}`}
          </IndexTable.Cell>
          <IndexTable.Cell as="th" />
          <IndexTable.Cell as="th" />
          <IndexTable.Cell as="th" />
        </IndexTable.Row>
        {customers.map(
          (
            {id, name, location, orders, amountSpent, position, disabled},
            rowIndex,
          ) => {
            return (
              <IndexTable.Row
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell
                  as="th"
                  scope="row"
                  headers={`${columnHeadings[0].id} ${subheaderId}`}
                >
                  <Text variant="bodyMd" fontWeight="semibold" as="span">
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
            );
          },
        )}
      </Fragment>
    );
  });

  return (
    <LegacyCard>
      <IndexTable
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        resourceName={resourceName}
        itemCount={rows.length}
        headings={columnHeadings as IndexTableProps['headings']}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}
