import {Card, ResourceList, Avatar, ResourceItem, Text} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceListExample() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 111,
      url: 'customers/231',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 211,
      url: 'customers/246',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
    {
      id: 311,
      url: 'customers/276',
      name: 'Joe Smith',
      location: 'Arizona, USA',
    },
    {
      id: 411,
      url: 'customers/349',
      name: 'Haden Jerado',
      location: 'Decatur, USA',
    },
    {
      id: 511,
      url: 'customers/419',
      name: 'Tom Thommas',
      location: 'Florida, USA',
    },
    {
      id: 611,
      url: 'customers/516',
      name: 'Emily Amrak',
      location: 'Texas, USA',
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
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        resolveItemId={resolveItemIds}
      />
    </Card>
  );

  function renderItem(item, _, index) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        sortOrder={index}
        accessibilityLabel={`View details for ${name}`}
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {name}
        </Text>
        <div>{location}</div>
      </ResourceItem>
    );
  }

  function resolveItemIds({id}) {
    return id;
  }
}

export default withPolarisExample(ResourceListExample);
