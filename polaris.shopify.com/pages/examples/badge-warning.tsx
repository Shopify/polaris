import {Badge, Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return (
    <Card>
      <Badge tone="warning">On hold</Badge>
    </Card>
  );
}

export default withPolarisExample(BadgeExample);
