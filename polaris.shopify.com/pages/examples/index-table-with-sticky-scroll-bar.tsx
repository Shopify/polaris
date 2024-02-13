import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Box,
  BlockStack,
  Badge,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IndexTableWithStickyScrollBarExample() {
  const orders = [
    {
      id: `0001`,
      name: `Mae Jemison`,
      location: 'Truth or Consequences, United States of America',
      items: 20,
      amountSpent: '$24.00',
      channel: 'Point of sale',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
      tags: 'No tags applied',
    },
    {
      id: `0002`,
      name: `Jaydon Stanton`,
      location: 'Portland, United States of America',
      items: 15,
      amountSpent: '$359.10',
      channel: 'Point of sale',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
      tags: 'No tags applied',
    },
    {
      id: `0003`,
      name: `Leo Cardner`,
      location: 'Toronto, Canada',
      items: 3,
      amountSpent: '$15.99',
      channel: 'Point of sale',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
      tags: 'No tags applied',
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
      {
        id,
        name,
        location,
        items,
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
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {items}
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
            itemCount={orders.length}
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
                title: 'Item count',
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

export default withPolarisExample(IndexTableWithStickyScrollBarExample);
