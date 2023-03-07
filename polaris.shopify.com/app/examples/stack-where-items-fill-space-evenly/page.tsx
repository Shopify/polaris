'use client';

import {Stack, Badge, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function StackExample() {
  return (
    <Stack distribution="fillEvenly">
      <Text variant="headingMd" as="h2">
        Order #1136
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export default withPolarisExample(StackExample);
