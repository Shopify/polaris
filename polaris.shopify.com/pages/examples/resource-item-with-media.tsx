import {Card, ResourceList, ResourceItem, Avatar, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceItemExample() {
  return (
    <Card>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 145,
            url: 'customers/145',
            avatarSource:
              'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
            name: 'Yi So-Yeon',
            location: 'Gwangju, South Korea',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location} = item;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={
                <Avatar
                  customer
                  size="medium"
                  name={name}
                  source={avatarSource}
                />
              }
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {name}
              </Text>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

export default withPolarisExample(ResourceItemExample);
