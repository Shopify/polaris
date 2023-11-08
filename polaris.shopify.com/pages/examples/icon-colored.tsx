import {Icon} from '@shopify/polaris';
import {CirclePlusIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return (
    <div>
      <Icon source={CirclePlusIcon} tone="base" />
      <Icon source={CirclePlusIcon} tone="subdued" />
      <Icon source={CirclePlusIcon} tone="primary" />
      <Icon source={CirclePlusIcon} tone="info" />
      <Icon source={CirclePlusIcon} tone="success" />
      <Icon source={CirclePlusIcon} tone="caution" />
      <Icon source={CirclePlusIcon} tone="warning" />
      <Icon source={CirclePlusIcon} tone="critical" />
    </div>
  );
}

export default withPolarisExample(IconExample);
