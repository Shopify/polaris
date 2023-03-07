'use client';

import {SkeletonBodyText} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return <SkeletonBodyText />;
}

export default withPolarisExample(SkeletonExample);
