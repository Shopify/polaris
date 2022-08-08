import {SkeletonDisplayText} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonDisplayText size="extraLarge" />;
}

export default withPolarisExample(SkeletonExample);
