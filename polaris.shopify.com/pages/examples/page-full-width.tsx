import {Page, LegacyCard} from '@shopify/polaris';
import {Plus} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{content: 'Create order', icon: Plus}}
      secondaryActions={[{content: 'Export'}]}
      pagination={{
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(PageExample);
