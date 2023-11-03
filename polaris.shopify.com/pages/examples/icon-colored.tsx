import {Icon} from '@shopify/polaris';
import {CirclePlus} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return (
    <div>
      <Icon source={CirclePlus} tone="base" />
      <Icon source={CirclePlus} tone="subdued" />
      <Icon source={CirclePlus} tone="primary" />
      <Icon source={CirclePlus} tone="info" />
      <Icon source={CirclePlus} tone="success" />
      <Icon source={CirclePlus} tone="caution" />
      <Icon source={CirclePlus} tone="warning" />
      <Icon source={CirclePlus} tone="critical" />
    </div>
  );
}

export default withPolarisExample(IconExample);
