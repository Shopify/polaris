import {Stack, Badge, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function StackExample() {
  return (
    <Stack alignment="center">
      <Text variant="headingMd" as="h2">
        Order
        <br />
        #1136
        <br />
        was paid
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export default withPolarisExample(StackExample);
