import React from 'react';
import {Badge, Inline, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineExample() {
  return (
    <div style={{width: '500px'}}>
      <Inline>
        <Text variant="heading4xl" as="h2">
          Inline
        </Text>
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </Inline>
    </div>
  );
}

export default withPolarisExample(InlineExample);
