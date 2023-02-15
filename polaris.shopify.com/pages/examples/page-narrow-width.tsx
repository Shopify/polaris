import {Page, Card, PageActions} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      narrowWidth
      breadcrumbs={[{content: 'Orders', url: '#'}]}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: true}}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
      <PageActions
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[{content: 'Delete'}]}
      />
    </Page>
  );
}

export default withPolarisExample(PageExample);
