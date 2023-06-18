import React from 'react';
import {AlphaStack, Box} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
function AlphaStackWithDividerExample() {
  return (
    <AlphaStack gap="4" withDivider="divider">
      <Box background="surface-success">&nbsp;</Box>
      <Box background="surface-success">&nbsp;</Box>
      <Box background="surface-success">&nbsp;</Box>
    </AlphaStack>
  );
}

export default withPolarisExample(AlphaStackWithDividerExample);
