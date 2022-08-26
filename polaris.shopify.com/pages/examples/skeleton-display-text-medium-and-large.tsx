import {SkeletonDisplayText} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonDisplayText size="medium" />;
}

export default withPolarisExample(SkeletonExample);
