import React from 'react';
import {Divider, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithBorderColorExample() {
  return (
    <AlphaStack gap="5">
      <Text as="p" variant="bodyMd">
        Border subdued
      </Text>
      <Divider borderColor="border-subdued" />
      <Text as="p" variant="bodyMd">
        Border
      </Text>
      <Divider borderColor="border" />
      <Text as="p" variant="bodyMd">
        Border inverse
      </Text>
      <Divider borderColor="border-inverse" />
    </AlphaStack>
  );
}

export default withPolarisExample(DividerWithBorderColorExample);
