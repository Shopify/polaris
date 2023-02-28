import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SimpleSmallScreenIndexTableExample() {
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
          <Text variant="bodyMd" fontWeight="bold" as="p">
            {name}
          </Text>
          <p>{location}</p>
          <Text variant="bodyMd" as="p" alignment="end" numeric>
            {orders}
          </Text>
          <Text variant="bodyMd" as="p" alignment="end" numeric>
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
                <Text as="span" variant="bodyMd" alignment="end" numeric>
                  Order count
                </Text>
              ),
            },
            {
              id: 'amount-spent',
              title: (
                <Text
                  as="span"
                  variant="bodySm"
                  fontWeight="medium"
                  alignment="end"
                >
                  Amount spent
                </Text>
              ),
            },
            ,
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </div>
  );
}

export default withPolarisExample(SimpleSmallScreenIndexTableExample);
