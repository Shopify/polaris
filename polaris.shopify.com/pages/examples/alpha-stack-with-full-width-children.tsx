import React from 'react';
import {AlphaStack, Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithFullWidthChildrenExample() {
  return (
    <AlphaStack fullWidth>
      <Box background="action-primary" padding="4" paddingLeft="2">
        <Box
          background="surface-primary-selected-pressed"
          color="text-on-interactive"
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            Stack child
          </Text>
        </Box>
      </Box>
      <Box background="action-primary" padding="4" paddingLeft="2">
        <Box
          background="surface-primary-selected-pressed"
          color="text-on-interactive"
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            Stack child
          </Text>
        </Box>
      </Box>
      <Box background="action-primary" padding="4" paddingLeft="2">
        <Box
          background="surface-primary-selected-pressed"
          color="text-on-interactive"
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            Stack child
          </Text>
        </Box>
      </Box>
    </AlphaStack>
  );
}

export default withPolarisExample(AlphaStackWithFullWidthChildrenExample);
