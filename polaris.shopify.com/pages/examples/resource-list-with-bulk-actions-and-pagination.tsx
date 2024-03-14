import React, {useState} from 'react';
import {Avatar, Card, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import type {ResourceListProps} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {DeleteIcon} from '@shopify/polaris-icons';

function ResourceLisWithBulkActionsAndPaginationExample() {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: '103',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: '203',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

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
    <Card padding="0">
      <ResourceList
        resourceName={resourceName}
        items={items}
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        pagination={{
          hasNext: true,
          onNext: () => {},
        }}
        renderItem={(item) => {
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
        }}
      />
    </Card>
  );
}

export default withPolarisExample(
  ResourceLisWithBulkActionsAndPaginationExample,
);
