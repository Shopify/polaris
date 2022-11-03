import {Stack, Badge, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function StackExample() {
  return (
    <Stack>
      <Stack.Item fill>
        <Text variant="headingMd" as="h2">
          Order #1136
        </Text>
      </Stack.Item>
      <Stack.Item>
        <Badge>Paid</Badge>
      </Stack.Item>
      <Stack.Item>
        <Badge>Fulfilled</Badge>
      </Stack.Item>
    </Stack>
  );
}

export default withPolarisExample(StackExample);
