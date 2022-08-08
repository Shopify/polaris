import {SkeletonThumbnail} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonThumbnail size="large" />;
}

export default withPolarisExample(SkeletonExample);
