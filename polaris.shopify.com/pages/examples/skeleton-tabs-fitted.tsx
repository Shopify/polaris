import {LegacyCard, SkeletonTabs} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return (
    <LegacyCard>
      <SkeletonTabs fitted />
    </LegacyCard>
  );
}

export default withPolarisExample(SkeletonExample);
