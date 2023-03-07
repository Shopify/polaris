'use client';

import {Icon} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function IconExample() {
  return (
    <div>
      <Icon source={CirclePlusMinor} color="base" />
      <Icon source={CirclePlusMinor} color="subdued" />
      <Icon source={CirclePlusMinor} color="primary" />
      <Icon source={CirclePlusMinor} color="highlight" />
      <Icon source={CirclePlusMinor} color="success" />
      <Icon source={CirclePlusMinor} color="warning" />
      <Icon source={CirclePlusMinor} color="critical" />
    </div>
  );
}

export default withPolarisExample(IconExample);
