'use client';

import {Page, Button, Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      breadcrumbs={[{content: 'Settings', url: '/settings'}]}
      title="General"
      primaryAction={
        <Button
          primary
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as new'}],
          }}
        >
          Save
        </Button>
      }
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export default withPolarisExample(PageExample);
