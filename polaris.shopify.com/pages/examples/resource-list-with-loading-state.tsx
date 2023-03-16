import {
  LegacyCard,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
} from '@shopify/polaris';
import {ResourceListSelectedItems} from '@shopify/polaris/build/ts/latest/src/utilities/resource-list';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceListWithLoadingExample() {
  const [selectedItems, setSelectedItems] = useState<ResourceListSelectedItems>(
    [],
  );

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: '104',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: '204',
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
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        loading
      />
    </LegacyCard>
  );

  function renderItem(item: {
    id: string;
    url: string;
    name: string;
    location: string;
  }) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {name}
        </Text>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export default withPolarisExample(ResourceListWithLoadingExample);
