import React from 'react';
import {AlphaStack, Badge, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackExample() {
  return (
    <div style={{width: '100%'}}>
      <AlphaStack>
        <Text variant="heading4xl" as="h2">
          AlphaStack
        </Text>
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </AlphaStack>
    </div>
  );
}

export default withPolarisExample(AlphaStackExample);
