'use client';

import {AlphaCard, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function AlphaCardExample() {
  return (
    <AlphaCard background="surface-subdued">
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardExample);
