import {LegacyStack, Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyStackExample() {
  return (
    <LegacyStack>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </LegacyStack>
  );
}

export default withPolarisExample(LegacyStackExample);
