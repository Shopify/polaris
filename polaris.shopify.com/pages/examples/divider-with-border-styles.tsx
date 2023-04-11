import React from 'react';
import {Divider, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithBorderStylesExample() {
  return (
    <AlphaStack gap="5">
      <Text as="h1" variant="headingXs">
        Default
      </Text>
      <Divider />
      <Text as="h1" variant="headingXs">
        Dark
      </Text>
      <Divider borderColor="border" />
      <Text as="h1" variant="headingXs">
        Divider on dark
      </Text>
      <Divider borderColor="border-inverse" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider borderColor="transparent" />
    </AlphaStack>
  );
}

export default withPolarisExample(DividerWithBorderStylesExample);
