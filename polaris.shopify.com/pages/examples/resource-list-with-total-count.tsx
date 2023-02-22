import {LegacyCard, ResourceList, Avatar, ResourceItem, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceListWithTotalItemsCount() {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 105,
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 205,
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
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
        }}
        showHeader
        totalItemsCount={50}
      />
    </LegacyCard>
  );
}

export default withPolarisExample(ResourceListWithTotalItemsCount);
