'use client';

import {Tag} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function TagExample() {
  return <Tag>Wholesale</Tag>;
}

export default withPolarisExample(TagExample);
