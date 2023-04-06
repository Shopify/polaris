import React from 'react';
import {Divider, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithBorderStylesExample() {
  return (
    <AlphaStack gap="5">
      <Text as="p" variant="bodyMd">
        Border subdued
      </Text>
      <Divider borderStyle="border-subdued" />
      <Text as="p" variant="bodyMd">
        Border
      </Text>
      <Divider borderStyle="border" />
      <Text as="p" variant="bodyMd">
        Border inverse
      </Text>
      <Divider borderStyle="border-inverse" />
      <Text as="p" variant="bodyMd">
        Transparent
      </Text>
      <Divider borderStyle="transparent" />
    </AlphaStack>
  );
}

export default withPolarisExample(DividerWithBorderStylesExample);
