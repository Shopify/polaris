import {
  IndexTable,
  LegacyCard,
  Link,
  useIndexResourceState,
  Text,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ClickThroughLinkIndexTableExample() {
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
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {name}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span" alignment="end" numeric>
            {orders}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span" alignment="end" numeric>
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
              <Text
                as="span"
                variant="bodySm"
                fontWeight="medium"
                alignment="end"
              >
                Order count
              </Text>
            ),
          },
          {
            id: 'amount-spent',
            hidden: false,
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
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export default withPolarisExample(ClickThroughLinkIndexTableExample);
