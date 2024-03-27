import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AppProvider,
  Avatar,
  LegacyCard,
  Page,
  ResourceList,
  Text,
} from '@shopify/polaris';

export default {
  component: AppProvider,
  args: {omitAppProvider: true},
  parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof AppProvider>;

export function Default(_, context) {
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
              const media = <Avatar customer size="md" name={name} />;

              return (
                <ResourceList.Item id={id} url={url} media={media}>
                  <Text as="h3" variant="bodyMd" fontWeight="bold">
                    {name}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    {location}
                  </Text>
                </ResourceList.Item>
              );
            }}
          />
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}

export function WithI18n() {
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
              const media = <Avatar customer size="md" name={name} />;

              return (
                <ResourceList.Item id={id} url={url} media={media}>
                  <Text as="h3" fontWeight="bold" variant="bodyMd">
                    {name}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    {location}
                  </Text>
                </ResourceList.Item>
              );
            }}
          />
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}

export function WithLinkComponent(_, context) {
  // We can do this because the AppProviderDecorator wraps all Stories, even AppProvider.stories.tsx
  const CustomLinkComponent = ({children, url, ...rest}) => {
    return (
      <a
        href={url}
        onClick={() => console.log('Custom link clicked')}
        {...rest}
      >
        {children}
      </a>
    );
  };

  return (
    <AppProvider linkComponent={CustomLinkComponent} i18n={{}}>
      <Page
        backAction={{content: 'Products', url: '#'}}
        title="Jar With Lock-Lid"
        primaryAction={{content: 'Save', disabled: true}}
      >
        <Text as="p" variant="bodyMd">
          Page content
        </Text>
      </Page>
    </AppProvider>
  );
}
