import {Icon} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function IconExample() {
  return <Icon source={CirclePlusMinor} />;
}

export default withPolarisExample(IconExample);
