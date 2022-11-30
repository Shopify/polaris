import React from 'react';
import {Divider, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerStylesExample() {
  return (
    <AlphaStack gap="5" fullWidth>
      <Text as="h1" variant="headingXs">
        base
      </Text>
      <Divider border="base" />
      <Text as="h1" variant="headingXs">
        dark
      </Text>
      <Divider border="dark" />
      <Text as="h1" variant="headingXs">
        divider
      </Text>
      <Divider border="divider" />
      <Text as="h1" variant="headingXs">
        divider on dark
      </Text>
      <Divider border="divider-on-dark" />
      <Text as="h1" variant="headingXs">
        transparent
      </Text>
      <Divider border="transparent" />
    </AlphaStack>
  );
}

export default withPolarisExample(DividerStylesExample);
