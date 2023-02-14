import {LegacyStack, Badge, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyStackExample() {
  return (
    <LegacyStack>
      <LegacyStack.Item fill>
        <Text variant="headingMd" as="h2">
          Order #1136
        </Text>
      </LegacyStack.Item>
      <LegacyStack.Item>
        <Badge>Paid</Badge>
      </LegacyStack.Item>
      <LegacyStack.Item>
        <Badge>Fulfilled</Badge>
      </LegacyStack.Item>
    </LegacyStack>
  );
}

export default withPolarisExample(LegacyStackExample);
