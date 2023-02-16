import {
  AppProvider,
  Page,
  Card,
  ResourceList,
  Avatar,
  Text,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AppProviderExample() {
  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: 'Sort by',
            defaultItemSingular: 'item',
            defaultItemPlural: 'items',
            showing: 'Showing {itemsCount} {resource}',
            Item: {
              viewItem: 'View details for {itemName}',
            },
          },
          Common: {
            checkbox: 'checkbox',
          },
        },
      }}
    >
      <Page>
        <Card>
          <ResourceList
            showHeader
            items={[
              {
                id: 341,
                url: '#',
                name: 'Mae Jemison',
                location: 'Decatur, USA',
              },
              {
                id: 256,
                url: '#',
                name: 'Ellen Ochoa',
                location: 'Los Angeles, USA',
              },
            ]}
            renderItem={(item) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="medium" name={name} />;

              return (
                <ResourceList.Item id={id} url={url} media={media}>
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                  </Text>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </Card>
      </Page>
    </AppProvider>
  );
}

export default withPolarisExample(AppProviderExample);
