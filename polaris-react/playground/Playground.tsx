import React, {useState} from 'react';
import type {ResourceListProps} from '@shopify/polaris';

import {
  Page,
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  Avatar,
} from '../src';

export function Playground() {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);

  return (
    <Page title="Playground">
      <LegacyCard>
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          items={[
            {
              id: '145',
              url: '#',
              avatarSource:
                'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
              name: 'Yi So-Yeon',
              location: 'Gwangju, South Korea',
            },
            {
              id: '146',
              url: '#',
              avatarSource:
                'https://burst.shopifycdn.com/photos/woman-standing-in-front-of-yellow-background.jpg?width=746',
              name: 'Jane Smith',
              location: 'Manhattan, New York',
            },
            {
              id: '147',
              url: '#',
              avatarSource:
                'https://burst.shopifycdn.com/photos/relaxing-in-headphones.jpg?width=746',
              name: 'Grace Baker',
              location: 'Los Angeles, California',
            },
          ]}
          renderItem={(item) => {
            const {id, url, avatarSource, name, location} = item;

            return (
              <ResourceItem
                active={id === '145'}
                id={id}
                url={url}
                media={
                  <Avatar
                    customer
                    size="md"
                    name={name}
                    source={avatarSource}
                  />
                }
                accessibilityLabel={`View details for ${name}`}
                name={name}
                onClick={() => console.log('clicked')}
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
      </LegacyCard>
    </Page>
  );
}
