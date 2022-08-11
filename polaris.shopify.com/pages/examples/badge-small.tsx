import {Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return <Badge size="small">Fulfilled</Badge>;
}

export default withPolarisExample(BadgeExample);
