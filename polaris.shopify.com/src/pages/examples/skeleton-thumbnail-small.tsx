import {SkeletonThumbnail} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonThumbnail size="small" />;
}

export default withPolarisExample(SkeletonExample);
