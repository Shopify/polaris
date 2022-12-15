'use client';

import {Card, SkeletonTabs} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return (
    <Card>
      <SkeletonTabs count={4} />
    </Card>
  );
}

export default withPolarisExample(SkeletonExample);
