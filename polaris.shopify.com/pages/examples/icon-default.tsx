import {Icon} from '@shopify/polaris';
import {PlusCircleIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return <Icon source={PlusCircleIcon} />;
}

export default withPolarisExample(IconExample);
