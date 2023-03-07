'use client';

import {InlineError} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function InlineErrorExample() {
  return <InlineError message="Store name is required" fieldID="myFieldID" />;
}

export default withPolarisExample(InlineErrorExample);
