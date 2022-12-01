import React from 'react';
import {Divider, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithColorsExample() {
  return (
    <AlphaStack gap="5" fullWidth>
      <Text as="h1" variant="headingXs">
        Base
      </Text>
      <Divider color="base" />
      <Text as="h1" variant="headingXs">
        Dark
      </Text>
      <Divider color="dark" />
      <Text as="h1" variant="headingXs">
        Divider
      </Text>
      <Divider color="divider" />
      <Text as="h1" variant="headingXs">
        Divider on dark
      </Text>
      <Divider color="divider-on-dark" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider color="transparent" />
    </AlphaStack>
  );
}

export default withPolarisExample(DividerWithColorsExample);
