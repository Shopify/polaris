import React from 'react';
import {AlphaCard, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithSubduedBackgroundExample() {
  return (
    <AlphaCard background="bg-subdued" roundedAbove="sm">
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardWithSubduedBackgroundExample);
