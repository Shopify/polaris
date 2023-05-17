import React, {useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AppProvider,
  Avatar,
  Box,
  Button,
  LegacyCard,
  AlphaCard,
  Page,
  ResourceList,
  Text,
  VerticalStack,
} from '@shopify/polaris';

import {useFeatures} from '@shopify/polaris/utilities/features';

export default {
  component: AppProvider,
  args: {omitAppProvider: true},
  parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof AppProvider>;

export function Default() {
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

export function WithLinkComponent() {
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
        breadcrumbs={[{content: 'Products', url: '#'}]}
        title="Jar With Lock-Lid"
        primaryAction={{content: 'Save', disabled: true}}
      >
        <p>Page content</p>
      </Page>
    </AppProvider>
  );
}

export function WithSummerEditionsFeature() {
  const [flagStatus, setFlagStatus] = useState(false);
  const CheckFeature = ({children}: {children: React.ReactNode}) => {
    const {polaris_summer_editions_2023} = useFeatures();
    return (
      <AlphaCard>
        <VerticalStack gap="4">
          <Text
            as="h2"
            variant={polaris_summer_editions_2023 ? 'headingXl' : 'bodyMd'}
            color={polaris_summer_editions_2023 ? 'critical' : undefined}
          >
            {`Polaris Summer Editions flag is turned ${
              polaris_summer_editions_2023 ? 'ON' : 'OFF'
            }`}
          </Text>

          {children}
        </VerticalStack>
      </AlphaCard>
    );
  };
  return (
    <AppProvider features={{polaris_summer_editions_2023: true}} i18n={{}}>
      <CheckFeature>
        <Box>
          <Button
            primary
            onClick={() => setFlagStatus((flagStatus) => !flagStatus)}
          >
            Toggle flag
          </Button>
        </Box>
      </CheckFeature>
    </AppProvider>
  );
}
