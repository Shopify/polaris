import {Badge, Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BadgeExample() {
  return (
    <Card>
      <Badge
        tone="success"
        progress="complete"
        toneAndProgressLabelOverride="Status: Published. Your online store is visible."
      >
        Published
      </Badge>
    </Card>
  );
}

export default withPolarisExample(BadgeExample);
