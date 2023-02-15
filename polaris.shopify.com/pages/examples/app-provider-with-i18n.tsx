import {
  AppProvider,
  Page,
  LegacyCard,
  ResourceList,
  Avatar,
  Text,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AppProviderI18NExample() {
  return (
    <AppProvider
      i18n={{
        Polaris: {
          Common: {
            checkbox: 'case à cocher',
          },
          ResourceList: {
            sortingLabel: 'Trier par',
            showing: '{itemsCount} {resource} affichés',
            defaultItemPlural: 'articles',
            defaultItemSingular: 'article',
            Item: {
              viewItem: "Afficher les détails de l'{itemName}",
            },
          },
        },
      }}
    >
      <Page>
        <LegacyCard>
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
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}

export default withPolarisExample(AppProviderI18NExample);
