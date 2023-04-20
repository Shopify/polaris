import React from 'react';
import {AlphaCard, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardDefaultExample() {
  return (
    <AlphaCard>
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </AlphaCard>
  );
}

export default withPolarisExample(AlphaCardDefaultExample);
