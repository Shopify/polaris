import {Page, Grid, LegacyCard} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function GridExample() {
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
            <Placeholder height="60px" />
          </Grid.Cell>
          <Grid.Cell area="sales">
            <Placeholder height="60px" />
          </Grid.Cell>
          <Grid.Cell area="orders">
            <Placeholder height="60px" />
          </Grid.Cell>
        </Grid>
      </LegacyCard>
    </Page>
  );
}

const Placeholder = ({height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    />
  );
};

export default withPolarisExample(GridExample);
