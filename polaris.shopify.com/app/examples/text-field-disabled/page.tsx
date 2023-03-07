'use client';

import {TextField} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function TextFieldExample() {
  return <TextField label="Store name" disabled autoComplete="off" />;
}

export default withPolarisExample(TextFieldExample);
