import {Icon} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function IconExample() {
  return (
    <div>
      <Icon source={CirclePlusMinor} color="base" backdrop />
      <Icon source={CirclePlusMinor} color="highlight" backdrop />
      <Icon source={CirclePlusMinor} color="success" backdrop />
      <Icon source={CirclePlusMinor} color="warning" backdrop />
      <Icon source={CirclePlusMinor} color="critical" backdrop />
    </div>
  );
}

export default withPolarisExample(IconExample);
