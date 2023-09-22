import {Badge, Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return (
    <Card>
      <Badge progress="partiallyComplete" status="warning">
        Partially fulfilled
      </Badge>
    </Card>
  );
}

export default withPolarisExample(BadgeExample);
