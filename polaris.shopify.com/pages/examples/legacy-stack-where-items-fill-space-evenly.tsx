import {LegacyStack, Badge, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyStackExample() {
  return (
    <LegacyStack distribution="fillEvenly">
      <Text variant="headingMd" as="h2">
        Order #1136
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}

export default withPolarisExample(LegacyStackExample);
