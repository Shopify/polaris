import {Icon} from '@shopify/polaris';
import {CirclePlus} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return <Icon source={CirclePlus} />;
}

export default withPolarisExample(IconExample);
