import React, {useState} from 'react';
import type {Args, ComponentMeta} from '@storybook/react';
import {
  AppProvider,
  Avatar,
  Button,
  LegacyCard,
  AlphaCard,
  Page,
  ResourceList,
  Text,
  VerticalStack,
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
      features={{
        polarisSummerEditions2023: context.globals.polarisSummerEditions2023,
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
                  <h3>
                    <Text fontWeight="bold" as="span">
                      {name}
                    </Text>
                  </h3>
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

export function WithI18n(_, context) {
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
      features={{
        polarisSummerEditions2023: context.globals.polarisSummerEditions2023,
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
                  <h3>
                    <Text fontWeight="bold" as="span">
                      {name}
                    </Text>
                  </h3>
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

export function WithLinkComponent(_, context) {
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
    <AppProvider
      linkComponent={CustomLinkComponent}
      i18n={{}}
      features={{
        polarisSummerEditions2023: context.globals.polarisSummerEditions2023,
      }}
    >
      <Page
        breadcrumbs={[{content: 'Products', url: '#'}]}
        title="Jar With Lock-Lid"
        primaryAction={{content: 'Save', disabled: true}}
      >
        <p>Page content</p>
      </Page>
    </AppProvider>
  );
}

export const WithSummerEditionsFeature = {
  render: (_args: Args, {globals: {polarisSummerEditions2023}}) => {
    const CheckFeature = () => {
      return (
        <AlphaCard>
          <VerticalStack gap="4">
            <Text
              as="h2"
              variant={polarisSummerEditions2023 ? 'headingXl' : 'bodyMd'}
              color={polarisSummerEditions2023 ? 'critical' : undefined}
            >
              {`Polaris Summer Editions flag is turned ${
                polarisSummerEditions2023 ? 'ON' : 'OFF'
              }`}
            </Text>
          </VerticalStack>
        </AlphaCard>
      );
    };
    return (
      <AppProvider features={{polarisSummerEditions2023}} i18n={{}}>
        <CheckFeature />
      </AppProvider>
    );
  },
};
