import {Icon} from '@shopify/polaris';
import {PlusCircleIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return (
    <div>
      <Icon source={PlusCircleIcon} tone="base" />
      <Icon source={PlusCircleIcon} tone="subdued" />
      <Icon source={PlusCircleIcon} tone="primary" />
      <Icon source={PlusCircleIcon} tone="info" />
      <Icon source={PlusCircleIcon} tone="success" />
      <Icon source={PlusCircleIcon} tone="caution" />
      <Icon source={PlusCircleIcon} tone="warning" />
      <Icon source={PlusCircleIcon} tone="critical" />
    </div>
  );
}

export default withPolarisExample(IconExample);
