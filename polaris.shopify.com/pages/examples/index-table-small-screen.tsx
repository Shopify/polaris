import {
  IndexTable,
  TextStyle,
  Card,
  useIndexResourceState,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SimpleSmallScreenIndexTableExample() {
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

export default withPolarisExample(SimpleSmallScreenIndexTableExample);
