import React, {Fragment, useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {
  IndexFiltersProps,
  IndexTableProps,
  IndexTableRowProps,
} from '@shopify/polaris';
import {
  Frame,
  Button,
  Modal,
  Scrollable,
  useBreakpoints,
  InlineStack,
  LegacyCard,
  Card,
  EmptySearchResult,
  IndexFilters,
  useSetIndexFiltersMode,
  Link,
  TextField,
  Text,
  useIndexResourceState,
  BlockStack,
  Box,
  Thumbnail,
  Badge,
} from '@shopify/polaris';
import {
  AffiliateIcon,
  DeleteIcon,
  EditIcon,
  ExportIcon,
  ProductIcon,
} from '@shopify/polaris-icons';

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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" variant="bodyMd" numeric>
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" variant="bodyMd" numeric>
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell flush>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell flush>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell flush>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text as="p" variant="bodyMd">
            <Text variant="bodyMd" as="span">
              {location}
            </Text>
          </Text>
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
          <Text as="p" variant="bodyMd">
            <Text variant="bodyMd" as="span">
              {location}
            </Text>
          </Text>
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
    {
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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

export function WithSelectionAndNoBulkActions() {
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        hasMoreItems
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
          icon: DeleteIcon,
          destructive: true,
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
      title: 'Import',
      items: [
        {
          content: 'Import from PDF',
          onAction: () => console.log('Todo: implement PDF importing'),
        },
        {
          content: 'Import from CSV',
          onAction: () => console.log('Todo: implement CSV importing'),
        },
      ],
    },
    {
      title: 'Customers',
      items: [
        {
          content: 'Add customers',
          onAction: () => console.log('Todo: implement Adding customers'),
        },
        {
          content: 'Edit customers',
          onAction: () => console.log('Todo: implement Editing customers'),
        },
        {
          icon: DeleteIcon,
          destructive: true,
          content: 'Delete customers',
          onAction: () => console.log('Todo: implement Deleting customers'),
        },
      ],
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
      name: `Mae Jemison ${num}`,
      location: 'Truth or Consequences, New Mexico, United States of America',
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
      content: 'Rename customers',
      onAction: () => console.log('Todo: implement bulk rename'),
    },
    {
      title: 'Edit customers',
      actions: [
        {
          content: 'Add customers',
          onAction: () => console.log('Todo: implement adding customers'),
        },
        {
          icon: DeleteIcon,
          destructive: true,
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
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      title: 'Bulk action section',
      items: [
        {
          content: 'Edit data',
        },
        {
          content: 'Manage data',
        },
        {
          icon: DeleteIcon,
          destructive: true,
          content: 'Delete data',
        },
      ],
    },
    {
      content: 'Edit prices',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
    {
      content: 'Edit quantities',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
    {
      content: 'Edit SKUs',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
    {
      content: 'Edit barcodes',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
    {
      icon: DeleteIcon,
      destructive: true,
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
        defaultPaginatedSelectAllText="Select everything in this store"
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
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
        condensed={useBreakpoints().smDown}
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

  const customersForNestedRows = [
    {
      id: '34101',
      url: '#',
      name: 'Astronaut',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '34111',
      url: '#',
      name: 'Baker',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
      status: 'subdued',
    },
    {
      id: '34121',
      url: '#',
      name: 'Candlestick maker',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
      status: 'success',
    },
    {
      id: '34131',
      url: '#',
      name: 'Rice Cooker',
      location: 'Los Angeles, USA',
      orders: 40,
      amountSpent: '$40',
      status: 'critical',
    },
    {
      id: '34141',
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <code>{status}</code>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const rowMarkupNested = customersForNestedRows.map(
    ({id, name, location, orders, amountSpent, status}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        tone={status as IndexTableRowProps['tone']}
        rowType={index > 0 ? 'child' : 'subheader'}
      >
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <code>{status}</code>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
        {rowMarkupNested}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
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
    <Card padding="0">
      <IndexTable
        condensed={useBreakpoints().smDown}
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
    </Card>
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
            <Text fontWeight="bold" as="span" variant="bodyMd">
              {name}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
            <Text fontWeight="bold" as="span" variant="bodyMd">
              {name}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
      icon: DeleteIcon,
      destructive: true,
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
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
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{notes}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{notes}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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

export function WithHeadingWithPaddingBlockEnd() {
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Box paddingInlineEnd="600">
            <Text as="span" alignment="end" numeric variant="bodyMd">
              {amountSpent}
            </Text>
          </Box>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{notes}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
            paddingBlockEnd: '600',
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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

  const customersForNestedRows = [
    {
      id: '34101',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '34111',
      url: '#',
      name: 'Joe Jemison',
      location: 'Sydney, AU',
      orders: 20,
      amountSpent: '$1,400',
    },
    {
      id: '34121',
      url: '#',
      name: 'Sam Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$400',
    },
    {
      id: '34131',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$4,300',
    },
    {
      id: '25631',
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  const nestedRowMarkup = customersForNestedRows.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        rowType={index > 0 ? 'child' : 'subheader'}
      >
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
        {nestedRowMarkup}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
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
        condensed={useBreakpoints().smDown}
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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
      icon: DeleteIcon,
      destructive: true,
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
          <Text as="p" variant="bodyMd">
            <Text variant="bodyMd" as="span">
              {location}
            </Text>
          </Text>
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
                <IndexTable.Cell>
                  <Text variant="bodyMd" as="span">
                    {location}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {orders}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
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
        condensed={useBreakpoints().smDown}
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
  const customers = Array.from({length: 50}, (_, num) => {
    return {
      id: `${num}`,
      url: '#',
      name: `Mae Jemison ${num}`,
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

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
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

export function WithStickyScrollBar() {
  const customers = Array.from({length: 50}, (_, num) => {
    return {
      id: `${num}`,
      url: '#',
      name: `Mae Jemison ${num}`,
      location: 'Truth or Consequences, United States of America',
      orders: 20,
      amountSpent: '$24,00',
      channel: 'Point of sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
      tags: 'No tags applied',
    };
  });

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
        tags,
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{channel}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{tags}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Box paddingBlockEnd="400">
      <BlockStack gap="200">
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
              {title: 'Tags'},
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </BlockStack>
    </Box>
  );
}

export function WithPaginationAndBulkActions() {
  const customers = Array.from({length: 50}, (_, num) => {
    return {
      id: `${num}`,
      url: '#',
      name: `Mae Jemison ${num}`,
      location: 'Truth or Consequences, United States of America',
      orders: 20,
      amountSpent: '$24,00',
      channel: 'Point of sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
      tags: 'No tags applied',
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
          icon: DeleteIcon,
          destructive: true,
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
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

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
        tags,
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
          <Text fontWeight="bold" as="span" variant="bodyMd">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {location}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{channel}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{tags}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Box paddingBlockEnd="400">
      <Card padding="0">
        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
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
            {title: 'Tags'},
          ]}
          pagination={{
            hasNext: true,
            onNext: () => {},
          }}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Box>
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
                <IndexTable.Cell>
                  <Text variant="bodyMd" as="span">
                    {location}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {orders}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
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
        condensed={useBreakpoints().smDown}
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

export function WithNestedRows() {
  const rows = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small Lorem ipsum dolor sit amet',
      color: 'Orange Lorem ipsum dolor sit amet',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--name'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, product) => {
      const groupVal = product[groupKey];
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }
      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const groupedProducts = groupRowsBy(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: subheaderId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          rowType="subheader"
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products wich has color ${color}`}
        >
          <IndexTable.Cell>
            <Text as="span" fontWeight="semibold">
              {color}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          ({id, size, quantity, price, position, disabled}, rowIndex) => {
            return (
              <IndexTable.Row
                rowType="child"
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell>
                  <Text variant="bodyMd" as="span">
                    {size}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {quantity}
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
        condensed={useBreakpoints().smDown}
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

export function WithNestedRowsStickyLastColumn() {
  const rows = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small Lorem ipsum dolor sit amet',
      color: 'Orange Lorem ipsum dolor sit amet',
      vendor: 'Fit Lines',
      channel: 'Point of Sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
      vendor: 'Fit Lines',
      channel: 'Point of Sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
      vendor: 'Fit Lines',
      channel: 'Point of Sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
      vendor: 'Fit Lines',
      channel: 'Point of Sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
      vendor: 'Fit Lines',
      channel: 'Point of Sale',
      paymentStatus: 'Refunded',
      fulfillmentStatus: 'Fulfilled',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--size'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
    {
      alignment: 'end',
      id: 'column-header--vendor',
      title: 'Vendor',
    },
    {
      alignment: 'end',
      id: 'column-header--channel',
      title: 'Channel',
    },
    {
      alignment: 'end',
      id: 'column-header--paymentStatus',
      title: 'Status',
    },
    {
      alignment: 'end',
      id: 'column-header--fulfillmentStatus',
      title: 'Fulfillment Status',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, product) => {
      const groupVal = product[groupKey];
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }
      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const groupedProducts = groupRowsBy(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: subheaderId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          rowType="subheader"
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products wich has color ${color}`}
        >
          <IndexTable.Cell id={subheaderId}>
            <Text as="span" fontWeight="semibold">
              {color}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
          <IndexTable.Cell />
          <IndexTable.Cell />
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          (
            {
              id,
              size,
              quantity,
              price,
              position,
              disabled,
              vendor,
              channel,
              paymentStatus,
              fulfillmentStatus,
            },
            rowIndex,
          ) => {
            return (
              <IndexTable.Row
                rowType="child"
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell>
                  <Text variant="bodyMd" as="span">
                    {size}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {quantity}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {vendor}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {channel}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {paymentStatus}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {fulfillmentStatus}
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
        condensed={useBreakpoints().smDown}
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        resourceName={resourceName}
        itemCount={rows.length}
        headings={columnHeadings as IndexTableProps['headings']}
        lastColumnSticky
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithNestedRowsNonSelectable() {
  const rows = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small Lorem ipsum dolor sit amet',
      color: 'Orange Lorem ipsum dolor sit amet',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--size'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, product) => {
      const groupVal = product[groupKey];

      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }

      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const groupedProducts = groupRowsBy(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: subheaderId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          rowType="subheader"
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products wich has color ${color}`}
        >
          <IndexTable.Cell id={subheaderId}>
            <Text as="span" fontWeight="semibold">
              {color}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          ({id, size, quantity, price, position, disabled}, rowIndex) => {
            return (
              <IndexTable.Row
                rowType="child"
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell>
                  <Text variant="bodyMd" as="span">
                    {size}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {quantity}
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
        condensed={useBreakpoints().smDown}
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

export function WithNestedRowsWithThumbnails() {
  const rows = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small Lorem ipsum dolor sit amet',
      color: 'Orange Lorem ipsum dolor sit amet',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
    },
  ];

  const columnHeadings = [
    {title: 'Image', id: 'column-header--image'},
    {title: 'Name', id: 'column-header--size'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, product) => {
      const groupVal = product[groupKey];
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }
      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const groupedProducts = groupRowsBy(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: subheaderId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          rowType="subheader"
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products wich has color ${color}`}
        >
          <IndexTable.Cell>
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
              size="medium"
              alt="Black choker necklace"
            />
          </IndexTable.Cell>
          <IndexTable.Cell id={subheaderId}>
            <Text as="span" fontWeight="semibold">
              {color}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          ({id, size, quantity, price, position, disabled}, rowIndex) => {
            return (
              <IndexTable.Row
                rowType="child"
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell>
                  <Thumbnail
                    source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                    size="small"
                    alt="Black choker necklace"
                  />
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text variant="bodyMd" as="span">
                    {size}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {quantity}
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
        condensed={useBreakpoints().smDown}
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        resourceName={resourceName}
        itemCount={rows.length}
        headings={columnHeadings as IndexTableProps['headings']}
        selectable
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithNestedRowsWithThumbnailsNonSelectable() {
  const rows = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small Lorem ipsum dolor sit amet',
      color: 'Orange Lorem ipsum dolor sit amet',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
    },
  ];

  const columnHeadings = [
    {title: 'Image', id: 'column-header--image'},
    {title: 'Name', id: 'column-header--size'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, product) => {
      const groupVal = product[groupKey];
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }
      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const groupedProducts = groupRowsBy(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: subheaderId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          rowType="subheader"
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products wich has color ${color}`}
        >
          <IndexTable.Cell>
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
              size="medium"
              alt="Black choker necklace"
            />
          </IndexTable.Cell>
          <IndexTable.Cell id={subheaderId}>
            <Text as="span" fontWeight="semibold">
              {color}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          ({id, size, quantity, price, position, disabled}, rowIndex) => {
            return (
              <IndexTable.Row
                rowType="child"
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell>
                  <Thumbnail
                    source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                    size="small"
                    alt="Black choker necklace"
                  />
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text variant="bodyMd" as="span">
                    {size}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {quantity}
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
        condensed={useBreakpoints().smDown}
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

export function WithNestedRowsWithThumbnailsOneCellSelectable() {
  const rows = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small Lorem ipsum dolor sit amet',
      color: 'Orange Lorem ipsum dolor sit amet',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--size'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, product) => {
      const groupVal = product[groupKey];

      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }

      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const groupedProducts = groupRowsBy(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: subheaderId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products wich has color ${color}`}
        >
          <IndexTable.Cell>
            <InlineStack gap="400" blockAlign="center">
              <Thumbnail
                source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                size="medium"
                alt="Black choker necklace"
              />
              <Text as="span" fontWeight="semibold">
                {color}
              </Text>
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          ({id, size, quantity, price, position, disabled}, rowIndex) => {
            return (
              <IndexTable.Row
                rowType="child"
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell>
                  <Box>
                    <InlineStack gap="400" blockAlign="center">
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                        size="small"
                        alt="Black choker necklace"
                      />
                      <Text variant="bodyMd" as="span">
                        {size}
                      </Text>
                    </InlineStack>
                  </Box>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {quantity}
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
        condensed={useBreakpoints().smDown}
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        resourceName={resourceName}
        itemCount={rows.length}
        headings={columnHeadings as IndexTableProps['headings']}
        selectable
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithNestedRowsWithThumbnailsOneCellNonSelectable() {
  const rows = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small Lorem ipsum dolor sit amet',
      color: 'Orange Lorem ipsum dolor sit amet',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--size'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
  ];

  const groupRowsBy = (groupKey: string, resolveId: (groupVal) => string) => {
    let position = -1;
    const groups = rows.reduce((groups, product) => {
      const groupVal = product[groupKey];
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }
      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const groupedProducts = groupRowsBy(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: subheaderId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          selectionRange={rowRange}
          id={`Subheader-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products wich has color ${color}`}
        >
          <IndexTable.Cell>
            <InlineStack gap="400" blockAlign="center">
              <Thumbnail
                source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                size="medium"
                alt="Black choker necklace"
              />
              <Text as="span" fontWeight="semibold">
                {color}
              </Text>
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          ({id, size, quantity, price, position, disabled}, rowIndex) => {
            return (
              <IndexTable.Row
                rowType="child"
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell>
                  <Box>
                    <InlineStack gap="400" blockAlign="center">
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                        size="small"
                        alt="Black choker necklace"
                      />
                      <Text variant="bodyMd" as="span">
                        {size}
                      </Text>
                    </InlineStack>
                  </Box>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" numeric>
                    {price}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" alignment="end" numeric variant="bodyMd">
                    {quantity}
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
        condensed={useBreakpoints().smDown}
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

export function WithLongDataSetNonSelectable() {
  const orders = Array.from(Array(100).keys()).map((i) => ({
    id: `${i}`,
    order: i,
    date: 'Jul 20 at 4:34pm',
    customer: 'Jaydon Stanton',
    total: `$969.44${i}`,
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  }));

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const rowMarkup = orders.map(
    (
      {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
      index,
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>{total}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        headings={[
          {title: 'Order'},
          {title: 'Date'},
          {title: 'Customer'},
          {title: 'Total', alignment: 'end'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithLongDataSetSelectable() {
  const orders = Array.from(Array(100).keys()).map((i) => ({
    id: `${i}`,
    order: i,
    date: 'Jul 20 at 4:34pm',
    customer: 'Jaydon Stanton',
    total: `$969.44${i}`,
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  }));

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>{total}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

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
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Order', hidden: true},
          {title: 'Date'},
          {title: 'Customer'},
          {title: 'Total', alignment: 'end'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
        bulkActions={bulkActions}
        selectable
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export function WithinAModal() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  const orders = Array.from(Array(100).keys()).map((i) => ({
    id: `${i}`,
    order: i,
    date: 'Jul 20 at 4:34pm',
    customer: 'Jaydon Stanton',
    total: `$969.44${i}`,
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  }));

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>{total}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

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
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const table = (
    <IndexTable
      resourceName={resourceName}
      itemCount={orders.length}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      onSelectionChange={handleSelectionChange}
      headings={[
        {title: 'Order', hidden: true},
        {title: 'Date'},
        {title: 'Customer'},
        {title: 'Total', alignment: 'end'},
        {title: 'Payment status'},
        {title: 'Fulfillment status'},
      ]}
      bulkActions={bulkActions}
      selectable
    >
      {rowMarkup}
    </IndexTable>
  );

  return (
    <Frame>
      <div style={{height: '500px'}}>
        <Modal
          noScroll
          activator={activator}
          open={active}
          onClose={toggleActive}
          title="Import customers by CSV"
          primaryAction={{
            content: 'Import customers',
            onAction: toggleActive,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: toggleActive,
            },
          ]}
        >
          <Box>
            <Scrollable style={{height: '65dvh'}}>{table}</Scrollable>
          </Box>
        </Modal>
      </div>
    </Frame>
  );
}

export function WithUnmountingTable() {
  const [isShowing, setIsShowing] = useState(true);
  const orders = [
    {
      id: '1020',
      order: '#1020',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: '#1019',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric variant="bodyMd">
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <>
      {isShowing && (
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            itemCount={orders.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              {title: 'Order'},
              {title: 'Date'},
              {title: 'Customer'},
              {title: 'Total', alignment: 'end'},
              {title: 'Payment status'},
              {title: 'Fulfillment status'},
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      )}
      <button onClick={() => setIsShowing(!isShowing)}>Toggle</button>
    </>
  );
}
