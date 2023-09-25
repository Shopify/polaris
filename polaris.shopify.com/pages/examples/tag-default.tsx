import {Card, Tag} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TagExample() {
  return (
    <Card>
      <Tag>Wholesale</Tag>
    </Card>
  );
}

export default withPolarisExample(TagExample);
