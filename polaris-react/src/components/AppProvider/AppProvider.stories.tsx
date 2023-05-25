import React, {useState} from 'react';
import type {Args, ComponentMeta} from '@storybook/react';
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
  Link,
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

export const WithSummerEditionsFeature = {
  render: (_args: Args, {globals: {polarisSummerEditions2023}}) => {
    const CheckFeature = () => {
      const {polarisSummerEditions2023} = useFeatures();
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

export const WithSummerEditionsEdgeCases = {
  render: (_args: Args, {globals: {polarisSummerEditions2023}}) => {
    return (
      <AppProvider features={{polarisSummerEditions2023}} i18n={{}}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Default color token in Link component */
          /* --p-color-text-interactive */

          /* Example of application override styles */
          .my-paragraph {
            --p-color-text-interactive: gold;
          }
          .my-other-paragraph [class^='Link'] {
            --p-color-text-interactive: lightgreen;
          }
          .my-other-paragraph [class^='Link'] span {
            color: lightsteelblue;
          }
      `,
          }}
        />

        <AlphaCard>
          <VerticalStack gap="4">
            <p>
              This paragraph{' '}
              <Link url="#test">
                should update color and size when beta flag is toggled
              </Link>
            </p>
            <p className="my-paragraph">
              My paragraph{' '}
              <Link url="#test">
                should update the size but keep the color override
              </Link>
            </p>
            <p className="my-other-paragraph">
              My other paragraph{' '}
              <Link url="#test">
                should update the size{' '}
                <span>but keep the custom overrides</span>
              </Link>
            </p>
          </VerticalStack>
        </AlphaCard>
      </AppProvider>
    );
  },
};
