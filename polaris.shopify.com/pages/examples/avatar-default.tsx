import {Avatar} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AvatarExample() {
  return <Avatar customer name="Farrah" />;
}

export default withPolarisExample(AvatarExample);
