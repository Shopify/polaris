import {Avatar} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function AvatarExample() {
  return <Avatar name="Shop One" shape="square" />;
}

export default withPolarisExample(AvatarExample);
