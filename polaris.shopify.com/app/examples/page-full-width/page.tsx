'use client';

import {Page, LegacyCard} from '@shopify/polaris';
import {PlusMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{content: 'Create order', icon: PlusMinor}}
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
