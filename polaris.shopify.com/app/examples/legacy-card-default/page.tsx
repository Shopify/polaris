'use client';

import {LegacyCard} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard title="Online store dashboard" sectioned>
      <p>View a summary of your online store’s performance.</p>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
