import {IndexTable, Card, useIndexResourceState, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SimpleFlushIndexTableExample() {
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
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell flush>{location}</IndexTable.Cell>
        <IndexTable.Cell flush>
          <Text variant="bodyMd" as="span" alignment="end">
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell flush>
          <Text variant="bodyMd" as="span" alignment="end">
            {amountSpent}
          </Text>
        </IndexTable.Cell>
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

export default withPolarisExample(SimpleFlushIndexTableExample);
