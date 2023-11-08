import {Icon} from '@shopify/polaris';
import {CirclePlusIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return <Icon source={CirclePlusIcon} />;
}

export default withPolarisExample(IconExample);
