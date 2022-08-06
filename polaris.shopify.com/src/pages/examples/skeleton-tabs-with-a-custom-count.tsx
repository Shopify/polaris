import {Card, SkeletonTabs} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function SkeletonExample() {
  return (
    <Card>
      <SkeletonTabs count={4} />
    </Card>
  );
}

export default withPolarisExample(SkeletonExample);
