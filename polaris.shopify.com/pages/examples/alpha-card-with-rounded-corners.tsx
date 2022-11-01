import {AlphaCard, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardExample() {
  return (
    <AlphaCard roundedAbove="md">
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardExample);
