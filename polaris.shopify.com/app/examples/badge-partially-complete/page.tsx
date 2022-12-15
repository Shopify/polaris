'use client';

import {Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return (
    <Badge progress="partiallyComplete" status="warning">
      Partially fulfilled
    </Badge>
  );
}

export default withPolarisExample(BadgeExample);
