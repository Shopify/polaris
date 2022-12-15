'use client';

import {Card, ResourceList, Avatar, ResourceItem, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function ResourceListExample() {
  return (
    <Card>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 110,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            latestOrderUrl: 'orders/1456',
          },
          {
            id: 210,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            latestOrderUrl: 'orders/1457',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location, latestOrderUrl} = item;
          const media = <Avatar customer size="medium" name={name} />;
          const shortcutActions = latestOrderUrl
            ? [
                {
                  content: 'View latest order',
                  accessibilityLabel: `View ${name}’s latest order`,
                  url: latestOrderUrl,
                },
              ]
            : null;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
              shortcutActions={shortcutActions}
              persistActions
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

export default withPolarisExample(ResourceListExample);
