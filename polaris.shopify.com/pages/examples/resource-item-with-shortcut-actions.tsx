import {LegacyCard, ResourceList, ResourceItem, Avatar, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceItemExample() {
  return (
    <LegacyCard>
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
            latestOrderUrl: 'orders/1456',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location, latestOrderUrl} = item;
          const shortcutActions = latestOrderUrl
            ? [{content: 'View latest order', url: latestOrderUrl}]
            : null;

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
              shortcutActions={shortcutActions}
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
    </LegacyCard>
  );
}

export default withPolarisExample(ResourceItemExample);
