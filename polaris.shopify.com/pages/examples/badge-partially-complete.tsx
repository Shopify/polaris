import {Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return (
    <Badge progress="partiallyComplete" tone="warning">
      Partially fulfilled
    </Badge>
  );
}

export default withPolarisExample(BadgeExample);
