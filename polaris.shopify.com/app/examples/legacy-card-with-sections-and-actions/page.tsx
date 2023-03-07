'use client';

import {LegacyCard} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard title="Customer">
      <LegacyCard.Section>
        <p>John Smith</p>
      </LegacyCard.Section>
      <LegacyCard.Section
        title="Contact Information"
        actions={[{content: 'Edit'}]}
      >
        <p>john.smith@example.com</p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
