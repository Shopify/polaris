import {Badge} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return <Badge tone="warning">On hold</Badge>;
}

export default withPolarisExample(BadgeExample);
