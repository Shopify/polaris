import React, {useState} from 'react';
import {
  Avatar,
  Card,
  ResourceItem,
  ResourceList,
  Text,
  BlockStack,
  Box,
  InlineStack,
} from '@shopify/polaris';
import type {ResourceListProps} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {DeleteIcon} from '@shopify/polaris-icons';

function ResourceLisWithBulkActionsAndManyItemsExample() {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = Array.from({length: 50}, (_, num) => {
    return {
      id: `${num}`,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$24,00',
    };
  });

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

  return (
    <BlockStack gap="400">
      <Card padding="0">
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
        />
        <Box padding="300" borderBlockStartWidth="025" borderColor="border">
          <InlineStack align="space-between">
            <div>Total inventory at all locations</div>
            <div>32069 available</div>
          </InlineStack>
        </Box>
      </Card>
      <Card padding="300">Content of another card</Card>
    </BlockStack>
  );

  function renderItem(item: any) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export default withPolarisExample(
  ResourceLisWithBulkActionsAndManyItemsExample,
);
