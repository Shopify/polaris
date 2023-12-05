import {Badge, Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return (
    <Card>
      <Badge size="small">Fulfilled</Badge>
    </Card>
  );
}

export default withPolarisExample(BadgeExample);
