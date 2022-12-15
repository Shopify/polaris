'use client';

import {Page, Grid, Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function GridExample() {
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

export default withPolarisExample(GridExample);
