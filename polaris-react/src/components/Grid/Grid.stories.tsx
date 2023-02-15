import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, Grid, Page} from '@shopify/polaris';

export default {
  component: Grid,
} as ComponentMeta<typeof Grid>;

export function TwoColumn() {
  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <Card title="Sales" sectioned>
            <p>View a summary of your online store’s sales.</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <Card title="Orders" sectioned>
            <p>View a summary of your online store’s orders.</p>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export function TwoThirdsAndOneThirdColumn() {
  return (
    <Page fullWidth>
      <Grid columns={{sm: 3}}>
        <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
          <Card title="Sales" sectioned>
            <p>View a summary of your online store’s sales.</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
          <Card title="Orders" sectioned>
            <p>View a summary of your online store’s orders.</p>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export function ThreeOneThirdColumn() {
  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
          <Card title="Sales" sectioned>
            <p>View a summary of your online store’s sales.</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
          <Card title="Orders" sectioned>
            <p>View a summary of your online store’s orders.</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
          <Card title="Orders" sectioned>
            <p>View a summary of your online store’s orders.</p>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}

export function CustomLayout() {
  return (
    <Page fullWidth>
      <Card sectioned>
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
                background: 'aquamarine',
              }}
            />
          </Grid.Cell>
          <Grid.Cell area="sales">
            <div
              style={{
                height: '60px',
                background: 'aquamarine',
              }}
            />
          </Grid.Cell>
          <Grid.Cell area="orders">
            <div
              style={{
                height: '60px',
                background: 'aquamarine',
              }}
            />
          </Grid.Cell>
        </Grid>
      </Card>
    </Page>
  );
}
