import {Page, Card} from '@shopify/polaris';
import {ArrowDownMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '/products'}]}
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      secondaryActions={[{content: 'Download', icon: ArrowDownMinor}]}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export default withPolarisExample(PageExample);
