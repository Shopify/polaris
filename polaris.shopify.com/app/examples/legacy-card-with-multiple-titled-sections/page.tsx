'use client';

import {LegacyCard} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard title="Online store dashboard">
      <LegacyCard.Section title="Reports">
        <p>View a summary of your online store’s performance.</p>
      </LegacyCard.Section>

      <LegacyCard.Section title="Summary">
        <p>
          View a summary of your online store’s performance, including sales,
          visitors, top products, and referrals.
        </p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
