'use client';

import {LegacyCard, List} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard
      title="Shipment 1234"
      secondaryFooterActions={[
        {content: 'Cancel shipment', destructive: true},
        {content: 'Add another shipment', disabled: true},
      ]}
      primaryFooterAction={{content: 'Add tracking number'}}
    >
      <LegacyCard.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
