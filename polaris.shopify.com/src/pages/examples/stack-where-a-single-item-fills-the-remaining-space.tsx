import {Stack, Heading, Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function StackExample() {
  return (
    <Stack>
      <Stack.Item fill>
        <Heading>Order #1136</Heading>
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
