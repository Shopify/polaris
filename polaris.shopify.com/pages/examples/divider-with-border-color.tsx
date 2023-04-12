import React from 'react';
import {Divider, Text, VerticalStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithBorderColorExample() {
  return (
    <VerticalStack gap="5">
      <Text as="h1" variant="headingXs">
        Default
      </Text>
      <Divider />
      <Text as="h1" variant="headingXs">
        Border
      </Text>
      <Divider borderColor="border" />
      <Text as="h1" variant="headingXs">
        Border inverse
      </Text>
      <Divider borderColor="border-inverse" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider borderColor="transparent" />
    </VerticalStack>
  );
}

export default withPolarisExample(DividerWithBorderColorExample);
