import {Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return (
    <Badge progress="incomplete" status="warning">
      Unfulfilled
    </Badge>
  );
}

export default withPolarisExample(BadgeExample);
