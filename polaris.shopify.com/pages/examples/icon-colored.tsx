import {Icon} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return (
    <div>
      <Icon source={CirclePlusMinor} tone="base" />
      <Icon source={CirclePlusMinor} tone="subdued" />
      <Icon source={CirclePlusMinor} tone="primary" />
      <Icon source={CirclePlusMinor} tone="info" />
      <Icon source={CirclePlusMinor} tone="success" />
      <Icon source={CirclePlusMinor} tone="caution" />
      <Icon source={CirclePlusMinor} tone="warning" />
      <Icon source={CirclePlusMinor} tone="critical" />
    </div>
  );
}

export default withPolarisExample(IconExample);
