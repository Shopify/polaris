import {Page, Grid, Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function GridExample() {
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

export default withPolarisExample(GridExample);
