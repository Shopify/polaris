import {LegacyCard, ResourceList, Avatar, ResourceItem, Text} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceListWithSelectionExample() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 101,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 201,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
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
        selectable
      />
    </LegacyCard>
  );

  function renderItem(item) {
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

export default withPolarisExample(ResourceListWithSelectionExample);
