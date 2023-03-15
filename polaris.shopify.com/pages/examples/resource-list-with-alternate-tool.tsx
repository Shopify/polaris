import {
  LegacyCard,
  ResourceList,
  Button,
  Avatar,
  ResourceItem,
  Text,
} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceListWithAlternateToolExample() {
  const resourceName = {
    singular: 'Customer',
    plural: 'Customers',
  };

  const items = [
    {
      id: 107,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 207,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  return (
    <LegacyCard>
      <ResourceList
        items={items}
        renderItem={renderItem}
        resourceName={resourceName}
        alternateTool={<Button>Email customers</Button>}
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

export default withPolarisExample(ResourceListWithAlternateToolExample);
