import React from 'react';
import {AlphaCard, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithRoundedCornersExample() {
  return (
    <AlphaCard roundedAbove="md">
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithRoundedCornersExample);
