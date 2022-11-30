import React from 'react';
import {Divider, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithWidthExample() {
  return (
    <AlphaStack gap="12" fullWidth>
      <Divider border="base" width="1" />
      <Divider border="base" width="2" />
      <Divider border="base" width="3" />
      <Divider border="base" width="4" />
      <Divider border="base" width="5" />
    </AlphaStack>
  );
}

export default withPolarisExample(DividerWithWidthExample);
