import {Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return <Badge status="warning">On hold</Badge>;
}

export default withPolarisExample(BadgeExample);
