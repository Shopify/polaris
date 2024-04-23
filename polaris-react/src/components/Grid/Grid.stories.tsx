import React from 'react';
import type {Meta} from '@storybook/react';
import {LegacyCard, Grid, Page, Text} from '@shopify/polaris';

export default {
  component: Grid,
} as Meta<typeof Grid>;

export const TwoColumn = {
  render() {
    return (
      <Page fullWidth>
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <LegacyCard title="Sales" sectioned>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s sales.
              </Text>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <LegacyCard title="Orders" sectioned>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s orders.
              </Text>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Page>
    );
  },
};

export const TwoThirdsAndOneThirdColumn = {
  render() {
    return (
      <Page fullWidth>
        <Grid columns={{sm: 3}}>
          <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
            <LegacyCard title="Sales" sectioned>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s sales.
              </Text>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
            <LegacyCard title="Orders" sectioned>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s orders.
              </Text>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Page>
    );
  },
};

export const ThreeOneThirdColumn = {
  render() {
    return (
      <Page fullWidth>
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
            <LegacyCard title="Sales" sectioned>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s sales.
              </Text>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
            <LegacyCard title="Orders" sectioned>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s orders.
              </Text>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
            <LegacyCard title="Orders" sectioned>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s orders.
              </Text>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </Page>
    );
  },
};

export const CustomLayout = {
  render() {
    return (
      <Page fullWidth>
        <LegacyCard sectioned>
          <Grid
            columns={{xs: 1, sm: 4, md: 4, lg: 6, xl: 6}}
            areas={{
              xs: ['product', 'sales', 'orders'],
              sm: [
                'product product product product',
                'sales sales orders orders',
              ],
              md: ['sales product product orders'],
              lg: ['product product product product sales orders'],
              xl: ['product product sales sales orders orders'],
            }}
          >
            <Grid.Cell area="product">
              <div
                style={{
                  height: '60px',
                  background: 'var(--p-color-text-info)',
                }}
              />
            </Grid.Cell>
            <Grid.Cell area="sales">
              <div
                style={{
                  height: '60px',
                  background: 'var(--p-color-text-info)',
                }}
              />
            </Grid.Cell>
            <Grid.Cell area="orders">
              <div
                style={{
                  height: '60px',
                  background: 'var(--p-color-text-info)',
                }}
              />
            </Grid.Cell>
          </Grid>
        </LegacyCard>
      </Page>
    );
  },
};
