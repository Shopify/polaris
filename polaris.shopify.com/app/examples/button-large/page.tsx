'use client';

import {Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button size="large">Create store</Button>;
}

export default withPolarisExample(ButtonExample);
