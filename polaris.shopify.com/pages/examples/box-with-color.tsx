import React from 'react';
import {Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithColorExample() {
  return (
    <Box background="bg-app-selected">
      <Text as="h2" variant="bodyMd" fontWeight="medium">
        Content inside a box
      </Text>
    </Box>
  );
}

export default withPolarisExample(BoxWithColorExample);
