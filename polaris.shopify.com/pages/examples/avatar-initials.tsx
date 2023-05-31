import {Avatar} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AvatarExample() {
  return <Avatar initials="WW" name="Woluwayemisi Weun-Jung" />;
}

export default withPolarisExample(AvatarExample);
